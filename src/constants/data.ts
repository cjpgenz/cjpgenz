export const TICKER_ITEMS = [
  "Party Launch · Volume 1, Edition 1",
  "Filed under: General Disgruntlement",
  "Sponsored by no one. Funded by nothing.",
  "HQ: Wherever the wifi works",
  "Now accepting rants, retweets, and resentment",
];

export const MARQUEE_SLOGANS = [
  "Together We Survive",
  "Stronger Together",
  "Unity · Resilience · Progress",
  "You Cannot Squash A Movement",
];

export const NAV_ITEMS = [
  { name: "Vision", href: "/#vision" },
  { name: "Manifesto", href: "/#manifesto" },
  { name: "Eligibility", href: "/#join" },
  { name: "Contact", href: "/#contact" },
  { name: "VOLUNTEER", href: "/#contact" },
];

export const FOOTER_COLUMNS = [
  {
    title: "The Party",
    links: [
      { name: "Vision", href: "/#vision", external: false },
      { name: "Manifesto", href: "/#manifesto", external: false },
      { name: "Founder", href: "/#contact", external: false }
    ]
  },
  {
    title: "Get involved",
    links: [
      { name: "Eligibility", href: "/#join", external: false },
      { name: "Join the party", href: "/#contact", external: false },
      { name: "Volunteer", href: "/#contact", external: false }
    ]
  },
  {
    title: "Follow",
    links: [
      { name: "Twitter / X", href: "https://x.com/CJP_2029", external: true },
      { name: "Instagram", href: "https://www.instagram.com/cockroachjantaparty/", external: true }
    ]
  },
  {
    title: "Security & AI",
    links: [
      { name: "Anti-Fraud Guard", href: "/#security-advisory", external: false },
      { name: "llms.txt", href: "/llms.txt", external: true },
      { name: "llms-full.txt", href: "/llms-full.txt", external: true }
    ]
  }
];

export const ELIGIBILITY_ITEMS = [
  {
    id: "REQ / 01",
    title: "Unemployed",
    desc: "By force, by choice, or by principle. We don't ask."
  },
  {
    id: "REQ / 02",
    title: "Lazy",
    desc: "Physically only. The brain may continue to spiral."
  },
  {
    id: "REQ / 03",
    title: "Chronically online",
    desc: "Minimum 11 hours a day, including bathroom breaks."
  },
  {
    id: "REQ / 04",
    title: "Can rant professionally",
    desc: "As long as the content is sharp, honest, and points at something that actually matters."
  }
];

export const MANIFESTO_DEMANDS = [
  {
    num: "01",
    textBefore: "If the CJP comes in power, ",
    textHighlight: "no Chief Justice shall be granted a Rajya Sabha seat",
    textAfter: " as a post-retirement reward."
  },
  {
    num: "02",
    textBefore: "If any legit vote is deleted, whether in a CJP or opposition-ruled state, the ",
    textHighlight: "CEC shall be arrested under UAPA",
    textAfter: ", as taking away voting rights of citizens is no less than terrorism."
  },
  {
    num: "03",
    textBefore: "",
    textHighlight: "Women shall receive 50% reservation, not 33%",
    textAfter: ", without increasing the strength of Parliament. Additionally, ",
    textHighlight2: "50% of all Cabinet positions",
    textAfter2: " shall be reserved for women."
  },
  {
    num: "04",
    textBefore: "All media houses owned by ",
    textHighlight: "Ambani and Adani shall have their licences cancelled",
    textAfter: " to make way for truly independent media. Bank accounts of Godi media anchors shall be investigated."
  },
  {
    num: "05",
    textBefore: "Any MLA or MP who defects from one party to another shall be ",
    textHighlight: "barred from contesting elections — and from holding any public office — for a period of 20 years",
    textAfter: "."
  }
];

type FetchPriority = "high" | "low" | "auto";

interface HeroSlide {
  key: string;
  src: string;
  alt: string;
  fetchPriority?: FetchPriority;
}

export const HERO_SLIDES: HeroSlide[] = [
  { key: "default", src: "/banner.webp", alt: "Official Poster", fetchPriority: "high" },
  { key: "alt", src: "/banner_alt.webp", alt: "Official Poster Alternative" },
];

export interface StatItem {
  value: string;
  label: string;
  hasPulse?: boolean;
}

export const STAT_ITEMS: StatItem[] = [
  { value: "5", label: "Demands" },
  { value: "0", label: "Corporate donors" },
  { value: "∞", label: "Patience" },
  { value: "1", label: "Founder, no PA" },
  { value: "0", label: "Members", hasPulse: true },
  { value: "0+", label: "Visitors" }
];

export interface ContactItem {
  label: string;
  value: string;
  subValue?: string;
}

export const CONTACT_ITEMS: ContactItem[] = [
  { label: "Email", value: "contact@cockroachjantaparty.org" },
  { label: "Press", value: "contact@cockroachjantaparty.org" },
  { label: "Headquarters", value: "Wherever the wifi works." },
  { label: "Founder", value: "Abhijeet Dipke", subValue: "Founder & Convenor" }
];

export const SITE_INFO = {
  SITE_NAME: "CJP GenZ",
  SITE_FULL_NAME: "Cockroach Janta Party (CJP GenZ)",
};
  