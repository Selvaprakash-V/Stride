import { Trophy, Users, Target, Activity, Zap } from "lucide-react";
import { motion } from "framer-motion";

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
  const stats = [
    {
      label: "Live Sessions",
      value: activeSessionsCount,
      icon: Activity,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
      glow: "stat-glow-blue",
      badge: "LIVE",
      badgeColor: "bg-primary/15 text-primary border-primary/20",
      dot: "bg-primary animate-ping"
    },
    {
      label: "Completed",
      value: recentSessionsCount,
      icon: Trophy,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      glow: "stat-glow-purple",
      badge: "HISTORY",
      badgeColor: "bg-yellow-500/10 text-yellow-400/70 border-yellow-500/15",
      dot: null
    }
  ];

  return (
    <div className="lg:col-span-1 flex flex-col gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className={`relative group glass-card p-6 border ${stat.border} h-full flex flex-col justify-between ${stat.glow} transition-all duration-300`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className={`p-3.5 ${stat.bg} rounded-xl border ${stat.border} group-hover:scale-110 transition-transform duration-400`}>
              <stat.icon className={`size-6 ${stat.color}`} />
            </div>
            <div className={`flex items-center gap-2 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full border ${stat.badgeColor}`}>
              {stat.dot && <span className={`size-1.5 rounded-full ${stat.dot} inline-block`} />}
              {stat.badge}
            </div>
          </div>

          <div>
            <div className="text-5xl font-black text-white mb-1 tracking-tighter font-mono">
              {String(stat.value).padStart(2, '0')}
            </div>
            <div className={`text-xs font-bold uppercase tracking-[.2em] ${stat.color} opacity-60`}>
              {stat.label}
            </div>
          </div>

          {/* Decorative glow blob */}
          <div className={`absolute bottom-4 right-4 size-16 rounded-full blur-2xl opacity-15 group-hover:opacity-30 transition-opacity ${stat.bg}`} />
        </motion.div>
      ))}
    </div>
  );
}

export default StatsCards;
