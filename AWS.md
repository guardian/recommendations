# General

 * Provision and manage all AWS resources using infrastructure as code
   * Prefer to use [CDK](https://github.com/guardian/cdk) to generate CloudFormation. You might find that older projects still use CloudFormation directly; these should be migrated to CDK where possible.
   * Prefer to [import resources](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/resource-import.html) into CFN over manually configuring them
 * Tag resources with:
   * `Stack` - the broad umbrella the service sits under e.g. `media-service`. Useful to denote ownership within a shared AWS account.
   * `Stage` - the environment, typical values are:
     * `PROD` for production
     * `CODE` for pre-production
     * `INFRA` for infrastructure or singleton resources e.g. [elasticsearch-node-rotation](https://github.com/guardian/elasticsearch-node-rotation)
   * `App` - the individual service e.g. `image-loader`
   * `gu:repo` - the GitHub repository where the resource's definition can be found
 * If a resource needs to be shared across multiple environments, prefer to define it in it's own CFN template as the same resource cannot be defined in multiple templates
 * Prefer continuous delivery of infrastructure via Riff-Raff over manual deployment
   * This provides a better audit trail
   * This decreases risk as, by default, Riff-Raff will protect stateful resources from being accidentally deleted 
 * Do not have private or secret information in a CFN template. Prefer to use Parameters or [private-infrastructure-config](https://github.com/guardian/private-infrastructure-config)

## Permissions

 * Applications should use IAM instance profiles to gain access to other AWS resources. 
 * Such profiles should be associated with roles that provide the minimum necessary rights.
 * Non-AWS credentials should be stored in Parameter Store or DynamoDB, so that they can be retrieved via an IAM role.

## EC2

 * An application hosted on an EC2 machine should be fully functioning following boot, or restart without human intervention.
 * Always create EC2 machines in autoscaling groups, even if that group has a minimum and maximum size of 1.
 * Use ELB healthchecks even if the app has no other HTTP endpoints, as other healthchecks are very limited.
 * Autoscaling groups should span all availability zones in a region.
 * EC2 security groups should not have globally open ports.
 * Use AMIs baked by Amigo.
 * Ensure that instances are kept up to date with new AMIs using Riff Raff scheduled deploys.


## VPC

* To follow best practice for VPCs, ensure you have a single CDK-generated VPC in your account that is used to house your applications. You can find the docs for it [here](https://github.com/guardian/cdk/blob/main/src/constructs/vpc/vpc.ts#L32-L59). 
* While generally discouraged, in some exceptional cases, such as security-sensitive services, you may want to use the construct to generate further VPCs in order to isolate specific applications. It is worth discussing with DevX Security and InfoSec if you think you have a service that requires this.
* Avoid using the default VPC - The default VPC is designed to get you up and running quickly, but with many negative tradeoffs:
  - It lacks the proper security and auditing controls. 
  - Network Access Control Lists (NACLs) are unrestricted.
  - The default VPC does not enable flow logs. Flow logs allow users to track network flows in the VPC for auditing and troubleshooting purposes
  - No tagging
  - The default VPC enables the assignment of public addresses in public subnets by default. This is a security issue as a small mistake in setup could 
    then allow the instance to be reachable by the Internet. 
* The account should be allocated a block of our IP address space to support peering. Often you may not know you need peering up front, so better to plan for it regardless. See [here](https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-basics.html) for more info on AWS peering rules.
* If it is likely that AWS resources will need to communicate with our on-prem infrastructure, then contact the networking team to request a CIDR allocation for the VPC.
* Ensure you have added the correct [Gateway Endpoints](https://docs.aws.amazon.com/vpc/latest/privatelink/vpce-gateway.html) for the AWS services being accessed from your private subnets to avoid incurring unnecessary networking costs. 
* Security of the VPC and security groups must be considered. See [here](https://github.com/guardian/security-recommendations/blob/main/recommendations/aws.md#vpc--security-groups) for details.


## ELB

 * Load balancers should be cross-zone and have a connection draining policy.

## SQS

 * Use SQS's long polling support to minimise message processing latency.

## SES

* Internal tools should send emails via SES from a `gutools.co.uk` domain.
* Services sending emails should send them from a domain per-environment, e.g.`mailer@my-service.gutools.co.uk` & `mailer@my-service.code.dev-gutools.co.uk`, for `PROD` and `CODE` environments respectively.

Using a `guardian.co.uk` or `theguardian.com` domain for internal tools is not recommended to reduce the risk of identity spoofing. 
Similarly having differing domains per environment reduces the risk of confusion e.g. a `CODE` environment sending emails that are confused for real `PROD` emails by users.

See [usage of SES to send emails in our projects](https://github.com/search?q=org%3Aguardian+EmailIdentity+language%3ATypeScript&type=code&l=TypeScript).

## S3

 * Create buckets with CloudFormation, one per stage
 * Block public access
 * If public access is needed, enable this via a bucket policy rather than per object
 * Don't delete S3 buckets once they're not used any more
   * S3 bucket names are global and someone else could pick up the same name
   * This may pose a security risk if we inadvertently still use or reference the bucket
   * Instead remove everything from within the bucket and make it private if it is not already

## Lambda

### Long-running lambda triggered multiple times from CLI `aws lambda invoke`

#### Recommendation
Set `--cli-read-timeout` to `0` when running `aws lambda invoke` with `--invocation-type RequestResponse`

#### What problem does it solve?
Your lambda will get triggered multiple times you trigger it synchronously using `--invocation-type RequestResponse` and it runs longer than 60 seconds, unless you set the [`--cli-read-timeout`](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-options.html#:~:text=cli%2Dread%2Dtimeout) param.

#### Details
[`--cli-read-timeout`](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-options.html#:~:text=cli%2Dread%2Dtimeout) is a general CLI param that applies to all subcommands and determines how long it will wait for data to be read from a socket. It seems to default to 60 seconds.

In the case of a synchronously executed long-running lambda, this timeout can be exceeded. The first lambda invocation "fails" (though not in a way that is visible in any lambda metrics or logs), and the CLI will abort the request and retry. The first lambda invocation hasn't really failed though - it will continue to run, possibly successfully - but the CLI client that initiated it has stopped waiting for a response.

Setting `--cli-read-timeout` to `0` removes the timeout and make the socket read wait indefinitely, meaning the CLI command will block until the lambda completes or times out.

There is a StackOverflow thread about this issue here:
https://stackoverflow.com/questions/53898894/aws-lambda-timeout-when-another-long-lambda-is-invoked


## Alarming on 5XX Errors (CloudWatch Metrics)

When using EC2 and ELB/ALB there are two different counts for 5XX
- `HTTPCode_Backend_5XX` (ELB) / `HTTPCode_Target_5XX_Count` (ALB) produced by your application server
- `HTTPCode_ELB_5XX` (ELB) / `HTTPCode_ELB_5XX_Count` (ALB) produced by the load balancer

To the client/consumer it doesn't matter what the source of the 5XX (application server or load balancer).. it's still a 5XX - and we as engineers need to hear about it.

If you are using [`@guardian/cdk`](https://github.com/guardian/cdk), it is trivial to configure a 5XX alarm which combines these two metrics. For example see https://github.com/guardian/support-frontend/pull/3614.

If you are using CloudFormation, you will need to use 'Metric Math', to change any 5XX alarms to use the SUM of these metrics to capture ALL 5XX scenarios. For example see https://github.com/guardian/members-data-api/pull/425.

![image](5XX-department-email.png)

NB: see also [Resiliency and Robustness](resiliency.md) and
[Security](security.md), which have AWS-relevant recommendations.
