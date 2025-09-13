import { apiFetch } from "@/utils/utils";

export async function getTasks() {
  try {
    return await apiFetch("/tasks", { method: "GET" });
  } catch (error) {
    return { error: error.message || "Failed to fetch user." };
  }
}

export async function updateTaskService(id, data) {
  try {
    return await apiFetch(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  } catch (error) {
    return { error: error.message || "Failed to update task." };
  }
}

export async function deleteTaskService(id) {
  try {
    return await apiFetch(`/tasks/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    return { error: error.message || "Failed to delete task." };
  }
}
