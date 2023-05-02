# Client-side architecture guidelines

These are recommendations from the experiences of multiple teams
across the Guardian. Feel free to not follow of them, but also feel
free to justify why not.

## NPM packages

See the separate [npm-packages.md](./npm-packages.md).

## Assets

-   Minify assets (e.g. uglify).
-   Gzip all textual assets served, using GZip level 6 where possible
-   Optimise images for size (e.g. jpegtran, pngquant, giflossy, svgo,
    etc.)
-   Favour SVGs where possible. What happens if images are disabled or
    unsupported?
-   Avoid inlining encoded assets in CSS.

## Coding style

-   Have an [.editorconfig](http://editorconfig.org/) file in your repo.
-   Automate linting as part of your test phase (e.g. jshint, eslint,
    csslint) using the department linting rules:
    - [@guardian/eslint-config](https://github.com/guardian/csnx/tree/main/libs/%40guardian/eslint-config)
    - [@guardian/eslint-config-typescript](https://github.com/guardian/csnx/tree/main/libs/%40guardian/eslint-config-typescript)
    - [@guardian/tsconfig](https://github.com/guardian/csnx/tree/main/libs/%40guardian/tsconfig)
    - [@guardian/prettier](https://github.com/guardian/csnx/tree/main/libs/%40guardian/prettier)
-   Don’t enforce coding styles in pull requests. Add linting dot files
    (e.g. .jshintrc) to your project instead.

## Dependencies

See the separate [dependencies.md](./dependencies.md#javascript).

## Node.js

-   Prefer using the _Current_ even-numbered [version of Node.js](https://nodejs.org/en/about/releases/)
    - Odd-numbered versions become unsupported more quickly than even-numbered
-   Use an `.nvmrc` file to indicate the exact version of Node.js your project uses
	- It's the only node version file that is supported by all current node version management tools
    - `asdf` users must configure their tool to use [legacy version files](https://github.com/asdf-vm/asdf-nodejs#nvmrc-and-node-version-support)


## Strategies

Rather than enforcing strict rules that may differ across constraints
of different projects, define a project-specific strategy for the
various areas below.

### Caching

-   Cache as long as possible (for performance).
-   Ability to cache bust (distributing updates).

### Connectivity

-   What happens if the client goes offline, has high latency, low
    throughput, drops packets?

### Deployment

-   What happens if a client is still using an older version of your app
    after a deploy (e.g. long-lived SPA with no page refresh)?
-   What happens if a client’s browser has cached some assets prior to a
    deploy?

### Accessibility

-   Find out who your users are and make sure they can use your app.
-   How do you handle users with different capabilities or requirements?

### Development/debugging

-   Make sure tests are run against compiled (i.e. production-ready)
    assets when testing locally.
-   Serve sourcemaps for all your minified code.

### Browser support

-   Define what browsers and versions you support. What happens if using an unsupported browser?
-   Define what viewports do you support. What happens if using an unsupported viewport?
-   What happens if JS/CSS is disabled or overridden in the client?

### Reporting

-   Don’t fail silently.
-   Report your JavaScript errors into a logging system (e.g. Sentry).
-   Define web performance budgets and track them

### Build tools/task runners

-   Have an automated process to produce your final assets (e.g. webpack, rollup, microbundle ).
