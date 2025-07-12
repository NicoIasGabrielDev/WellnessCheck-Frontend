import { Target, Users, TrendingUp, TrendingDown } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const ProductivitySummary = ({ weeklyData = [], distributionData = [] }) => {
  // Dados padrão se não forem fornecidos
  const defaultWeeklyData = [
    { week: "Week 1", productivity: 2.3, teamAvg: 2.5 },
    { week: "Week 2", productivity: 2.7, teamAvg: 2.4 },
    { week: "Week 3", productivity: 2.5, teamAvg: 2.6 },
    { week: "Week 4", productivity: 2.9, teamAvg: 2.7 },
  ];

  const defaultDistributionData = [
    { name: "High", value: 45, color: "#10b981" },
    { name: "Medium", value: 35, color: "#f59e0b" },
    { name: "Low", value: 20, color: "#ef4444" },
  ];

  const productivityData = weeklyData.length > 0 ? weeklyData : defaultWeeklyData;
  const distributionDataFinal = distributionData.length > 0 ? distributionData : defaultDistributionData;

  const currentProductivity = productivityData[productivityData.length - 1]?.productivity || 2.5;
  const teamAvg = productivityData[productivityData.length - 1]?.teamAvg || 2.4;

  return (
    <div className="space-y-4">
      {/* Productivity Overview Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-750 p-4 rounded-xl border border-zinc-600/50">
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-amber-400" size={16} />
            <span className="text-sm font-medium text-zinc-300">Your Score</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">{currentProductivity}</span>
            <span className="text-sm text-zinc-400">/3.0</span>
            {currentProductivity > teamAvg ? (
              <TrendingUp className="text-green-400 ml-2" size={16} />
            ) : (
              <TrendingDown className="text-red-400 ml-2" size={16} />
            )}
          </div>
        </div>
        
        <div className="bg-zinc-750 p-4 rounded-xl border border-zinc-600/50">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-purple-400" size={16} />
            <span className="text-sm font-medium text-zinc-300">Team Avg</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">{teamAvg}</span>
            <span className="text-sm text-zinc-400">/3.0</span>
          </div>
        </div>
      </div>

      {/* Productivity Chart */}
      <div>
        <h3 className="text-sm font-medium text-zinc-300 mb-3">4-Week Productivity Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={productivityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="week" stroke="#ccc" fontSize={12} />
            <YAxis domain={[1, 3]} stroke="#ccc" fontSize={12} />
            <Tooltip
              formatter={(value, name) => [value, name === 'productivity' ? 'Your Score' : 'Team Average']}
              labelStyle={{ color: '#fff' }}
              contentStyle={{ backgroundColor: '#27272a', border: '1px solid #3f3f46' }}
            />
            <Line
              type="monotone"
              dataKey="productivity"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="teamAvg"
              stroke="#6b7280"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Productivity Distribution */}
      <div className="bg-zinc-750 p-4 rounded-xl border border-zinc-600/50">
        <h4 className="text-sm font-medium text-zinc-300 mb-3">This Week's Distribution</h4>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={80}>
              <PieChart>
                <Pie
                  data={distributionDataFinal}
                  cx="50%"
                  cy="50%"
                  innerRadius={20}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {distributionDataFinal.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2">
            {distributionDataFinal.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-xs text-zinc-300">{entry.name}: {entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductivitySummary;