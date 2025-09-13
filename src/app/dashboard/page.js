"use client";
import { useEffect, useState } from "react";
import TaskModal from "@/components/TaskModal/TaskModal";
import TaskCard from "@/components/TaskCard/TaskCard";
import "./dashboard.css";
import { useAuth } from "@/context/AuthContext";
import { deleteTaskService, getTasks, updateTaskService } from "@/api/tasks";

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("taskId", id);
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("taskId");
    const originalTasks = [...tasks];
    const updatedTasks = tasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t));
    setTasks(updatedTasks);
    try {
      await updateTaskService(id, { status: newStatus });
    } catch (error) {
      setTasks(originalTasks);
      console.error("Error updating task status:", error);
    }
  };

  const allowDrop = (e) => e.preventDefault();

  const handleDelete = async (id) => {
    const originalTasks = [...tasks];
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
    try {
      await deleteTaskService(id);
      setSelectedTask(null);
    } catch (error) {
      setTasks(originalTasks);
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    async function fetchTasks() {
      const tasks = await getTasks();
      const normilizedTasks = tasks.map((t) => ({
        ...t,
        id: t._id,
      }));
      setTasks(normilizedTasks);
    }
    fetchTasks();
  }, []);

  return (
    <div className="dashboardContainer">
      {isAuthenticated ? (
        <>
          <h2>Dashboard</h2>
          <div className="boardContainer">
            {["todo", "in_progress", "done"].map((status) => (
              <div
                className="statusColumn"
                key={status}
                onDrop={(e) => handleDrop(e, status)}
                onDragOver={allowDrop}
              >
                <h3 style={{ textTransform: "uppercase" }}>
                  {status.replace("_", " ")}
                </h3>
                {tasks
                  .filter((t) => t.status === status)
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      onClick={() => setSelectedTask(task)}
                    />
                  ))}
              </div>
            ))}
          </div>
          {selectedTask && (
            <TaskModal
              task={selectedTask}
              onDelete={handleDelete}
              onClose={() => setSelectedTask(null)}
            />
          )}
        </>
      ) : (
        <p>Please log in to view your dashboard.</p>
      )}
    </div>
  );
}
