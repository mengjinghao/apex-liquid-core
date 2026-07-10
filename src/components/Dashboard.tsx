"use client";
import { motion } from 'framer-motion';

const MetricCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-zinc-950 border border-zinc-900 rounded-[2rem] p-8 overflow-hidden relative group">
    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <span className="text-zinc-600 text-[10px] tracking-[0.3em] font-mono uppercase">{label}</span>
    <div className="text-5xl font-extralight text-zinc-100 mt-4 tracking-tighter italic">{value}</div>
    {/* 模拟生成艺术波形图 */}
    <svg className="w-full h-12 mt-6 opacity-30">
      <motion.path
        fill="none" stroke="white" strokeWidth="1"
        d="M0 24 L50 24 L100 24 L150 24 L200 24"
        animate={{ d: [
          "M0 24 Q50 10 100 24 T200 24",
          "M0 24 Q50 38 100 24 T200 24",
          "M0 24 Q50 10 100 24 T200 24"
        ]}}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  </div>
);

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black pt-32 px-10 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <MetricCard label="Entropic Core" value="0.9991" />
        <MetricCard label="Fluid Capacity" value="1.22Tb" />
        <MetricCard label="Root Check" value="Validated" />

        <div className="md:col-span-3 bg-zinc-950 border border-zinc-900 rounded-[3rem] p-12 mt-4 min-h-[300px] flex flex-col justify-end relative overflow-hidden">
          <div className="relative z-10 font-mono text-[11px] text-zinc-600 space-y-1">
            <p>{`>> INITIALIZING NEURAL_DENSITY_SCAN...`}</p>
            <p>{`>> CALIBRATING MERCURY_SDF_VOLUME... [DONE]`}</p>
            <p>{`>> STATUS: REALITY_LINK_ESTABLISHED`}</p>
          </div>
          <h2 className="text-3xl text-zinc-300 font-extralight mt-8 tracking-tighter uppercase italic underline decoration-zinc-800">
            Dimension Analysis Summary
          </h2>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
