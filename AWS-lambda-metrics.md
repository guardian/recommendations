Metrics for Lambdas
--------------------
* AWS Embedded Metrics are an ideal solution for generating metrics for Lambda functions that will track historical data.
* They are a method for capturing Cloudwatch metrics as part of a logging request. 
* This is good because it avoids the financial and performance cost of making a putMetricData() request.
* It also makes it easier to find the point at which the metric is updated in both the logs and in the code itself.
* This does not work at all for our EC2 apps as their logs do not pass through Cloudwatch.
* [This pull request](https://github.com/guardian/mobile-n10n/pull/696) gives a working example of how to embed metrics in your logging request
* [This document](https://docs.google.com/document/d/1cL_t5NhO8J9Bwiu4rghoGh8i_um_sXDyKuq4COhdLEc/edit?usp=sharing) gives a good summary of why AWS embedded metrics are so useful
* Full details can be found in the [AWS Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format_Specification.html), but here are the highlights:
* To use AWS Embedded metrics, logs must be in JSON format.
* A metric is embedded in a JSON logging request by adding a root node named “_aws” to the start of the log request.
* The metric details are defined within this "_aws" node.
* The following code snippet shows a simple logging request updating a single metric:  
 
```json 
  {"_aws": {  
            "Timestamp": 1574109732004,  
            "CloudWatchMetrics": [  
              {  
                "Namespace": "lambda-function-metrics",  
                "Dimensions": [["functionVersion"]],  
                "Metrics": [  
                  {  
                    "Name": "time",  
                    "Unit": "Milliseconds"  
                  }  
                ]  
              }  
            ]  
  },
  "functionVersion": "$LATEST",
  "time": 100,
  "requestId": "989ffbf8-9ace-4817-a57c-e4dd734019ee"
  }
```  
  
* Within the "_aws" node there is a "timestamp" field and a "CloudwatchMetrics" field
* The "timestamp" field is in epoch milliseconds format
* The "CloudwatchMetrics" field contains an array of CloudwatchMetric objects
* Each CloudwatchMetrics object contains the "Namespace", "Dimensions" and "Metrics" fields
* "Namespace" is a string matching the namespace all metrics in the request are listed under.
* "Dimensions" is an array of [DimensionSet](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format_Specification.html#CloudWatch_Embedded_Metric_Format_Specification_structure_dimensionset) objects. 
* If you do not have any Dimensions you must still define the field and pass an empty nested array "[[]]".
* The metrics field contains an array of [MetricDefinition objects](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format_Specification.html#CloudWatch_Embedded_Metric_Format_Specification_structure_metricdefinition). These contain the "Name" and "Unit" for the metric.
* The "Name" field of the metric must correspond with the name of a field in the body of the logging request.  
This field will hold the value for the metric.
* Metrics sent by this request must correspond with the logging objects contained in the request. 
* The value of the metric is not specified in the metric definition,  
instead the metric name is used as a reference to look up the value of the corresponding field in the logging request.
* Further reading:
  * [The AWS introductory statement on Embedded Metrics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format.html)
  * [The Embedded Metric Format Specification](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format_Specification.html#CloudWatch_Embedded_Metric_Format_Specification_structure_dimensionset)
  * An [article](https://dev.to/aws-builders/cloudwatch-custom-metrics-with-cloudwatch-embedded-metric-format-452j) comparing Embedded Metrics with putMetricData() API calls and log-filter based metrics.