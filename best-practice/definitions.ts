import { IAllBestPractice, IBestPractice } from "./types.ts";

const repository: readonly IBestPractice[] = [
  {
    name: "Default Branch Name",
    owner: "[@guardian](https://github.com/orgs/guardian/teams/all)",
    description:
      "The default branch name should be `main`.<br>See the [master-to-main tool](https://github.com/guardian/master-to-main/blob/main/migrating.md).",
    howToCheck: "Manual. View the repository on https://github.com",
    howToExempt: "Archived repositories are exempt.",
  },
  {
    name: "Branch Protection",
    owner: "[@guardian](https://github.com/orgs/guardian/teams/all)",
    description:
      "Enable branch protection for the default branch, ensuring changes are reviewed before being deployed.",
    howToCheck:
      "Manual. View the repository on https://github.com. Repos with _no_ protected branches [are on Grafana](https://metrics.gutools.co.uk/d/aqd0U_rVk/branch-protections?orgId=1). Nb. this dashboard does not tell you whether protections follow best practices on repos which _are_ already protected.",
    howToExempt: "Archived repositories are exempt.",
  },
  {
    name: "Team-based Access",
    owner: "[@guardian](https://github.com/orgs/guardian/teams/all)",
    description:
      "Grant access on a team basis, rather than directly to individuals.",
    howToCheck: "Manual. View the repository on https://github.com",
    howToExempt: "N/A",
  },
  {
    name: "Admin Access",
    owner: "[@guardian](https://github.com/orgs/guardian/teams/all)",
    description:
      "Grant at least one GitHub team Admin access - typically, the dev team that own the project.",
    howToCheck: "Manual. View the repository on https://github.com",
    howToExempt:
      "Repositories *without* the one of following topics are exempt: production, testing, documentation. Archived repositories are exempt.",
  },
  {
    name: "Archiving",
    owner:
      "[DevX Operations](https://github.com/orgs/guardian/teams/devx-operations)",
    description: "Repositories that are no longer used should be archived.",
    howToCheck: "Manual. View the repository on https://github.com",
    howToExempt: "N/A",
  },
  {
    name: "Topics",
    owner:
      "[DevX Security](https://github.com/orgs/guardian/teams/devx-security)",
    description:
      "Repositories should have a topic, to help understand what is in production.",
    howToCheck: "Manual. View the repository on https://github.com",
    howToExempt:
      "Repositories owned *only* by non-P&E teams are exempt. Archived repositories are exempt.",
  },
  {
    name: "Contents",
    owner:
      "[DevX Security](https://github.com/orgs/guardian/teams/devx-security)",
    description:
      "Never commit secret information. Avoid private information in public repositories.",
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

const galaxiesPerson: readonly IBestPractice[] = [
  {
    name: "GitHub Usernames",
    owner:
      "[DevX Operations](https://github.com/orgs/guardian/teams/devx-operations)",
    description:
      "Developers should update their [Galaxies profiles](https://forms.gle/7Yye3KfHefgYqg3c7) with their GitHub usernames",
    howToCheck: "View on Galaxies",
    howToExempt:
      "Your Galaxies role is something other than an engineer/data analyst",
  },
];

const galaxiesTeam: readonly IBestPractice[] = [
  {
    name: "GitHub Usernames",
    owner:
      "[DevX Operations](https://github.com/orgs/guardian/teams/devx-operations)",
    description:
      "Developers should update their [Galaxies profiles](https://forms.gle/7Yye3KfHefgYqg3c7) with their GitHub usernames",
    howToCheck: "View on Galaxies",
    howToExempt:
      "Your Galaxies role is something other than an engineer/data analyst",
  },
  {
    name: "Github Team",
    owner:
      "[DevX Operations](https://github.com/orgs/guardian/teams/devx-operations)",
    description:
      "Teams should have their GitHub team names in their galaxies entry",
    howToCheck:
      "Check in [this file](https://github.com/guardian/galaxies/blob/main/shared/data/teams.ts) in the Galaxies repo",
    howToExempt: "Non-development teams are exempt",
  },
  {
    name: "Team Emails",
    owner:
      "[DevX Operations](https://github.com/orgs/guardian/teams/devx-operations)",
    description: "Team emails in Galaxies should be up to date",
    howToCheck:
      "Check in [this file](https://github.com/guardian/galaxies/blob/main/shared/data/teams.ts) in the Galaxies repo",
    howToExempt: "N/A",
  },
] as const satisfies readonly IBestPractice[];

export const AllBestPractices: IAllBestPractice = {
  Repository: repository,
  AWS: aws,
  GalaxiesPerson: galaxiesPerson,
  GalaxiesTeam: galaxiesTeam,
};
