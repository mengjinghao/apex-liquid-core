"use client";
import { useState } from 'react';
import { MercurySurface } from '@/components/MercurySurface';
import { HyperFolding } from '@/components/HyperFolding';
import { Dashboard } from '@/components/Dashboard';

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <nav className="fixed top-0 inset-x-0 h-24 border-b border-zinc-900/50 flex items-center justify-between px-12 z-[100] backdrop-blur-md">
        <div className="font-extrabold tracking-tighter text-xl">APEX</div>
        <div className="flex gap-10 text-[10px] tracking-[0.5em] text-zinc-500 uppercase">
          <span>Security</span>
          <span>Abstract</span>
          <span>Core</span>
        </div>
      </nav>

      {!isUnlocked && (
        <MercurySurface onActivate={() => setIsUnlocked(true)} />
      )}

      <HyperFolding isActive={isUnlocked}>
        <div className="w-full h-full bg-zinc-100 flex items-center justify-center">
          <span className="text-black font-black text-8xl tracking-tighter">APEX</span>
        </div>
      </HyperFolding>

      {isUnlocked && <Dashboard />}
    </main>
  );
}
