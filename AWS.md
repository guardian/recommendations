General
-------

 * Use CloudFormation or ElasticBeanStalk to define infrastructure in AWS.

Permissions
-----------

 * Applications should use IAM instance profiles to gain access to other AWS resources. 
 * Such profiles should be associated with roles that provide the minimum necessary rights.
 * Non-AWS credentials should be stored in DynamoDB or S3, so that they can be retrieved via an IAM role.

EC2
---

 * An application hosted on an EC2 machine should be fully functioning following boot, or restart without human intervention.
 * Always create EC2 machines in autoscaling groups, even if that group has a minimum and maximum size of 1.
 * Use ELB healthchecks even if the app has no other HTTP endpoints, as other healthchecks are very limited.
 * Autoscaling groups should span all availability zones in a region.
 * EC2 security groups should not have globally open ports.
 * Ensure NTP is installed.

ELB
---

 * Load balancers should be cross-zone and have a connection draining policy.

SQS
---

 * Use SQS's long polling support to minimise message processing latency.
 
Alarming on 5XX Errors (CloudWatch Metrics)
---
When using EC2 and ELB/ALB there are two different counts for 5XX
- `HTTPCode_Backend_5XX` produced by your application server
- `HTTPCode_ELB_5XX` produced by the load balancer (metric name is slightly different for ALB) 

To the client/consumer it doesn't matter what the source of the 5XX (backend or ELB).. it's still a 5XX - and we as engineers need to hear about it.

Use 'Metric Math', to change any 5XX alarms to use the SUM of the `HTTPCode_Backend_5XX` and the `HTTPCode_ELB_5XX` metrics to capture ALL 5XX scenarios. For example see https://github.com/guardian/members-data-api/pull/425 

![image](5XX-department-email.png)

NB: see also [Resiliency and Robustness](resiliency.md) and
[Security](security.md), which have AWS-relevant recommendations.
