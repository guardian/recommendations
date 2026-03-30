# Documentation

Effective technical documentation is a gift to your future self, and will save you and others time.

This document provides practical advice on writing high quality technical documentation with a recommended
structure for the base README file of a repo.

## Contents

- [Overall guidance](#overall-guidance)
- [README Template](#readme-template)

## Overall Guidance

### Writing good documentation is challenging

Writing effective documentation is challenging and requires time and investment. It is a skill which requires practice
and effort to improve on. Google offers helpful resources that provide advice for writing quality documentation. See
the [Technical Writing One](https://developers.google.com/tech-writing/one)
materials for improving your technical writing skills.

### Write for an audience

Before authors can provide practical information to readers, they need to consider:

- Who is their target audience?
- What is their target audience's goal? Why are they reading this document?
- What do readers already know before they read your document?
- What should readers know or be able to do after they read your document?

Answering these questions allows an author to know what is relevant and reasonable to assume about readers. This helps
to keep documentation concise and focused. Assuming too much will make the documentation difficult to engage with,
whereas too little will make it overly verbose.

The assumptions made about reader should be tested through a review process. Reviewers should be transparent about areas
they found confusing or irrelevant. Identifying these areas in the documentation is the most helpful feedback an author
can receive. It allows an author to consider their real audience and work with them to provide the right level of
detail.

<!--alex ignore easy-->
> [!WARNING]
> As experts, it is easy to forget that novices don’t know what you already know. Novices might not understand
> explanations that make passing reference to subtle interactions and deep systems that the expert doesn’t stop to
> explain.

– [Technical Writing One / Audience](https://developers.google.com/tech-writing/one/audience#curse_of_knowledge)


<!--alex ignore clearly-->
Repo documentation is primarily useful for engineers. However, authors should consider the value it provides to product
and engineering managers. When documentation is written clearly, it provides a useful resource for a multitude of
readers with varying levels of technical skill and domain knowledge. It can save time by answering the most important
questions in a concise way.

The definition of your audience and intent of the documentation can be included in your introduction which will also
make it clear to readers. If they are in the wrong place, a [helpful hyperlink](#including-hyperlinks) may be able to
help them on their way to more relevant information.

### Including hyperlinks

Hyperlinks to other projects, documentation, or samples of key code snippets, reduce repetition and provide users with
access to relevant resources. Linking allows the author to make assumptions about the reader's/readers' knowledge by
specifying prerequisites for the content. For example:

> The [AWS Cloud Development Kit](https://github.com/aws/aws-cdk) (AWS CDK) is an open-source software
> development framework to define cloud infrastructure in code and provision it
> through AWS CloudFormation.
>
>`@guardian/cdk` builds on CDK to provide Guardian-specific [patterns](./src/patterns) and
[constructs](./src/constructs). It is an opinionated and secure-by-default way to describe and
> provision your AWS resources.

– [Guardian CDK Library](https://github.com/guardian/cdk?tab=readme-ov-file#guardian-cdk-library)

### Define new or unfamiliar terms

Authors often forget the terms and phrases they use daily that might be unfamiliar to outsiders or newcomers. Defining
these terms can provide significant clarity for experts and novices alike.

> [!TIP]
> When writing or editing, learn to recognize terms that might be unfamiliar to some or all of your target audience.
> When you spot such a term, take one of the following two tactics:
>
> - If the term already exists, link to a good existing explanation. (Don't reinvent the wheel.)
> - If your document is introducing the term, define the term. If your document is introducing many terms, collect the
    definitions into a glossary.

– [Technical Writing One / Words](https://developers.google.com/tech-writing/one/words#define_new_or_unfamiliar_terms)

Acronyms can abbreviate and simplify documentation, but they can also create barriers to entry for an unfamiliar
audience.

<!--alex ignore just-->
> [!TIP]
> Sure, you can introduce and use acronyms properly, but should you use acronyms? Well, acronyms do reduce sentence
> size. For example, TTN is two words shorter than Telekinetic Tactile Network. However, acronyms are really just a
> layer of abstraction; readers must mentally expand recently learned [unfamiliar] acronyms to the full term. For
> example, readers
> convert TTN to Telekinetic Tactile Network in their heads, so the "shorter" acronym actually takes a little longer to
> process than the full term.

– [Technical Writing One / Words](https://developers.google.com/tech-writing/one/words#use_acronyms_properly)

### Structure your writing
#### Illustrations, lists and tables

<!--alex ignore clearly-->
Complex information can often be better understood when presented in a structured format rather than in large blocks of
text. Illustrations, diagrams and tables break up the text and allow readers to identify the most relevant information.
When writing documentation, consider how a diagram can clearly explain intricate UI, concepts, or relationships.

Markdown provides a variety of features to format your documentation with GitHub offering
their [own set of additional features](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).
These features can be used to structure, emphasize, and
even [collapse](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-collapsed-sections)
information. [Mermaid](https://github.blog/developer-skills/github/include-diagrams-markdown-files-mermaid/)
allows diagrams to be represented in Markdown and provides support for a variety of common diagram formats such as flow
charts and UML.

#### Headings

Use headings to structure your writing. They make your documentation easier to navigate, especially when someone is looking for information on a specific topic. This includes using h2 and h3 levels to add hierarchy to documentation when appropriate. The easier it is to find the information you need, the more useful your documentation.

#### Breaking up blocks of text

You can use visual hints like Warnings and Tips to break up blocks of text. This makes your documentation less visually overwhelming, and emphasises key points to anyone skim-reading.

> [!WARNING]
> Don’t use too many warnings or tips, otherwise they add to visual overwhelm and noise on the page, rather than reduce it.

Bullet points and numbered lists also work well for this. Use them! Most people find it easier to read a bullet point list instead of the same information presented in a paragraph.

<!--alex ignore clearly-->
### Write clearly
#### Use fewer words

Keep sentences short. Consider splitting sentences in two if they contain multiple commas or a semicolon. Lots of punctuation is a sign your sentence is too long.

#### Use less complex language

Use ~~terminology with reduced complexity~~ simpler words when you can. Prioritise making your documentation clear and readable over impressing people with your wide ranging vocabulary. Your subject matter should be the most difficult thing about your writing - not the language.

##### A note on adverbs

Paying attention to your use of adverbs turns your writing from this:
<br>
As a general rule, adverbs should _probably_ be avoided in technical writing. They _often_ add complexity and _significantly_ increase word count, without _massively_ changing the meaning of your sentence. This is not a blanket rule - sometimes they _really_ are essential for accuracy.

To this:
<br>
As a general rule, adverbs should be avoided in technical writing. They add complexity and increase word count, without changing the meaning of your sentence. This is not a blanket rule - sometimes they are essential for accuracy.

#### Active vs passive voice

This is a ‘nice to have’ instead of an essential part of technical writing, but it has a real impact on readability. The below examples illustrate this.

– [Technical Writing One / Active voice](https://developers.google.com/tech-writing/one/active-voice)

##### Passive voice

Documentation should be written in the active voice when possible. The number and length of the words used will be reduced, and readability will be improved.

##### Active voice

Write documentation in the active voice when possible. It reduces the number and length of the words you use, improving readability.

### Documentation for LLMs

Documentation is no longer consumed exclusively by human engineers, but also by LLM agents performing tasks as directed by those engineers.
As a general rule, documentation that is useful for humans is also useful for LLMs.

<!--alex ignore easy-->
A key principle for effective LLM use is to **avoid polluting the context window**. You want to make it as easy as possible for an LLM agent to find exactly the information it needs to complete a task, but not accidentally read in unnecessary information.

This has several implications for documentation, most of which also benefit human contributors:
- Provide a table of contents to help identify the high-level structure of the repo and all relevant docs
- Prefer smaller, well-scoped documentation files
- Always use markdown. Markdown is the bread-and-butter of LLMs because it is token-efficient, while allowing hierarchical structure.
- Where possible, co-locate docs with relevant code, e.g. README.md files in the root of folders.
- Put docs as markdown files in the repo itself, as opposed to a separate wiki
- Use docs to provide complementary information that cannot be inferred from code, rather than redundant information. An example of this is the "why" behind project decisions, "why was the project made?", "why was a feature implemented in a certain way?", or information about how to run & test the project.

There are also two types of LLM-specific documentation which you should include in your repo:
- *[copilot-instructions.md](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions#creating-repository-wide-custom-instructions-1)* for repo-specific LLM instructions that apply to *all* agent sessions. (This may soon be superseded by cross-platform [AGENTS.md](https://agents.md/) but for now prefer copilot-instructions as Copilot is the only approved AI coding tool for our organisation.)
- *[agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)* for tasks that will help an agent work effectively on your repo, but do not necessarily apply to every agent session. Skills load [on-demand](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview#:~:text=Skills%20load%20on%2Ddemand%20and%20eliminate%20the%20need%20to%20repeatedly%20provide%20the%20same%20guidance%20across%20multiple%20conversations.) when the agent decides they are relevant for the particular task at hand, thus avoiding context pollution


## README Template

The following template provides a starting point for adding documentation to a new or existing repo. By filling out each
section an author should be confident that they have documented some of the most important aspects of a project. This
template is not intended to replace all other documentation but rather provide a starting point for the opening README.

### Recommended LLM steps

LLMs can provide a useful initial pass over the documentation template.

Steps:
1. Rename the existing `README.md` file (if available) to `old-README.md`
2. Create a new `README.md` with the provided template below
3. Prompt GitHub Copilot (or another organisation-approved LLM tool) to fill out the template
4. Review the initial pass ensuring all documentation is accurate and succinct

Example prompt:

```text
Fill out the project README documentation template with all the necessary detail. Use the `old-README.md` file and anything else you can find in the project to add the relevant detail. 
```

### Template

```markdown
# [Project Title]

[Top-level description]

<!--- 
The top-level description should provide a short summary of the project, ensuring the reader is in the right place. 
Keep this brief and provide suitable onward links, as further detail will be provided in the subsequent sections. 
This description should consider a wider audience as it is likely to be the first piece of documentation a person may 
see. As such, this description should be carefully considered.
-->

## Contents

- [Introduction](#1-introduction)
- [Getting Started](#2-getting-started)
- [How It Works](#3-how-it-works)
- [Useful Links](#4-useful-links)
- [Terminology](#5-terminology)

## 1. Introduction

<!--- 
The section should provide a clear explanation for why the project exists and what it does. Different types of readers
should be considered, including users, engineers, and managers. More specific and technical detail should be provided 
under "How it works".

Areas to include:
 - Who are the users of this project?
 - Why was the project made?
 - What core features does the project provide?
 - Which other services does it integrate with (provide links)?
 - [When applicable] What does the project look like (include images)?

-->

## 2. Getting Started

<!---
This section should provide clear steps for an engineer to begin utilising or contributing to the project.

This should include setup and running instructions, as well as advice for contributing to or releasing updates to the project. 
-->

## 3. How It Works

<!---
This section provides an opportunity to clarify the design of the project. It should go beyond the introduction to 
explain the key technical aspects of the project.

Areas to include:
 - Which core technologies does the project use?
 - What is the architecture of the project (include a diagram)?
 - What subprojects does the project have? What do they each do?
 - What are the key design concepts behind the project?
 - What might surprise an engineer new to the project? 
-->

## 4. Useful Links

<!---
This section should provide helpful links to other useful resources. 

These could be:
 - Further detailed project documentation
        - ADRs       
        - Runbooks
        - Feature documentation
        - User training
 - Related projects (including a brief description of the relationship)
 - Documentation of third-party libraries
-->

## 5. Terminology

<!---
This section should be linked to from previous sections and provide unambiguous definitions for the key terms 
in the project. These are likely to be domain specific phrases which are novel to the project. They could also be phrases
which have a specific meaning in the context of the project. If there is any doubt around a term, include it here! 
-->

```
