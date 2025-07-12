import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import api from "../services/api";
import { parseJwt } from "../utils/parseJwt";

const moodEmoji = {
  1: "😫",
  2: "😞",
  3: "😐",
  4: "🙂",
  5: "😄",
};

export default function WeeklyMoodChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCheckIns = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = parseJwt(token);
        const userId = user?.UserId;

        if (!userId) return;

        const res = await api.get(`/users/${userId}/checkins`);
        const checkIns = res.data;

        // Agrupar por dia da semana
        const grouped = {};

        checkIns.forEach((checkIn) => {
          const date = new Date(checkIn.createdAt);
          const day = date.toLocaleDateString("en-US", { weekday: "short" });

          if (!grouped[day]) grouped[day] = [];
          grouped[day].push(checkIn.mood);
        });

        // Calcular média por dia
        const processed = Object.entries(grouped).map(([day, moods]) => ({
          day,
          mood: (
            moods.reduce((acc, val) => acc + val, 0) / moods.length
          ).toFixed(1),
        }));

        setData(processed);
      } catch (err) {
        console.error("Failed to load check-ins", err);
      }
    };

    fetchCheckIns();
  }, []);

  return (
    <div className="bg-zinc-800 p-4 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Weekly Mood 😊</h2>

      {data.length === 0 ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="day" stroke="#ccc" />
            <YAxis
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tickFormatter={(v) => moodEmoji[Math.round(v)]}
              stroke="#ccc"
            />
            <Tooltip
              formatter={(v) => `${moodEmoji[Math.round(v)]} (${v})`}
              labelStyle={{ color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#4ade80"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
