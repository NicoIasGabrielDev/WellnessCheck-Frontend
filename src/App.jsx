import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import CheckIn from "./pages/CheckIn";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import { parseJwt } from "./utils/parseJwt";

export default function App() {
  const token = localStorage.getItem("token");
  const user = token ? parseJwt(token) : null;

  const role = user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/checkin"
          element={
            <PrivateRoute>
              {role === "Employee" ? <CheckIn /> : <Navigate to="/dashboard" />}
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              {role === "Admin" ? <Dashboard /> : <Navigate to="/checkin" />}
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
