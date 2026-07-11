"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const logs = [
  "> Connecting to daemon...",
  "> Exploiting vulnerability (CVE-2026-XXXX)...",
  "> Mounting /system as rw...",
  "> Bypassing SafetyNet / Play Integrity...",
  "> Searching for su binary...",
  "> Verifying Magisk / KernelSU footprints...",
  "> SYSTEM COMPROMISED. ROOT ACCESS GRANTED."
];

export default function TerminalTransition() {
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);

  useEffect(() => {
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < logs.length) {
        setVisibleLogs((prev) => [...prev, logs[currentLog] as string]);
        currentLog++;
      } else {
        clearInterval(interval);
      }
    }, 300); // 每 300ms 打印一行
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col justify-center items-start px-8 md:px-32 lg:px-64 bg-black/90"
    >
      <div className="w-full max-w-3xl space-y-2">
        {visibleLogs.map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-sm md:text-lg tracking-wide ${
              index === logs.length - 1 ? "text-red-500 font-bold" : "text-emerald-500/80"
            }`}
          >
            {log}
          </motion.div>
        ))}
        {/* 闪烁的光标 */}
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-3 h-5 bg-emerald-500 mt-2"
        />
      </div>
    </motion.div>
  );
}
