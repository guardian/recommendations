# The art of the pull request

Pull requests are:

## Small and frequent

A good pull request is easy to understand. There should be a manageable number of changes in each pull request. Try to make your pull request as small as possible why still advancing the functionality of the product.

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

### Good not great

Try not to block a pull request if the majority of it is okay and the pull request as a whole provides value. Issues of style or the possibilities for a better written solution can be addressed by raising Github Issues. Don't stop the value flow lightly.
