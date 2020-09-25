# Accessibility

## Compliance

We use a subset of the WCAG 2.1 AA standards as our benchmark for accessible products.

Aim to build user interfaces that:

- Provide [text alternatives](https://www.w3.org/TR/WCAG21/#text-alternatives)
- Are [adaptable](https://www.w3.org/TR/WCAG21/#adaptable)
- Are [distinguishable](https://www.w3.org/TR/WCAG21/#distinguishable)
- Do not [trigger seizures or physical reactions](https://www.w3.org/TR/WCAG21/#seizures-and-physical-reactions)
- Are [navigable](https://www.w3.org/TR/WCAG21/#navigable)
- Are [predictable](https://www.w3.org/TR/WCAG21/#navigable)
- Help users [avoid or correct mistakes](https://www.w3.org/TR/WCAG21/#input-assistance)
- Are [compatible][] with existing or future users agents and assistive technologies

[compatible]: (https://www.w3.org/TR/WCAG21/#compatible)

For web-based products, ensure your interfaces:

- Are [keyboard accessible](https://www.w3.org/TR/WCAG21/#compatible)
- Are [accessible to non-keyboard input devices](https://www.w3.org/TR/WCAG21/#input-modalities)

## Testing

### Assistive technology

For web-based products, test each change using one of the [most commonly used screen reader / browser combinations](https://webaim.org/projects/screenreadersurvey8/#browsercombos):

- JAWS with Chrome or Internet Explorer
- NVDA with Chrome or Firefox
- VoiceOver with Safari

Also test your changes using only a keyboard.

For native apps, test changes using the [most commonly used screen reader on the platform](https://webaim.org/projects/screenreadersurvey8/#mobilescreenreaders):

- VoiceOver on iOS
- Talkback on Android

For all products, test changes using a screen magnifier:

- [Magnifier on iOS](https://support.apple.com/en-gb/HT209517)
- [Magnifier on Android](https://support.google.com/accessibility/android/answer/6006949?hl=en-GB)
- [Zoom on OSX](https://support.apple.com/en-gb/guide/mac-help/mh40579/10.15/mac/10.15)
- [Magnifier on Windows](https://support.microsoft.com/en-gb/help/11542/windows-use-magnifier-to-make-things-easier-to-see)

Changes to web-based products should also be tested using only a keyboard.

### Tools

Incorporate automated accessibility testing tools into the CI process, where appropriate.

The following tools have proven useful for web-based products:

- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Pa11y](https://pa11y.org/)
- [React axe](https://github.com/dequelabs/react-axe)
- [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)

### Audits

Perform regular accessibility self-audits against your products. Tools such as [WAVE](https://wave.webaim.org/) can help facilitate audits.

Prioritise and fix any issues in a health week.

Arrange external audits for your product using a recognised accessibility auditing company (e.g. [the RNIB](https://www.rnib.org.uk/rnib-business/website-and-apps)).
