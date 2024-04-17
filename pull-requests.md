# Why do we review PRs?
Code review is an essential part of the continuous deployment pipeline. It enables a second pair of eyes to:
- Examine your change and find any problems you may have missed
- Identify opportunities to optimise or improve your change
- Provide a separate perspective from someone who may also have to work on your code
- Highlight which parts might be difficult to understand for future developers
- Coordinate across subject matter experts and teams, in order to maintain awareness and quality control over complex projects

This last aspect is especially important in mono-repos as:
- Multiple teams might be submitting changes to the repository
- Some code changes may have unintended consequences. For example, whether a code change directly or indirectly impacts data security. Understanding the impact of a change can be hard without the insight and input of a subject matter expert.

Code review also allows for knowledge sharing in both directions between code authors and reviewers at all levels of experience. Reviewing PRs is a great way to understand a new codebase, and to stay in touch with what's happening in your team. And although a review might not be the best place for long discussions, reviews can help to surface new patterns and techniques for both code authors and reviewers.

# The art of raising a PR
> **Note**
> See also the Additional resources below!

The following are generally applicable to PRs, but are not hard rules.

## Ready
Read over your code before opening the PR for review. The main point of code review is to get a second perspective, but having a final look at your own code can help catch common mistakes, such as blocks of commented-out code or build files that shouldn't have been committed.

Tip: Github allows you to open a PR in `draft` state, which can often be helpful if you want to review your own code, or have remote CI checks run, before others review it. (Remember to [change the status of your PR](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/changing-the-stage-of-a-pull-request#marking-a-pull-request-as-ready-for-review) to `ready for review` later on though!)

## Small

A PR should be clear, address a single concern, and composed of a manageable number of changes.

If a PR is too complex, it is much easier for issues to be missed. In addition if trying to understand an aspect of the code change in the future, it becomes harder to understand if buried in a very large and complex PR.
     
When upgrading dependencies, if not [automated](https://github.com/guardian/recommendations/blob/main/scala.md#continuous-dependency-management), try to update several of them at the same time:
 - For Scala, upgrade `scala` runtime, `sbt`, `sbt-plugins` and optionally `play-framework` all in one PR.
 - For Node, upgrade `typescript` runtime, package manager, code formatter, linter, bundler, all in one PR.    

You are more likely to encounter incompatibilities or issues otherwise. 

In general you don't need to make your PR as small as possible, and favour pace and frequency of delivery over atomicity of changes. Contrary to commits which can be [bisected to find root cause of an issue](https://www.metaltoad.com/blog/beginners-guide-git-bisect-process-elimination), every deployment will integrate  additional changes in the system to the ones in the PR (for example baked AMI may be a new one, EC2 bootstrap script may install a newer version of system library, etc.) so you will be more likely to identify the reason for an issue through tests and monitoring than size of the PR.

## Releasable
A PR should be releasable once its review is complete.

The person submitting the PR should be prepared to merge and release the change.

If these things are not true then you should address the blockers before raising the PR.

>**Note**
>Consider deploying the change to a pre-PROD environment to test your change in the wild.

## Descriptive
A PR's description should include sufficient information on what the change is and why it is necessary.

This is an investment in your own future peace of mind. Once a PR is merged it will effectively be documentation of how the code has changed. There should be enough information on the reasoning behind the change to enable it to be understood by someone reading it for the first time.

Where necessary, it should also describe how to test, what success looks like, and what a rollback would involve.

## Narrative
It should be clear what the aim of each commit was.

A commit message should talk about _what_ changed, and _why_. Not _how_. How is the diff itself, and you don’t need to repeat it.

# The art of reviewing a PR
> **Note**
> See also the Additional resources below!

Good PR reviews are extremely valuable. They help share understanding of both the problem being addressed, and its solution.

The following are generally applicable to PR reviews, but are not hard rules.

## A reviewer isn't directly responsible
The primary aim of a review is to confirm the PR addresses its stated problem in a reasonable way, and the solution has no obvious problems.

"Reasonable" covers various aspects. For example: long-term maintainability by the team, monetary cost, security, etc.

The reviewer does not directly take responsibility for whether the code is correct, or will have unintended side-effects. However, all the code produced and released by a team is a shared responsibility. When reviewing code, be sure to consider the human context. If this is a new contributor or a less experienced engineer, the teams' shared responsibility might mean that an experienced team member should give the review more time and attention.

## DRY
No-one loves someone who writes the same comment fifteen times on a PR. If there is a recurring issue like naming, code formatting or code structure in a PR then point one example out, and make a general comment explaining there are multiple occurrences.

## Talk is better
Don't try and hold a conversation in a PR. If you have more than three comments or three paragraphs in a PR then consider talking through the issues with the person who raised the PR.

Record the outcome and actions of the conversation on the PR so everyone else can follow the review.

## Scope and complexity
While looking at the PR you should remember to focus on the changes in the PR.

It is tempting, if there are general problems with the code being examined, to start requesting changes to improve the pre-existing code. Small improvements are sometimes fine, however large amounts of refactoring pre-existing code should not be done via comments in a PR. If such work is needed it should have its own pull request (and potentially go into team planning as a discrete piece of work).

## Code changes
The following are some things to consider when examining the code:
- Does the code work? Check whether function, and logic are correct.
- Does the change need any additional unit tests? For example:
	- Is it changing or adding critical functionality?
	- Is the code complex enough that it needs a unit test to help document its behaviour?
- Does the code take the most out of frameworks and language? Is there any custom implementation of native or already-existing functions?
- Is documentation on functions, methods, classes, contexts, and behaviors adequate?
- Are the critical spots adequately logged?
- Does the code consider failures? Is it only considering the happy path?
- How maintainable is the code in the long term by the wider team?
    - Are there simpler solutions?
    - Is the code as modular as possible?
    - Are functions, methods, and variables adequately named?
- Is there any performance issue?
- Are input data sanitized?
- Is there any SQL Injection point?
- Is sensitive information being encoded or encrypted and not logged?
- Is the code making assumptions not documented in the ticket / PR or code itself?
- Does it meet the team’s guidelines and style guides? For example [these Scala recommendations](./scala.md). Although ideally you will use ScalaFmt, ESLint or similar to remove the need for manual review


## What type of review to use?
_This section is collapsed to separate recommendations from the mechanics of a PR review._

<details>
<summary>Expand</summary>

There are 3 types of review that can be applied to a PR.

### Comment
This adds a comment to the PR at a selected position in the code display. The comment will be visible within the pull request both in the changes tab and the discussion tab.

This should be the most common kind of review. Use it to discuss changes, to ask questions and to recommend most code changes.

Adding a comment does not prevent merging the pull request. It is the PR owners responsibility to ensure that all comments in a PR are addressed and responded to before merging.

### Request change
A review that requests a code change will block any deployment of the PR.

This will remain until the reviewer who requested the change approves the PR - even if another user reviews and approves the code change.  No one can merge this change until the reviewer approves it.

This is a very “heavy-handed” action and should be reserved for situations where the requested change is needed to prevent significant problems.

It is up to the developers discretion as to what constitutes a significant problem as this will be different in every code base, but some generic examples are:
- Change will introduce a run-time error.
- Change will introduce a performance problem.
- Change will introduce a problem with other parts of the system.

If a reviewer applies the “Request change” action, they commit to being responsive to the original author. It is their responsibility to pair with and assist the developer to apply the fix they have requested.

If the requested change is in dispute, for example, the author of the PR disagrees with the change or thinks it should be applied separately, the process for resolution is as follows:
- PR author and change requester speak face-to-face (or on chat), and attempt to resolve their differences. The outcome of this discussion should be summarised and recorded in the PR.
- If the PR author and change requester are unable to agree, a third party should be brought into the discussion to facilitate, and if necessary make a final decision on the item under consideration. The outcome of this discussion should be summarised and recorded in the PR.

### Approve
Approving the PR will allow the author to merge the code. The author should address, and respond to comments on the PR before they do so.

PR approval allows the addition of a general comment that will be displayed in the conversation tab.

Note: If a different reviewer has requested a code change using the “request change” option, you will not be able to approve the PR.  It is effectively blocked until the requester has approved the PR.

</details>

# Merging is not the end!
A PR is not finished when you merge it - check your change in PROD after it's deployed! Although unit and integration tests can add a lot of confidence that your change is good, looking at your change in PROD is the ultimate, and most important place to check your PR is delivering what's wanted.

For webapps you can use [Prout](https://github.com/guardian/prout) to let you know when your change has reached PROD, and is ready to be looked at.

A good way to get into the habit of doing post-merge checks is to write one final comment on your PR, detailing what you looked at:

## Writing an informative post-merge PR comment
A good post-merge comment on a PR can provide evidence that the PR works, or showcase the benefits of doing the PR in the first place. It can answer questions future developers may have, like "Did this stuff _ever_ work?" or "Did this help? Should I make a similar change in my repo?".

Here are some examples of what you could put in a post-merge comment - if your PR was adding:
* **Metrics or Logging** : Include a sample or screenshot of the newly gathered data, with a link to the ELK or dashboard to make it easier to get to that data in the future ([example](https://github.com/guardian/ophan/pull/4065#issuecomment-802200900))
* **A new UI feature** : A screenshot or even video of the feature in action in PROD. This doesn't need to be too extensive, because you should already have screenshots/video in the main PR description! If the new feature is being A/B tested, you may want to link to the results. ([example](https://github.com/guardian/ophan/pull/3406#issuecomment-522595859))
* **Performance improvements** : A graph showing how performance has improved post-deployment! ([example](https://github.com/guardian/ophan/pull/4435#issuecomment-1056778719))
* **A security/bug fix** : any evidence that the bug is no longer there, eg a screenshot, video, or log-search. ([example](https://github.com/guardian/ophan/pull/2896#issuecomment-415489771))

# Additional resources
- [On committing well (slides)](https://www.slideshare.net/jaylett/on-committing-well)
- [A Branch in Time (a story about revision histories) (video)](https://tekin.co.uk/2019/02/a-talk-about-revision-histories)
- [GitHub's blog post "How to write the perfect pull request"](https://github.com/blog/1943-how-to-write-the-perfect-pull-request)
- [How to Make Your Code Reviewer Fall in Love with You](https://mtlynch.io/code-review-love/)
