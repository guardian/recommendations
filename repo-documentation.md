# Repo Documentation

Repos are often the first place an engineer will look for documentation on a project. Effective technical documentation
is a gift to your future self, and will save you and others time.

## Overall guidance

### Writing good documentation is challenging

Writing effective documentation is challenging and requires time and investment. Google offer helpful resources that
provide practical advice for writing quality documentation. See
the [Technical Writing One](https://developers.google.com/tech-writing/one?_gl=1*k0cdlv*_up*MQ..*_ga*NDcwODc0MjQ4LjE3Njg4NDAxNjc.*_ga_SM8HXJ53K2*czE3Njg4NDAxNjckbzEkZzAkdDE3Njg4NDAxNjckajYwJGwwJGgw)
materials for improving your technical writing skills.

### Write for an audience

<!--alex ignore clearly-->
Repo documentation is primarily useful for engineers. But, authors should also consider the value it provides product
and engineering managers. When documentation is written clearly, it provides a useful resource for a multitude of
readers with a variety of technical skill and levels of domain knowledge. It can save time by answering the most
important questions in a concise way.

<!--alex ignore easy-->
> As experts, it is easy to forget that
> novices don’t know what you already know. Novices might not understand explanations that make passing reference to
> subtle interactions and deep systems that the expert doesn’t stop to explain.

– [Technical Writing One / Audience](https://developers.google.com/tech-writing/one/audience?_gl=1*1nxkafc*_up*MQ..*_ga*NTc1NTM3MzgwLjE3Njg4MjM5MjA.*_ga_SM8HXJ53K2*czE3Njg4MzE3MTQkbzIkZzAkdDE3Njg4MzM0ODMkajYwJGwwJGgw#curse_of_knowledge)

Consider how and why a person is reading documentation, what questions and objectives may they have? What might readers
be expected to already know and what does the documentation aim to teach them?

> Answering the following questions helps you determine what your document should contain:
>
> - Who is your target audience?
> - What is your target audience's goal? Why are they reading this document?
> - What do your readers already know before they read your document?
> - What should your readers know or be able to do after they read your document

– [Technical Writing One / Documents](https://developers.google.com/tech-writing/one/documents?_gl=1*1euylx7*_up*MQ..*_ga*NTc1NTM3MzgwLjE3Njg4MjM5MjA.*_ga_SM8HXJ53K2*czE3Njg4MzE3MTQkbzIkZzAkdDE3Njg4MzM0ODMkajYwJGwwJGgw#write_for_your_audience)

### Including hyperlinks

Hyperlinks to other projects, documentation, or samples of key code snippets, reduce repetition. They provide
users the means to access relevant resources. Therefore, linking allows the author to make assumptions about the readers
knowledge by specifying prerequisites for the content. For example:

> The [AWS Cloud Development Kit](https://github.com/aws/aws-cdk) (AWS CDK) is an open-source software
> development framework to define cloud infrastructure in code and provision it
> through AWS CloudFormation.
>
>`@guardian/cdk` builds on CDK to provide Guardian-specific [patterns](./src/patterns) and
[constructs](./src/constructs). It is an opinionated and secure-by-default way to describe and
> provision your AWS resources.

### Define new or unfamiliar terms

Authors often forget the terms and phrases they may use every day that might be unfamiliar to outsiders or newcomers.
Defining these terms can provide significant clarity for experts and novices alike.

> When writing or editing, learn to recognize terms that might be unfamiliar to some or all of your target audience.
> When you spot such a term, take one of the following two tactics:
>
> - If the term already exists, link to a good existing explanation. (Don't reinvent the wheel.)
> - If your document is introducing the term, define the term. If your document is introducing many terms, collect the
> definitions into a glossary.

– [Technical Writing One / Words](https://developers.google.com/tech-writing/one/words?_gl=1*4d3vld*_up*MQ..*_ga*NTc1NTM3MzgwLjE3Njg4MjM5MjA.*_ga_SM8HXJ53K2*czE3Njg4MjM5MjAkbzEkZzAkdDE3Njg4MjQxMzkkajYwJGwwJGgw#define_new_or_unfamiliar_terms)

Acronyms can abbreviate and simplify documentation. However, it can also create barriers to entry for an unfamiliar
audience.

<!--alex ignore just-->
> Sure, you can introduce and use acronyms properly, but should you use acronyms? Well, acronyms do reduce sentence
> size. For example, TTN is two words shorter than Telekinetic Tactile Network. However, acronyms are really just a
> layer
> of abstraction; readers must mentally expand recently learned acronyms to the full term. For example, readers convert
> TTN to Telekinetic Tactile Network in their heads, so the "shorter" acronym actually takes a little longer to process
> than the full term.

– [Technical Writing One / Words](https://developers.google.com/tech-writing/one/words?_gl=1*154isid*_up*MQ..*_ga*Mzg0NzExNTA2LjE3Njg4NDIzMTA.*_ga_SM8HXJ53K2*czE3Njg4NDIzMTAkbzEkZzAkdDE3Njg4NDIzMTAkajYwJGwwJGgw#use_acronyms_properly)

### Illustrations, list and tables

<!--alex ignore clearly-->
Complex information can be more effectively structured than through blocks of text. Illustrations, diagrams and tables
break up the text and allows readers to identify the most relevant information. When writing documentation, consider how
a diagram can clearly explain intricate UI, concepts, or relationships.

> Analytic minds tend to love tables. Given a page containing multiple paragraphs and a single table, engineers' eyes
> zoom towards the table.

– [Technical Writing One / Tables](https://developers.google.com/tech-writing/one/lists-and-tables?_gl=1*11yvapt*_up*MQ..*_ga*NTc1NTM3MzgwLjE3Njg4MjM5MjA.*_ga_SM8HXJ53K2*czE3Njg4MzE3MTQkbzIkZzAkdDE3Njg4MzM0ODMkajYwJGwwJGgw#create_useful_tables)



