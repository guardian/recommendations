Robustness and Resiliency
==========

Each product should determine which what level of resilience to failure they require. Note that this choice is not primarily a technical decision but a product decision: choosing higher levels of resilience increases both operational and development costs; increases time to market; and increases the complexity of the product. It is recommended to choose the lowest possible level that meets requirements.

When deciding the level of resilence, it is useful to consider:
* Impact of service unavailability (none/minimal/minor/serious/critical)
* Acceptable data loss (all/days/hours/minutes)
* Service must survive failure of (single server/AWS availability zone/region-wide AWS service/entire AWS region/global failure of AWS)
* Data must survive (single server/AWS availability zone/entire AWS region/global 

Depending on the resilence your product requires, you may need to do some or all of:
* Run all servers within an autoscaling group
* Run all servers within a cross-AZ autoscaling group
* Replicate all data to (more than one server/across availability zones/across regions)
* perform regular backups (to a cross-AZ destination/to another AWS region)
