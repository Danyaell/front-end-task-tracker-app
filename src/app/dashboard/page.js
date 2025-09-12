"use client";
import { useState } from "react";
import TaskModal from "@/components/TaskModal/TaskModal";
import TaskCard from "@/components/TaskCard/TaskCard";
import "./dashboard.css";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Configure login",
      description: "Implement JWT auth",
      status: "todo",
      assignedTo: "Danyaell",
      createdAt: "2025-09-11",
      dueDate: "2025-09-18",
    },
    {
      id: 2,
      title: "Landing page",
      description: "Design public page",
      status: "in-progress",
      assignedTo: "Alex",
      createdAt: "2025-09-10",
      dueDate: "2025-09-15",
    },
    {
      id: 3,
      title: "Tasks CRUD",
      description: "Create CRUD api for tasks",
      status: "done",
      assignedTo: "Sofia",
      createdAt: "2025-09-05",
      dueDate: "2025-09-12",
    },
  ]);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("taskId", id);
  };

  const handleDrop = (e, newStatus) => {
    const id = e.dataTransfer.getData("taskId");
    setTasks(
      tasks.map((t) => (t.id === Number(id) ? { ...t, status: newStatus } : t))
    );
  };

  const allowDrop = (e) => e.preventDefault();

  const handleDelete = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    setSelectedTask(null);
  };

  return (
    <div className="dashboardContainer">
      <h2>Dashboard</h2>
      <div className="boardContainer">
        {["todo", "in-progress", "done"].map((status) => (
          <div
            className="statusColumn"
            key={status}
            onDrop={(e) => handleDrop(e, status)}
            onDragOver={allowDrop}
          >
            <h3 style={{ textTransform: "uppercase" }}>
              {status.replace("-", " ")}
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
    </div>
  );
}
