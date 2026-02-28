import { Trophy, Users, Target, Activity } from "lucide-react";
import { motion } from "framer-motion";

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
  const stats = [
    {
      label: "Active Nodes",
      value: activeSessionsCount,
      icon: Activity,
      color: "text-primary",
      bg: "bg-primary/10",
      glow: "shadow-primary/20",
      badge: "LIVE"
    },
    {
      label: "Mission Success",
      value: recentSessionsCount,
      icon: Target,
      color: "text-secondary",
      bg: "bg-secondary/10",
      glow: "shadow-secondary/20",
      badge: "ELITE"
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
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="relative group h-full"
        >
          <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-white/5 transition-all duration-500 rounded-3xl -z-10`} />
          <div className="glass-card p-6 h-full flex flex-col justify-between border border-white/5 group-hover:border-white/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <div className={`p-4 ${stat.bg} rounded-2xl group-hover:scale-110 transition-transform duration-500`}>
                <stat.icon className={`size-7 ${stat.color} ${stat.label === "Active Nodes" ? "animate-pulse" : ""}`} />
              </div>
              <span className={`text-[10px] font-black tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/5 text-white/40`}>
                {stat.badge}
              </span>
            </div>

            <div>
              <div className="text-5xl font-black text-white mb-2 tracking-tighter">
                {String(stat.value).padStart(2, '0')}
              </div>
              <div className="text-xs font-bold text-white/30 uppercase tracking-[.2em]">
                {stat.label}
              </div>
            </div>

            {/* Decorative element */}
            <div className={`absolute bottom-6 right-6 size-12 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity ${stat.bg}`} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default StatsCards;
