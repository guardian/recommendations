import { IAllBestPractice, IBestPractice } from "./types.ts";

const github: readonly IBestPractice[] = [
  {
    name: "Default Branch Name",
    owner: "[@guardian](https://github.com/orgs/guardian/teams/all)",
    description:
      "The default branch name should be `main`.<br>See the [master-to-main tool](https://github.com/guardian/master-to-main/blob/main/migrating.md).",
    howToCheck: "Manual. View the repository on https://github.com",
    howToExempt: "N/A",
  },
] as const satisfies readonly IBestPractice[];

const aws: readonly IBestPractice[] = [
  {
    name: "Resource Tagging",
    owner:
      "[DevX Operations](https://github.com/orgs/guardian/teams/devx-operations)",
    description:
      "AWS resources should be tagged (where supported) with `Stack`, `Stage`, and `App`.<br>This aids service discovery, and cost allocation.",
    howToCheck: "TBD",
    howToExempt: "N/A",
  },
] as const satisfies readonly IBestPractice[];

export const AllBestPractices: IAllBestPractice = {
  GitHub: github,
  AWS: aws,
};
