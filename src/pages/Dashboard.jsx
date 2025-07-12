import { useState, useEffect } from "react";
import WeeklyMoodChart from "../components/WeeklyMoodChart";
import ProductivitySummary from "../components/ProductivitySummary";
import AlertList from "../components/AlertList";
import Navbar from "../components/Navbar";
import { Sparkles, BarChart2, Bell, User, LogOut } from "lucide-react";
import { parseJwt } from "../utils/parseJwt";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const [username, setUsername] = useState("Name");
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    const loggedUserString = localStorage.getItem("user");
    if (loggedUserString) {
      const loggedUser = JSON.parse(loggedUserString);
      if (loggedUser?.name) {
        setUsername(loggedUser.name);
      }
    }
  }
}, []);
  

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-600/20 via-transparent to-transparent">
      {/* <Navbar /> */}
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-3 rounded-xl shadow-lg">
              <Sparkles size={24} className="text-zinc-900" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-amber-300 text-transparent bg-clip-text">
                WellnessCheck
              </h1>
              <p className="text-zinc-400">
                Welcome back, {username}
              </p>
            </div>
          </div>
          
          <div className="bg-zinc-800/70 backdrop-blur-md px-4 py-2 rounded-lg border border-zinc-700/50 flex items-center gap-2">
            <User size={16} className="text-amber-400" />
            <span className="text-zinc-300 text-sm">
              Last check-in: <span className="text-amber-400 font-medium">Today, 9:45 AM</span>
            </span>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-amber-400 to-amber-600 text-zinc-900 px-4 py-2 rounded-lg flex items-center gap-2 font-medium shadow-lg shadow-amber-600/20 hover:shadow-amber-600/30 hover:scale-105 transition-all"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Weekly Mood Chart Card */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl blur-lg opacity-30"></div>
            <div className="relative bg-zinc-800/90 backdrop-blur-xl rounded-xl shadow-2xl border border-zinc-700/50 overflow-hidden">
              <div className="p-4 border-b border-zinc-700/50 flex items-center gap-3">
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2 rounded-lg">
                  <BarChart2 size={18} className="text-zinc-900" />
                </div>
                <h2 className="text-lg font-semibold text-white">Weekly Mood Trends</h2>
              </div>
              <div className="p-4">
                <WeeklyMoodChart />
              </div>
            </div>
          </div>

          {/* Productivity Summary Card */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-500 rounded-2xl blur-lg opacity-30"></div>
            <div className="relative bg-zinc-800/90 backdrop-blur-xl rounded-xl shadow-2xl border border-zinc-700/50 overflow-hidden">
              <div className="p-4 border-b border-zinc-700/50 flex items-center gap-3">
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2 rounded-lg">
                  <BarChart2 size={18} className="text-zinc-900" />
                </div>
                <h2 className="text-lg font-semibold text-white">Productivity Insights</h2>
              </div>
              <div className="p-4">
                <ProductivitySummary />
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Card */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl blur-lg opacity-30"></div>
          <div className="relative bg-zinc-800/90 backdrop-blur-xl rounded-xl shadow-2xl border border-zinc-700/50 overflow-hidden">
            <div className="p-4 border-b border-zinc-700/50 flex items-center gap-3">
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2 rounded-lg">
                <Bell size={18} className="text-zinc-900" />
              </div>
              <h2 className="text-lg font-semibold text-white">Weekly Alerts</h2>
            </div>
            <div className="p-4">
              <AlertList />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-700/50">
          <p className="text-zinc-500 text-xs text-center">
            © 2025 WellnessCheck. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}