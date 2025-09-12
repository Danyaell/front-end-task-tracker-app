import { apiFetch } from "@/utils/utils";

export async function registerUserService(data) {
  try {
    return await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    return { error: error.message || "Registration failed." };
  }
}

export async function loginUserService(credentials) {
  try {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    return data;
  } catch (error) {
    return { error: error.message || "Login failed." };
  }
}

export async function getCurrentUserService() {
  try {
    return await apiFetch("/auth/me", { method: "GET" });
  } catch (error) {
    return { error: error.message || "Failed to fetch user." };
  }
}
