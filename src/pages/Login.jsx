import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { User, Lock, Sparkles } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;
      debugger
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);

    if (user.role === "admin") {
      navigate("/dashboard"); 
    } else {
      navigate("/checkin"); 
    }

  } catch (err) {
    setError("Invalid credentials or server offline.");
    console.error(err);
  } finally {
    setLoading(false);
  }
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 pl-10 rounded-lg bg-zinc-700/50 backdrop-blur-md border border-zinc-600/50 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-zinc-400 transition-all outline-none text-lg"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-zinc-400" size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pl-10 rounded-lg bg-zinc-700/50 backdrop-blur-md border border-zinc-600/50 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-zinc-400 transition-all outline-none text-lg"
                  required
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
                {loading ? (
                  <div className="w-5 h-5 rounded-full border-2 border-zinc-900 border-t-transparent animate-spin mr-2"></div>
                ) : null}
                {loading ? "Logging in..." : "Login"}
              </button>
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