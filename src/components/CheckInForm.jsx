import { useState } from "react";
import axios from "axios";
import { Smile, BarChart2, FileText, Send, Sparkles } from "lucide-react";

export default function CheckInForm() {
  const [mood, setMood] = useState(null);
  const [productivity, setProductivity] = useState(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood || !productivity) return;

    setLoading(true);
    try {
      await axios.post(
        "https://wellnesscheck-backend.onrender.com/checkins",
        {
          mood,
          productivity,
          notes,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const moodEmojis = ["😫", "😞", "😐", "🙂", "😄"];
  const productivityOptions = [
    { value: "Low", label: "Low", icon: "🔴" },
    { value: "Medium", label: "Medium", icon: "🟡" },
    { value: "High", label: "High", icon: "🟢" },
  ];

  return (
    <div className="w-full max-w-xl">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl blur-lg opacity-75"></div>
        <div className="relative bg-zinc-800/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-zinc-700/50">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-4 rounded-2xl shadow-lg">
              <Sparkles size={32} className="text-zinc-900" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-white to-amber-300 text-transparent bg-clip-text">
            Daily Check-In
          </h2>
          <p className="text-center text-zinc-400 mb-8">
            Track your mood and productivity today
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mood Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Smile className="text-amber-500" size={24} />
                <h3 className="text-xl font-medium text-white">How are you feeling today?</h3>
              </div>
              <div className="bg-zinc-700/50 backdrop-blur-md p-4 rounded-xl border border-zinc-600/50">
                <div className="flex justify-between items-center gap-2">
                  {moodEmojis.map((emoji, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setMood(index + 1)}
                      className={`text-3xl p-3 transition-all hover:scale-110 rounded-xl ${
                        mood === index + 1
                          ? "bg-gradient-to-r from-amber-500/30 to-amber-600/30 ring-2 ring-amber-500"
                          : "hover:bg-zinc-600/50"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Productivity Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <BarChart2 className="text-amber-500" size={24} />
                <h3 className="text-xl font-medium text-white">Today's productivity?</h3>
              </div>
              <div className="bg-zinc-700/50 backdrop-blur-md p-4 rounded-xl border border-zinc-600/50">
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  {productivityOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setProductivity(option.value)}
                      className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                        productivity === option.value
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-900"
                          : "bg-zinc-700/50 hover:bg-zinc-600/50 text-white"
                      }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>{option.icon}</span>
                        <span>{option.label}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FileText className="text-amber-500" size={24} />
                <h3 className="text-xl font-medium text-white">Additional notes</h3>
              </div>
              <div className="relative">
                <textarea
                  className="w-full p-4 rounded-xl bg-zinc-700/50 backdrop-blur-md border border-zinc-600/50 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-zinc-400 transition-all outline-none text-base min-h-32"
                  placeholder="Share your thoughts (optional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !mood || !productivity}
              className="w-full py-3 px-4 mt-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-900 font-medium rounded-xl transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-lg"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 rounded-full border-2 border-zinc-900 border-t-transparent animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : success ? (
                <>
                  <span>Submitted</span>
                  <span className="text-xl">✅</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Submit Check-in</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}