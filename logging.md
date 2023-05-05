Logging
--------

* Application logs should be shipped to our [central ELK stack](https://github.com/guardian/deploy-tools-platform#logging-platform)
* For applications running on EC2:
  * Log structured data (JSON) to `stdout`
  * Include the [`cdk-base`](https://amigo.gutools.co.uk/roles#cdk-base) AMIgo role in your AMI recipe
  * Opt-in to [application logging](https://guardian.github.io/cdk/interfaces/patterns.GuEc2AppProps.html#applicationLogging)
  via `GuCDK`[^1].
  * This will automatically ship application logs and the
  [`cloud-init-output.log`](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html#user-data-shell-scripts)
  to central ELK (via Kinesis)
* For applications running as an AWS Lambda:
  * AWS will automatically ship your logs to CloudWatch as long as your Lambda has the required permissions[^2]
  * These CloudWatch logs will be forwarded to the central ELK stack via
  [`cloudwatch-logs-management`](https://github.com/guardian/cloudwatch-logs-management) (which is maintained by DevX)[^3]
* `devx-logs` and `cloudwatch-logs-management` will both automatically add `app`, `stack` and `stage` fields to your
logs
  * When searching the logs add filters for these fields to improve the relevance of query results
* As logs often include personal data (e.g. ip addresses) we recommend retaining them for a maximum of 14 days
  * DevX tooling automatically applies an appropriate retention period to logs in the ELK stack and to CloudWatch log
  groups which belong to an AWS Lambda
  * Individual teams should also ensure that a suitable retention policy is applied to any other storage which contains
  logs (e.g. Kinesis streams or S3 buckets)

### Benefits of the central ELK stack

* Using the central ELK stack standardises the approach to logging across teams, which makes it easier to triage issues,
rotate between teams, etc.
* It allows us to easily search and correlate logs across different AWS resources and accounts within a single UI
* DevX maintain the central ELK stack (and some supporting tooling), which reduces maintenance overhead for individual
teams

[^1]: If you are not using `GuCDK` see [`cdk-base`](https://amigo.gutools.co.uk/roles#cdk-base) for more information on
the required tags/permissions which must be added via CloudFormation
[^2]: These will be added automatically if you are using `GuCDK`
[^3]: To confirm that this log forwarding has been configured for your account see
[this configuration](https://github.com/guardian/cloudwatch-logs-management/blob/main/packages/cdk/bin/cdk.ts)
