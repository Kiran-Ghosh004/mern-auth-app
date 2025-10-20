import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RefreshHandler = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);

      // If user is on login, signup, or root, redirect to home
      if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
        navigate("/home", { replace: true });
      }
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
};

export default RefreshHandler;
