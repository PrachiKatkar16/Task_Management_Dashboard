import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import FilterButtons from '../components/FilterButtons';
import TaskList from '../components/TaskList';
import '../styles/Dashboard.css';

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  
 
  const fetchTasks = async () => {
  try {
    setLoading(true);

    const response = await axios.get('http://localhost:3000/api/task/', {
      withCredentials: true,
    });

    setTasks(response.data.tasks || []);
    setError('');

  } catch (err) {
    if (err.response?.status === 401) {
      navigate('/login'); 
      return;
    }

    setError('Failed to load tasks');
    console.error(err);
  } finally {
    setLoading(false);
  }
};
    useEffect(() => {
    fetchTasks();
    }, []);


  const handleAddTask = async (taskData) => {
    try {
      await axios.post('http://localhost:3000/api/task/create', taskData, {
        withCredentials: true,
      });

      setShowForm(false);
      fetchTasks();
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await axios.put(`http://localhost:3000/api/task/update/${editingTask._id}`, taskData, {
        withCredentials: true,
      });

      setEditingTask(null);
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/task/delete/${taskId}`, {
        withCredentials: true,
      });

      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await axios.put(`http://localhost:3000/api/task/update/${task._id}`, {
        ...task,
        status: task.status === 'completed' ? 'pending' : 'completed',
      }, {
        withCredentials: true,
      });

      fetchTasks();
    } catch (err) {
      console.error('Error toggling task:', err);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'pending') return task.status === 'pending';
    return true;
  });

  return (
    <div className="dashboard">
      <Header />
      
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>My Tasks</h2>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setEditingTask(null);
              setShowForm(true);
            }}
          >
            + New Task
          </button>
        </div>

        {showForm && (
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ? handleUpdateTask : handleAddTask}
            onClose={handleCloseForm}
          />
        )}

        <FilterButtons filter={filter} setFilter={setFilter} />

        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading">Loading tasks...</div>}

        {!loading && filteredTasks.length === 0 && (
          <div className="empty-state">
            <p>No {filter !== 'all' ? filter : ''} tasks yet. Create one to get started!</p>
          </div>
        )}

        {!loading && filteredTasks.length > 0 && (
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        )}
      </div>
    </div>
  );
}
