# Using Emotion with React

[Emotion](https://emotion.sh/) is a CSS-in-JS library that provides component-scoping, encapsulation and composition for your styles.

It can be used with and without React, but this guide covers our standard use, which is alongside React. In particular it sets out how to use Emotion alongside the React implementation of our design system, [`Source`](https://github.com/guardian/source).

## Getting started

```shell
$ yarn add @emotion/react
```

> You need to install `@emotion/react` to use [Source components](https://github.com/guardian/source)

## Configuration

Emotion can be configured for TypeScript or Babel, depending on your setup. If you are using both, you only need to do one (TypeScript is simplest).
### TypeScript

If you are using TypeScript <= 4.1 and React <=17, it's simplest to use [React's automatic runtime](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) with TypeScript's attendant [jsx](https://www.typescriptlang.org/tsconfig#jsx) and [jsxImportSource](https://www.typescriptlang.org/tsconfig#jsxImportSource) compiler options.

For earlier versions, use the Babel setup described below.

In your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@emotion/react"
  }
}
```

> This tells TypeScript to use React's automatic runtime and lets TypeScript know where it can find the JSX namespace.

### Babel

You can use the `css` prop, in conjunction with `@emotion/babel-preset-css-prop`:

```shell
$ yarn add @emotion/babel-preset-css-prop -D
```

In your `.babelrc`:

```json
{
  "presets": ["@emotion/babel-preset-css-prop"]
}
```

> **Note:** If you use `@babel/preset-react` or `@babel/preset-typescript` ensure that `@emotion/babel-preset-css-prop` is inserted _after_ them in your babel config.

### Server side rendering

If your app is doing server-side rendering, you need to follow [Emotion's Advanced Approach](https://emotion.sh/docs/ssr#advanced-approach) to SSR setup. This is because our components use sibling selectors that may be interrupted by the way Emotion embeds `<style>` tags directly into your markup.

## Example

```jsx
import { css } from "@emotion/react"

const color = "darkgreen"

render(
  <div
    css={css`
      background-color: hotpink;
      &:hover {
        color: ${color};
      }
    `}
  >
    This has a hotpink background.
  </div>
)
```

## Further reading

We recommend reading at least the following pages on the Emotion documentation site:

- [Composition](https://emotion.sh/docs/composition)
- [Object styles](https://emotion.sh/docs/object-styles)
- [Nested selectors](https://emotion.sh/docs/nested)
