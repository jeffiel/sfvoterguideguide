# SF Ballot Compare: November 3, 2026

An interactive, static website that shows what San Francisco's major voter guides recommend and lets voters read the guides' reasoning side by side, with links to each original source.

**Live site: https://sfvoterguideguide.com**

Open `index.html` in a browser to run it locally. There is no build step and no server.

## Deployment

The site is hosted on Cloudflare. Every push to `main` triggers a Cloudflare build, which deploys to https://sfvoterguideguide.com. GitHub Pages is not used.

## Features

- **Ballot**: every local measure (A–J), the Regional Transit Measure, local races, and the state propositions, each with a strip showing where every guide landed.
- **Item pages**: a plain-language description of what the measure does, links to the official legal text, and the arguments for YES and NO in columns. A "Compare guides side by side" mode lets you pick any set of guides to read next to each other.
- **Grid**: a matrix of every guide against every item. Click a cell to read that guide's reasoning.
- **Perspective filter**: multi-select presets that combine (union) their guides (Progressive, Moderate / pro-housing, Conservative / business, Nonpartisan / policy, Political parties, One from each side), plus per-guide checkboxes and an "only" shortcut. The filter applies site-wide and is saved. Presets are defined in `PRESETS` in `data.js`.
- **Guides**: who each guide is, how much it covers, and how much reasoning it publishes. You can hide guides site-wide.
- **My ballot**: record your picks (saved in localStorage only), see which guides you agree with most, print the page, or share it as a link.

## Data

All content lives in `data.js`. The data was collected on Oct 25, 2026 from the guides' public pages. Summaries paraphrase each guide's own reasoning. Quotes are verbatim. Every entry links back to its source.

Guides included: SPUR, GrowSF, League of Women Voters (SF for local measures, California for state props), SF Chronicle Editorial Board, SF Bay Guardian, SF Chamber of Commerce, Senior & Disability Action, SF Republican Party, SF Green Party, DSA SF (only items whose wording was verified), SF Democratic Party (positions only), and YIMBY Action (positions only).

Known gaps:
- The SF Chronicle's endorsements were added from a PDF of its endorsements page, since its site blocks automated fetching. Its Board of Education pick was still "coming soon" when that PDF was saved.
- The SF Chamber's candidate endorsements are only in a PDF.
- 48hills had not published a slate.

To add a guide, append it to `GUIDES` and add `positions[guideId]` entries to the relevant measures and races.
