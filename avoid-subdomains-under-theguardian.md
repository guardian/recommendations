# Avoid subdomains under `*.theguardian.com`

When we create new or experimental products, or add third-party services that need their own web domain, it's tempting 
to place them under `*.theguardian.com` (e.g., `foo.theguardian.com`), however this carries significant risks for
**security, reputation, tracking capabilities, and SEO**.

In general, **avoid creating new sites under theguardian.com!**

Any site using a `theguardian.com` subdomain needs **a strong team-backed commitment to maintaining/securing the site
for the duration of its existence**. Possible purposes:

* User-facing websites like https://support.theguardian.com/
* Services which need to drop `*.theguardian.com` cookies

Third-party services in particular should not be allowed a subdomain under theguardian.com without an essential
technical need.

See also:

* [Which domain name should I use?](domain-names.md#which-domain-name-should-i-use)
  in the Guardian `guardian/recommendations` repo.

## Browser security

Browsers will typically consider the domains `foo.theguardian.com` and [www.theguardian.com](https://www.theguardian.com)
as belonging to the same 'site'. This deactivates many fundamental security features:

* [SameSite cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite) -
  `foo.theguardian.com` and [www.theguardian.com](https://www.theguardian.com) are
  [considered 'same-site'](https://web.dev/same-site-same-origin/#same-site-cross-site)
* Chrome's [Site Isolation](https://www.chromium.org/developers/design-documents/site-isolation/) security feature,
  which aims to protect against:
    * **Stealing cross-site cookies and HTML5 stored data** - preventing a renderer process from receiving cookies or
      stored data from sites other than its own.
    * **Stealing cross-site HTML, XML, and JSON data**. Using MIME type and content sniffing, preventing a renderer
      process from loading most sensitive cross-site data.
    * **Stealing saved passwords** - preventing a renderer process from receiving saved passwords from sites other than
      its own.
    * **Abusing permissions granted to another site** - preventing a renderer process from using permissions such as
      geolocation that the user has granted to other sites.
    * **Compromising X-Frame-Options** - preventing a renderer process from loading cross-site pages in iframes. This
      allows the browser process to decide if a given site can be loaded in an iframe or not based on X-Frame-Options or
      CSP frame-ancestors headers.
    * **Accessing cross-site DOM elements via UXSS bugs**. An attacker exploiting a universal cross-site scripting bug
      in the renderer process will not be able to access DOM elements of cross-site pages, which will not live in the
      same renderer process.

Effectively, the security of [www.theguardian.com](https://www.theguardian.com) is lowered to the level of the
least-secure subsite living on the `theguardian.com` domain. A vulnerability in `foo.theguardian.com` becomes a
vulnerability on [www.theguardian.com](https://www.theguardian.com) itself.

Modern sites (which typically use a large number of Javascript dependencies) need constant security monitoring and
maintenance to remain secure. The large number of dependencies makes it likely that a site considered 'secure' will,
without security updates, probably have at least one dependency with a known security vulnerability within a few months.

[Cross-site scripting (or XSS)](https://learn.snyk.io/lessons/xss/javascript/) attacks are extremely common, and allow
hackers to inject malicious JavaScript into a web application. Such injections are extremely dangerous from the security
perspective, and can lead to:

* Stealing sensitive information, including session tokens, cookies or user credentials
* Injecting multiple types of malware into the website
* Changing the website appearance to trick users into performing undesirable actions

## Capability penalties

Apple's [Tracking Prevention Policy](https://webkit.org/tracking-prevention-policy/) means browsers will apply
restrictions if a domain is identified as breaking rules (i.e., we could lose the capability to track pageview
analytics). In practice, [restrictions would seem to apply to the whole theguardian.com domain](https://webkit.org/blog/8311/intelligent-tracking-prevention-2-0/#:~:text=Does%20ITP%20differentiate%20between%20my%20subdomains%3F):

> **Does ITP differentiate between my subdomains?**
>
> No. ITP captures statistics and applies its rules for the effective top-level domain plus one, or eTLD+1. An eTLD is
> `.com` or `.co.uk` so an example of an eTLD+1 would be `social.co.uk` but not `sub.social.co.uk` (eTLD+2) or just
> `co.uk` (eTLD).

…which means we increase the risk of capabilities being degraded by having a large number of subdomains on
[theguardian.com](https://www.theguardian.com).

## SEO

Google will not extend the high search rank of [www.theguardian.com](https://www.theguardian.com) to other subdomains
(I believe this has been demonstrated with a Guardian 'vouchers' subsite in the past). There's also concern - given that
Google is intentionally extremely opaque about its ranking process - that in the future subsites could affect the
ranking of [www.theguardian.com](https://www.theguardian.com) itself.
