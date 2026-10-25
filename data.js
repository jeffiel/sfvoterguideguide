// Voter-guide data for the San Francisco November 3, 2026 election.
// Collected October 25, 2026 from each guide's public web page.
// Summaries are paraphrases of each guide's own reasoning; quotes are verbatim.
// Position codes: "yes" | "no" | "neutral" (no position, no consensus, or neutral).
// A guide that is absent from an item did not cover it.

window.ELECTION = {
  name: "San Francisco General Election",
  date: "2026-11-03",
  collected: "2026-10-25",
};

window.GUIDES = [
  {
    id: "spur", name: "SPUR", short: "SPUR",
    kind: "Urban policy think tank",
    blurb: "Nonprofit planning and policy organization. Publishes detailed pros, cons, and a recommendation for each measure.",
    url: "https://www.spur.org/voter-guide/2026-11",
    depth: "Detailed reasoning",
  },
  {
    id: "growsf", name: "GrowSF", short: "GrowSF",
    kind: "Moderate political group",
    blurb: "Moderate, pro-housing political organization. Publishes long-form explanations for measures and candidates.",
    url: "https://growsf.org/voter-guide/san-francisco-voter-guide-november-2026-election/",
    depth: "Detailed reasoning",
  },
  {
    id: "lwv", name: "League of Women Voters", short: "LWV",
    kind: "Nonpartisan civic group",
    blurb: "LWV of San Francisco on local measures; LWV of California on state propositions. Takes positions on measures, never candidates.",
    url: "https://lwvsf.org/ballot-recommendations",
    depth: "Detailed reasoning",
  },
  {
    id: "sfbg", name: "SF Bay Guardian", short: "Guardian",
    kind: "Progressive publication",
    blurb: "Progressive news outlet's endorsement editorial and Clean Slate guide.",
    url: "https://www.sfbg.com/2026/10/06/endorsements-for-the-november-3-2026-election/",
    depth: "Editorial reasoning",
  },
  {
    id: "chamber", name: "SF Chamber of Commerce", short: "Chamber",
    kind: "Business association",
    blurb: "San Francisco's business association. One short paragraph of reasoning per measure.",
    url: "https://sfchamber.com/november-2026-voter-guide/",
    depth: "Brief reasoning",
  },
  {
    id: "sda", name: "Senior & Disability Action", short: "SDA",
    kind: "Senior & disability advocacy",
    blurb: "Advocacy organization for seniors and people with disabilities. Short reasoning per measure.",
    url: "https://www.sdaction.org/november-2026-ballot-measure-guide",
    depth: "Brief reasoning",
  },
  {
    id: "gop", name: "SF Republican Party", short: "SF GOP",
    kind: "Political party",
    blurb: "Official endorsements of the San Francisco Republican Party.",
    url: "https://sfgop.org/endorsements",
    depth: "Brief reasoning",
  },
  {
    id: "green", name: "SF Green Party", short: "Greens",
    kind: "Political party",
    blurb: "Official endorsements of the San Francisco Green Party. One-line rationale per item.",
    url: "https://www.sfgreenparty.org/endorsements/123-november-2026-endorsements",
    depth: "One-line reasoning",
  },
  {
    id: "dsa", name: "DSA San Francisco", short: "DSA",
    kind: "Socialist political group",
    blurb: "Democratic Socialists of America, SF chapter. Only the endorsements we could verify word for word are included here; see their guide for the rest.",
    url: "https://dsasf.org/vote",
    depth: "Partial (verified items only)",
  },
  {
    id: "sfdems", name: "SF Democratic Party", short: "SF Dems",
    kind: "Political party",
    blurb: "Official endorsements of the San Francisco Democratic County Central Committee. Positions only; no published reasoning.",
    url: "https://www.sfdems.org/endorsements/nov-3-2026-general-election",
    depth: "Positions only",
  },
  {
    id: "yimby", name: "YIMBY Action", short: "YIMBY",
    kind: "Pro-housing advocacy",
    blurb: "Pro-housing advocacy network; endorsements ratified by member vote. Positions only on the guide page.",
    url: "https://yimbyaction.org/endorsements/november-2026-california-general",
    depth: "Positions only",
  },
];

// ---------------------------------------------------------------------------
// Perspective presets: quick ways to filter to a group of guides.
// Groupings are approximate. They follow each group's self-description and
// its usual coalition in San Francisco politics, not any one issue position.
// ---------------------------------------------------------------------------

window.PRESETS = [
  {
    id: "all", label: "All guides",
    desc: "Every guide in the collection.",
    guides: null, // null = all
  },
  {
    id: "progressive", label: "Progressive",
    desc: "SF's progressive and left coalition: progressive press, democratic socialists, Greens, and senior and disability advocates.",
    guides: ["sfbg", "dsa", "green", "sda"],
  },
  {
    id: "moderate", label: "Moderate / pro-housing",
    desc: "SF's moderate, pro-housing, good-government coalition, plus the Chamber of Commerce.",
    guides: ["growsf", "yimby", "spur", "chamber"],
  },
  {
    id: "conservative", label: "Conservative / business",
    desc: "Fiscally conservative and business perspectives. San Francisco has few right-of-center guides, so this group is small.",
    guides: ["gop", "chamber"],
  },
  {
    id: "civic", label: "Nonpartisan / policy",
    desc: "Civic and policy organizations that don't endorse along party lines.",
    guides: ["lwv", "spur"],
  },
  {
    id: "parties", label: "Political parties",
    desc: "The official county party organizations.",
    guides: ["sfdems", "gop", "green"],
  },
  {
    id: "balanced", label: "One from each side",
    desc: "One detailed guide from each perspective: progressive (Bay Guardian), moderate (GrowSF), nonpartisan (League of Women Voters), and conservative (SF GOP).",
    guides: ["sfbg", "growsf", "lwv", "gop"],
  },
];

// ---------------------------------------------------------------------------
// Measures
// ---------------------------------------------------------------------------

const SFDEMS = "https://www.sfdems.org/endorsements/nov-3-2026-general-election";
const YIMBY = "https://yimbyaction.org/endorsements/november-2026-california-general";
const CHAMBER = "https://sfchamber.com/november-2026-voter-guide/";
const SDA = "https://www.sdaction.org/november-2026-ballot-measure-guide";
const GREEN = "https://www.sfgreenparty.org/endorsements/123-november-2026-endorsements";
const SFBG = "https://www.sfbg.com/2026/10/06/endorsements-for-the-november-3-2026-election/";
const GOP = "https://sfgop.org/endorsements";
const LWVSF = "https://lwvsf.org/ballot-recommendations";
const LWVC = "https://my.lwv.org/node/73812";
const DSA = "https://dsasf.org/vote";
const GROW = "https://growsf.org/voter-guide/san-francisco-voter-guide-november-2026-election/";
const SPUR = "https://www.spur.org/voter-guide/2026-11/";

window.MEASURES = [
  // ------------------------------------------------------------- Local: A
  {
    id: "A", section: "local", type: "Charter Amendment",
    title: "Charter Changes Affecting Various City Departments and Commissions",
    nickname: "Commission & charter cleanup",
    what: "Revises the Charter to alter or eliminate certain commissions and move many into the Municipal Code (where Supervisors can change them without a public vote), modifies department operations and reporting, and makes commissioner qualifications optional. Creates a task force to review commissions every 10 years.",
    whatSource: { label: "LWV SF pros & cons", url: "https://lwvsf.org/procon" },
    docs: [
      { label: "Legal text", url: "https://api.sf.gov/documents/60913/Nov2026_CA_DepartmentBoardCommissionandAdvisoryBodyUpdates_LegalText.pdf" },
      { label: "Legislative digest", url: "https://api.sf.gov/documents/60914/Nov2026_CA_DepartmentBoardCommissionandAdvisoryBodyUpdates_LegislativeDigest.pdf" },
    ],
    positions: {
      spur: { p: "yes", s: "SPUR calls Prop A a worthwhile housekeeping package. It removes unnecessary detail from the charter and modernizes outdated provisions, in line with SPUR's Charter for Change recommendations. SPUR's concerns: the package skips the more controversial reforms, adopts only some of the task force's recommendations, and lets the Board amend certain voter-adopted ordinances.", q: "it nonetheless reflects a worthwhile housekeeping package worthy of voters’ support.", u: SPUR + "sf-prop-a-departments-and-commission" },
      growsf: { p: "yes", s: "Cuts the number of Charter boards and commissions from 55 to 38, moves 9 into the Municipal Code, and schedules a review every ten years. GrowSF argues that commissions shielded from the Mayor blur responsibility, and that A gives department heads a clear line of accountability to elected officials.", q: "Prop A restores a functional chain of command so that individuals are clearly responsible for success or failure.", u: GROW + "measures/prop-a/" },
      lwv: { p: "no", s: "Opposes because A moves many commissions out of the Charter, weakens their authority, makes commissioner qualifications optional, and drops annual reports. The League says it goes far beyond charter cleanup and conflicts with its positions on strong oversight, public participation, and accountability.", q: "Proposition A isn’t really reform. It’s a large set of changes that weaken public control.", u: LWVSF },
      chamber: { p: "yes", s: "Supports letting supervisors update the duties of advisory bodies, commissions, and departments. Says A trims outdated bureaucratic language and modernizes operations, and cites a Controller estimate of $365,000–$450,000 a year in savings.", q: "it works to trim outdated bureaucratic language and modernizing operations to create a Charter that offers greater accountability", u: CHAMBER },
      sda: { p: "no", s: "Opposes A as one of several charter amendments that shift power to the Mayor. Says it removes bodies that matter for public participation and makes it easier to reduce City Hall transparency later.", q: "still removes some important bodies for public participation and makes it easier in the future to further reduce City Hall’s transparency.", u: SDA },
      green: { p: "no", s: "Opposes the commission reform as lowering public oversight.", q: "commission reform to lower public oversight", u: GREEN },
      sfbg: { p: "no", s: "Sees A as part of the Mayor's push, backed by tech money, to expand mayoral power. Says it would let supervisors overturn voter-approved laws and weaken the Sunshine Ordinance Task Force and the Our City Our Home oversight board.", q: "Prop. A is part of Lurie’s move, supported by $8 million in billionaire tech money, to increase the power of the Mayor’s Office", u: SFBG },
      gop: { p: "yes", s: "Says A streamlines a bloated City Charter and reins in overlapping oversight committees, for fewer layers and more accountability.", q: "Streamlines our bloated City Charter and reins in the tangle of oversight committees that diffuse responsibility.", u: GOP },
      sfdems: { p: "yes", u: SFDEMS },
      yimby: { p: "yes", u: YIMBY },
    },
  },
  // ------------------------------------------------------------- Local: B
  {
    id: "B", section: "local", type: "Charter Amendment",
    title: "Establishing a Municipal Finance Corporation and a Public Bank",
    nickname: "Public bank",
    what: "Lets the City set up a municipal finance corporation once it has enough money and resources. After 3–5 years of profitable operation and regulatory approval, it could become a public bank. An oversight commission would monitor it.",
    whatSource: { label: "LWV SF pros & cons", url: "https://lwvsf.org/procon" },
    docs: [
      { label: "Legal text", url: "https://api.sf.gov/documents/60915/Nov2026_CA_Municipal_Finance_Corporation_and_Public_Bank_LegalText.pdf" },
      { label: "Legislative digest", url: "https://api.sf.gov/documents/60916/Nov2026_CA_Municipal_Finance_Corporation_and_Public_Bank_LegislativeDigest.pdf" },
    ],
    positions: {
      spur: { p: "no", s: "SPUR says a well-designed public bank could help finance affordable housing, small businesses, and climate projects. It objects that B writes detailed governance structures into the charter when ordinance and administrative action would work. Its concerns: the measure doesn't say how the bank would be capitalized, and it may need General Fund or new revenue during a deficit.", q: "SPUR does not believe adding new charter-defined commissions and requirements is the right approach.", u: SPUR + "sf-prop-b-public-bank" },
      growsf: { p: "no", s: "Creates a city-owned Municipal Finance Corporation now and a Public Bank later, with no money appropriated. GrowSF argues the bank would need FDIC deposit insurance that government-owned banks don't get, and that its overseers are exempt from the Sunshine Ordinance. Says a more modest infrastructure-financing proposal would get more sympathy.", q: "You should vote against Prop B on the merits.", u: GROW + "measures/prop-b/" },
      lwv: { p: "yes", s: "Supports B because it lets the City launch a public bank only once the bank is financially sustainable and approved by regulators, so municipal dollars work for the public good. Cites strong governance, guardrails, and no spending requirement.", q: "lets our local government launch a public bank once it’s financially sustainable and approved by regulators", u: LWVSF },
      chamber: { p: "no", s: "Opposes the Municipal Finance Corporation and possible public bank as a rigid charter requirement and a fiscal risk to the City. Cites a Controller estimate that more than $300M would be needed over the first three years.", q: "it creates a rigid requirement within the charter and poses potential fiscal risk to the City", u: CHAMBER },
      sda: { p: "yes", s: "Sees B as a step toward a public bank. Says the Municipal Finance Corporation could unlock reasonably priced financing for affordable housing.", q: "One of the first roles of this Municipal Finance Corporation will be to unlock funding at reasonable rates to help build affordable housing", u: SDA },
      green: { p: "yes", s: "Supports continuing toward a public bank.", q: "keep moving towards a public bank", u: GREEN },
      sfbg: { p: "yes", s: "Says B creates no bank and no funding yet, only the outline of a city-owned financial institution that could hold city cash and finance affordable housing. Calls warnings about costs scare tactics.", q: "Prop. B doesn’t create the bank, and it doesn’t set aside any funding for it; that’s a process for later.", u: SFBG },
      gop: { p: "no", s: "Says city government lacks the competence, integrity, and incentives to run a bank, and would make lending decisions based on cronyism rather than risk.", q: "San Francisco's municipal government lacks the competence, integrity, and incentives to run a bank.", u: GOP },
      dsa: { p: "yes", u: DSA },
      sfdems: { p: "yes", u: SFDEMS },
    },
  },
  // ------------------------------------------------------------- Local: C
  {
    id: "C", section: "local", type: "Charter Amendment",
    title: "Contributions to the Housing Fund",
    nickname: "Housing Trust Fund increase",
    what: "Gradually raises the City's annual Housing Trust Fund contribution to $125 million, with pauses allowed during deficits. Raises the income limit for down-payment loans from 120% to 200% of area median income. Extends the fund's end date from 2043 to 2058.",
    whatSource: { label: "LWV SF pros & cons", url: "https://lwvsf.org/procon" },
    docs: [
      { label: "Legal text", url: "https://api.sf.gov/documents/60917/Nov2026_CA_HousingTrustFund_LegalText.pdf" },
      { label: "Legislative digest", url: "https://api.sf.gov/documents/60918/Nov2026_CA_HousingTrustFund_LegislativeDigest.pdf" },
    ],
    positions: {
      spur: { p: "yes", s: "SPUR says affordable housing money is urgently needed, state and federal funding is unreliable, and each local dollar has historically drawn about $2 in other funding. It is wary of charter-mandated set-asides but credits C's safeguards, which allow freezes or reductions during shortfalls. Its concerns: less General Fund flexibility, and structural deficits that could make the higher level hard to sustain.", q: "Although SPUR is cautious about charter-mandated General Fund set-asides because they reduce budget flexibility, Prop. C incorporates thoughtful fiscal controls", u: SPUR + "sf-prop-c-housing-trust-fund" },
      growsf: { p: "yes", s: "Raises the Housing Trust Fund from about $50.8M a year to $125M a year starting in FY 2028–29, with growth capped at 3% after that. GrowSF calls C the second half of a May 2026 deal in which nonprofits stopped fighting a cut to the inclusionary housing fee, which the Board has already passed.", q: "We think this is a good deal, and Prop C is how voters keep the City's end of it.", u: GROW + "measures/prop-c/" },
      lwv: { p: "yes", s: "Supports C as the kind of government funding for affordable housing the League backs: it grows the Housing Trust Fund toward $125M a year without raising taxes. Also cites expanded down-payment assistance and approves of the fund's end date.", q: "Proposition C is exactly the kind of government funding for affordable housing the League of Women Voters supports", u: LWVSF },
      chamber: { p: "yes", s: "Supports raising annual Housing Trust Fund contributions from $50M to $125M and extending the fund to 2058. Says this adds to affordable housing stock and helps workers stay in the city.", q: "it bolsters efforts to increase affordable housing stock and helps enable workers in San Francisco to stay in the city", u: CHAMBER },
      sda: { p: "yes", s: "Supports dedicated affordable housing funding, arguing that more than 17,000 approved affordable homes are waiting only on money.", q: "More than 17,000 affordable SF homes are approved and ready to build, and are waiting on just one thing: money.", u: SDA },
      green: { p: "neutral", s: "No consensus for or against.", q: "no consensus for or against C - housing trust fund", u: GREEN },
      sfbg: { p: "yes", s: "Calls C a good measure that uses tax-increment financing to put more city money toward affordable housing, though it says the Mayor put C on the ballot to undercut Prop I. Wants both C and I to pass.", q: "It would use tax-increment financing to increase the amount of city money that is earmarked for affordable housing", u: SFBG },
      gop: { p: "no", s: "Calls C another budget set-aside that locks up taxpayer money while the city faces a structural deficit.", q: "Another budget set-aside that locks up taxpayer dollars while the city faces a structural deficit.", u: GOP },
      sfdems: { p: "yes", u: SFDEMS },
      yimby: { p: "yes", u: YIMBY },
    },
  },
  // ------------------------------------------------------------- Local: D
  {
    id: "D", section: "local", type: "Charter Amendment",
    title: "Changes to Ballot Measure Process",
    nickname: "Ballot measure signature threshold",
    what: "Ends the ability of the Mayor, or any four Supervisors, to place ordinances and policy declarations directly on the ballot. Raises the signature requirement for initiatives at regular elections from 2% to 8% of registered voters. Lets proponents withdraw an initiative up to 102 days before an election.",
    whatSource: { label: "LWV SF pros & cons", url: "https://lwvsf.org/procon" },
    docs: [
      { label: "Legal text", url: "https://api.sf.gov/documents/53002/Legal_Text_Changes_to_Ballot_Measure_Process.pdf" },
      { label: "Title & summary", url: "https://api.sf.gov/documents/52978/Title_and_Summary_-_Changes_to_Ballot_Measure_Process.pdf" },
    ],
    positions: {
      spur: { p: "yes", s: "SPUR says San Francisco's ballot-placement rules are looser than anywhere else in California, letting a mayor or a minority of supervisors skip normal public processes. It acknowledges higher signature thresholds would make it harder for grassroots groups to qualify measures, but notes they'd still be lower than in most California cities. Its concerns: D could favor well-funded interests and make dedicated tax measures harder to pass.", q: "On balance, SPUR believes the measure’s benefits outweigh its downsides and will lead to more effective policies and greater voter engagement.", u: SPUR + "sf-prop-d-ballot-measure-process" },
      growsf: { p: "yes", s: "Raises the initiative signature threshold from 2% to 8% of registered voters, ends the Mayor's unilateral power to place measures, and requires six supervisors instead of four. GrowSF argues San Francisco has the lowest signature threshold in the state and votes on too many measures.", q: "Vote yes on Prop D to shorten your ballot.", u: GROW + "measures/prop-d/" },
      lwv: { p: "no", s: "Opposes because quadrupling the signature requirement and removing the Mayor's and four Supervisors' routes to the ballot would leave only expensive signature campaigns or a six-vote Board majority. The League says this would shut out community groups and working-class voices.", q: "Proposition D locks regular people out of elections and gives power to whoever can buy their way onto the ballot.", u: LWVSF },
      chamber: { p: "yes", s: "Supports raising the signature requirement from 2% to 8% and requiring a Board vote for the Mayor or Supervisors to place measures. Says this would bring San Francisco in line with other California jurisdictions.", q: "would bring San Francisco in line with other jurisdictions across the state where signature qualification thresholds typically range from 5-10%", u: CHAMBER },
      sda: { p: "no", s: "Opposes D as a charter change that shifts power to the Mayor. Says quadrupling the signatures needed would create a pay-to-play system, even though it also removes some ballot-placement powers from the Mayor and minority blocs of supervisors.", q: "quadrupling the number of signatures needed for ballot propositions", u: SDA },
      green: { p: "no", s: "Opposes restricting ballot access for future propositions.", q: "restricting ballot access for future propositions", u: GREEN },
      sfbg: { p: "no", s: "Calls D the worst of the Mayor's package: it would quadruple initiative signature requirements and take away four supervisors' ability to place measures, leaving only wealthy special interests able to sponsor them.", q: "It would quadruple the number of signatures required to put an initiative on the ballot", u: SFBG },
      gop: { p: "no", s: "Opposes quadrupling the signatures needed for citizen initiatives, from 2% to 8% of registered voters. Says the initiative process belongs to the people.", q: "Prop D would quadruple the signatures required to place a citizen initiative on the ballot — from 2% to 8% of registered voters.", u: GOP },
      dsa: { p: "no", s: "Opposes D, E, and F together as the Mayor's charter-amendment \"power grab.\"", q: "stands in strong opposition to Mayor Lurie’s three proposed charter amendments for November 2026", u: "https://dsasf.org/" },
      sfdems: { p: "yes", u: SFDEMS },
      yimby: { p: "yes", u: YIMBY },
    },
  },
  // ------------------------------------------------------------- Local: E
  {
    id: "E", section: "local", type: "Charter Amendment",
    title: "City Administrator’s Authority and Changes to City Contracting",
    nickname: "City contracting overhaul",
    what: "Expands the City Administrator's purchasing and contracting authority, including over departments that are currently exempt (MTA, PUC, Airport, Port, some arts departments). Raises the thresholds below which contracts skip Board approval: $1M to $4.5M for revenue contracts, $10M to $25M for cost contracts. Doubles the Administrator's term from 5 to 10 years, including the current term.",
    whatSource: { label: "LWV SF pros & cons", url: "https://lwvsf.org/procon" },
    docs: [
      { label: "Legal text", url: "https://api.sf.gov/documents/53470/LT_ModernizingCityContracting.pdf" },
      { label: "Title & summary", url: "https://api.sf.gov/documents/53474/TS_ExtendingTheCityAdministratorsDutiesAndChangesToCityContractingv2.pdf" },
    ],
    positions: {
      spur: { p: "yes", s: "SPUR says procurement is so fragmented that no official can ensure purchasing is efficient, consistent, and accountable, and that E implements changes SPUR recommended. It expects fewer duplicative reviews, shorter timelines, and easier access for businesses and nonprofits, with reasonable elected oversight kept. Its concerns: less ability for the Mayor and Board to set purchasing policy, and limits on the PUC's and MTA's independent purchasing.", q: "These changes would clarify accountability while maintaining reasonable oversight by elected officials.", u: SPUR + "sf-prop-e-city-administrator-duties" },
      growsf: { p: "yes", s: "Puts city purchasing rules under the City Administrator, whose rulebook the Board or Mayor could reject, and raises Board approval thresholds. GrowSF argues today's contracting rules are tangled and nobody owns them, and points to a faster playground-delivery process as proof that better rules get better results.", q: "Prop E puts one person in charge:", u: GROW + "measures/prop-e/" },
      lwv: { p: "no", s: "Opposes because E gives an appointed official broad new contracting and technology authority, raises contract thresholds, and doubles the term from 5 to 10 years with too few checks. Contrasts this with the League's 1995 support for shortening that term.", q: "Proposition E hands a lot more power to an unelected official, with little accountability to match.", u: LWVSF },
      chamber: { p: "yes", s: "Supports giving the City Administrator authority over contracting rules, raising the Board approval threshold for spending contracts from $10M to $25M, and a 10-year term. Says simpler procurement saves money and gets better outcomes.", q: "simplifying procurement can save the city money and produce better outcomes", u: CHAMBER },
      sda: { p: "no", s: "Opposes because E doesn't seem to fix the city's contracting problems. Instead it adds to the City Administrator's power and reduces transparency over large contracts.", q: "this Proposition doesn’t actually seem to address any of them and instead only increases the power of the City Administrator", u: SDA },
      green: { p: "no", s: "Opposes it as less oversight over city contracting.", q: "less oversight over City contracting", u: GREEN },
      sfbg: { p: "no", s: "Says E would eliminate Board and community oversight of tens of millions of dollars in city contracts, which it says invites corruption.", q: "Prop. E would eliminate Board of Supes and community oversight of tens of millions in city contracts.", u: SFBG },
      gop: { p: "yes", s: "Says E strengthens executive authority so that voters can hold someone accountable at the ballot box when city services fail.", q: "When city services fail, voters should know exactly who is responsible.", u: GOP },
      dsa: { p: "no", s: "Opposes D, E, and F together as the Mayor's charter-amendment \"power grab.\"", q: "stands in strong opposition to Mayor Lurie’s three proposed charter amendments for November 2026", u: "https://dsasf.org/" },
      sfdems: { p: "yes", u: SFDEMS },
      yimby: { p: "yes", u: YIMBY },
    },
  },
  // ------------------------------------------------------------- Local: F
  {
    id: "F", section: "local", type: "Charter Amendment",
    title: "Changes to Executive Branch Management",
    nickname: "Mayoral authority & deputy mayors",
    what: "Lets appointing authorities remove most commissioners for any reason. Lets the Mayor fire most department heads without commission approval and reorganize most departments without a public vote. Removes the Police Commission's power to remove the Chief of Police and lifts the 1991 ban on deputy mayors.",
    whatSource: { label: "LWV SF pros & cons", url: "https://lwvsf.org/procon" },
    docs: [
      { label: "Legal text", url: "https://api.sf.gov/documents/53467/LT_ExecutiveBranchAccountablility.pdf" },
      { label: "Title & summary", url: "https://api.sf.gov/documents/53468/TS_ChangesToExecutiveBranchManagementv2.pdf" },
    ],
    positions: {
      spur: { p: "yes", s: "SPUR says F adopts many of its recommendations for making the mayor the city's chief executive, including control over department heads. It thinks the reorganization power goes further than SPUR proposed, but notes the Board can reject changes and key oversight functions are exempt. Its concerns: concentrated authority could be misused by a poor mayor, and smaller commission roles may mean less public participation.", q: "Taken together, these changes would strengthen the mayor’s ability to serve as the city’s chief executive and voters’ ability to hold the mayor accountable for results.", u: SPUR + "sf-prop-f-executive-branch-management" },
      growsf: { p: "yes", s: "Lets the Mayor reorganize most departments, hire and fire several department heads directly, and remove most commissioners serving at the appointer's pleasure. GrowSF notes the Board can still block reorganizations, and acknowledges F is Mayor Lurie's measure and gives his office more power.", q: "The Board of Supervisors can still block any reorganization", u: GROW + "measures/prop-f/" },
      lwv: { p: "no", s: "Opposes because F gives the Mayor sweeping power to fire most department heads and commissioners, reduces commission roles, and brings back deputy mayors, which voters banned in 1991. Also objects to removing the Police Commission's power to remove the Chief.", q: "Proposition F hands the Mayor sweeping new power over our government and removes many checks and balances.", u: LWVSF },
      chamber: { p: "yes", s: "Supports letting the Mayor reorganize most departments, hire deputy mayors, and hire and remove some department heads. Says this will improve coordination between departments and the executive branch.", q: "providing these mayoral powers will foster greater coordination between city departments and the executive branch", u: CHAMBER },
      sda: { p: "no", s: "Calls F a power grab that would directly harm SDA and other nonprofits. Says independent department heads helped win back funding that had been cut.", q: "This Proposition is a straight-out power grab and would directly harm SDA and other nonprofits", u: SDA },
      green: { p: "no", s: "Opposes it as adding unelected appointees and reducing accountability.", q: "more unelected, corrupt appointees and less accountability", u: GREEN },
      sfbg: { p: "no", s: "Says letting the Mayor fire commissioners at will undermines community oversight and the commission structure. Calls it another power grab.", q: "Prop. F would allow the mayor to fire commissioners at will, undermining the entire idea of community oversight and a commission structure.", u: SFBG },
      gop: { p: "yes", s: "Supports letting the Mayor reorganize departments and appoint and remove department heads, with the Board still able to block changes. Says accountability requires authority.", q: "Accountability requires authority. Vote YES", u: GOP },
      dsa: { p: "no", s: "Opposes D, E, and F together as the Mayor's charter-amendment \"power grab.\"", q: "stands in strong opposition to Mayor Lurie’s three proposed charter amendments for November 2026", u: "https://dsasf.org/" },
      sfdems: { p: "yes", u: SFDEMS },
      yimby: { p: "yes", u: YIMBY },
    },
  },
  // ------------------------------------------------------------- Local: G
  {
    id: "G", section: "local", type: "Ordinance (initiative)",
    title: "Allowing Private Vehicles on the Great Highway in Sunset Dunes Park",
    nickname: "Great Highway / Sunset Dunes",
    what: "Closes Sunset Dunes Park to pedestrians and recreation on weekdays, from Monday 4:00 a.m. to Friday 6:00 p.m. (except certain holidays), and lets cars and other private vehicles use the Upper Great Highway during those hours.",
    whatSource: { label: "LWV SF pros & cons", url: "https://lwvsf.org/procon" },
    docs: [
      { label: "Legal text", url: "https://api.sf.gov/documents/51994/20260220_Legal_Text.pdf" },
      { label: "Title & summary", url: "https://api.sf.gov/documents/51998/Title__Summary_-_Allowing_Private_Vehicles_on_the_Great_Highway.pdf" },
    ],
    positions: {
      spur: { p: "no", s: "SPUR says G would undo a successful city effort to protect neighborhoods from sea-level rise and coastal erosion, and would delay the Ocean Beach climate adaptation plan. It runs counter to SPUR's support for shared public spaces, walking, biking, and transit. Concerns include $350K–$700K a year for sand removal, more than $10M in one-time signal costs, loss of the oceanfront promenade, and more runoff pollution.", q: "Prop. G would undo a successful city effort to protect neighborhoods from the threats of rising sea levels and coastal erosion", u: SPUR + "sf-prop-g-cars-sunset-dunes" },
      growsf: { p: "no", s: "GrowSF says voters already settled this in 2022 and 2024, and that about 500,000 of Sunset Dunes' first-year sensor counts were new park visits. It also objects that G's fixed schedule could only be changed by another citywide vote.", q: "Vote no on Prop G. Let's all move on.", u: GROW + "measures/prop-g/" },
      lwv: { p: "neutral", s: "Neutral because the League's own positions point in different directions. It notes the park has drawn 1.7 million visits, and that G has no requirements for more bus service, less driving, climate impacts, or paying for reopening (estimated at up to $20M over five years).", q: "After discussion, our board of directors decided to be neutral on Proposition G.", u: LWVSF },
      chamber: { p: "neutral", s: "Abstained; no reasoning given.", q: "The Chamber has abstained from taking a position on Prop G.", u: CHAMBER },
      green: { p: "neutral", s: "No endorsement for or against.", q: "no endorsement for or against G - the measure to open the Great Highway to cars on weekdays", u: GREEN },
      sfbg: { p: "yes", s: "Says closing the Great Highway to cars is a good idea only if the city provides enough north-south transit to replace it, which hasn't happened. Backs the original compromise: open to cars on weekdays, closed on weekends.", q: "Closing the Great Highway to cars is an excellent idea—as long as the city provides adequate North-South transit to replace it.", u: SFBG },
      gop: { p: "yes", s: "Says Westside families were promised a compromise and got a full closure. G would restore weekday car access to the Upper Great Highway and keep weekend recreation.", q: "Westside families were promised a compromise and got a road closure.", u: GOP },
      sfdems: { p: "no", u: SFDEMS },
      yimby: { p: "no", u: YIMBY },
    },
  },
  // ------------------------------------------------------------- Local: H
  {
    id: "H", section: "local", type: "Ordinance (parcel tax)",
    title: "Parcel Tax to Fund Public Muni Operations",
    nickname: "Muni parcel tax",
    what: "Creates a 15-year annual parcel tax starting in 2027 to fund Muni operations. The tax is based on property type and size rather than value and adjusts for inflation; single-family homes and condos up to 3,000 sq ft pay a flat $129. Some properties are exempt. Owners of rent-controlled units may pass through up to 50% of the tax, capped at $65 per unit per year.",
    whatSource: { label: "LWV SF pros & cons", url: "https://lwvsf.org/procon" },
    docs: [
      { label: "Legal text", url: "https://api.sf.gov/documents/52842/Legal_Text_3X0F1JU.pdf" },
      { label: "Title & summary", url: "https://api.sf.gov/documents/52834/Title__Summary_-Parcel_Tax_to_Fund_Public_Transit_Operations_-_2.pdf" },
    ],
    positions: {
      spur: { p: "yes", s: "SPUR acknowledges the tax is a new burden when living costs are high, but says its structure is fair and that the city's affordability and economy depend on a working Muni. Cuts would hit riders with disabilities, seniors, students, and low-wage workers hardest, and would hurt downtown recovery. Its concern: the city can't control how the tax is passed on to tenants outside rent control.", q: "High-quality public transit is not optional for San Francisco.", u: SPUR + "sf-prop-h-muni-parcel-tax" },
      growsf: { p: "yes", s: "A 15-year parcel tax raising about $177M a year (Controller estimate) for Muni operations. GrowSF calls it a fair price for dedicated Muni funding, criticizes the senior exemption as backwards given Prop 13 protections, and points to the sunset, efficiency review, and the Board's power to amend or repeal as safeguards.", q: "Funding it directly is the better deal, and the price is reasonable: most homeowners pay $129 per year", u: GROW + "measures/prop-h/" },
      lwv: { p: "yes", s: "Endorses H because Muni faces possible cuts of up to 20 routes and reduced late-night service. Calls the $129 homeowner tax predictable and notes that older homeowners, nonprofits, and SROs pay less. Would have preferred that rent-controlled landlords absorb the full tax.", q: "Muni’s overwhelming financial need makes this proposition essential.", u: LWVSF },
      chamber: { p: "yes", s: "Supports the parcel tax (about $177M a year, 2027–2042) for SFMTA operations because public transit drives the city's economy.", q: "public transit is a critical driver of the San Francisco economy, helping workers, residents, and businesses stay connected", u: CHAMBER },
      sda: { p: "yes", s: "Supports the parcel tax to head off large transit cuts, and says SDA pushed to make it as equitable as possible.", q: "Help avoid huge cuts to our local transportation system by increasing revenue!", u: SDA },
      green: { p: "yes", s: "Supports it as a progressive way to fund Muni.", q: "progressive parcel tax to fund Muni", u: GREEN },
      sfbg: { p: "yes", s: "Calls H an easy call: Muni needs the money, the tax falls harder on large commercial parcels than on small residential buildings, and landlord pass-throughs are capped.", q: "This one is easy: The city desperately needs money to keep Muni alive and functioning", u: SFBG },
      gop: { p: "no", s: "Calls H a 15-year property tax to bail out an agency that won't reform itself. Says SFMTA management should be fixed before homeowners are asked to pay more.", q: "A 15-year property tax to bail out an agency that refuses to reform itself.", u: GOP },
      sfdems: { p: "yes", u: SFDEMS },
      yimby: { p: "yes", u: YIMBY },
    },
  },
  // ------------------------------------------------------------- Local: I
  {
    id: "I", section: "local", type: "Ordinance (initiative)",
    title: "Changes to Real Property Transfer Tax",
    nickname: "Transfer tax set-aside for housing",
    what: "Directs half of transfer tax revenue from sales of $10M+ properties into a new House SF Fund: at least 60% for building affordable housing, at least 25% for buying or repairing housing, at least 10% for housing stability, and up to 5% for administration. Exempts some newly built multi-unit buildings. The Board could no longer lower the tax without a public vote.",
    whatSource: { label: "LWV SF pros & cons", url: "https://lwvsf.org/procon" },
    docs: [
      { label: "Legal text", url: "https://api.sf.gov/documents/55542/05042026_LT_AfordableHousing.pdf" },
      { label: "Title & summary", url: "https://api.sf.gov/documents/55610/Title_and_Summary_Changes_to_Real_Property_Transfer_Tax_third_submission.pdf" },
    ],
    positions: {
      spur: { p: "no", s: "SPUR strongly supports more affordable housing money and likes the exemptions for qualified projects. But it says I would permanently move a large share of General Fund revenue (about $114M a year) while the city faces a structural deficit of more than $1 billion, and would take away the Board's ability to adjust the transfer tax. Commercial projects would still face high transfer taxes.", q: "Weighing all these factors, we believe Prop. I could do more harm than good.", u: SPUR + "sf-prop-i-transfer-tax-set-aside" },
      growsf: { p: "no", s: "GrowSF says I moves about $120M a year out of the General Fund during a projected deficit, and locks in today's transfer tax rates because lowering them would take a public vote.", q: "Vote no on Prop I.", u: GROW + "measures/prop-i/" },
      lwv: { p: "yes", s: "Supports I because it sends half of existing transfer tax revenue on $10M-plus sales to affordable housing and tenant protections without raising taxes. Notes that most San Franciscans would never pay this tax.", q: "San Francisco needs a dedicated, reliable source of money for affordable housing, and Proposition I delivers one without increasing taxes.", u: LWVSF },
      chamber: { p: "no", s: "Opposes moving $120M a year in transfer tax revenue from the General Fund into a dedicated housing fund, and taking away the Board's power to lower the tax. Says it carves out money for narrow programs without requiring that any new housing be built.", q: "carves out critical funding from the General Fund for narrow social housing programs without a requirement that any new affordable housing be built", u: CHAMBER },
      sda: { p: "yes", s: "Supports dedicating the money to affordable housing and closing the loophole that let the Mayor redirect money meant for 2020's Prop I.", q: "closing the loophole that allowed the Mayor to funnel money away from the purpose of 2020’s Proposition I.", u: SDA },
      green: { p: "neutral", s: "No consensus for or against.", q: "no consensus for or against I - dedicate $120 million from real estate transfer tax to \"affordable housing\"", u: GREEN },
      sfbg: { p: "yes", s: "Says I shouldn't have been necessary: voters approved the 2020 transfer tax expecting it to fund social housing, and Mayors Breed and Lurie spent it on other things. I requires the money to go where voters intended.", q: "Prop. I mandates that the tax money go where it was always supposed to go. Vote yes.", u: SFBG },
      gop: { p: "no", s: "Opposes earmarking half of transfer tax revenue for housing and development. Notes DSA gathered many of the signatures and quotes Mayor Lurie calling it an unaccountable slush fund.", q: "Earmarks 50% of real estate transfer tax revenue to housing and development projects.", u: GOP },
      dsa: { p: "yes", s: "DSA backs I as the \"Affordable Housing Guarantee Act.\"", q: "Permanently dedicate funding to affordable housing, innovative social housing for all income levels, and rent relief.", u: "https://dsasf.org/" },
      sfdems: { p: "no", u: SFDEMS },
      yimby: { p: "no", u: YIMBY },
    },
  },
  // ------------------------------------------------------------- Local: J
  {
    id: "J", section: "local", type: "Ordinance",
    title: "Removal of Foreclosure Exemption for Real Property Transfer Tax",
    nickname: "Foreclosure transfer-tax loophole",
    what: "Ends the transfer tax exemption for foreclosures on commercial properties, residential buildings with 5+ units, and hotels, starting in 2027. Single-family homes, condos, co-ops, and small residential buildings keep the exemption. Raises the city's spending limit by the new revenue through 2030.",
    whatSource: { label: "SPUR & LWV SF", url: SPUR + "sf-prop-j-transfer-tax-foreclosures" },
    docs: [
      { label: "Legal text", url: "https://api.sf.gov/documents/61295/Nov2026_LT_RealPropertyTransferTaxForeclosureExemption.pdf" },
      { label: "Legislative digest", url: "https://api.sf.gov/documents/61294/Nov2026_LD_RealPropertyTransferTaxForeclosureExemption.pdf" },
    ],
    positions: {
      spur: { p: "yes", s: "SPUR says the city needs revenue that doesn't burden working families and small businesses, and ending the foreclosure exemption for commercial and large multi-family properties does that without harming homeowners or small landlords. Its concerns: lenders may pass the cost on to buyers, which could block purchases of distressed properties and slow the office market's recovery.", q: "Closing the foreclosure loophole for commercial and multi-family residential properties offers a way to increase revenue without harming individual homeowners or small landlords.", u: SPUR + "sf-prop-j-transfer-tax-foreclosures" },
      growsf: { p: "yes", s: "GrowSF says the exemption was written for banks stuck holding buildings, not for investors who buy loans to take over large properties tax-free. Estimates the added cost to lenders at about 0.14 points on a $100M loan, and says the deal only works if Prop I fails.", q: "The tax they skip is the one every ordinary buyer pays,", u: GROW + "measures/prop-j/" },
      lwv: { p: "yes", s: "Supports ending the foreclosure exemption for large properties (commercial, large apartment buildings, hotels) while keeping it for homes and small buildings. Cites a Controller estimate of $100M–$150M a year for five years.", q: "Proposition J ends a tax break that has let big real estate lenders off the hook for years.", u: LWVSF },
      chamber: { p: "neutral", s: "Abstained; no reasoning given.", q: "The Chamber has abstained from taking a position on Prop J.", u: CHAMBER },
      sda: { p: "yes", s: "Supports measures that make wealthy developers pay more, and especially likes closing a loophole developers have started using.", q: "Even better when the measure closes a loophole the developers have started exploiting!", u: SDA },
      green: { p: "yes", s: "Supports ending the transfer tax exemption for banks that foreclose on properties.", q: "end exemption to real estate transfer tax by banks foreclosing on properties", u: GREEN },
      sfbg: { p: "yes", s: "Describes J as a Mayor/Supervisor Mahmood effort to undercut Prop I by cutting taxes on high-end property later. Says ending the exemption is fine now that I is also on the ballot and the tax-cut plan has stalled.", q: "Nothing wrong with that, now that Prop. I is on the ballot too", u: SFBG },
      gop: { p: "no", s: "Says J removes a long-standing tax exemption and squeezes property owners at their most vulnerable moment.", q: "Removes a longstanding tax exemption and squeezes property owners at their most vulnerable moment.", u: GOP },
      sfdems: { p: "yes", u: SFDEMS },
    },
  },
  // ------------------------------------------------------------- Regional: RTM
  {
    id: "RTM", section: "regional", type: "Regional sales tax",
    title: "Regional Transit Measure",
    nickname: "Bay Area transit sales tax",
    what: "A 14-year sales tax, 1% in San Francisco and 0.5% in four other Bay Area counties, to prevent severe service cuts on BART, Caltrain, Muni, and AC Transit and to fund local transportation priorities.",
    whatSource: { label: "SPUR & SF Chamber", url: SPUR + "ba-prop-rtm-regional-transit-sales-tax" },
    docs: [
      { label: "Board resolution", url: "https://api.sf.gov/documents/61300/Nov2026_Resolution_RegionalTransitMeasure.pdf" },
    ],
    positions: {
      spur: { p: "yes", s: "SPUR says a collapse in transit service would hurt people who depend on it for jobs, medical care, and groceries, and that reliable transit funding outweighs concerns about a regressive sales tax. It estimates a flat $82 a year for people at or below 80% of median income, far less than the $3,280 in added driving costs if service is cut. SPUR is a sponsor.", q: "SPUR believes maintaining reliable transit funding outweighs concerns about the regressive nature of a sales tax.", u: SPUR + "ba-prop-rtm-regional-transit-sales-tax" },
      growsf: { p: "yes", s: "GrowSF says BART has no backup funding and faces a $378M deficit; if RTM fails, train hours would be cut 63% starting January 2027. It concedes the tax falls hardest on lower-income residents but sees no better alternative.", q: "Vote yes on the Regional Transit Measure.", u: GROW + "measures/prop-rtm/" },
      chamber: { p: "yes", s: "Supports the 14-year sales tax, projected at about $980M, for Muni, BART, and Caltrain operations. Says Bay Area transit brings workers and customers to San Francisco businesses.", q: "Bay Area transit is an essential service, bringing workers and customers to businesses in San Francisco", u: CHAMBER },
      sda: { p: "yes", s: "Acknowledges the sales tax is regressive but calls it the best compromise available. Says transit cuts, including bus cuts and BART station closures, would hit lower-income people harder.", q: "this is the best compromise we could get in this political climate.", u: SDA },
      green: { p: "neutral", s: "No consensus for or against.", q: "no consensus for or against RTM - regional sales taxes to fund BART, Muni, and other local transit", u: GREEN },
      sfbg: { p: "yes", s: "Calls RTM a regressive sales tax that is probably the only way to keep BART from collapsing. Would prefer an income tax, but says the measure has to pass.", q: "So RTM it’s regressive and unfair, but we really have no choice. The measure needs to pass.", u: SFBG },
      gop: { p: "no", s: "Objects that San Franciscans would pay 1% while other counties pay 0.5% for the same regional systems, on top of some of the highest sales taxes in California.", q: "We shouldn’t be paying twice the rate of Santa Clara or San Mateo residents for the same regional systems.", u: GOP },
      sfdems: { p: "yes", u: SFDEMS },
      yimby: { p: "yes", u: YIMBY },
    },
  },
  // ------------------------------------------------------------- State props
  {
    id: "1", section: "state", type: "State bond",
    title: "Affordable Housing & Veterans Homeownership Bond",
    nickname: "$10B housing bond",
    what: "Authorizes $10 billion in general obligation bonds for affordable and supportive housing, plus $1.25 billion in mortgage revenue bonds for a veterans and military-family homeownership program.",
    whatSource: { label: "SPUR", url: SPUR + "ca-prop-1-affordable-housing-bond" },
    positions: {
      spur: { p: "yes", s: "SPUR says the housing crisis comes from too little supply and too little subsidy, and thousands of approved affordable projects are stalled for lack of financing. The bond money pairs with federal tax credits through proven state programs. Its concern: more state debt, with debt service equal to about 0.26% of the General Fund.", q: "This measure is critical to expanding affordable housing opportunities for lower-income residents across California through new construction, preservation, and homebuyer assistance.", u: SPUR + "ca-prop-1-affordable-housing-bond" },
      lwv: { p: "yes", s: "The state League supports the bond, noting that earlier affordable-housing bond money is exhausted while high housing costs keep driving homelessness and overcrowding.", q: "Authorizes $10 billion in bonds for affordable housing construction, preservation, and homeownership programs", u: LWVC },
      sda: { p: "yes", s: "Acknowledges bonds are debt, but calls them one of the best ways to build affordable housing in the current climate.", q: "it’s one of the best ways for us to actually build affordable housing in the current political climate.", u: SDA },
      green: { p: "no", s: "Opposes the bond as funding private housing for veterans.", q: "NO on 1 - bond to fund private housing for veterans", u: GREEN },
      growsf: { p: "yes", u: GROW },
      sfdems: { p: "yes", u: SFDEMS },
    },
  },
  {
    id: "2", section: "state", type: "State constitutional amendment",
    title: "Increases State Rainy Day Fund",
    nickname: "Rainy day fund",
    what: "Raises the cap on the state's rainy day reserves from 10% to 20%, changes how deposits and withdrawals work, exempts deposits from the state spending limit, and expands required repayment of certain debts.",
    whatSource: { label: "SPUR", url: SPUR + "ca-prop-2-rainy-day-fund" },
    positions: {
      spur: { p: "yes", s: "SPUR says California's volatile tax revenue needs adequate reserves to avoid deep cuts in downturns, which also protects cities and counties. Its concern: even the higher cap would cover only about half of the revenue lost in a typical downturn.", q: "Given the volatile nature of California’s tax revenue structure, adequate reserve requirements are necessary to avoid severe service reductions during economic downturns.", u: SPUR + "ca-prop-2-rainy-day-fund" },
      lwv: { p: "yes", s: "Supports a larger rainy day fund and requiring more savings when capital gains revenue is unusually high, to protect schools and services and reduce emergency borrowing.", q: "Allows California to save more during strong economic years by building a larger rainy-day fund", u: LWVC },
      green: { p: "no", s: "Opposes putting more state tax money into reserves instead of priorities like public transit.", q: "put more state tax money in \"rainy day fund\" instead of priorities like public transit", u: GREEN },
      growsf: { p: "yes", u: GROW },
      sfdems: { p: "yes", u: SFDEMS },
    },
  },
  {
    id: "3", section: "state", type: "State initiative",
    title: "Children's Education and Health Care Protection Act",
    nickname: "High-earner tax extension",
    what: "Makes permanent the state's higher income tax rates on the top 2% of earners, which fund education, health care, and other programs.",
    whatSource: { label: "SPUR", url: SPUR + "ca-prop-3-high-earner-income-tax-extension" },
    positions: {
      spur: { p: "yes", s: "SPUR says the tax has raised more than $119 billion for education and health care, with no evidence it drives high earners away, and would help backfill Medi-Cal as federal cuts land. Trade-offs: permanence reduces future flexibility, and reliance on capital gains keeps revenue volatile.", q: "But given the tax's proven track record and the increasingly dramatic funding gaps the tax would help fill in the wake of H.R. 1, SPUR supports making it permanent.", u: SPUR + "ca-prop-3-high-earner-income-tax-extension" },
      lwv: { p: "yes", s: "Keeps today's rates on the top 2% after 2030, avoiding an estimated $5–15 billion yearly revenue loss without raising anyone's rate.", q: "Prop 3 does not raise anyone's tax rate today.", u: LWVC },
      sda: { p: "yes", s: "Supports making the tax permanent to fund education and health care, and argues the feared exodus of the wealthy never happens.", q: "The exodus of wealthy individuals that is threatened every time one of these taxes goes on the ballot never really materializes", u: SDA },
      green: { p: "yes", s: "Supports keeping the tax on high earners to fund public education.", q: "keep the tax on rich people to fund public education", u: GREEN },
      growsf: { p: "yes", u: GROW },
      sfdems: { p: "yes", u: SFDEMS },
    },
  },
  {
    id: "4", section: "state", type: "State constitutional amendment",
    title: "California Fair Elections Act",
    nickname: "Public campaign financing",
    what: "Repeals the state ban on public financing of campaigns, so state and local governments can create programs that give candidates public funds under spending limits.",
    whatSource: { label: "SPUR", url: SPUR + "ca-prop-4-campaign-financing" },
    positions: {
      spur: { p: "yes", s: "SPUR says public financing brings in small donors, lowers barriers for first-time candidates, and increases candidate diversity. Because governments must opt in, each can decide for itself. Concerns: mixed evidence on reducing big-money influence, no limits on independent expenditures, and added program costs.", q: "SPUR supports clearing this state-level barrier and letting cities, counties, and the state decide for themselves.", u: SPUR + "ca-prop-4-campaign-financing" },
      lwv: { p: "yes", s: "Says public financing can amplify small donors, broaden who can run, and reduce dependence on wealthy donors. The state League is an official proponent.", q: "Public financing can amplify small donors, broaden who can run, and reduce dependence on wealthy donors", u: LWVC },
      sda: { p: "yes", s: "Says public funding lets people who aren't wealthy run for office, and a statewide ban is at odds with an accessible election process.", q: "Having a statewide prohibition on this seems antithetical to a fully accessible election process", u: SDA },
      green: { p: "yes", s: "Supports allowing public financing of candidates for state office.", q: "allow public financing of candidates for state office", u: GREEN },
      growsf: { p: "no", u: GROW },
      sfdems: { p: "yes", u: SFDEMS },
    },
  },
  {
    id: "5", section: "state", type: "State constitutional amendment",
    title: "Changes Recall Election Process for Statewide Officers",
    nickname: "Recall reform",
    what: "Removes the replacement-candidate question from recall elections. A vacancy created by a recall would be filled through existing succession rules.",
    whatSource: { label: "SPUR", url: SPUR + "ca-prop-5-recall-process-reform" },
    positions: {
      spur: { p: "yes", s: "SPUR says this keeps a replacement from taking statewide office with a small plurality and removes the incentive to use recalls as a partisan tool. Concerns: legislative recalls would need an extra election, and an unelected appointee could serve as governor during a lame-duck period.", q: "Prop. 5 would help California avoid scenarios in which a successor can take statewide office with only a small plurality of votes.", u: SPUR + "ca-prop-5-recall-process-reform" },
      lwv: { p: "yes", s: "Ends a system that can hand office to a replacement backed by a small plurality; vacancies would be filled under existing rules. The state League is an official proponent.", q: "Prop 5 ends a system that can hand office to a replacement supported by only a small plurality.", u: LWVC },
      green: { p: "no", s: "Opposes weakening recall elections instead of reforming them with ranked-choice voting.", q: "neuter state recall elections instead of reforming them using RCV", u: GREEN },
      growsf: { p: "yes", u: GROW },
      sfdems: { p: "yes", u: SFDEMS },
    },
  },
  {
    id: "37", section: "state", type: "State initiative",
    title: "Middle-Class Homeownership and Family Home Construction Act",
    nickname: "$25B homebuyer loans",
    what: "Authorizes $25 billion in state revenue bonds for second-mortgage loans to buyers of newly built homes, to increase middle-class homeownership.",
    whatSource: { label: "SPUR", url: SPUR + "ca-prop-37-homeowner-loans" },
    positions: {
      spur: { p: "yes", s: "SPUR supports new homeownership financing tools, and these revenue bonds don't touch the General Fund. The focus on new construction adds for-sale supply. Concerns: the program isn't limited to first-time buyers and isn't aimed at low- or moderate-income households (eligibility goes up to 200% of area median income).", q: "SPUR supports the creation of new tools and financing to promote homeownership, and these revenue bonds would have no impact on the state’s General Fund.", u: SPUR + "ca-prop-37-homeowner-loans" },
      lwv: { p: "no", s: "Opposes because the program gives no priority to first-time or first-generation buyers, could help households earning more than $300,000 in some areas, and may widen racial and economic gaps.", q: "it gives no priority to first-time or first-generation buyers", u: LWVC },
      green: { p: "no", s: "Opposes the $25 billion bond for subsidized mortgages on new housing.", q: "$25 billion bond for subsidized mortgages for new housing", u: GREEN },
      growsf: { p: "yes", u: GROW },
      sfdems: { p: "yes", u: SFDEMS },
    },
  },
  {
    id: "38", section: "state", type: "State bond",
    title: "California Immunology Research and Cures Initiative",
    nickname: "$8.4B immunology research bond",
    what: "Authorizes $8.4 billion in state bonds for immunology research.",
    whatSource: { label: "SF Green Party / LWV", url: LWVC },
    positions: {
      lwv: { p: "no", s: "Says bonds are a poor way to fund research: the debt would cost $500–600 million a year from the General Fund, and royalties may do little to offset it.", q: "Medical research saves lives, but bonds are a poor way to fund it.", u: LWVC },
      sda: { p: "yes", s: "Says the bond replaces research funding cut by the federal government and supports work toward treatments and cures.", q: "This Proposition replaces critical funding that was cruelly cut by the Trump Administration", u: SDA },
      green: { p: "no", s: "Opposes the $8.4 billion bond for immunology research.", q: "$8.4 billion bond for immunology research", u: GREEN },
      growsf: { p: "no", u: GROW },
      sfdems: { p: "yes", u: SFDEMS },
    },
  },
  {
    id: "39", section: "state", type: "State initiative",
    title: "California Voter ID Initiative",
    nickname: "Voter ID",
    what: "Requires a government-issued ID to vote in person, or the last four digits of a government ID number on mail ballots.",
    whatSource: { label: "SPUR", url: SPUR + "ca-prop-39-california-voter-id" },
    positions: {
      spur: { p: "no", s: "SPUR says California already has safeguards, including perjury-backed registration and signature checks, and there's no evidence of widespread fraud. Strict ID rules create barriers for eligible voters, override SB 1174, and cost a lot to implement. SPUR says it could find no benefits.", q: "California already has safeguards to protect election integrity.", u: SPUR + "ca-prop-39-california-voter-id" },
      lwv: { p: "no", s: "Says California already verifies voter identity, and the measure would add barriers and expose sensitive data. The state League is an official opponent.", q: "Prop 39 is a Trump-inspired partisan power grab built on false claims about California elections.", u: LWVC },
      sda: { p: "no", s: "Argues voter ID requirements suppress participation, especially among older adults, women, low-income people, and LGBTQ+ people whose IDs may not match their names.", q: "Voter ID laws are for one reason and one reason only: to suppress our access to democratic participation.", u: SDA },
      green: { p: "no", s: "Opposes making it harder to vote by requiring ID.", q: "make it harder to vote by requiring people to show ID or write it on mail-in ballot", u: GREEN },
      growsf: { p: "no", u: GROW },
      sfdems: { p: "no", u: SFDEMS },
    },
  },
  {
    id: "40", section: "state", type: "State initiative",
    title: "2026 Billionaire Tax Act",
    nickname: "Billionaire wealth tax",
    what: "Enacts a one-time 5% state tax on the net worth of individuals and trusts worth more than $1 billion, mainly to fund health care.",
    whatSource: { label: "SPUR", url: SPUR + "ca-prop-40-billionaire-tax" },
    positions: {
      spur: { p: "neutral", s: "SPUR's board didn't reach consensus. It notes the one-time money would meet urgent health care and food needs, and the tax is progressive. Its concerns: one-time money can't sustain ongoing programs, the state needs a permanent fix, and billionaires leaving could cost hundreds of millions in long-term revenue.", q: "The SPUR Board of Directors did not reach consensus on Prop. 40.", u: SPUR + "ca-prop-40-billionaire-tax" },
      lwv: { p: "neutral", s: "Could raise tens of billions and advance League goals, but one-time earmarked money isn't a stable solution, and League positions point both ways.", q: "Strong League positions point both ways, so the LWVC is neutral.", u: LWVC },
      chamber: { p: "no", s: "Opposes because of possible ripple effects on state revenue and innovation. Says a one-time tax doesn't solve long-term health care funding and raises worries about more one-time taxes.", q: "due to the negative ripple effects this measure could have on state tax revenue and innovation", u: CHAMBER },
      sda: { p: "yes", s: "Supports a one-time wealth tax on billionaires to fund health care, and argues the feared exodus of the wealthy never happens.", q: "This proposition would make a wealth tax on folks who definitely have too much of it: billionaires.", u: SDA },
      green: { p: "yes", s: "Supports the billionaire tax; the party helped gather signatures for it.", q: "billionaire wealth tax (we helped gather sigs for this)", u: GREEN },
      growsf: { p: "no", u: GROW },
      sfdems: { p: "no", u: SFDEMS },
    },
  },
  {
    id: "41", section: "state", type: "State initiative",
    title: "Improving Transparency, Effectiveness, and Efficiency in California Government Act",
    nickname: "Spending limits & audits on new taxes",
    what: "Bars new state taxes from exempting their revenue from the state spending limit, and requires audits of programs funded by new state special taxes.",
    whatSource: { label: "SPUR", url: SPUR + "ca-prop-41-audits-special-taxes" },
    positions: {
      spur: { p: "no", s: "SPUR says transparency is a worthy goal, but the Legislative Analyst and State Auditor can already review programs. It argues 41 was placed on the ballot mainly to defeat Prop 40, and would squeeze revenue for housing, transportation, and services already facing cuts.", q: "Prop. 41 was primarily placed on the ballot to defeat Prop. 40, a measure to tax billionaires.", u: SPUR + "ca-prop-41-audits-special-taxes" },
      lwv: { p: "no", s: "Counting new taxes toward the spending cap could keep the state from raising or spending money voters approve.", q: "It could prevent the state from raising or spending all the money voters authorize for public priorities", u: LWVC },
      chamber: { p: "yes", s: "Says constitutional spending limits should apply to every tax, and 41 closes a loophole that lets new taxes avoid the cap, while voters can still change the limit directly.", q: "constitutional spending limits should apply consistently", u: CHAMBER },
      sda: { p: "no", s: "Part of a group of tax-limiting measures that would harm social services. Says voters should judge each tax on its own merits rather than face a blanket ban.", q: "We should let voters continue to evaluate propositions individually rather than passing a blanket ban.", u: SDA },
      green: { p: "no", s: "Opposes it for making it harder to raise taxes.", q: "makes it harder to raise taxes", u: GREEN },
      growsf: { p: "yes", u: GROW },
      sfdems: { p: "no", u: SFDEMS },
    },
  },
  {
    id: "42", section: "state", type: "State initiative",
    title: "Retirement and Personal Savings Protection Act",
    nickname: "Ban on personal-property & retroactive taxes",
    what: "Prohibits new state and local taxes on owning financial assets or other personal property, and any tax that applies retroactively.",
    whatSource: { label: "SPUR", url: SPUR + "ca-prop-42-personal-property-taxes" },
    positions: {
      spur: { p: "no", s: "SPUR says 42 was placed on the ballot mainly to defeat Prop 40, and would limit state and local governments' ability to raise revenue now and later. The one benefit it lists: banning retroactive taxes gives taxpayers more predictability.", q: "Prop. 42 was primarily placed on the ballot to defeat Prop. 40, a competing tax measure on billionaires.", u: SPUR + "ca-prop-42-personal-property-taxes" },
      lwv: { p: "no", s: "Opposes permanently ruling out revenue options California may need in different economic conditions.", q: "The League opposes locking away future revenue options that California may need under different economic or fiscal conditions.", u: LWVC },
      chamber: { p: "yes", s: "Says people and businesses need predictable tax rules: no new taxes on owning assets, and no retroactive changes to how past activity is taxed.", q: "The state should not impose new taxes on asset ownership or retroactively change the tax treatment of past activity.", u: CHAMBER },
      sda: { p: "no", s: "Part of a group of tax-limiting measures that SDA strongly opposes because of the harm to social services and the safety net.", q: "SDA is strongly against all of these proposals, and the harm they will cause to our social services and statewide safety nets.", u: SDA },
      green: { p: "no", s: "Opposes it for blocking the billionaire tax.", q: "blocks billionaire tax", u: GREEN },
      growsf: { p: "yes", u: GROW },
      sfdems: { p: "no", u: SFDEMS },
    },
  },
  {
    id: "43", section: "state", type: "State initiative",
    title: "Limits Voters' Ability to Raise Revenues for Local Government Services",
    nickname: "Two-thirds vote for local special taxes",
    what: "Requires a two-thirds vote to impose, extend, or raise special taxes, including citizen-initiated local special taxes that can now pass by simple majority. Bans new local property taxes based on value.",
    whatSource: { label: "SPUR & SF Chamber", url: SPUR + "ca-prop-43-local-tax-threshold" },
    positions: {
      spur: { p: "no", s: "SPUR has long called for Prop 13 reform and opposes new limits on raising revenue. It says 43 would extend Prop 13's legacy with a two-thirds threshold, undermining majority rule and one of the few remaining ways to fund services, with the effects falling hardest on lower-income residents.", q: "It would undermine both the democratic principle of majority rule and one of the few remaining pathways for funding important services.", u: SPUR + "ca-prop-43-local-tax-threshold" },
      lwv: { p: "no", s: "A two-thirds rule would let a minority of voters block tax measures most voters support.", q: "That would let a minority of voters block tax measures supported by most voters", u: LWVC },
      chamber: { p: "yes", s: "Argues the California Supreme Court's Upland ruling created an uneven system that runs against the constitution's intent for voter approval of special taxes.", q: "the California Supreme Court's Upland ruling has created an unevenly applied system", u: CHAMBER },
      sda: { p: "no", s: "Part of a group of tax-limiting measures that SDA strongly opposes because of the harm to social services and the safety net.", q: "SDA is strongly against all of these proposals, and the harm they will cause to our social services and statewide safety nets.", u: SDA },
      green: { p: "no", s: "Opposes requiring two-thirds instead of a majority to raise local taxes.", q: "makes it harder to raise local taxes (2/3 requirement instead of majority)", u: GREEN },
      growsf: { p: "yes", u: GROW },
      sfdems: { p: "no", u: SFDEMS },
    },
  },
  {
    id: "44", section: "state", type: "State initiative",
    title: "Clinic Funding Accountability and Transparency Act",
    nickname: "Clinic 90% spending rule",
    what: "Requires safety-net health clinics to spend at least 90% of annual revenue on health care services.",
    whatSource: { label: "LWV", url: LWVC },
    positions: {
      lwv: { p: "no", s: "Says the rigid rule could force clinics to cut services or close, shifting patients to other providers.", q: "This rigid rule could force clinics to cut services or close", u: LWVC },
      sda: { p: "no", s: "Says the 90% rule assumes nonprofits can run without overhead. SDA spends well over 10% outside direct services, so a rule like this would end it.", q: "A proposition like this targeted towards us would mean the end of SDA.", u: SDA },
      green: { p: "yes", s: "Supports the SEIU-UHW measure requiring clinics to spend more on services and less on executive pay.", q: "SEIU-UHW measure to require more of health clinic revenues to go to services instead of executive pay", u: GREEN },
      growsf: { p: "no", u: GROW },
      sfdems: { p: "no", u: SFDEMS },
    },
  },
  {
    id: "45", section: "state", type: "State initiative",
    title: "Building an Affordable California Act",
    nickname: "CEQA streamlining",
    what: "Speeds up CEQA environmental review for eight categories of housing and for some transportation, energy, health, safety, education, and water projects designated as essential. Caps reviews at one year and requires courts to rule on challenges within 270 days.",
    whatSource: { label: "SPUR & SF Chamber", url: SPUR + "ca-prop-45-environmental-review-ceqa" },
    positions: {
      spur: { p: "neutral", s: "SPUR's board couldn't reach a supermajority. SPUR agrees CEQA causes excessive risk, cost, and delay, and says 45 could speed infill housing and clean energy. But because it applies regardless of location or scale, it could also enable sprawl and polluting facilities, and fixing it later would take a two-thirds legislative vote.", q: "The SPUR Board of Directors could not reach a supermajority consensus position on this measure.", u: SPUR + "ca-prop-45-environmental-review-ceqa" },
      lwv: { p: "no", s: "Opposes speeding up projects by weakening environmental review, public input, and protections for affected communities.", q: "The League opposes speeding projects by weakening environmental review, public input, and protections for affected communities.", u: LWVC },
      chamber: { p: "yes", s: "Calls 45 a targeted fix for barriers that keep essential projects from being built, while keeping environmental review.", q: "as a targeted solution to solving some of the key barriers preventing essential projects and infrastructure from construction", u: CHAMBER },
      sda: { p: "no", s: "Agrees CEQA reviews take too long, but opposes shortening or removing the public's chance to respond or sue.", q: "disagrees with shortening or removing the opportunities for the public to respond or sue once the reviews are released.", u: SDA },
      green: { p: "no", s: "Opposes it as gutting environmental protections to clear the way for data centers and other development.", q: "guts environmental protection laws in order to enable data centers and other development", u: GREEN },
      growsf: { p: "yes", u: GROW },
      sfdems: { p: "no", u: SFDEMS },
    },
  },
];

// ---------------------------------------------------------------------------
// Local candidate races
// picks: ordered list of endorsed candidates (ranked-choice order where given).
// against: candidates the guide explicitly opposes.
// ---------------------------------------------------------------------------

window.RACES = [
  {
    id: "D2", title: "Supervisor, District 2", seats: 1, rcv: true,
    candidates: ["Nicholas Berg", "Guy McCoy", "Monthanus Ratanapakdee", "Stephen Sherrill"],
    positions: {
      growsf: { picks: ["Stephen Sherrill"], s: "Appointed supervisor with a record on public safety, small business, and responsive government. GrowSF cites his 69% vote share in June.", q: "Sherrill brings real policy experience and a laser focus on responsive, effective government.", u: GROW + "#supervisor-district-2" },
      gop: { picks: ["Nicholas Berg"], s: "Says Berg has spent his career managing budgets, buildings, and teams in SF neighborhoods. Berg is the SF GOP chair.", q: "Nicholas Berg has spent his career actually running things", u: GOP },
      sfbg: { picks: [], against: ["Stephen Sherrill"], s: "No endorsement. Calls Sherrill a reliable vote for the Mayor who is wrong on almost every issue.", q: "He’s a Lurie call-up vote, wrong on almost every issue.", u: SFBG },
      dsa: { picks: [], against: ["Nicholas Berg"], s: "No endorsement. Describes Sherrill as backed by YIMBY and tech money, and calls Berg a disaster for the district.", q: "Nicholas Berg would be a disaster for the people of District 2.", u: DSA },
      sfdems: { picks: ["Stephen Sherrill"], u: SFDEMS },
      yimby: { picks: ["Stephen Sherrill"], u: YIMBY },
    },
  },
  {
    id: "D4", title: "Supervisor, District 4", seats: 1, rcv: true,
    candidates: ["Albert Chow", "Jeremy Julian Greco", "Alan Wong"],
    positions: {
      growsf: { picks: ["Alan Wong"], s: "Appointed supervisor who won the June special election. GrowSF cites his vote for the Family Zoning Plan, police funding work, and constituent services.", q: "District 4 asked for a supervisor who listens, and in less than a year Wong has voted their priorities", u: GROW + "#supervisor-district-4" },
      gop: { picks: ["Alan Wong"], s: "Recommends Wong (and Dorsey in D6) as best positioned to stand up for safe streets, working government, and residents' everyday concerns.", q: "we recommend Alan Wong and Matt Dorsey as the candidates best positioned to stand up for safe streets", u: GOP },
      green: { picks: ["Jeremy Julian Greco"], s: "Endorsed; no reasoning given.", u: GREEN },
      sfbg: { picks: [], against: ["Alan Wong"], s: "No endorsement. Says Wong abandoned the progressive slate he ran with for City College and became one of the Board's most conservative members.", q: "The guy has no political convictions or morals.", u: SFBG },
      dsa: { picks: [], against: ["Alan Wong"], s: "No DSA-backed candidate. Calls Wong a steadfast Lurie ally and a political opportunist.", q: "There is currently no DSA backed candidate seeking election in District 4", u: DSA },
      sfdems: { picks: ["Alan Wong"], u: SFDEMS },
      yimby: { picks: ["Alan Wong"], u: YIMBY },
    },
  },
  {
    id: "D6", title: "Supervisor, District 6", seats: 1, rcv: true,
    candidates: ["Alex Behrend", "Matt Dorsey"],
    positions: {
      growsf: { picks: ["Matt Dorsey"], s: "Credits the incumbent with recovery-first drug policy, police staffing, speed cameras, and housing support.", q: "Supervisor Dorsey has done more to redirect San Francisco's drug policy toward treatment and recovery than any of his colleagues.", u: GROW + "#supervisor-district-6" },
      gop: { picks: ["Matt Dorsey"], s: "Recommends Dorsey (and Wong in D4) as best positioned to stand up for safe streets and working government.", q: "we recommend Alan Wong and Matt Dorsey as the candidates best positioned to stand up for safe streets", u: GOP },
      sfbg: { picks: [], against: ["Matt Dorsey"], s: "No endorsement. Calls Dorsey one of the Board's most conservative, pro-police members, and objects to his legislation weakening the city's housing-first policy.", q: "he has pushed hard, and won, legislation that undermines the city’s longtime “housing first” policy", u: SFBG },
      dsa: { picks: [], against: ["Matt Dorsey"], s: "No endorsement. Strongly opposes Dorsey's drug-policy direction.", q: "Dorsey’s embrace of a new War on Drugs is directly in opposition to DSA’s values of", u: DSA },
      sfdems: { picks: ["Matt Dorsey"], u: SFDEMS },
      yimby: { picks: ["Matt Dorsey"], u: YIMBY },
    },
  },
  {
    id: "D8", title: "Supervisor, District 8", seats: 1, rcv: true,
    note: "Manny Yekutiel remains on the ballot but dropped out on Oct 1, per GrowSF.",
    candidates: ["Gary McCoy", "Michael T. Nguyen", "Darshini Patel", "Emanuel \"Manny\" Yekutiel"],
    positions: {
      growsf: { picks: ["Darshini Patel", "Gary McCoy"], s: "After Yekutiel dropped out, GrowSF ranks Patel first and calls McCoy a reasonable alternative after his Oct 14 public-safety platform. Says Nguyen is the least aligned.", q: "We recommend voting for Darshini Patel as your #1 choice for Supervisor, District 8.", u: GROW + "#supervisor-district-8" },
      sfbg: { picks: ["Michael T. Nguyen", "Gary McCoy"], s: "Calls Nguyen the only progressive in the race and the only candidate who makes social housing a priority. Says it can live with McCoy, a centrist and the SF YIMBY pick.", q: "We prefer Nguyen. We can live with McCoy.", u: SFBG },
      green: { picks: ["Michael T. Nguyen"], s: "Endorsed; no reasoning given.", u: GREEN },
      gop: { picks: [], s: "No endorsement in this race.", q: "At this time, we are making no endorsements in Board of Supervisors, Districts 8 and 10.", u: GOP },
      sfdems: { picks: ["Gary McCoy"], u: SFDEMS },
      yimby: { picks: ["Gary McCoy"], u: YIMBY },
    },
  },
  {
    id: "D10", title: "Supervisor, District 10", seats: 1, rcv: true,
    candidates: ["Pearci \"PJ\" Bastiany III", "Dionjay (DJ) Brookter", "Deandra Bryant", "Theo Ellington", "J.R. Eppler", "Ellsworth \"Ell\" M. Jennison, Jr.", "Mike Trouble Lin", "Jamo Muhammad", "Jessica Pessecow", "Shawn M. Richard"],
    positions: {
      growsf: { picks: ["Theo Ellington"], against: ["J.R. Eppler", "Dionjay (DJ) Brookter"], s: "Praises Ellington's housing pipeline plan, public safety focus, and Shipyard cleanup commitments. Criticizes Eppler's record on appeals and Brookter's positions on fentanyl dealers and housing.", q: "We recommend voting for Theo Ellington for Supervisor, District 10.", u: GROW + "#supervisor-district-10" },
      sfbg: { picks: ["Dionjay (DJ) Brookter", "J.R. Eppler"], against: ["Theo Ellington"], s: "Calls outgoing Supervisor Walton's record excellent and Ellington the Big Tech candidate. Endorses Brookter and Eppler as the progressive options, in either order.", q: "Pick an order; both are great choices.", u: SFBG },
      green: { picks: ["Pearci \"PJ\" Bastiany III"], s: "Endorsed; no reasoning given.", u: GREEN },
      gop: { picks: [], s: "No endorsement in this race.", q: "At this time, we are making no endorsements in Board of Supervisors, Districts 8 and 10.", u: GOP },
      sfdems: { picks: ["Theo Ellington"], u: SFDEMS },
      yimby: { picks: ["Theo Ellington"], u: YIMBY },
    },
  },
  {
    id: "SFUSD", title: "Board of Education", seats: 3, rcv: false,
    candidates: ["Autumn Brown Garibay", "Virginia Cheung", "Alida Fisher", "Ryan Hazelton", "Phil Kim", "Laurance Lee", "Reina Tello", "Tim Tung"],
    positions: {
      growsf: { picks: ["Phil Kim", "Autumn Brown Garibay", "Tim Tung"], s: "Says SFUSD's budget has improved, but reading and math proficiency are still low. Backs Kim for measurable results and fiscal focus, Brown Garibay for holding the district to its own goals, and Tung for budget oversight experience.", q: "We recommend voting for Phil Kim, Autumn Brown Garibay, and Tim Tung for Board of Education.", u: GROW + "#board-of-education" },
      sfbg: { picks: ["Virginia Cheung", "Reina Tello", "Ryan Hazelton"], s: "Says the teachers' strike showed the district has to invest in educators, and endorses the teachers' union slate to carry that forward.", q: "Now the union has a slate of candidates who can expand that vision. We support them all.", u: SFBG },
      gop: { picks: ["Laurance Lee", "Phil Kim", "Tim Tung"], s: "Says schools should focus on outcomes: reading, math, and preparing kids for real opportunities.", q: "Our public schools should focus on outcomes: reading, math, and preparing kids for real opportunity.", u: GOP },
      green: { picks: ["Virginia Cheung", "Alida Fisher"], s: "Endorsed; no reasoning given.", u: GREEN },
      dsa: { picks: ["Reina Tello"], s: "DSA endorses Tello.", q: "Reina Tello for San Francisco Board of Education", u: DSA },
      sfdems: { picks: ["Autumn Brown Garibay", "Phil Kim", "Tim Tung"], u: SFDEMS },
    },
  },
  {
    id: "CCSF", title: "Community College Board", seats: 3, rcv: false,
    candidates: ["Elijah Ball", "Rome Moses Jones", "Monroe Lace", "Leah LaCroix", "Jeremy Lee", "Bunny McFadden", "Erwin Tam", "Lisa Wynn"],
    positions: {
      growsf: { picks: ["Elijah Ball", "Monroe Lace", "Erwin Tam"], s: "Says City College regained accreditation in 2025 but still has a structural deficit. Backs Ball for facilities and five-year planning, Lace for career-technical programs, and Tam for financial analysis.", q: "We recommend voting for Elijah Ball, Monroe Lace, and Erwin Tam for Community College Board.", u: GROW + "#community-college-board" },
      sfbg: { picks: ["Leah LaCroix", "Jeremy Lee", "Bunny McFadden"], s: "Backs the progressive, teachers'-union slate to restore credibility to City College after years of accreditation crisis.", q: "A progressive slate backed by the teachers’ union is running to restore some credibility to the critical institution.", u: SFBG },
      green: { picks: ["Leah LaCroix", "Jeremy Lee"], s: "Endorsed; no reasoning given.", u: GREEN },
      gop: { picks: ["Elijah Ball"], s: "Recommendation only; no reasoning given.", u: GOP },
      dsa: { picks: ["Bunny McFadden"], s: "DSA endorses McFadden.", q: "Bunny McFadden for San Francisco City College Board of Trustees", u: DSA },
      sfdems: { picks: ["Elijah Ball", "Monroe Lace", "Erwin Tam"], u: SFDEMS },
    },
  },
  {
    id: "CCSF-P", title: "Community College Board (Partial Term)", seats: 1, rcv: false,
    candidates: ["Ruth Ferguson"],
    positions: {
      growsf: { picks: ["Ruth Ferguson"], s: "An appointed trustee running unopposed. GrowSF praises her focus on salary costs, which exceed 90% of the unrestricted general fund, and on health care workforce pathways.", q: "We recommend voting for Ruth Ferguson for Community College Board, Partial Term.", u: GROW + "#community-college-board-partial-term" },
      sfbg: { picks: [], against: ["Ruth Ferguson"], s: "No endorsement. Calls Ferguson, an SF YIMBY leader, an appointee using the seat as a springboard to run for supervisor.", q: "She is a leader in SF YIMBY and clearly is using this slot as a springboard to a run for supervisor.", u: SFBG },
      sfdems: { picks: ["Ruth Ferguson"], u: SFDEMS },
    },
  },
  {
    id: "BART8", title: "BART Board, District 8", seats: 1, rcv: false,
    candidates: ["Sara Barz"],
    positions: {
      growsf: { picks: ["Sara Barz"], s: "Barz co-founded Seamless Bay Area and worked on Clipper and Apple Wallet transit payments. GrowSF says her background fits the budget and contract decisions BART's next board will face.", q: "We recommend voting for Sara Barz for BART Board, District 8.", u: GROW + "#bart-board-district-8" },
      sfdems: { picks: ["Sara Barz"], u: SFDEMS },
    },
  },
  {
    id: "ASSESSOR", title: "Assessor-Recorder", seats: 1, rcv: true,
    candidates: ["Joaquin Torres"],
    positions: {
      growsf: { picks: ["Joaquin Torres"], s: "Unopposed incumbent. Credits him with finishing the office's technology replacement and putting recorded documents online for free.", q: "We recommend voting for Joaquín Torres for Assessor-Recorder.", u: GROW + "#assessor-recorder" },
      sfdems: { picks: ["Joaquin Torres"], u: SFDEMS },
    },
  },
  {
    id: "PD", title: "Public Defender", seats: 1, rcv: true,
    candidates: ["Manohar Raju"],
    positions: {
      growsf: { picks: ["Manohar Raju"], s: "A weak endorsement of the unopposed incumbent. GrowSF says the office has turned away cases and Raju was held in contempt and fined $26,000; it sees no clear path to the 35 more attorneys he wants.", q: "we're giving him a weak endorsement.", u: GROW + "#public-defender" },
      sfdems: { picks: ["Manohar Raju"], u: SFDEMS },
    },
  },
];
