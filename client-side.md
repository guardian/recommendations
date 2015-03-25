# Client-side architecture guidelines

These are recommendations from the experiences of multiple teams
across the Guardian. Feel free to not follow of them, but also feel
free to justify why not.

## Assets

- Pre-process before serving in production (e.g. Sass, ES6).
- Minimize the number of HTTP requests using methods such as bundling
  to avoid latency issues.
- Minify assets (e.g. uglify).
- Gzip all textual assets served, using GZip level 6 where possible
- Optimise images for size (e.g. jpegtran, pngquant, giflossy, svgo,
  etc.)
- Favour SVGs where possible. What happens if images are disabled or
  unsupported?
- Avoid inlining encoded assets in CSS.


## Coding style

- Have an .editorconfig file in your repo.
- Automate linting as part of your test phase (e.g. jshint, eslint,
  csslint).
- Don’t enforce coding styles in pull requests. Add linting dot files
  (.jshintrc etc) to your project instead.


## Dependencies

- Make all your dependencies explicit using a dependency system
  (e.g. AMD, CJS, ES6 modules, @import), rather than expecting them to
  be provided by the environment.
- If starting a new project, favour ES6 modules unless you can justify
  otherwise.
- Do not commit your dependencies into Git.

*TODO: How to publish your own libraries? What format to publish it in?
NPM, Bower, JSPM, etc? How to depend on other libraries?*

Favour the following libraries unless you can justify otherwise:
- lodash over underscore
- reqwest for AJAX
- moment for dates

*TODO: any others?*


## Strategies

Rather than enforcing strict rules that may differ across constraints
of different projects, define a project-specific strategy for the
various areas below.

### Caching

- Cache as long as possible (for performance).
- Ability to cache bust (distributing updates).
- Bundle assets together based on their expected lifetime
  (e.g. separate fast-changing app bundles from slow-changing
  dependency bundle).

### Connectivity

- What happens if the client goes offline, has high latency, low
  throughput, drops packets?

### Deployment

- What happens if a client is still using an older version of your app
  after a deploy (e.g. long-lived SPA with no page refresh)?
- What happens if a client’s browser has cached some assets prior to a
  deploy?

### Accessibility

- Find out who your users are and make sure they can use your app.
- How do you handle users with different capabilities or requirements?

### Development/debugging

- Make sure tests are run against compiled (i.e. production-ready)
  assets when testing locally.
- Serve sourcemaps for all your minified code.
- Avoid programmatically generated CSS class names to simplify static
  analysis.

### Browser support

- Define what browsers and versions you support. What happens if using an unsupported browser?
- Define what viewports do you support. What happens if using an unsupported viewport?
- What happens if JS/CSS is disabled or overridden in the client?

### Reporting

- Don’t fail silently.
- Report your JavaScript errors into a logging system (e.g. Sentry).

*TODO: Would be good to have something about performance (memory,
responsiveness, etc), maybe a strategy to assess performance, some
targets, automated testing or RUM?*

### Build tools/task runners

Have an automated process to produce your final assets (e.g. using
Grunt, Gulp, Plumber, etc).
