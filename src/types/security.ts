export interface FlaggedDomain {
  domain: string;
  url: string;
  reason: string;
  risk_level: string;
  category: string;
  detected_activities: string[];
}
