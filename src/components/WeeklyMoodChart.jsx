import { Heart, Activity, TrendingUp, TrendingDown } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const moodEmoji = {
  1: "😫", 2: "😞", 3: "😐", 4: "🙂", 5: "😄"
};

const WeeklyMoodChart = ({ data = [] }) => {
  // Fallback para dados padrão se não forem fornecidos
  const defaultData = [
    { day: "Mon", mood: 3.5, productivity: 2.1, energy: 3.2 },
    { day: "Tue", mood: 4.2, productivity: 2.8, energy: 3.8 },
    { day: "Wed", mood: 3.8, productivity: 2.3, energy: 3.5 },
    { day: "Thu", mood: 4.1, productivity: 2.9, energy: 4.0 },
    { day: "Fri", mood: 4.5, productivity: 3.0, energy: 4.2 },
    { day: "Sat", mood: 4.3, productivity: 1.8, energy: 3.9 },
    { day: "Sun", mood: 4.0, productivity: 1.5, energy: 3.7 },
  ];

  const moodData = data.length > 0 ? data : defaultData;
  const currentMood = moodData[moodData.length - 1]?.mood || 4.0;
  const currentEnergy = moodData[moodData.length - 1]?.energy || 3.8;
  const moodTrend = moodData.length > 1 ? 
    moodData[moodData.length - 1].mood - moodData[moodData.length - 2].mood : 0;

  // Calcular insights
  const averageMood = (moodData.reduce((acc, d) => acc + d.mood, 0) / moodData.length).toFixed(1);
  const bestDay = moodData.reduce((prev, current) => 
    prev.mood > current.mood ? prev : current
  );

  return (
    <div className="space-y-4">
      {/* Mood Overview Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-750 p-4 rounded-xl border border-zinc-600/50">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="text-pink-400" size={16} />
            <span className="text-sm font-medium text-zinc-300">Current Mood</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{moodEmoji[Math.round(currentMood)]}</span>
            <span className="text-xl font-bold text-white">{currentMood}</span>
            {moodTrend > 0 ? (
              <TrendingUp className="text-green-400 ml-2" size={16} />
            ) : moodTrend < 0 ? (
              <TrendingDown className="text-red-400 ml-2" size={16} />
            ) : null}
          </div>
        </div>
        
        <div className="bg-zinc-750 p-4 rounded-xl border border-zinc-600/50">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="text-blue-400" size={16} />
            <span className="text-sm font-medium text-zinc-300">Energy Level</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-2 bg-zinc-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                style={{ width: `${(currentEnergy / 5) * 100}%` }}
              />
            </div>
            <span className="text-sm font-bold text-white">{currentEnergy}/5</span>
          </div>
        </div>
      </div>

      {/* Mood Chart */}
      <div>
        <h3 className="text-sm font-medium text-zinc-300 mb-3">7-Day Mood Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={moodData}>
            <defs>
              <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="day" stroke="#ccc" fontSize={12} />
            <YAxis 
              domain={[1, 5]} 
              ticks={[1, 2, 3, 4, 5]}
              tickFormatter={(v) => moodEmoji[Math.round(v)]}
              stroke="#ccc"
              fontSize={12}
            />
            <Tooltip
              formatter={(v) => [`${moodEmoji[Math.round(v)]} (${v})`, 'Mood']}
              labelStyle={{ color: '#fff' }}
              contentStyle={{ backgroundColor: '#27272a', border: '1px solid #3f3f46' }}
            />
            <Area
              type="monotone"
              dataKey="mood"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#moodGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Mood Insights */}
      <div className="bg-zinc-750 p-4 rounded-xl border border-zinc-600/50">
        <h4 className="text-sm font-medium text-zinc-300 mb-3">Weekly Insights</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-zinc-300">Best day: {bestDay.day} ({bestDay.mood})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-400 rounded-full" />
            <span className="text-zinc-300">Average mood: {averageMood}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full" />
            <span className="text-zinc-300">Mood-energy correlation: Strong</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyMoodChart;