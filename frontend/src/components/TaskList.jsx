import TaskItem from './TaskItem';
import '../styles/TaskList.css';

export default function TaskList({ tasks, onToggleComplete, onEdit, onDelete }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
