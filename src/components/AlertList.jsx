import { Heart, Target, Activity, Bell, Award } from "lucide-react";

const AlertList = ({ alerts = [] }) => {
  const defaultAlerts = [
    { id: 1, type: "mood", message: "Mood dipped below average for 2 days", severity: "warning", time: "2 hours ago" },
    { id: 2, type: "productivity", message: "Great productivity streak - 5 days above target!", severity: "success", time: "1 day ago" },
    { id: 3, type: "energy", message: "Energy levels consistently low this week", severity: "info", time: "3 hours ago" },
  ];

  const alertData = alerts.length > 0 ? alerts : defaultAlerts;

  const getAlertIcon = (type) => {
    switch (type) {
      case 'mood': return <Heart className="text-pink-400" size={16} />;
      case 'productivity': return <Target className="text-amber-400" size={16} />;
      case 'energy': return <Activity className="text-blue-400" size={16} />;
      default: return <Bell className="text-zinc-400" size={16} />;
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'success': return 'border-green-500/30 bg-green-900/20';
      case 'warning': return 'border-yellow-500/30 bg-yellow-900/20';
      case 'info': return 'border-blue-500/30 bg-blue-900/20';
      default: return 'border-zinc-600/50 bg-zinc-800/50';
    }
  };

  return (
    <div className="space-y-4">
      {alertData.map((alert) => (
        <div 
          key={alert.id} 
          className={`p-4 rounded-xl border ${getAlertColor(alert.severity)}`}
        >
          <div className="flex items-start gap-3">
            {getAlertIcon(alert.type)}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">{alert.message}</p>
              <p className="text-xs text-zinc-400 mt-1">{alert.time}</p>
            </div>
            {alert.severity === 'success' && (
              <Award className="text-green-400 flex-shrink-0" size={16} />
            )}
          </div>
        </div>
      ))}
      
      <div className="text-center pt-2">
        <button className="text-sm text-amber-400 hover:text-amber-300 transition-colors">
          View All Insights
        </button>
      </div>
    </div>
  );
};

export default AlertList;