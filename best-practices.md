<!--
This file is auto-generated via `best-practice/generate.sh`.
Do not edit it directly, but instead run `./best-practice/generate.sh`.
-->

# Best Practices
This document defines a list of best practices we have defined. 

<!-- contentstart -->
## GitHub
| ID        | Name                | Owner                                                   | Description                                                                                                                                    | How to check compliance                           | How to exempt |
| --------- | ------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------- |
| GITHUB-01 | Default Branch Name | [@guardian](https://github.com/orgs/guardian/teams/all) | The default branch name should be `main`.<br>See the [master-to-main tool](https://github.com/guardian/master-to-main/blob/main/migrating.md). | Manual. View the repository on https://github.com | N/A           |
## AWS
| ID     | Name             | Owner                                                                     | Description                                                                                                                             | How to check compliance | How to exempt |
| ------ | ---------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------------- |
| AWS-01 | Resource Tagging | [DevX Operations](https://github.com/orgs/guardian/teams/devx-operations) | AWS resources should be tagged (where supported) with `Stack`, `Stage`, and `App`.<br>This aids service discovery, and cost allocation. | TBD                     | N/A           |
<!-- contentend -->
