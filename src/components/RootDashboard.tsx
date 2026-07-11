"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Terminal, LockKeyhole, Smartphone } from "lucide-react";

const envMetrics = [
  {
    id: "su",
    title: "Root Access",
    value: "COMPROMISED",
    sub: "/system/xbin/su DETECTED",
    icon: Terminal,
    color: "text-red-500",
    border: "border-red-500/30",
    bg: "bg-red-950/10",
  },
  {
    id: "magisk",
    title: "Hide Mechanisms",
    value: "Magisk Zygisk",
    sub: "Modules active in memory",
    icon: ShieldAlert,
    color: "text-amber-400",
    border: "border-amber-400/30",
    bg: "bg-amber-950/10",
  },
  {
    id: "selinux",
    title: "SELinux Status",
    value: "PERMISSIVE",
    sub: "Security policies disabled",
    icon: LockKeyhole,
    color: "text-orange-500",
    border: "border-orange-500/30",
    bg: "bg-orange-950/10",
  },
  {
    id: "integrity",
    title: "Play Integrity API",
    value: "MEETS_BASIC",
    sub: "Strong integrity FAILED",
    icon: Smartphone,
    color: "text-emerald-500",
    border: "border-emerald-500/30",
    bg: "bg-emerald-950/10",
  },
];

export default function RootDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-6xl mx-auto p-6 md:p-12 z-20"
    >
      <div className="mb-12 border-b border-emerald-500/20 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-2">
            ROOT_<span className="text-emerald-500">CHECK</span> ENGINE
          </h1>
          <p className="text-emerald-500/60 tracking-widest text-sm">ADVANCED ENVIRONMENT ANALYSIS TOOL</p>
        </div>
        <div className="text-right hidden md:block text-xs text-emerald-500/40">
          v1.0.0-beta<br />
          BUILD_ARCH: arm64-v8a
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {envMetrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 + 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.01, backgroundColor: "rgba(16, 185, 129, 0.05)" }}
              className={`relative overflow-hidden rounded-xl border ${metric.border} ${metric.bg} backdrop-blur-md p-6 group transition-colors`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <Icon size={20} className={`${metric.color} opacity-80`} />
                  <h2 className="text-lg font-medium tracking-wide text-white/80 uppercase">{metric.title}</h2>
                </div>
                {/* 模拟状态灯 */}
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${metric.color.replace("text-", "bg-")}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${metric.color.replace("text-", "bg-")}`}></span>
                </span>
              </div>

              <div>
                <div className={`text-3xl font-bold tracking-tight ${metric.color} mb-1`}>
                  {metric.value}
                </div>
                <div className="text-xs text-white/40 font-mono">
                  &gt; {metric.sub}
                </div>
              </div>

              {/* 背景装饰线 */}
              <div className="absolute -bottom-12 -right-12 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon size={120} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 flex justify-center"
      >
        <a
          href="https://github.com/mengjinghao/root-check"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-8 py-3 border border-emerald-500/30 text-emerald-500 hover:bg-emerald-500 hover:text-black transition-all font-bold tracking-wider"
        >
          VIEW SOURCE ON GITHUB
        </a>
      </motion.div>
    </motion.div>
  );
}
