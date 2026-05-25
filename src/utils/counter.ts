const NAMESPACE = process.env.NEXT_PUBLIC_CJP_COUNTER_NAMESPACE || "cjpgenz";
const BASE_URL = "https://countapi.mileshilliard.com/api/v1";

// Construct a highly unique key to avoid collisions in the global CountAPI space
export const COUNTER_KEY = `${NAMESPACE}_visitors`;

export interface CountApiResponse {
  key: string;
  value: number;
  message?: string;
}

/**
 * Fetches the current value of a counter.
 */
export async function fetchCounterValue(key: string): Promise<number | null> {
  try {
    const res = await fetch(`${BASE_URL}/get/${key}`, {
      method: "GET",
      headers: { "Accept": "application/json" }
    });
    if (!res.ok) return null;
    const data: CountApiResponse = await res.json();
    return data.value;
  } catch {
    return null;
  }
}

/**
 * Increments the counter by 1.
 */
export async function incrementCounterValue(key: string): Promise<number | null> {
  try {
    const res = await fetch(`${BASE_URL}/hit/${key}`, {
      method: "GET",
      headers: { "Accept": "application/json" }
    });
    if (!res.ok) return null;
    const data: CountApiResponse = await res.json();
    return data.value;
  } catch {
    return null;
  }
}
