"use client";
import { motion } from 'framer-motion';

const LiquidMetricCard = ({ title, value }: { title: string; value: string }) => (
  <div className="relative group bg-zinc-950/50 border border-zinc-800 rounded-[2.5rem] p-8 overflow-hidden backdrop-blur-3xl shadow-2xl">
    <div className="absolute inset-0 bg-gradient-to-br from-zinc-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <h3 className="text-zinc-500 text-xs tracking-widest uppercase mb-4">{title}</h3>
    <div className="text-4xl font-light text-zinc-100 tracking-tighter italic font-serif">{value}</div>
    <svg className="w-full h-16 mt-6 opacity-30">
      <motion.path
        initial={{ d: "M 0 30 Q 50 30 100 30 T 200 30" }}
        animate={{ d: ["M 0 30 Q 50 10 100 30 T 200 30", "M 0 30 Q 50 50 100 30 T 200 30", "M 0 30 Q 50 10 100 30 T 200 30"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        fill="none" stroke="#E4E4E7" strokeWidth="1.5"
      />
    </svg>
  </div>
);

export const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 p-12 max-w-7xl mx-auto pt-32 min-h-screen"
    >
      <LiquidMetricCard title="System Vibration" value="0.0x3f...12" />
      <LiquidMetricCard title="Flux Capacity" value="98.2%" />
      <LiquidMetricCard title="Neural Root Check" value="Validated" />
      <div className="md:col-span-3 h-80 bg-zinc-950 border border-zinc-800 rounded-[3rem] p-12 flex flex-col justify-end overflow-hidden">
        <div className="flex gap-4 overflow-hidden flex-col text-[11px] font-mono text-zinc-600 tracking-[0.4em]">
          <div>{">> INITIALIZING ATOMIC_SYNC..."}</div>
          <div>{">> STATUS: NON_EUCLIDEAN_DRIVE READY"}</div>
        </div>
        <div className="mt-8 text-2xl font-thin text-zinc-300">Dimension 0.0 - State of Root Analysis</div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
