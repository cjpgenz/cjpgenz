import type { Metadata } from "next";
import SackPetitionClient from "./SackPetitionClient";

export const metadata: Metadata = {
  title: "Petition to Sack the Education Minister",
  description:
    "Sign the CJP petition demanding accountability from the Education Minister. Join thousands of students and unemployed youth in calling for change.",
  keywords: [
    "sack education minister",
    "education minister petition",
    "CJP petition",
    "CJP GenZ petition",
    "Cockroach Janta Party petition",
    "student petition India",
    "education reform petition",
    "fire education minister",
    "remove education minister",
    "accountability education India",
  ],
  alternates: {
    canonical: "/sack",
  },
  openGraph: {
    title: "Petition to Sack the Education Minister — CJP",
    description:
      "Sign the CJP petition demanding accountability from the Education Minister. Join thousands in calling for change.",
    url: "/sack",
    images: [
      {
        url: "/education_minister.webp",
        width: 800,
        height: 600,
        alt: "Sack the Education Minister — CJP Petition",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Petition to Sack the Education Minister — CJP",
    description:
      "Sign the CJP petition demanding accountability. Join the swarm.",
    images: ["/education_minister.webp"],
  },
};

export default function SackPetitionPage() {
  return <SackPetitionClient />;
}
