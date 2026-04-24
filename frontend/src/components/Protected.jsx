import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // Check for session flag
      if (!sessionStorage.getItem('session_active')) {
        // Clear cookie on backend
        await axios.get('http://localhost:3000/api/auth/logout', { withCredentials: true });
        setIsAuth(false);
        setLoading(false);
        return;
      }

      try {
        await axios.get('http://localhost:3000/api/auth/me', { withCredentials: true });
        setIsAuth(true);
      } catch (err) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!isAuth) return <Navigate to="/login" />;
  return children;
}