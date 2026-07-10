"use client";
import { useState } from 'react';
import { MercurySurface } from '@/components/MercurySurface';
import { HyperFolding } from '@/components/HyperFolding';
import { Dashboard } from '@/components/Dashboard';

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  return (
    <main className="min-h-screen bg-black selection:bg-white/20">
      <nav className="fixed top-0 w-full h-24 border-b border-white/5 flex items-center justify-between px-16 z-[100] backdrop-blur-xl bg-black/50">
        <div className="font-black text-2xl tracking-tighter text-zinc-100">APEX.CORE</div>
        <div className="text-[9px] text-zinc-600 tracking-[1em] uppercase font-bold">Encrypted Interface</div>
      </nav>

      {!unlocked && <MercurySurface onActivate={() => setUnlocked(true)} />}

      <HyperFolding isActive={unlocked}>
        <div className="w-full h-full bg-white flex items-center justify-center">
          <h1 className="text-black font-black text-6xl">TRANSFORMING</h1>
        </div>
      </HyperFolding>

      {unlocked && <Dashboard />}
    </main>
  );
}
