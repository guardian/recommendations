# The art of the pull request

Pull requests are:

## Atomic

A pull request should not depend on another pull request explicitly. "Chains" of pull requests are particularly brittle and vulnerable to any bugs or issues being found in any one of the components of the chain.

Where a feature will require multiple PRs to deliver the whole feature consider using an Issue to track the overall status of the feature and reference the issue from the pull request.

## Releasable

A pull request should be releasable once its review is complete. The person submitting the pull request should be prepared to merge and release the change.

If these things are not true then you should address the blockers before raising the pull request.

## The art of the pull request review

Good pull request reviews are extremely valuable and help share understanding of both the problem being addressed and its solution.

### A reviewer isn't responsible

When someone reviews a pull request they do not take responsibility for whether the code in the pull request is correct, whether it will work and that it will not have any side-effects elsewhere in the codebase.

A review simply confirms that the pull request addresses its stated problem in a reasonable way and the solution has no obvious problems.

The ultimate responsibility for the change always lies with the person who submitted the pull request and who releases it to production.