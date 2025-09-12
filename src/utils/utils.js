import { API_URL } from "@/utils/consts";

export async function apiFetch(endpoint, options = {}) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      ...options,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "API request failed.");
    }
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "API request failed.");
  }
}
