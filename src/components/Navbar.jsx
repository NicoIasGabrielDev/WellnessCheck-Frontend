import { useNavigate, Link } from "react-router-dom";
import { parseJwt } from "../utils/parseJwt";
import { BarChart2, Calendar, LogOut, Sparkles } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = token ? parseJwt(token) : null;

  const role =
    user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-zinc-800/80 backdrop-blur-md border-b border-zinc-700/50 px-6 py-4 sticky top-0 z-10 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="bg-gradient-to-r from-amber-400 to-amber-600 p-2 rounded-lg">
            <Sparkles size={20} className="text-zinc-900" />
          </span>
          <span className="font-bold text-xl bg-gradient-to-r from-white to-amber-300 text-transparent bg-clip-text">
            WellnessCheck
          </span>
        </div>

        <div className="flex items-center gap-5">
          {role === "Admin" && (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-700/50 transition-all"
            >
              <BarChart2 size={18} className="text-amber-400" />
              <span>Dashboard</span>
            </Link>
          )}

          {role === "Employee" && (
            <Link
              to="/checkin"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-700/50 transition-all"
            >
              <Calendar size={18} className="text-amber-400" />
              <span>Check-In</span>
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-amber-400 to-amber-600 text-zinc-900 px-4 py-2 rounded-lg flex items-center gap-2 font-medium shadow-lg shadow-amber-600/20 hover:shadow-amber-600/30 hover:scale-105 transition-all"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}