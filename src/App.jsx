import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import CheckIn from "./pages/CheckIn";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    
    if (token && userString) {
      try {
        const parsedUser = JSON.parse(userString);
        setUser(parsedUser);
      } catch (error) {
        console.error("Erro ao parsear usuário:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // Função para atualizar o usuário após login
  const updateUser = (newUser) => {
    setUser(newUser);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  const role = user?.role?.toLowerCase();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login updateUser={updateUser} />} />

        <Route
          path="/checkin"
          element={
            <PrivateRoute>
              {role === "employee" ? <CheckIn /> : <Navigate to="/dashboard" />}
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              {role === "admin" ? <Dashboard /> : <Navigate to="/checkin" />}
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}