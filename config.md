# Config
Generally we encourage teams to pick the right technology for the task, but there are advantages to having consistency in how we manage our configuration.

It is recommended that apps use [AWS Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-paramstore.html) for storing configuration.

**Advantages of using Parameter Store:**
1. Granular read/write access
2. Free to use
3. Versioned
4. Encryption at rest
5. Monitoring of access
6. Integrates with Cloudformation

## Scala config
Our own [simple-configuration](https://github.com/guardian/simple-configuration) library provides a convenient way to load config from Parameter Store and into [Typesafe config](https://github.com/lightbend/config) objects. The readme includes an example of using it in a Play app.

For existing projects which currently have their config stored in Typesafe (HOCON) format files, you can migrate to Parameter Store using the [parameter-store-migration](https://github.com/guardian/parameter-store-migration) tool.

### Config files in scala projects
It is up to developers to decide how to use config files, but some (optional) common usages are:
- Use reference.conf for default values
- Use application.conf for non-secret items

It is possible to use config files as a way of documenting all config items, with values overridden by Parameter Store.


## Lambdas
Lambdas may also use Parameter Store, and it's possible to have config passed in as environment variables directly from Parameter Store, [including secure strings](https://aws.amazon.com/about-aws/whats-new/2018/08/aws-cloudformation-introduces-dynamic-references-to-support-aws-/). 

## Secret rotation
[AWS Secrets Manager](https://aws.amazon.com/secrets-manager/) can perform secret rotation automatically for some AWS services.

For Play secret rotation you can use [play-secret-rotation](https://github.com/guardian/play-secret-rotation) (which doesn't use Secrets Manager).


## Config is injected on your application starting

We recommend and expect that config would be injected when your application starts. This ensures that we can change config values in Parameter Store, and only need to redeploy the application to see that change, rather than rebuild, or through another process.

