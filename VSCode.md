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
### Do not commit `.vscode`

The `.vscode` project directory can contain project-specific configurations but also things which override user preferences, and not everyone will find this useful.

Instead, ignore the directory by default and add back things you explicity want to share, e.g.:

```
# .gitignore
.vscode/*
!.vscode/*.code-snippets

```

### `.vscode/settings.json`

**Do not commit this, ever!** This overrides user settings. Instead, commit a `.vscode/settings.json.default` file with your project's recommended settings. Individual developers can then pick and choose the bits that will help them the most:

```
# .gitignore
.vscode/*
!.vscode/settings.json.default

```
