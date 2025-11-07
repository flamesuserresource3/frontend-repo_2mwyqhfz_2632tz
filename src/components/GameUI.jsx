import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Send, Clock, Swords, Ghost, Flame, BookOpen } from 'lucide-react';

// Simple local narrative engine for a 30-min text adventure feel
// This is a frontend-only interactive teaser that mirrors the Java backend game request context.

const CHAPTERS = [
  {
    id: 'i',
    title: 'Part I – The Forgotten Shrine',
    text: `The rain is razors. The cedar is dying. The Yurei Shrine waits like a wound in the night. You are Takeda Ryojin, the nameless wanderer. You step toward the torii...`,
    choices: [
      { id: 'enter', label: 'Enter the shrine', next: 'ii' },
      { id: 'circle', label: 'Circle the grounds in silence', next: 'ii-ambush' },
    ],
  },
  {
    id: 'ii',
    title: 'Part II – The Armor of a Thousand Spirits',
    text: `Blue candles hiss. Bones and melted charms crowd the floor. At the altar: a black gusoku that breathes. A chorus whispers: The Armor of Yomi.`,
    choices: [
      { id: 'kneel', label: 'Kneel and let it feast', next: 'ii-bond' },
      { id: 'resist', label: 'Resist the whisper and draw your blade', next: 'ii-fight' },
    ],
  },
  {
    id: 'ii-ambush',
    title: 'Shadows in the Rain',
    text: `A flicker in the fog. Kagemusha scouts. You taste iron and choose the first move.`,
    choices: [
      { id: 'strike', label: 'Strike first', next: 'iii' },
      { id: 'hide', label: 'Melt into the shrine and set an ambush', next: 'ii' },
    ],
  },
  {
    id: 'ii-bond',
    title: 'The Pact',
    text: `Cords bite your flesh. Eyes turn night-black. The armor laughs in a hundred voices. You stand remade.`,
    choices: [
      { id: 'accept', label: 'Accept the chorus', next: 'iii' },
      { id: 'fight', label: 'Fight the chorus', next: 'ii-fight' },
    ],
  },
  {
    id: 'ii-fight',
    title: 'Ghostfire',
    text: `Spectral warriors erupt, faces erased. Phantom flame licks steel. You move like broken thunder.`,
    choices: [
      { id: 'survive', label: 'Cut them down', next: 'iii' },
      { id: 'yield', label: 'Yield and beg the dead for mercy', next: 'iii' },
    ],
  },
  {
    id: 'iii',
    title: "Part III – The Shogun's Hunters",
    text: `Dawn bleeds. The Kagemusha ring the shrine. Hayato steps forward, eyes like winter. Honor tastes of ash.`,
    choices: [
      { id: 'challenge', label: 'Challenge Hayato alone', next: 'iv' },
      { id: 'unleash', label: 'Unleash the armor\'s mist on the corps', next: 'iv' },
    ],
  },
  {
    id: 'iv',
    title: 'Part IV – Descent into the Underworld',
    text: `The doors seal. The floor splits. You fall into Yomi where red rivers scream. The armor pulses like a living heart.`,
    choices: [
      { id: 'listen', label: 'Listen for the calm voice', next: 'iv-izanami' },
      { id: 'rage', label: 'Drown the voices with rage', next: 'bad' },
    ],
  },
  {
    id: 'iv-izanami',
    title: 'Izanami',
    text: `The goddess appears, pale as ash. Redemption demands a price: fall by your own blade and free the bound.`,
    choices: [
      { id: 'sacrifice', label: 'Drive the blade through your heart', next: 'v' },
      { id: 'refuse', label: 'Refuse the pact and keep your power', next: 'bad' },
    ],
  },
  {
    id: 'v',
    title: 'Part V – The Shrine Reborn',
    text: `Storms clear. The shrine gleams clean. A cracked black kabuto rests on the altar, a blood-written warning folded within.`,
    choices: [
      { id: 'guard', label: 'Become the nameless guardian', next: 'epilogue' },
      { id: 'depart', label: 'Vanish into the mountains', next: 'epilogue' },
    ],
  },
  {
    id: 'bad',
    title: 'Chains of Power',
    text: `You cling to wrath. The armor devours. The dead do not rest. The shrine rots. The world dims.`,
    choices: [
      { id: 'again', label: 'Close your eyes and try again', next: 'i' },
    ],
  },
  {
    id: 'epilogue',
    title: 'Black Ryojin',
    text: `Some nights, thunder walks the ridgelines. A faceless samurai keeps watch. Not a demon. Not a saint. A promise.`,
    choices: [
      { id: 'again', label: 'Walk the path once more', next: 'i' },
    ],
  },
];

function Chapter({ chapter, onChoose }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl md:text-2xl font-semibold text-white flex items-center gap-2">
        <BookOpen className="text-indigo-300" />
        {chapter.title}
      </h3>
      <p className="text-white/85 leading-relaxed">{chapter.text}</p>
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        {chapter.choices.map((c) => (
          <button
            key={c.id}
            onClick={() => onChoose(c.next)}
            className="group px-4 py-2 rounded-md bg-white/10 hover:bg-white/15 border border-white/15 text-white flex items-center gap-2 transition"
          >
            <Swords size={16} className="text-indigo-300 group-hover:rotate-12 transition" />
            <span className="text-sm">{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function GameUI() {
  const [started, setStarted] = useState(false);
  const [currentId, setCurrentId] = useState('i');
  const [history, setHistory] = useState(["You stand in rain that cuts like glass."]);
  const [startTime] = useState(() => Date.now());

  const chapterMap = useMemo(() => Object.fromEntries(CHAPTERS.map((c) => [c.id, c])), []);
  const chapter = chapterMap[currentId];

  useEffect(() => {
    if (!started) return;
    setHistory((h) => [...h, `${chapter.title}`]);
  }, [currentId, started]);

  const minutes = Math.max(0, 30 - Math.floor((Date.now() - startTime) / 60000));

  return (
    <section className="relative max-w-5xl mx-auto px-4 pb-16">
      <div className="rounded-xl border border-white/10 bg-gradient-to-b from-slate-900/70 to-black p-5 md:p-6 shadow-2xl">
        <div className="flex items-center justify-between text-white/80 text-xs md:text-sm pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2"><Clock size={16} className="text-indigo-300" />Estimated playtime: ~30 min</div>
          <div className="flex items-center gap-2"><Ghost size={16} className="text-indigo-300" />Fates encountered: {history.length - 1}</div>
        </div>

        {!started ? (
          <div className="text-center text-white">
            <p className="text-white/80 max-w-2xl mx-auto">Take the path of Takeda Ryojin. Your choices bend the storm. Begin when you are ready.</p>
            <button onClick={() => setStarted(true)} className="mt-5 px-5 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-medium">Begin</button>
          </div>
        ) : (
          <div className="space-y-6">
            <Chapter chapter={chapter} onChoose={setCurrentId} />

            <div className="pt-3 border-t border-white/10">
              <h4 className="text-white/70 text-xs uppercase tracking-wide mb-2">Your Trail</h4>
              <div className="text-white/60 text-sm leading-relaxed">
                {history.map((line, idx) => (
                  <div key={idx} className="">• {line}</div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-white/70 text-xs">
              <div className="flex items-center gap-2"><Flame size={14} className="text-orange-300" />Time remaining: {minutes}m</div>
              <button
                onClick={() => { setStarted(false); setCurrentId('i'); setHistory(["You stand in rain that cuts like glass."]); }}
                className="px-3 py-1 rounded border border-white/15 hover:bg-white/10"
              >Restart</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
