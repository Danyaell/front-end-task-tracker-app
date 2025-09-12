import "./TaskCard.css";

export default function TaskCard({ task, onClick, onDragStart }) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className="taskCardContainer"
    >
      <h4>{task.title}</h4>
      <p>
        <strong>Description:</strong> {task.description}
      </p>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <p>
        <strong>Assignee:</strong> {task.assignedTo}
      </p>
      <p>
        <strong>Created:</strong> {task.createdAt}
      </p>
      <p>
        <strong>Due:</strong> {task.dueDate}
      </p>
    </div>
  );
}
