# 🪳 Cockroach Janta Party (CJP GenZ) — Official Repository

The official open-source codebase for the **Cockroach Janta Party (CJP GenZ)** web ecosystem. 

* 🌐 **Official Website:** [cockroachjantaparty.org](https://cockroachjantaparty.org/) · [cjpgenz.com](https://cjpgenz.com/)
* 📝 **Active Petition:** [petition.cockroachjantaparty.org](https://petition.cockroachjantaparty.org/) · [petition.cjpgenz.com/sack](https://petition.cjpgenz.com/sack)

<p align="center">
  <a href="https://cjpgenz.com" target="_blank">
    <img src="public/banner_alt.webp" alt="Cockroach Janta Party Banner Alt" width="100%">
  </a>
</p>

**Voice of the Lazy & Unemployed.**

Official website of the Cockroach Janta Party — a satirical political movement for the young people who keep getting called lazy, chronically online, and cockroaches. Five demands. Zero sponsors. One large, stubborn swarm.

> *"A political party for the people the system forgot to count."*

## Website Sections

### Hero
Opening section with the party tagline, live stats (demands, corporate donors, patience, founder count, members, visitors), and a rotating poster slideshow.

### Vision
The movement's origin story and mission — building a party for the youth dismissed as lazy and chronically online.

### Manifesto — The Five Demands
1. No Chief Justice shall be granted a Rajya Sabha seat as a post-retirement reward.
2. If any legit vote is deleted, the CEC shall be arrested under UAPA.
3. Women shall receive 50% reservation (not 33%), and 50% of all Cabinet positions reserved for women.
4. All media houses owned by Ambani and Adani shall have their licences cancelled.
5. Any MLA/MP who defects shall be barred from contesting elections and holding public office for 20 years.

### Eligibility — Who Can Join?
Four requirements: Unemployed, Lazy, Chronically online, and the ability to rant professionally. No checks on religion, caste, or gender.

### Petition — Sack the Education Minister
A dedicated `/sack` page for filing a petition to demand accountability from the Education Minister.

<img src="public/Cockroach%20Janta%20Party%20Petition%20to%20sack%20the%20Education%20Minister.gif" alt="Cockroach Janta Party Petition to sack the Education Minister" width="250">


### Contact
Embedded Google Form for joining, volunteering, or getting in touch. Contact details and founder information.

<p align="center">
  <img src="public/banner.webp" alt="Cockroach Janta Party Banner" width="100%">
</p>

## Security & Brand Protection

### Zero-Donation Policy
CJP is a satirical, 100% free, zero-sponsor initiative. We never solicit donations, charge registration fees, or request banking details. Any site asking for payments under our name is fraudulent.

### Official Domains
The active official domains are **[cockroachjantaparty.org](https://cockroachjantaparty.org)** and **[cjpgenz.com](https://cjpgenz.com)** (along with their subdomains `petition.cockroachjantaparty.org` and `petition.cjpgenz.com`). They are mirrored safe resources, safely excluded from our threat database, and actively used for hosting CJP platforms.

### Automated Lookalike Domain Scanner
Due to the viral growth of the movement, threat actors have registered lookalike/typo-squatted domains to conduct financial fraud. We maintain an automated scanner script to monitor, detect, and record these malicious sites.

* **Master Threat Database:** [flagged_domains.json](scripts/flagged_domains.json)
* **Lookalike Permutation Generator & DNS Resolver:** [scan_and_update.py](scripts/scan_and_update.py)

#### Run the Scanner:
To execute a concurrent DNS resolution scan for over 1,100+ potential domain variations in parallel (takes ~5 seconds), run:
```bash
pnpm scan
```
The script will automatically detect new active threat domains on the network, record them inside `scripts/flagged_domains.json`, and synchronize the list inside `public/llms-full.txt` automatically.

### Whitelist / Domain Removal Request
If your domain has been automatically flagged but is a **legitimate fan project**, has been **repurposed**, or was **incorrectly flagged**:
1. Open a **[Whitelist & Removal Issue](https://github.com/cjpgenz/cjpgenz/issues/new?template=domain-removal.md)**.
2. Provide a link or proof showing the site is a free, benign community project or has been repurposed.
3. The security team will review and remove the domain from `flagged_domains.json`.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Package Manager:** pnpm

## Getting Started

```bash
# Install dependencies
pnpm install

# Run the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build

```bash
pnpm build
pnpm start
```

## Routes

| Route        | Description                                |
| ------------ | ------------------------------------------ |
| `/`          | Main landing page with all sections        |
| `/sack`      | Petition to sack the Education Minister    |

## Connect

- **Email:** contact@cockroachjantaparty.org
- **Twitter / X:** [@CJP_2029](https://x.com/CJP_2029)
- **Instagram:** [@cockroachjantaparty](https://www.instagram.com/cockroachjantaparty/)
- **Founder:** Abhijeet Dipke (Founder & Convenor)
