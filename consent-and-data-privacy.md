# Data Privacy and You

A quick reminder about our obligations relating to consent and data privacy, and a pointer to where you can find out more. If you have any questions, the [Transparency & Consent](mailto:Transparency.and.consent@guardian.co.uk) (staffed by talented P\&E colleagues) and [Data Privacy Team](mailto:data.protection@guardian.co.uk) (staffed by actual lawyers) are available to assist.

### The Laws

In the UK two laws regulate our use of data. The links will take you to the ICO's very readable guides on each.

* [UK General Data Protection Regulation (UK GDPR)](https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/)

  GDPR defines how organisations may process the personal data of users. Personal Data includes names, emails, telephone numbers, as well as anything else that can be used to identify individuals, like IP addresses and unique identifiers in cookies (Find more in [this document](https://docs.google.com/document/d/1wXsshs7GKzVdQhO57-QR6RZDFV2ZySPeHjqTvxfceZk/edit)). GDPR defines principles such as [data minimisation](https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/principles/data-minimisation/) and [data protection by design and default](https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/accountability-and-governance/data-protection-by-design-and-default). They oblige us to put data protection into our processing activities and business practices, from the design stage right through the lifecycle and ensure personal data processing is adequate, relevant and limited. GDPR governs what we are allowed to collect, the conditions under which we can process and share it with third parties, and what choices the user has in relation to this.

  As a UK registered organisation, we are subject to UK GDPR globally.

* [The Privacy and Electronic Communications Regulations (PECR)](https://ico.org.uk/for-organisations/guide-to-pecr/)

  PECR has specific rules on cookies (and similar technologies\*): It says we must notify and get consent before we set any cookies, unless they're strictly [necessary\*](https://ico.org.uk/for-organisations/guide-to-pecr/guidance-on-the-use-of-cookies-and-similar-technologies/what-are-the-rules-on-cookies-and-similar-technologies/\#rules9)\* for the service the user has requested.

  \*similar technologies – this covers any clever technical workarounds, including passing around session tokens in the url or saving something to local storage.

  \*\*strictly necessary – means that usage should be essential, rather than reasonably necessary, to provide the service requested by the user. It does not cover what might be essential for any other uses. So we're not allowed to argue, for example, that we need advertising cookies because advertising revenue is essential for our salaries.

### The Consent Management Platform (CMP)

To comply with PECR before processing their data, or setting any cookies, (other than strictly necessary) we inform our users and ask for their consent. This is the blue 'cookie banner' you will have seen on the site. At the moment, we do this through a Consent Management Platform (CMP) and we use a [third party system for this](https://sourcepoint.com/). Outside of the US and Australia our CMP implements a standard called [TCFv2](https://iabeurope.eu/tcf-2-0/), which is a standard way for third parties to understand a user’s consent choices.

> [!WARNING]  
> The CMP lists every essential cookie we use on the website, and explains to users what we use it for. If you’re adding a cookie or using an existing cookie in a new way, you must speak to the T\&C  team – it’s important that change is reflected in the CMP.


The CMP should list every third party (also called vendors) who may process the data of our users, and explain the purpose of that processing. The CMP dialog gives our users information and control over each of the non-essential vendors individually, and also the ability to reject or accept them all at once.

Internally we have access to a library [consent-management-platform](https://github.com/guardian/consent-management-platform) which makes it easier to deal with different consent states. To offer our users the most protection we often [check for consent](https://github.com/guardian/identity-frontend/blob/480ccff9d6332e64f41da43db65a8f19e6d48111/public/components/analytics/ga.js\#L17) before launching third-party scripts. Client-side scripts and integrations can themselves check if they have consent from our users by using the [TCFv2 API](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md\#gettcdata) that our page exposes on the window object, and makes available to all iframes on the page. 

> [!WARNING]  
> If you’re integrating with a third party that will process personal data (this includes any third-party client-side integration since they’ll have access to IP addresses and may have the ability to set cookies themselves), you should speak to the T\&C team first.

We periodically update the list of vendors listed in the CMP and ask our users for their consent again, this is a process called ‘re-permissioning’. Only once a new vendor has been added, and our users have been given the choice to accept can we use it on the site. It’s important we don’t do this too often, so we bundle our changes up and re-permission a few times a year.

In Australia and the US different regulations apply, in the US for example we apply the [California Consumer Privacy Act](https://oag.ca.gov/privacy/ccpa), and in both countries instead of requiring consent before we do certain things (also called ‘opt-in consent’), we give those users the right to decline processing (‘opt-out’). As a result, the banner displayed is slightly different. But since our systems are global, everything that needs consent should be designed and built to respond appropriately when we don’t have it.

### Ophan & Data Tables

Our in-house analytics tool Ophan uses a cookie (browserID) to connect together pageviews from a single browser. Understanding how users in aggregate consume and discover our content is deemed essential for producing our content, and we launch Ophan before asking for consent. 

> [!WARNING]  
> Ophan data is stored in our data-lake, but must not be used for anything other than essential editorial purposes. For any other purpose (e.g. commercial, or supporter-revenue), tables filtered by user-consent will be available and should be used instead.

If your team has its own data-pipeline (for example the core-web-vitals data from dotcom, or commercial metrics by comm-dev) you should make sure the T\&C team is aware of it, and be very careful to only use it for the specific purpose it was originally designed for. 

### Privacy Risk & Mitigations

The [GMG Board](https://www.theguardian.com/gmg/2015/jul/23/gnm-board) is responsible for defining the risk tolerance for the various risks the company is subject to, and steers the CEO and [GNM Executive Committee](https://www.theguardian.com/gnm-press-office/gnm-executive-committee) to ensure mitigations are put in place for the organisation to operate at that level. For data privacy incidents, there is a zero risk tolerance. The following changes have been notably put in place for a few years now in relation to that level of risk tolerance:

* A reinforced [due diligence process](https://docs.google.com/forms/d/e/1FAIpQLSebVYgf8UHcAa7jxAjVCUaQKkZRCjEmnNPxM5hY6VnYnQ2CMw/viewform?pli=1) (as part of [procurement process](https://spike.gnmremote.com/content/6501/procurement)), that includes infosec and data privacy team reviews   

* The setup of a Data Council ([Terms of Reference](https://docs.google.com/document/d/1DygW30kALIfEqLJpFXzeC4RFTAm\_Zx3U/edit)) 

* The setup of a Tech Council which notably created a [new process for introducing a new technology](https://docs.google.com/forms/d/e/1FAIpQLSenTe2pmGLvyh0OCtCQDx3-5qewEaMpholCaS4kwtoZ0F7VPA/viewform) (a new cloud solution, a new third party, a new business, etc..).  

As a developer you may be asked to contribute or prepare an engineering review for a technology linked to your P\&E team domain following a request from that process, outlining the considerations, risks and mitigations. For instance, for a technology adding a third-party to our main website, we will carry a [technical analysis](https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/docs/architecture/3rd%20party%20technical%20review/000-technical-review-records.md) that includes security, data-privacy and performance concerns.  

> [!IMPORTANT] 
As an empowered product & engineering  function we have a responsibility to protect our users, and the Guardian. For every integration you work with or consider adding, think very carefully about the potential for privacy risk, and what we can do to minimise it.

