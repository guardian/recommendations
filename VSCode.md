# VS Code

Recommendations and tips for using [VS Code](https://code.visualstudio.com).

## Extensions

The following extensions may be useful in all projects:

-   [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
-   [CODEOWNERS](https://marketplace.visualstudio.com/items?itemName=jasonnutter.vscode-codeowners)
-   [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
-   [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)
-   [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
-   [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
-   [IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)
-   [IntelliCode API Usage Examples](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.intellicode-api-usage-examples)
-   [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### HTML/XML
-   [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
-   [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

### CSS
-   [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)

### JavaScript/TypeScript
-   [Deno](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)
-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
-   [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
-   [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner)
-   [Template String Converter](https://marketplace.visualstudio.com/items?itemName=meganrogge.template-string-converter)
-   [Version Lens](https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens)

### Markdown
-   [GitHub Markdown Preview](https://marketplace.visualstudio.com/items?itemName=bierner.github-markdown-preview)

### Scala
-   [Scala (Metals)](https://marketplace.visualstudio.com/items?itemName=scalameta.metals)

### Svelte
-   [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)

### YAML
-   [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)

## Settings

The following settings may be useful to you:

```js
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "editor.formatOnSave": true,
    "editor.formatOnType": true,
    "search.exclude": {
        "**/frontend/static/hash": true,
        "**/frontend/static/target": true,
        "**/frontend/static/transpiled": true,
        "**/node_modules": true,
        // etc
    }
}
```
