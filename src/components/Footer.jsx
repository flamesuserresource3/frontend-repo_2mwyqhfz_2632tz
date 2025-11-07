import React from 'react';
import { Heart, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/70">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-white/60 text-sm">
        <p className="flex items-center gap-1">Made with <Heart size={14} className="text-rose-400" /> in the storm.</p>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 hover:text-white/80"
        >
          <Github size={16} />
          <span>Source soon</span>
        </a>
      </div>
    </footer>
  );
}
