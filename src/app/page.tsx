"use client";

import { useState, useEffect } from "react";
import SecurityCore from "@/components/SecurityCore";
import TerminalTransition from "@/components/TerminalTransition";
import RootDashboard from "@/components/RootDashboard";

export default function RootCheckWeb() {
  // 状态：0 = 锁定核心, 1 = 提权/解密中, 2 = 监控面板
  const [stage, setStage] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    if (stage === 1) {
      // 匹配跑码转场的耗时 (2.5秒)
      const timer = setTimeout(() => setStage(2), 2500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  return (
    <main className="relative w-full h-screen bg-[#0a0a0c] overflow-hidden flex items-center justify-center font-mono selection:bg-emerald-500/30 text-emerald-500">

      {/* 阶段 0: 系统核心等待提权 */}
      {stage === 0 && (
        <div
          className="absolute inset-0 cursor-crosshair z-10 flex flex-col items-center justify-center group"
          onClick={() => setStage(1)}
        >
          <div className="w-full h-full absolute inset-0 opacity-70 group-hover:opacity-100 transition-opacity duration-700">
            <SecurityCore />
          </div>
          <div className="absolute bottom-16 flex flex-col items-center gap-2 pointer-events-none">
            <div className="text-xs tracking-[0.4em] text-emerald-400/60 uppercase">
              Target: root-check engine
            </div>
            <button className="px-6 py-2 border border-emerald-500/30 bg-emerald-950/20 backdrop-blur-sm text-sm tracking-widest hover:bg-emerald-500 hover:text-black transition-all duration-300">
              INITIATE SCAN
            </button>
          </div>
        </div>
      )}

      {/* 阶段 1: 终端跑码/漏洞利用转场 */}
      {stage === 1 && <TerminalTransition />}

      {/* 阶段 2: Root 探针控制台 */}
      {stage === 2 && <RootDashboard />}

    </main>
  );
}
