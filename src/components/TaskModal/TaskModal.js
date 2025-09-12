import "./TaskModal.css";

export default function TaskModal({ task, onDelete, onClose }) {
  return (
    <div className="modalOverlay">
      <div className="modalContainer">
        <h2>{task.title}</h2>
        <p>
          <strong>Descripción:</strong> {task.description}
        </p>
        <p>
          <strong>Estatus:</strong> {task.status}
        </p>
        <p>
          <strong>Asignado a:</strong> {task.assignedTo}
        </p>
        <p>
          <strong>Creada:</strong> {task.createdAt}
        </p>
        <p>
          <strong>Vence:</strong> {task.dueDate}
        </p>

        <button className="deleteButton" onClick={() => onDelete(task.id)}>
          Delete
        </button>
        <button onClick={onClose} className="closeButton">
          Cerrar
        </button>
      </div>
    </div>
  );
}
