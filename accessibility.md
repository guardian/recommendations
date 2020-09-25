# Accessibility

## Compliance

Products should comply with a subset of WCAG 2.1 AA standards. We should build user interfaces that:

- Provide [text alternatives](https://www.w3.org/TR/WCAG21/#text-alternatives)
- Are [adaptable](https://www.w3.org/TR/WCAG21/#adaptable)
- Are [distinguishable](https://www.w3.org/TR/WCAG21/#distinguishable)
- Do not [trigger seizures or physical reactions](https://www.w3.org/TR/WCAG21/#seizures-and-physical-reactions)
- Are [navigable](https://www.w3.org/TR/WCAG21/#navigable)
- Are [predictable](https://www.w3.org/TR/WCAG21/#navigable)
- Help users [avoid or correct mistakes](https://www.w3.org/TR/WCAG21/#input-assistance)
- Are [compatible](https://www.w3.org/TR/WCAG21/#compatible) with existing or future users agents and assistive technologies

Of special interest to web-based products, we should ensure our interfaces:

- Are [keyboard accessible](https://www.w3.org/TR/WCAG21/#compatible)
- Are [accessible to non-keyboard input devices](https://www.w3.org/TR/WCAG21/#input-modalities)

## Testing

### Assistive technology

Where appropriate, each change should be tested using at least one of the [most commonly used screen reader / browser combinations](https://www.w3.org/TR/WCAG21/#input-modalities):

- JAWS with Chrome or Internet Explorer
- NVDA with Chrome or Firefox
- VoiceOver with Safari

Native apps should be tested using the [most commonly used screen reader on the platform](https://www.w3.org/TR/WCAG21/#input-modalities):

- VoiceOver on iOS
- Talkback on Android

Changes should be tested using a screen magnifier:

- [Magnifier on iOS](https://www.w3.org/TR/WCAG21/#input-modalities)
- [Magnifier on Android](https://www.w3.org/TR/WCAG21/#input-modalities)
- [Zoom on OSX](https://www.w3.org/TR/WCAG21/#input-modalities)
- [Magnifier on Windows](https://www.w3.org/TR/WCAG21/#input-modalities)

Changes to web-based products should also be tested using only a keyboard.

### Tools

Automated accessibility testing tools should be incorporated into the CI process, where appropriate.

The following tools have proven useful for web-based products:

- [Lighthouse](https://www.w3.org/TR/WCAG21/#input-modalities)
- [Pa11y](https://www.w3.org/TR/WCAG21/#input-modalities)
- [React axe](https://www.w3.org/TR/WCAG21/#input-modalities)
- [eslint-plugin-jsx-a11y](https://www.w3.org/TR/WCAG21/#input-modalities)

### Audits

Teams should perform regular accessibility self-audits on their products. They may use tools such as [WAVE](https://www.w3.org/TR/WCAG21/#input-modalities) to facilitate audits.

The highest priority issues should be identified and fixed in a subsequent health week.

As well as self-audits, products should undergo external audits from a recognised accessibility auditing company (e.g. [the RNIB](https://www.w3.org/TR/WCAG21/#input-modalities)).
