import React from "react";
import type { Metadata } from "next";
import Ticker from "@/components/Ticker";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Are You Coming? — To Jantar Mantar · June 6",
  description:
    "Abhijeet Dipke is coming to India on June 6. Register if you're coming to Jantar Mantar to demand Dharmendra Pradhan's resignation.",
  keywords: [
    "Operation Show Up",
    "Jantar Mantar Protest",
    "Abhijeet Dipke",
    "Dharmendra Pradhan Resignation",
    "June 6 Delhi Protest",
    "NEET Protest Jantar Mantar",
    "Right to Assemble India",
  ],
  alternates: {
    canonical: "/6june",
  },
  openGraph: {
    title: "Are You Coming? — To Jantar Mantar · June 6",
    description:
      "Abhijeet Dipke is coming to India on June 6. Register if you're coming to Jantar Mantar to demand Dharmendra Pradhan's resignation.",
    url: "/6june",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "Are You Coming? — June 6 Protest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Are You Coming? — To Jantar Mantar · June 6",
    description:
      "Abhijeet Dipke is coming to India on June 6. Register if you're coming to Jantar Mantar to demand Dharmendra Pradhan's resignation.",
    images: ["/banner.webp"],
  },
};

export default function June6Page() {
  const siteUrl = process.env.NEXT_PUBLIC_CJP_SITE_URL;

  return (
    <div className="june6-body">
      <script
        type="application/ld+json"
        id="event-schema"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "Operation Show Up — Jantar Mantar Protest",
            "startDate": "2026-06-06T10:00:00+05:30",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "eventStatus": "https://schema.org/EventScheduled",
            "location": {
              "@type": "Place",
              "name": "Jantar Mantar",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Parliament Street",
                "addressLocality": "New Delhi",
                "addressRegion": "Delhi",
                "postalCode": "110001",
                "addressCountry": "IN"
              }
            },
            "image": [
              `${siteUrl}/banner.webp`
            ],
            "description": "Operation Show Up: A peaceful, constitutional protest demanding the resignation of Education Minister Dharmendra Pradhan. Schedule: 10:00 AM - Meet at Delhi Airport; 12:00 PM - Seek permission at Parliament Street Police Station; 2:00 PM - Protest at Jantar Mantar.",
            "organizer": {
              "@type": "Organization",
              "name": "Cockroach Janta Party",
              "url": siteUrl,
              "logo": `${siteUrl}/icon.svg`,
              "sameAs": [
                "https://x.com/Cockroachisback",
                "https://www.instagram.com/cockroachjantaparty/",
                "https://whatsapp.com/channel/0029VbBqF7S5fM5Rf1mRV540",
                "https://t.me/thecockroachchannel"
              ]
            },
            "performer": {
              "@type": "Person",
              "name": "Abhijeet Dipke",
              "jobTitle": "Founder & Convenor, Cockroach Janta Party",
              "sameAs": [
                "https://x.com/abhijeet_dipke",
                "https://www.instagram.com/abhijeetdipke/"
              ]
            },
            "audience": {
              "@type": "Audience",
              "audienceType": "Students, Youth, Volunteers"
            },
            "offers": {
              "@type": "Offer",
              "url": `${siteUrl}/6june`,
              "price": "0",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock",
              "validFrom": "2026-06-01T00:00:00+05:30"
            },
            "subEvent": [
              {
                "@type": "Event",
                "name": "Delhi Airport Meetup",
                "startDate": "2026-06-06T10:00:00+05:30",
                "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                "eventStatus": "https://schema.org/EventScheduled",
                "location": {
                  "@type": "Place",
                  "name": "Indira Gandhi International Airport",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "New Delhi",
                    "addressRegion": "Delhi",
                    "addressCountry": "IN"
                  }
                },
                "description": "Meet Abhijeet Dipke landing in Delhi."
              },
              {
                "@type": "Event",
                "name": "Protest Permission",
                "startDate": "2026-06-06T12:00:00+05:30",
                "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                "eventStatus": "https://schema.org/EventScheduled",
                "location": {
                  "@type": "Place",
                  "name": "Parliament Street Police Station",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Parliament Street",
                    "addressLocality": "New Delhi",
                    "addressRegion": "Delhi",
                    "addressCountry": "IN"
                  }
                },
                "description": "Seek official protest permission."
              },
              {
                "@type": "Event",
                "name": "Jantar Mantar Protest",
                "startDate": "2026-06-06T14:00:00+05:30",
                "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                "eventStatus": "https://schema.org/EventScheduled",
                "location": {
                  "@type": "Place",
                  "name": "Jantar Mantar",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Parliament Street",
                    "addressLocality": "New Delhi",
                    "addressRegion": "Delhi",
                    "postalCode": "110001",
                    "addressCountry": "IN"
                  }
                },
                "description": "Demand Dharmendra Pradhan's resignation."
              }
            ]
          })
        }}
      />
      <Ticker
        items={[
          "Operation Show Up · June 6 · Delhi",
          "Abhijeet is landing. Are you?",
          "The Education Minister hopes you stay home",
          "Article 19(1)(b) · Your Right to Protest",
          "Jantar Mantar · Parliament Street · Delhi",
          "Peaceful. Constitutional. Overdue.",
        ]}
      />

      <Header simple />

        {/* HERO */}
        <section className="hero">
          <div className="container-6j">
            <div className="hero-kicker">
              <span className="live-dot"></span>
              <span>Abhijeet Dipke · June 6 · Delhi</span>
            </div>
            <h1 className="hero-title">
              Are you
              <br />
              <em>showing up?</em>
            </h1>
            <p className="hero-body">
              Abhijeet Dipke is flying into Delhi on{" "}
              <strong>Saturday, June 6</strong>. We Protest together to demand
              the immediate resignation of Education Minister Dharmendra Pradhan
              — the man responsible for 1 Crore+ broken futures of students
              appearing in NEET, CBSE, CUET, and, SSC GD. This is peaceful. This
              is constitutional. Register below if you&apos;re coming.
            </p>

            {/* The Plan */}
            <div className="march-plan">
              <div className="march-step">
                <div className="step-num">1</div>
                <div>
                  <div className="step-text">Delhi Airport</div>
                  <div className="step-sub">Meet Abhijeet · June 6</div>
                </div>
              </div>
              <div className="march-step">
                <div className="step-num">2</div>
                <div>
                  <div className="step-text">
                    Parliament Street Police Station
                  </div>
                  <div className="step-sub">Seek protest permission</div>
                </div>
              </div>
              <div className="march-step">
                <div className="step-num">3</div>
                <div>
                  <div className="step-text">Jantar Mantar</div>
                  <div className="step-sub">Demand Pradhan&apos;s resignation</div>
                </div>
              </div>
            </div>

            <a href="#rsvp" className="hero-cta">
              I&apos;m Coming — Register Below →
            </a>
          </div>
        </section>

        {/* CONSTITUTIONAL PROVISION */}
        <section className="constitution">
          <div className="container-6j constitution-inner">
            <span className="constitution-eyebrow">
              Your Fundamental Right · Constitution of India · Part III
            </span>
            <h2 className="constitution-title">
              The Constitution
              <br />
              <em>backs every step.</em>
            </h2>

            <div className="articles">
              <div className="article-card article-card--highlight">
                <div className="article-num">Art. 19(1)(b)</div>
                <div className="article-title">Right to Assemble</div>
                <p className="article-quote">
                  &quot;All citizens shall have the right to assemble peaceably
                  and without arms.&quot;
                </p>
              </div>
              <div className="article-card">
                <div className="article-num">Art. 19(1)(a)</div>
                <div className="article-title">
                  Freedom of Speech &amp; Expression
                </div>
                <p className="article-quote">
                  &quot;All citizens shall have the right to freedom of speech
                  and expression.&quot;
                </p>
              </div>
            </div>

            <p className="constitution-note">
              ⚖ We are not breaking any law. We are exercising one. · Peaceful ·
              Unarmed · Constitutional
            </p>
          </div>
        </section>

        {/* RSVP FORM */}
        <section className="rsvp-section" id="rsvp">
          <div className="container-6j">
            <div className="rsvp-header">
              <span className="rsvp-eyebrow">
                Official Roll Call · Operation Show Up
              </span>
              <h2 className="rsvp-title">
                Tell us you&apos;re <em>coming.</em>
              </h2>
              <p className="rsvp-sub">
                Fill this out so we know how many cockroaches to expect. We
                won&apos;t share your details with anyone — especially not the
                Education Ministry.
              </p>
              <p className="rsvp-disclaimer">
                ⚠ &nbsp;Morally binding. Legally optional.
              </p>
            </div>

            <div className="rsvp-frame-wrap">
              <iframe
                id="rsvp-iframe"
                src="https://docs.google.com/forms/d/e/1FAIpQLSfBzLIfRUPvn9iMJMY_3v_gIxpqwD7kY8F7I0IHp41h_CBn6w/viewform?embedded=true"
                width="100%"
                height="1080"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                loading="lazy"
                title="June 6 Protest RSVP Form"
              >
                Loading…
              </iframe>
            </div>

            <p className="rsvp-note">
              Submitted? Now drag one friend along. And that uncle who says
              &quot;politics mein kya rakha hai.&quot;
            </p>
          </div>
        </section>

      <Footer />
      </div>
  );
}
