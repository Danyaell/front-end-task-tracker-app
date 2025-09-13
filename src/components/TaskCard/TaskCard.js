import "./TaskCard.css";

export default function TaskCard({ task, onClick, onDragStart }) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className="taskCardContainer"
    >
      <h4 className="taskTitle">{task.title}</h4>
      <p>
        <strong>Description:</strong> {task.description}
      </p>
      <p>
        <strong>Created:</strong> {new Date(task.createdAt).toLocaleDateString()}
      </p>
      <p>
        <strong>Due:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
      </p>
    </div>
  );
}
