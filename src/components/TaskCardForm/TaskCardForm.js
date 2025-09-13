import { useState } from "react";
import "../TaskCard/TaskCard.css";

export default function TaskCardForm({ status, onCancel, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title,
      description,
      dueDate,
      status: status || "todo",
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <div className="taskCardContainer editing">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <div className="formActions">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
