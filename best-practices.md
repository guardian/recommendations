<!--
Before adding a best practice, consider:
  - How one can identify if it's being followed (e.g. a dashboard)
  - How to exempt from it
-->

# Best Practices
This document defines a list of best practices we have defined. 

## GitHub
| ID | Name | Owner         | Description                                                                                                                                     | How to check compliance                           | How to exempt |
| -- | ---- |---------------|-------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------|---------------|
| GH-01 | DefaultBranchName | [@guardian](https://github.com/orgs/guardian/teams/all) | The default branch name should be `main`.<br>See the [master-to-main tool](https://github.com/guardian/master-to-main/blob/main/migrating.md). | Manual. View the repository on https://github.com | N/A |

## AWS
| ID | Name | Owner         | Description                                                                                                                                     | How to check compliance                           | How to exempt |
| -- | ---- |---------------|-------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------|---------------|
| AWS-01 | Tagging | [DevX Operations](https://github.com/orgs/guardian/teams/devx-operations) | AWS resources should be tagged (where supported) with `Stack`, `Stage`, and `App`.<br>This aids service discovery, and cost allocation. | TBD | N/A |
