import '../styles/TaskItem.css';

export default function TaskItem({ task, onToggleComplete, onEdit, onDelete }) {
  const isCompleted = task.status === 'completed';
  

 return (
    <div className={`task-item ${isCompleted ? 'completed' : ''}`}>


      <div className="task-content">
        <div className="task-header">
          <h3 className={isCompleted ? 'strikethrough' : ''}>{task.title}</h3>
        </div>
        
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        
        <div className="task-meta">
          
          <span className={`status-badge ${isCompleted ? 'status-completed' : 'status-pending'}`}>
            {isCompleted ? 'Completed' : 'Pending'}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button
          className="btn btn-sm btn-edit"
          onClick={() => onEdit(task)}
          title="Edit task"
        > Edit
        </button>
        <button
          className="btn btn-sm btn-delete"
          onClick={() => onDelete(task._id)}
          title="Delete task"
        > Delete
        </button>
      </div>
    </div>
  );
}
