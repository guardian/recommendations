Robustness and Resiliency
==========

Each product must determine which what level of resilience to infrastructure failure they require, from the table below. 

Note that this choice is not primarily a technical decision but a product decision: choosing higher levels of resilience increases both operational and development costs; increases time to market; and increases the complexity of the product. It is recommended to choose the lowest possible level that meets requirements.


|                                                          | Stone | Bronze  | Silver | Gold    | Platinum |
|----------------------------------------------------------|:-----:|:-------:|:------:|:-------:|:--------:|
|Impact of service unavailability                          | None  | Minimal | Minor  | Serious | Critical |
|Acceptable data loss                                      | All   | Some    | Small  | None    | None     |	
|Service must survive failure of a single server           | No    | Yes     | Yes    | Yes     | Yes      
|Service must survive failure of one AWS availability zone | No    | No      | Yes    | Yes     | Yes
|Service must survive failure of a region-wide AWS service | No    | No      | No     | No[1]   | Yes
|Service must survive failure of an entire AWS region      | No    | No      | No     | No      | Yes[2]
|Service must survive global failure of AWS                | No    | No      | No     | No      | No
|Data must survive single server failure                   | No    | Yes     | Yes    | Yes     | Yes 
|Data must survive failure of one AWS availability zone    | No    | No      | Yes    | Yes     | Yes
|Data must survive failure of an entire AWS region         | No    | No      | No     | Yes     | Yes
|Data must survive a global failure of AWS                 | No    | No      | No     | No      | Yes 

[1] In some cases, a product may decide to upgrade this to Yes
[2] Failover time should be decided on a per-product basis


To meet the these resiliency targets, the following is recommended:

* **Prototype** No recommendations, focus on rapid evolution above all else.
* **Bronze** Run all servers within an autoscaling group. Replicate all data to more than one server, and/or perform regular backups.
* **Silver** Run all servers within a cross-AZ autoscaling group. Ensure that data replication always crosses availability zones, and/or perform regular backups to a cross-AZ destination (S3, EBS or Elastic File System).
* **Gold** Run all servers within a cross-AZ autoscaling group. Ensure that data is replicated or backed up to another AWS region.
* **Platinum** Run all servers within a cross-AZ autoscaling group. Ensure that the server infrastructure can be instantiated in another region within the required failover time. Ensure that data is replicated or backed up to another AWS region, and to Google Cloud Storage.