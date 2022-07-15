# The art of the pull request

It is worth reading [Github's pull request conventions](https://github.com/blog/1943-how-to-write-the-perfect-pull-request) as this seem to cover most of the basics.

Pull requests are:

## Small and frequent

A good pull request is easy to understand. There should be a manageable number of changes in each pull request. Try to make your pull request as small as possible while still advancing the functionality of the product.

Aim to deploy a pull request before submitting the next one. Frequently small deployments of functionality are easier to review and easier to understand in production.

* Don't mix multiple changes into the same pull request.
* If you are doing bulk moves and deletions only have one kind of operation in a pull request

## Releasable

A pull request should be releasable once its review is complete. The person submitting the pull request should be prepared to merge and release the change.

If these things are not true then you should address the blockers before raising the pull request.


## The art of the pull request review

Good pull request reviews are extremely valuable and help share understanding of both the problem being addressed and its solution.

### A reviewer isn't responsible

When someone reviews a pull request they do not take responsibility for whether the code in the pull request is correct, whether it will work and that it will not have any side-effects elsewhere in the codebase.

A review simply confirms that the pull request addresses its stated problem in a reasonable way and the solution has no obvious problems.

The ultimate responsibility for the change always lies with the person who submitted the pull request and who releases it to production.

### DRY

No-one loves someone who writes the same comment fifteen times on a pull request. If there is a recurring issue like naming, code formatting or code structure in a pull request then point one example out and make a general comment explaining there are multiple occurrences.

### Talk is better

Don't try and hold a conversation in a pull request. If you have more than three comments or three paragraphs in a pull request then consider simply talking through the issues with the person who raised the pull request.

Record the outcome and actions of the conversation on the pull request so everyone else can follow the review.

## Merging is not the end!

A PR is not finished when you merge it - check your PR in Production after it's deployed! Although unit & integration tests can add a lot of confidence that your change is good, looking at your change in Production is the ultimate and most important place to check your PR is delivering what's wanted.

For webapps you can use [Prout](https://github.com/guardian/prout) to let you know when your change has reached Production and is ready to be looked at.

A good way to get into the habit of doing post-merge checks is to write one final comment on your PR, detailing what you looked at:

### Writing an informative post-merge PR comment

A good post-merge comment on a PR can provide evidence that the PR works, or showcase the benefits of doing the PR in the first place! It can answer questions future developers may have, like "Did this stuff _ever_ work?" or "Did this help? Should I make a similar change in my repo?".

Here are some examples of what you could put in a post-merge comment - if your PR was adding:

* **Metrics or Logging** : Include a sample or screenshot of the newly gathered data, with a link to the ELK or dashboard to make it easy to get to that data in the future ([example](https://github.com/guardian/ophan/pull/4065#issuecomment-802200900))
* **A new UI feature** : A screenshot or even video of the feature in action in Production. This doesn't need to be too extensive, because you should already have screenshots/video in the main PR description! If the new feature is being A/B tested, you may want to link to the results. ([example](https://github.com/guardian/ophan/pull/3406#issuecomment-522595859))
* **Performance improvements** : A graph showing how performance has improved post-deployment! ([example](https://github.com/guardian/ophan/pull/4435#issuecomment-1056778719))
* **A security/bug fix** : any evidence that the bug is no longer there, eg a screenshot, video, or log-search. ([example](https://github.com/guardian/ophan/pull/2896#issuecomment-415489771))

