// main.jsx
import React, { createContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true); // Loading until we know auth state

  const checkAuth = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/patient/me", // 👈 check if this URL is correct
        { withCredentials: true }
      );
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      setUser({});
      setIsAuthenticated(false);
    } finally {
      setLoading(false); // Loading done
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
