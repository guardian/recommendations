# Accessibility

## Compliance

We use a subset of the WCAG 2.1 AA standards as our benchmark for accessible products.

Aim to build user interfaces that:

- Provide [text alternatives](https://www.w3.org/TR/WCAG21/#text-alternatives)
- Are [adaptable](https://www.w3.org/TR/WCAG21/#adaptable)
- Are [distinguishable](https://www.w3.org/TR/WCAG21/#distinguishable)
- Give [enough time][] to read and use
- Do not [trigger seizures or physical reactions](https://www.w3.org/TR/WCAG21/#seizures-and-physical-reactions)
- Are [navigable](https://www.w3.org/TR/WCAG21/#navigable)
- Are [predictable](https://www.w3.org/TR/WCAG21/#predictable)
- Help users [avoid or correct mistakes](https://www.w3.org/TR/WCAG21/#input-assistance)
- Are [compatible][] with existing or future users agents and assistive technologies

[enough time]: https://www.w3.org/TR/WCAG21/#enough-time
[compatible]: https://www.w3.org/TR/WCAG21/#compatible

For web-based products, ensure your interfaces:

- Are [keyboard accessible](https://www.w3.org/TR/WCAG21/#compatible)
- Are [accessible to non-keyboard input devices](https://www.w3.org/TR/WCAG21/#input-modalities)

## Assistive technology

### Web

For web-based products, test each change using one of the [most commonly used screen reader / browser combinations](https://webaim.org/projects/screenreadersurvey8/#browsercombos):

- JAWS with Chrome or Internet Explorer
- NVDA with Chrome or Firefox
- VoiceOver with Safari

WebAIM provides a useful guide to [testing accessibility with VoiceOver](https://webaim.org/articles/voiceover/).

Also test your changes using only a keyboard.

Test each change using speech recognition software:

- [Speech Recognition][speech-recognition] on Windows
- [Voice Control][voice-control] (or Dictation on MacOS < 10.15) with Safari

[speech-recognition]: https://support.microsoft.com/en-gb/help/12427
[voice-control]: https://support.apple.com/en-gb/guide/mac-help/mh40719/10.15/mac/10.15

### Native

For native apps, test changes using the [most commonly used screen reader on the platform](https://webaim.org/projects/screenreadersurvey8/#mobilescreenreaders):

- VoiceOver on iOS
- Talkback on Android

### All products

For all products, test changes using a screen magnifier:

- [Magnifier on iOS](https://support.apple.com/en-gb/HT209517)
- [Magnifier on Android](https://support.google.com/accessibility/android/answer/6006949?hl=en-GB)
- [Zoom on OSX](https://support.apple.com/en-gb/guide/mac-help/mh40579/10.15/mac/10.15)
- [Magnifier on Windows](https://support.microsoft.com/en-gb/help/11542/windows-use-magnifier-to-make-things-easier-to-see)

## Design system

In web products, use the standard [UI components][ui-components] and [typography snippets][typography-snippets] provided by the Source Design System. These are optimised for accessibility.

For all products, try to use:

- [colour tokens][colour-tokens] to ensure text and iconography have suitable colour contrast
- [size tokens][size-tokens] to ensure interactive elements have adequate target size

[ui-components]: https://www.theguardian.design/2a1e5182b/p/77ee17-overview
[typography-snippets]: https://www.theguardian.design/2a1e5182b/p/95d5d0-code
[colour-tokens]: https://www.theguardian.design/2a1e5182b/p/1377a6-tokens/b/293ddb
[size-tokens]: https://www.theguardian.design/2a1e5182b/p/00ddcb-tokens

## Tools

Incorporate automated accessibility testing tools into the CI process, where appropriate.

The following tools have proven useful for web-based products:

- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Pa11y](https://pa11y.org/)
- [React axe](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/react)
- [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)

## Audits

Perform regular accessibility self-audits against your products. Tools such as [WAVE](https://wave.webaim.org/) can help facilitate audits.

Prioritise and fix any issues in a health week.

Arrange external audits for your product using a recognised accessibility auditing company (e.g. [the RNIB](https://www.rnib.org.uk/rnib-business/website-and-apps)).
