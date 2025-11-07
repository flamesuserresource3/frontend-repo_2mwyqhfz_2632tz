import React from 'react';
import { Flame, CloudLightning } from 'lucide-react';

export default function StoryIntro() {
  return (
    <section className="relative max-w-5xl mx-auto px-4 pt-10 pb-8">
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-black to-black" />
      </div>
      <div className="relative">
        <h2 className="text-2xl md:text-3xl font-semibold text-white flex items-center gap-2">
          <CloudLightning className="text-indigo-400" />
          The Forgotten Shrine
        </h2>
        <p className="mt-4 text-sm md:text-base leading-relaxed text-white/80">
          Rain like shattered glass. Edo's edge. Under a dying cedar, Takeda Ryojin — once the Shogun's shadow — stands in chipped, dragon-carved gusoku. His crest is clawed from the kabuto, his horse breathless in the mud. Before him: the Yurei Shrine, where the souls of warriors bind to stone and gods ask for blood to stay awake.
        </p>
        <p className="mt-3 text-sm md:text-base leading-relaxed text-white/80">
          He comes not for prayer, but for a weapon that can kill gods.
        </p>
        <div className="mt-5 inline-flex items-center gap-2 text-indigo-300">
          <Flame size={18} />
          <span className="text-xs">A 30-minute text adventure inspired by your tale.</span>
        </div>
      </div>
    </section>
  );
}
