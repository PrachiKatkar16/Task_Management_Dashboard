import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Header.css';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call logout endpoint if it exists, otherwise just redirect
      await axios.post('http://localhost:3000/api/auth/logout', {}, {
        withCredentials: true,
      });
    } catch (err) {
      console.log('Logout endpoint not available, redirecting...');
    }
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>Task Management Dashboard</h1>
        <div className="header-right">
          <span className="user-info">Welcome!</span>
          <button className="btn btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
