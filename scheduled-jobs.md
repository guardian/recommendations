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

### AWS Lambda

An [`AWS::Events::Rule`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-events-rule.html) can invoke an AWS Lambda at regular intervals.
