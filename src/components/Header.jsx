import React from 'react';
import { Skull, Swords, Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full bg-black/70 backdrop-blur border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white">
            <Skull size={22} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-white tracking-wide">Blood on the Gusoku</h1>
            <p className="text-xs text-white/60">A samurai tale of wrath, ghosts, and redemption</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 text-white/70">
          <div className="flex items-center gap-1"><Swords size={16} /><span className="text-xs">Steel & Spirit</span></div>
          <div className="flex items-center gap-1"><Shield size={16} /><span className="text-xs">Fate Awaits</span></div>
        </div>
      </div>
    </header>
  );
}
