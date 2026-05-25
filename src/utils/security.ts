import flaggedData from "../../scripts/flagged_domains.json";
import { FlaggedDomain } from "@/types/security";

export interface VerificationResult {
  status: "EMPTY" | "SAFE" | "FLAGGED" | "EXTERNAL";
  domain: string;
  data?: FlaggedDomain;
}

/**
 * Classifies and computes dynamic threat metrics from the domain intelligence database
 */
export function getThreatMetrics(flaggedDomains: FlaggedDomain[]) {
  const total = flaggedDomains.length;
  
  const financial = flaggedDomains.filter((item) =>
    /donation|financial|upi|fee|payment|money|merchandise/i.test(item.category || "") ||
    /donation|financial|upi|fee|payment|money|merchandise/i.test(item.reason || "")
  ).length;
  
  const phishing = flaggedDomains.filter((item) =>
    /phishing|credential|identity|theft|harvesting/i.test(item.category || "") ||
    /phishing|credential|identity|theft|harvesting/i.test(item.reason || "")
  ).length;
  
  const malware = flaggedDomains.filter((item) =>
    /malware|adware|spyware|redirect|hijack/i.test(item.category || "") ||
    /malware|adware|spyware|redirect|hijack/i.test(item.reason || "")
  ).length;

  return { total, financial, phishing, malware };
}

/**
 * Formats a raw URL/domain input and screens it against official and threat registers
 */
export function verifyDomainUrl(input: string, flaggedDomains: FlaggedDomain[]): VerificationResult {
  let domain = input.trim().toLowerCase();
  if (!domain) return { status: "EMPTY", domain: "" };

  // Remove protocol prefix (http://, https://) and www.
  domain = domain.replace(/^(https?:\/\/)?(www\.)?/, "");
  // Extract only the domain part (strip path, query parameters, port numbers)
  domain = domain.split("/")[0].split(":")[0];

  if (!domain) return { status: "EMPTY", domain: "" };

  // Dynamically load official domains from the master database config
  const officialDomains = flaggedData.investigation_metadata?.legitimate_domains_excluded || [];

  const isOfficial = officialDomains.some(
    (d) => domain === d.toLowerCase() || domain.endsWith("." + d.toLowerCase())
  );
  if (isOfficial) {
    return { status: "SAFE", domain };
  }

  // Cross-reference with the flagged domains threat database (supporting subdomains)
  const matchedFlagged = flaggedDomains.find(
    (item) => {
      const flaggedDomain = item.domain.toLowerCase();
      return domain === flaggedDomain || domain.endsWith("." + flaggedDomain);
    }
  );
  if (matchedFlagged) {
    return { status: "FLAGGED", domain, data: matchedFlagged };
  }

  // Not official and not a known threat, but belongs to external web space
  return { status: "EXTERNAL", domain };
}
