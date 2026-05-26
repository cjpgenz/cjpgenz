import { DEFAULT_STATS, API_BASE_URL } from "@/constants/data";

export interface APIResponse {
  success: boolean;
  count: number;
  timestamp?: string;
}

export async function getPetitionCount(): Promise<number> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/petition.php?action=get`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data: APIResponse = await res.json();
      if (data.success && typeof data.count === "number") {
        return data.count;
      }
    }
  } catch (err) {
    // console.error("Failed to fetch live petition count server-side:", err);
  }
  return DEFAULT_STATS.PETITION_COUNT;
}

export async function getMembersCount(): Promise<number> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/members.php?action=get`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data: APIResponse = await res.json();
      if (data.success && typeof data.count === "number") {
        return data.count;
      }
    }
  } catch (err) {
    // console.error("Failed to fetch live members count server-side:", err);
  }
  return DEFAULT_STATS.MEMBERS_COUNT;
}

export async function getVisitorsCount(): Promise<number> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/counter.php?action=get`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data: APIResponse = await res.json();
      if (data.success && typeof data.count === "number") {
        return data.count;
      }
    }
  } catch (err) {
    // console.error("Failed to fetch live visitors count server-side:", err);
  }
  return DEFAULT_STATS.VISITORS_COUNT;
}
