# ADRs

Software engineering and system design are often a collaboration effort and, in particular, the decisions that shape a project often arise as [RFCs](RFCs.md), but once the RFC has been... well, commented on, how do we articulate and present the decisions that come of out them? 

Enter the architecture decision records, ADRs for short.

Joel Parker Henderson has a [detailed presentation of ADRs](https://github.com/joelparkerhenderson/architecture-decision-record), but for the purpose of this text, an architecture decision record (ADR) is a document that captures an important architectural decision made along with its context and consequences.

Often, ADRs help people who come to projects after the original designers understand 

1. THE conditions that they observe are not accidental but, instead, were the result to purposeful decisions (for instance the choice of programming languages, the use of specific libraries or the adoption of specific software patterns).

1. The explanation of why those decisions where made, including but not limited to which constraints lead to them and, if relevant, in which conditions they could be reconsidered.

One example at the guardian of a system that has incorporated ADRs from the beginning if its life is dotcom-rendering. You can access and read them [here](https://github.com/guardian/dotcom-rendering/tree/main/dotcom-rendering/docs/architecture).