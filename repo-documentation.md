# Repo Documentation

Repositories are often the first place an engineer will look for documentation on a project. Effective technical
documentation is a gift to your future self, and will save you and others time.

The following content provides practical advice on writing high quality technical documentation with a recommended
structure for the base README file of a repo.

## Contents

- [Overall guidance](#overall-guidance)
- [README Template](#readme-template)

## Overall Guidance

### Writing good documentation is challenging

Writing effective documentation is challenging and requires time and investment. It is a skill which requires practice
and effort to improve on. Google offers helpful resources that provide advice for writing quality documentation. See
the [Technical Writing One](https://developers.google.com/tech-writing/one?_gl=1*k0cdlv*_up*MQ..*_ga*NDcwODc0MjQ4LjE3Njg4NDAxNjc.*_ga_SM8HXJ53K2*czE3Njg4NDAxNjckbzEkZzAkdDE3Njg4NDAxNjckajYwJGwwJGgw)
materials for improving your technical writing skills.

### Write for an audience

<!--alex ignore clearly-->
Repo documentation is primarily useful for engineers. However, authors should also consider the value it provides to
product and engineering managers. When documentation is written clearly, it provides a useful resource for a multitude
of readers with varying levels of technical skill and domain knowledge. It can save time by answering the most
important questions in a concise way.

<!--alex ignore easy-->
> [!WARNING]
> As experts, it is easy to forget that novices don’t know what you already know. Novices might not understand
> explanations that make passing reference to subtle interactions and deep systems that the expert doesn’t stop to
> explain.

– [Technical Writing One / Audience](https://developers.google.com/tech-writing/one/audience?_gl=1*1nxkafc*_up*MQ..*_ga*NTc1NTM3MzgwLjE3Njg4MjM5MjA.*_ga_SM8HXJ53K2*czE3Njg4MzE3MTQkbzIkZzAkdDE3Njg4MzM0ODMkajYwJGwwJGgw#curse_of_knowledge)

Consider how and why someone is reading the documentation. What questions and objectives may they have? What might
readers be expected to already know and what does the documentation aim to teach them?

> [!TIP]
> Answering the following questions helps you determine what your document should contain:
>
> - Who is your target audience?
> - What is your target audience's goal? Why are they reading this document?
> - What do your readers already know before they read your document?
> - What should your readers know or be able to do after they read your document

– [Technical Writing One / Documents](https://developers.google.com/tech-writing/one/documents?_gl=1*1euylx7*_up*MQ..*_ga*NTc1NTM3MzgwLjE3Njg4MjM5MjA.*_ga_SM8HXJ53K2*czE3Njg4MzE3MTQkbzIkZzAkdDE3Njg4MzM0ODMkajYwJGwwJGgw#write_for_your_audience)

### Including hyperlinks

Hyperlinks to other projects, documentation, or samples of key code snippets, reduce repetition and provide users with
access to relevant resource. Linking allows the author to make assumptions about the readers knowledge by specifying
prerequisites for the content. For example:

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
    > definitions into a glossary.

– [Technical Writing One / Words](https://developers.google.com/tech-writing/one/words?_gl=1*4d3vld*_up*MQ..*_ga*NTc1NTM3MzgwLjE3Njg4MjM5MjA.*_ga_SM8HXJ53K2*czE3Njg4MjM5MjAkbzEkZzAkdDE3Njg4MjQxMzkkajYwJGwwJGgw#define_new_or_unfamiliar_terms)

Acronyms can abbreviate and simplify documentation, but it can also create barriers to entry for an unfamiliar
audience.

<!--alex ignore just-->
> [!TIP]
> Sure, you can introduce and use acronyms properly, but should you use acronyms? Well, acronyms do reduce sentence
> size. For example, TTN is two words shorter than Telekinetic Tactile Network. However, acronyms are really just a
> layer of abstraction; readers must mentally expand recently learned acronyms to the full term. For example, readers
> convert TTN to Telekinetic Tactile Network in their heads, so the "shorter" acronym actually takes a little longer to
> process than the full term.

– [Technical Writing One / Words](https://developers.google.com/tech-writing/one/words?_gl=1*154isid*_up*MQ..*_ga*Mzg0NzExNTA2LjE3Njg4NDIzMTA.*_ga_SM8HXJ53K2*czE3Njg4NDIzMTAkbzEkZzAkdDE3Njg4NDIzMTAkajYwJGwwJGgw#use_acronyms_properly)

### Illustrations, lists and tables

<!--alex ignore clearly-->
Complex information can often be better understood when presented in a structured format rather than in large blocks of
text Illustrations, diagrams and tables break up the text and allows readers to identify the most relevant information.
When writing documentation, consider how a diagram can clearly explain intricate UI, concepts, or relationships.

> [!TIP]
> Analytic minds tend to love tables. Given a page containing multiple paragraphs and a single table, engineers' eyes
> zoom towards the table.

– [Technical Writing One / Tables](https://developers.google.com/tech-writing/one/lists-and-tables?_gl=1*11yvapt*_up*MQ..*_ga*NTc1NTM3MzgwLjE3Njg4MjM5MjA.*_ga_SM8HXJ53K2*czE3Njg4MzE3MTQkbzIkZzAkdDE3Njg4MzM0ODMkajYwJGwwJGgw#create_useful_tables)

## README Template

The following template provides a starting point for adding documentation to a new or existing repo. By filling out each
section an author should be confident that they have documented some of the most important aspects of a project. This
template is not intended to replace all other documentation but rather provide a starting point for the opening README.

```markdown
# [Project Title]

[Top-level description]

<!--- 
The top-level description should provide a short summary of the project, ensuring the reader is in the right place. 
Keep this brief, as further detail will be provided in the subsequent sections.  
-->

## Contents

- [Introduction](#1-introduction)
- [Getting Started](#2-getting-started)
- [How It Works](#3-how-it-works)
- [Useful Links](#4-useful-links)
- [Terminology](#5-terminology)

## 1. Introduction

<!--- 
The section should provide a clear explanation for why the project exists and what it does.

Areas to include:
 - Who is the intended audience for the project?
 - What core features does the project provide?
 - Why was the project made?
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
 - Documentation of third-party libraries
 - Other related services
-->

## 5. Terminology

<!---
This section should be linked to from previous sections and provide unambiguous definitions for the key terms 
in the project. These are likely to be domain specific phrases which are novel to the project. They could also be phrases
which have a specific meaning in the context of the project. If there is any doubt around a term, include it here! 
-->

```