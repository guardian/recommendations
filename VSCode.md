# VS Code

Recommendations and tips for using [VS Code](https://code.visualstudio.com).

## Extensions

### General

The following extensions may be useful in all projects:

-   [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
-   [CODEOWNERS](https://marketplace.visualstudio.com/items?itemName=jasonnutter.vscode-codeowners)
-   [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
-   [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)
-   [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
-   [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
-   [IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)
-   [IntelliCode API Usage Examples](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.intellicode-api-usage-examples)

### Language-specific

The following extensions may be useful for specific projects:

-   [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
-   [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)
-   [Deno](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)
-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)a
-   [GitHub Markdown Preview](https://marketplace.visualstudio.com/items?itemName=bierner.github-markdown-preview)
-   [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
-   [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   [Scala (Metals)](https://marketplace.visualstudio.com/items?itemName=scalameta.metals)
-   [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
-   [Template String Converter](https://marketplace.visualstudio.com/items?itemName=meganrogge.template-string-converter)
-   [Version Lens](https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens)
-   [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)

## Settings

The following settings may be useful to you:

```json
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
	},
}
```
