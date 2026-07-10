"use client";
import { useState } from 'react';
import { MercurySurface } from '@/components/MercurySurface';
import { HyperFolding } from '@/components/HyperFolding';
import { Dashboard } from '@/components/Dashboard';

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-800">
      {/* 极简导航 */}
      <nav className="fixed top-0 w-full h-24 border-b border-zinc-900/50 flex items-center justify-between px-12 z-[100] backdrop-blur-xl bg-black/30">
        <div className="font-black text-xl tracking-tighter uppercase">Apex.Liquid</div>
        <div className="flex gap-8 font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
          <span>0.00ms</span>
          <span className="text-zinc-100">Live_Root</span>
        </div>
      </nav>

      {/* 第一阶段：液态汞表面 */}
      {!unlocked && <MercurySurface onActivate={() => setUnlocked(true)} />}

      {/* 第二阶段：高维折叠过渡效果层 */}
      <HyperFolding isActive={unlocked}>
        <div className="w-full h-full bg-zinc-200 flex items-center justify-center">
          <h1 className="text-black font-black text-9xl tracking-tighter animate-pulse uppercase">
            Apex
          </h1>
        </div>
      </HyperFolding>

      {/* 第三阶段：系统面板 */}
      {unlocked && <Dashboard />}
    </main>
  );
}
