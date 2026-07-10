"use client";
import { motion } from 'framer-motion';

const LiquidMetricCard = ({ title, value }: { title: string; value: string }) => (
  <div className="group bg-zinc-950/80 border border-zinc-900 rounded-[2.5rem] p-8 backdrop-blur-3xl overflow-hidden relative">
    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <h3 className="text-zinc-600 text-xs tracking-widest uppercase mb-4 font-mono">{title}</h3>
    <div className="text-5xl font-extralight text-zinc-200 italic tracking-tighter mb-4">{value}</div>
    <svg className="w-full h-12 opacity-20 group-hover:opacity-60 transition-opacity">
      <motion.path
        d="M 0 24 Q 40 24 80 24 T 300 24"
        fill="none" stroke="white" strokeWidth="1"
        animate={{ d: ["M 0 24 Q 40 0 80 24 T 300 24", "M 0 24 Q 40 48 80 24 T 300 24", "M 0 24 Q 40 0 80 24 T 300 24"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  </div>
);

export const Dashboard = () => (
  <div className="min-h-screen bg-black pt-32 px-8">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
    >
      <LiquidMetricCard title="Entropic Core" value="0.9992" />
      <LiquidMetricCard title="Memory Fluid" value="82.4GB" />
      <LiquidMetricCard title="Security Layer" value="Isolated" />
      <div className="md:col-span-3 h-64 bg-zinc-950 border border-zinc-900 rounded-[3rem] p-12 flex flex-col justify-end">
        <div className="text-zinc-600 font-mono text-xs uppercase mb-4 tracking-[0.3em]">Processing Logic Stream...</div>
        <div className="h-px w-full bg-zinc-800 mb-6" />
        <div className="text-3xl text-zinc-400 font-light italic uppercase">Neural Link Established - Root Validated.</div>
      </div>
    </motion.div>
  </div>
);

export default Dashboard;
