AWS Costs
---------

### Trusted Advisor

Use the [Trusted Advisor](https://console.aws.amazon.com/trustedadvisor/home?#/dashboard) to identify instances that you can potentially downgrade to a smaller instance size or terminate. Trusted Advisor is a native AWS resource available to you when your account has Enterprise support. It gives recommendations for cost savings opportunities and also provides availability, security, and fault tolerance recommendations. Even simple tunings in CPU usage and provisioned IOPS can add up to significant savings.

On the TA dashboard, click on **Low Utilization Amazon EC2 Instances** and sort the low utilisation instances table by the highest **Estimated Monthly Savings**. 

### Billing & Cost management
You can use the [Bills](https://console.aws.amazon.com/billing/home?region=eu-west-1#/bill) and [Cost explorer](https://console.aws.amazon.com/billing/home?region=eu-west-1#/bill) to understand the breakdown of your AWS usage and possible identify services you didn’t know you were using it.

### Unattached Volumes
Volumes available but not in used costs the same price. You can easily find them in the [EC2 console](https://eu-west-1.console.aws.amazon.com/ec2/v2/home?region=eu-west-1#Volumes:state=available;sort=size) under Volumes section by filtering by state (available).

### Unused AMIs
Unused AMIs cost money.  You can easily clean them up using the [AMI cleanup tool](https://github.com/guardian/deploy-tools-platform/tree/master/cleanup)

### Unattached EIPs
Unattached Elastic IP addresses costs money. You can easily find them using the trust advisor, or looking at your bills as they are free if they are attached (so in use).

### DynamoDB
It’s very easy to overcommit the reserved capacity on this service. You should frequently review the reserved capacity of all your dynamodb tables. 
The easiest way to do this is to select the Metric tab and check the Provisioned vs. Consumed write and read capacity graphs and use the Capacity tab to adjust the Provisioned capacity accordingly. 
Make sure the table capacity can handle traffic spikes. Use the time range on the graphs to see the past weeks usage.


### Cloudwatch
Cloudwatch metrics can become really expensive without being used at all. Apart from your app metrics, you can configure some AWS SDK to send the metrics you are using, [for instance for kinesis](https://github.com/guardian/content-api/pull/1332/files#diff-60cf2d80ad25f26151966317093f6eb0R64). 

### S3
S3 may looks cheap, but the management console does not help you to understand what is inside each bucket and the size of each own. You can follow the storage size of each of your buckets from a [cloudwatch metric](https://eu-west-1.console.aws.amazon.com/cloudwatch/home?region=eu-west-1#metrics:metricFilter=Pattern%253DAWS%252FS3) called `BucketSizeBytes`. It is good idea as well to have a look the different [storage classes](https://aws.amazon.com/s3/storage-classes/) available for your data:

* Infrequent access

Lower storage price, higher access price. Interesting for backups for instance.


* [Reduce Redundancy Storage](https://aws.amazon.com/s3/reduced-redundancy/)

Lower storage price, reduced redundancy. Interesting for easy reproducible data or non critical data such as logs for instance.  

* Glacier

Extremely low storage price, very high access price. Interesting for data to archive but almost never retrieved.

Another useful feature to manage your buckets is the possibility to set [lifecycle policies](http://docs.aws.amazon.com/AmazonS3/latest/UG/lifecycle-configuration-bucket-no-versioning.html) to change the storage class or delete objects in the buckets or on a path of the bucket.

#### Getting rid of incomplete multipart upload

 S3’s multipart upload feature accelerates the uploading of large objects by allowing you to split them up into logical parts that can be uploaded in parallel. However if you initiate a multipart upload but never finish it, the in-progress upload occupies some storage space and will incur storage charges.
And the thing is these uploads are not visible when you list the contents of a bucket through the console or the standard api (you have to use a special command)

There is 2 easy ways to solve this now and prevent it to happen in the future:

* a [simple script](https://gist.github.com/mchv/9dccbd9245287b26e34ab78bad43ea6c) that can list them with size and potentially delete existing (based on [AWS API](http://docs.aws.amazon.com/cli/latest/reference/s3api/list-parts.html?highlight=list%20parts))
* [Add a lifecycle rule](https://aws.amazon.com/blogs/aws/s3-lifecycle-management-update-support-for-multipart-uploads-and-delete-markers/) to each bucket to delete automatically incomplete multipart uploads after a few days  ([official AWS doc](http://docs.aws.amazon.com/AmazonS3/latest/dev/mpuoverview.html#mpu-abort-incomplete-mpu-lifecycle-config)) 

An example of how to cloud-form the lifecycle rule:

```yaml
  UploadBucket:
    Type: "AWS::S3::Bucket"
    Properties:
      BucketName: "upload-bucket"
      LifecycleConfiguration:
        Rules:
          - AbortIncompleteMultipartUpload:
              DaysAfterInitiation: 7
            Status: Enabled
```

### Bandwidth
Compress the outgoing traffic.
New AWS instance types often have cost savings potential.

### Reservations

Identify instances that you plan to continuously run for the foreseeable future and that you consider the core of your application. These core instances are a good candidate to reserve.
You can see savings of over `50%` on reserved instances vs. on-demand instances. 
[More info on reserving instances](https://aws.amazon.com/ec2/purchasing-options/reserved-instances/getting-started/).

Reservations are set to a particular AWS region and to a particular instances type.
Therefore after making a reservation you are committing to run that particular region/instances combination until the reservation period finishes or you will swipe off all the financial benefits.

### Spot Instances

If your application can handle occasionally being shut down, with short notice, [spot instances](https://aws.amazon.com/ec2/spot/details/) are generally *much* cheaper. Often instances are availabe almost all the time for 10-20% of the standard price making them notably cheaper than reserved instances. [Spot fleet](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-fleet.html) should make it to the point where you're very unlikely not to have the capacity you need, though at the time of writing, it's not supported in CloudFormation.
