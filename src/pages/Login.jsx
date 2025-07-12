import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { User, Lock, Sparkles } from "lucide-react";

export default function Login({ updateUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    
    if (token && userString) {
      try {
        const user = JSON.parse(userString);
        const role = user?.role?.toLowerCase();
        
        if (role === "admin") {
          navigate("/dashboard");
        } else if (role === "employee") {
          navigate("/checkin");
        }
      } catch (error) {
        console.error("Erro ao verificar login:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, [navigate]);

  const getErrorMessage = (error) => {
    if (error.response?.status === 401) {
      return "Incorrect email or password";
    }
    if (error.response?.status === 404) {
      return "Service unavailable at the moment";
    }
    if (error.response?.status >= 500) {
      return "Internal server error. Please try again in a few minutes";
    }
    if (error.code === 'NETWORK_ERROR' || error.message.includes('Network')) {
      return "Connection error. Please check your internet";
    }
    return "Login failed. Please try again";
  };

  const performLogin = async (loginEmail, loginPassword) => {
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });
      
      const { token, user } = res.data;

      if (!token || !user) {
        throw new Error("Invalid Credentials");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (updateUser) {
        updateUser(user);
      }

      const role = user?.role?.toLowerCase() || "";
      
      if (role === "admin") {
        navigate("/dashboard", { replace: true });
      } else if (role === "employee") {
        navigate("/checkin", { replace: true });
      } else {
        console.warn("Role unkonwn:", role);
        navigate("/checkin", { replace: true });
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    performLogin(email, password);
  };

  const loginAsAdmin = () => {
    setError("");
    performLogin("admin@wellness.com", "admin123");
  };
  
  const loginAsEmployee = () => {
    setError("");
    performLogin("employee@example.com", "employee123");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-900 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-600/20 via-transparent to-transparent">
      <div className="w-full max-w-md">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl blur-lg opacity-75"></div>
          <div className="relative bg-zinc-800/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-zinc-700/50">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-4 rounded-2xl shadow-lg">
                <Sparkles size={32} className="text-zinc-900" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-white to-amber-300 text-transparent bg-clip-text">
              WellnessCheck
            </h2>
            <p className="text-center text-zinc-400 mb-8">
              Because productivity starts with well-being
            </p>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="relative">
                <User className="absolute left-3 top-3 text-zinc-400" size={20} />
                <input
                  type="email"
                  placeholder="E-mail"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full p-3 pl-10 rounded-lg bg-zinc-700/50 backdrop-blur-md border border-zinc-600/50 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-zinc-400 transition-all outline-none text-lg disabled:opacity-50"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-zinc-400" size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full p-3 pl-10 rounded-lg bg-zinc-700/50 backdrop-blur-md border border-zinc-600/50 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-zinc-400 transition-all outline-none text-lg disabled:opacity-50"
                />
              </div>
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-900 font-medium rounded-lg transition-all duration-200 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading && (
                  <div className="w-5 h-5 rounded-full border-2 border-zinc-900 border-t-transparent animate-spin mr-2"></div>
                )}
                {loading ? "Logging in..." : "Login"}
              </button>
              <div className="grid grid-cols-1 gap-3 mt-6">
                <div className="text-center text-zinc-400 text-sm mb-2">
                  Quick login for demonstration
                </div>
                <button
                  type="button"
                  onClick={loginAsEmployee}
                  disabled={loading}
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    <User size={18} />
                    <span>Login as Employee</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={loginAsAdmin}
                  disabled={loading}
                  className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    <Sparkles size={18} />
                    <span>Login as Administrator</span>
                  </div>
                </button>
              </div>
            </form>
            <div className="mt-8 pt-6 border-t border-zinc-700/50">
              <p className="text-zinc-500 text-xs text-center">
                © 2025 WellnessCheck. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}