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


NB: see also [Resiliency and Robustness](resiliency.md) which has AWS-relevant recommendations.