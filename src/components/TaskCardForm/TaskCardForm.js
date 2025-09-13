import { useState } from "react";
import "./TaskCardForm.css";

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
    <div className="taskCardContainer">
      <form onSubmit={handleSubmit} className="formContainer">
        <input
          type="text"
          className="input"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="input"
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          className="input"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <div className="formActions">
          <button type="submit" className="submitButton">Save</button>
          <button type="button" className="cancelButton" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
