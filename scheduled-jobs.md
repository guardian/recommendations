# Scheduled jobs - tasks that run periodically

## Cron expressions

'cron' syntax (eg [`*/5 1,2,3 * * *`](https://crontab.guru/#*/5_1,2,3_*_*_*)) is a way of specifying times for jobs to run, popularised by [`crontab`](https://en.wikipedia.org/wiki/Cron#Overview), widely supported in other systems like `systemd`, [Amazon EventBridge Scheduler](https://docs.aws.amazon.com/scheduler/latest/UserGuide/schedule-types.html#cron-based), etc.

Tools like https://crontab.guru/ are great to explore cron expressions, but note that [the fields used in cron syntax can vary](https://github.com/guardian/ophan-geoip-db-refresher/pull/3#discussion_r638614229), so check the documentation for the system you're working on.

## Job scheduling in different environments

### UNIX / EC2

Prefer [systemd timers](https://askubuntu.com/a/1051208/17211) (configured in `/etc/systemd/system/foo.timer`) to `crontab` jobs (configured in eg `/etc/crontab`):

* **Logging** : `systemd` provides better logging by default (e.g. `journalctl -u foo.timer` to see the logs). `crontab` may attempt to _email_ job output - this will fail as we typically don't have EC2 boxes configured to send email.
* **Security** : `crontab` jobs can be unintentionally run as `root` (with all-powerful superuser access) if you're not careful . `systemd` encourages you to be explicit about which _user_ the task should run as - this should be a user with a restricted set of permissions, not root!
* **Timezones** : Ubuntu `crontab` [uses the server timezone](https://github.com/guardian/deploy-tools-platform/pull/533) to schedule jobs, while systemd allows custom timezone scheduling (e.g. you can schedule a job to start before office-hours, etc).

See also https://opensource.com/article/20/7/systemd-timers.


### Multi-instance apps (e.g. EC2 in an auto-scaling group)

`crontab` and similar solutions won't always be suitable for multi-instance apps. For example, if you have more than one instance but only need to run the scheduled task once (common if the task has side effects, like sending email).[^1]

In this case, if the task can be triggered via a request to a HTTPS endpoint then the app's load balancer can ensure that at most one instance of the app receives the request and runs the task.

Scheduling the request from outside the app itself can be done in multiple ways (e.g. a scheduled Lambda), but one good solution is to use EventBridge rules with the [API destination integration](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destinations.html#eb-create-rule-api-destination-target). This allows EventBridge rules to make authenticated calls to a specified endpoint on a schedule.

#### Pros
* All of the moving pieces required to create the schedule and trigger can be configured as part of your infrastructure, e.g. via the AWS CDK. So there's
no need to write business logic or maintain a Lambda with the dependencies required to make the HTTP requests.
* No need to hand roll scheduling and retry logic because this is baked in to the EventBridge framework.

#### Cons
* EventBridge requests to an API destination endpoint have a maximum timeout of 5 seconds. So if your task takes more than 5 seconds, and you need the
caller to be aware of its outcome (e.g. to enable retries on failure) this approach won't be suitable.
* nb. More generally, make sure to check the default timeout and retry settings to avoid swamping your service.
* The AWS constructs require a fair amount of boilerplate CDK code, but there are examples in the Guardian estate that could be used as a basis, e.g. [in the crosswords status checker](https://github.com/guardian/crosswordv2/blob/126acf8c6cf88dcc2edc0e851df5b2d0bbe8685b/cdk/lib/scheduled-status-check.ts).



### AWS Lambda

An [`AWS::Events::Rule`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-events-rule.html) can invoke an AWS Lambda at regular intervals.


[^1]: There are a number of examples of this pattern being used in the crosswordv2 repo, e.g. for the [status checker](https://github.com/guardian/crosswordv2/blob/126acf8c6cf88dcc2edc0e851df5b2d0bbe8685b/docs/status-checker.md?plain=1#L13-L14) and [helpline service](https://github.com/guardian/crosswordv2/blob/126acf8c6cf88dcc2edc0e851df5b2d0bbe8685b/docs/ats-helpline.md?plain=1#L8-L10).
