# Content Delivery Network (CDN)

Reader facing services should have a CDN in front of them, and our preferred CDN is Fastly. Consistently using Fastly makes it easier for us to maintain up to date termination of HTTP connections.  For example we have been able to add support for HTTP2 and IPv6, and drop support for insecure TLS versions across our entire estate with little or no effort from product teams.

Internal facing services may also benefit from a CDN, especially if they are regularly used by staff in Australia or the USA.  AWS Cloudfront is a reasonable choice.

## Security

You should default to using secure protocols (i.e. HTTPS) for both the connection from user to CDN and from CDN to origin.

When serving content from an S3 bucket, you should still have Fastly in front, and ideally the S3 bucket would be private. Fastly have [a guide](https://docs.fastly.com/en/guides/amazon-s3#using-an-amazon-s3-private-bucket) on how to add the required authentication headers.

## Configuration

Fastly is a highly programmable CDN, but we advise making use of the smallest subset of the features necessary to achieve your goal.

A lot can be achieved with minimal Fastly configuration, and careful use of cache-control, surrogate-control and surrogate-key headers served by your application. This has the advantage that most of the caching logic is co-located with the rest of your application.

If this is insufficient, the next step is making use of VCL snippets, which can be easily edited in the Fastly console and provide a useful way of providing a little extra functionality.

If you find that your VCL snippets are becoming quite large, you should consider switching to custom VCL, which should be versioned in Github and deployed using riff-raff.

## Shielding
When using Fastly it is recommended that you enable [shielding](https://docs.fastly.com/en/guides/shielding#caveats-of-shielding) as it will improve cache performance. Bear in mind that when using shielding any VCL may be executed more than once - see [caveats of shielding](https://docs.fastly.com/en/guides/shielding#caveats-of-shielding). 

We suggest using the London-LCY point of presence as your shield.

## Logging
Fastly has extensive logging capabilities. This can be useful for debugging and data analysis. We advise [streaming logs to Amazon S3](https://docs.fastly.com/en/guides/log-streaming-amazon-s3). When logging to S3 you should [create an IAM role for Fastly](https://docs.fastly.com/en/guides/creating-an-aws-iam-role-for-fastly-logging) using Fastly's AWS account as the principal rather than creating static credentials.

Reader facing services will generate a high volume of logs so you should only enable logging where it is needed. You may consider [logging a sample of requests](https://docs.fastly.com/en/guides/useful-conditions-for-logging#logging-samples).
