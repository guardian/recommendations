# AWS Tags

> [!NOTE]
> Resources provisioned using [GuCDK](https://github.com/guardian/cdk) automatically fulfil these requirements.
> When using a YAML/JSON CloudFormation template, resources that are not explicitly tagged will inherit tags from the parent CloudFormation stack.  

Most resources in AWS can be [tagged](https://docs.aws.amazon.com/whitepapers/latest/tagging-best-practices/what-are-tags.html).
This document outlines tags used at the Guardian. In short, resources should have the following tags:
- `App`
- `Stack`
- `Stage`
- `gu:repo`

You can apply your own tags as well.

## Core tags
The following tags should be applied to all taggable resources.

### `App`
This tag identifies an individual application.

For example, `user-api` could be a web service for managing a user's preferences, or `user-cleanup` could be a lambda that runs periodically to remove inactive users.

### `Stack`
This tag identifies a group of related applications.

For example, the aforementioned `user-api` and `user-cleanup` would be part of a `user-management` stack.

Tools that operate across accounts use `Stack` in the following ways:
- [Riff-Raff](https://github.com/guardian/riff-raff) uses `Stack` to derive an individual AWS account. Therefore, we can consider `Stack` as being unique to a single AWS account
- [Anghammarad](https://github.com/guardian/anghammarad) can use `Stack` to route messages to a team for the entire group of applications, which can be easier than adding a mapping for every application individually.

Tools which operate across account, for example Riff-Raff, use the stack to derive an individual AWS account. 
Therefore, we could consider a stack as being unique to a single AWS account.

> [!NOTE]
> "Stack" is an overloaded term. For example, in some contexts it can mean a CloudFormation stack.
> Indeed, a CloudFormation stack should have a `Stack` tag!

### `Stage`
This tag identifies the environment. Typical values are:
- `PROD` for production
- `CODE` for pre-production
- `INFRA` for account-wide infrastructure or singleton resources e.g. [elasticsearch-node-rotation](https://github.com/guardian/elasticsearch-node-rotation)

> [!IMPORTANT]
> The combination of `App`, `Stack`, `Stage` should **uniquely identify** a service.
> For example, there will be one lambda tagged `App=user-cleanup`, `Stack=user-management`, `Stage=PROD` in the entire estate.

### `gu:repo`
*This tag is automatically set by tooling such as [GuCDK](https://github.com/guardian/cdk) or [Riff-Raff](https://github.com/guardian/riff-raff).*

This tag identifies the GitHub repository where the resource's infrastructure as code definition can be found. It takes the form `guardian/<REPO NAME>`.

## Other common tags
There are some additional tags to consider based on the circumstance.

### `Owner`
When provisioning a resource in another team's account, the `Owner` tags helps that team know who to contact if needed. 
It should be the team name, for example `DevX`.
