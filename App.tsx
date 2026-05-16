import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy,
  ChevronRight, 
  Home, 
  Book, 
  Settings, 
  User,
  ArrowLeft,
  Medal,
  Dumbbell as Gym,
  Flag,
  Zap,
  Star,
  Users,
  Check
} from 'lucide-react';
import { CHAMPIONSHIP_DATA, Level } from './verbData';
import GameSession from './GameSession';

type Screen = 'dashboard' | 'game' | 'theory' | 'dictionary';

export default function App() {
  const [screen, setScreen] = useState<Screen>('dashboard');
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [lives, setLives] = useState(5);
  const [jersey, setJersey] = useState<string>('rose');
  const [pants, setPants] = useState<string>('white');

  const jerseys = [
    { id: 'rose', color: 'bg-rose-400', name: 'Pastel Rose' },
    { id: 'pink', color: 'bg-fuchsia-500', name: 'Neon Pink' },
    { id: 'violet', color: 'bg-violet-500', name: 'Lavender' },
    { id: 'gold', color: 'bg-amber-400', name: 'Golden Shine' },
    { id: 'white', color: 'bg-slate-50', name: 'Pure White' },
  ];

  const pantsOptions = [
    { id: 'pink', color: 'bg-pink-100' },
    { id: 'white', color: 'bg-white' },
    { id: 'denim', color: 'bg-sky-200' },
  ];

  const handleLevelSelect = (level: Level) => {
    setSelectedLevel(level);
    setScreen('game');
  };

  return (
    <div className={`min-h-screen font-sans text-slate-100 overflow-x-hidden pt-safe pb-32 transition-colors duration-700 selection:bg-pink-500/30 selection:text-white leading-relaxed relative ${
      jersey === 'rose' ? 'bg-[#4c0519]' : 
      jersey === 'pink' ? 'bg-[#701a75]' : 
      jersey === 'violet' ? 'bg-[#2e1065]' : 
      jersey === 'gold' ? 'bg-[#451a03]' : 'bg-[#0f172a]'
    }`}>
      {/* Fashion Boutique Theme Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br transition-colors duration-700 ${
          jersey === 'rose' ? 'from-[#4c0519] via-[#881337] to-[#4c0519]' : 
          jersey === 'pink' ? 'from-[#701a75] via-[#a21caf] to-[#701a75]' : 
          jersey === 'violet' ? 'from-[#2e1065] via-[#4c1d95] to-[#2e1065]' : 
          jersey === 'gold' ? 'from-[#451a03] via-[#78350f] to-[#451a03]' : 'from-[#0f172a] via-[#1e293b] to-[#0f172a]'
        }`} />
        
        {/* Pitch Lines */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-white/5" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5" />
        
        <motion.div 
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-white/10 to-transparent" 
        />
      </div>

      <AnimatePresence mode="wait">
        {screen === 'dashboard' && (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-md mx-auto p-6 space-y-10 pt-10 relative z-10"
          >
            {/* Header / Fashionista Visualization */}
            <div className="flex flex-col items-center gap-6 mb-12">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={`w-44 h-44 rounded-full shadow-[0_0_50px_rgba(244,114,182,0.3)] flex items-center justify-center border-8 relative group ${
                    jersey === 'rose' ? 'border-rose-400 bg-rose-900 shadow-rose-500/20' : 
                    jersey === 'pink' ? 'border-fuchsia-400 bg-fuchsia-900 shadow-fuchsia-500/20' : 
                    jersey === 'violet' ? 'border-violet-400 bg-violet-900 shadow-violet-500/20' : 
                    jersey === 'gold' ? 'border-yellow-400 bg-amber-900 shadow-yellow-500/20' : 'border-slate-200 bg-slate-800 shadow-slate-200/20'
                  }`}
                >
                   <img 
                     src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Gayane&clothing=hoodie&clothingColor=${
                       jersey === 'rose' ? 'fb7185' : 
                       jersey === 'pink' ? 'd946ef' : 
                       jersey === 'violet' ? '8b5cf6' : 
                       jersey === 'gold' ? 'fbbf24' : 'f8fafc'
                     }`} 
                     alt="Gayane"
                     className="w-full h-full object-cover relative z-10 p-2"
                   />
                </motion.div>
                
                <div className="text-center">
                   <h1 className="text-4xl font-black tracking-tighter text-white italic drop-shadow-lg">ԳԱՅԱՆԵ</h1>
                   <div className="flex items-center justify-center gap-2 mt-1">
                      <p className="text-pink-300 text-xs font-black uppercase tracking-[0.3em]">Fashion Icon</p>
                      <div className="flex">
                         {[...Array(5)].map((_, i) => <Star key={i} size={10} className="text-pink-400 fill-pink-400" />)}
                      </div>
                   </div>
                </div>
            </div>

            {/* Boutique Customization */}
            <div className="bg-white/5 backdrop-blur-2xl p-8 rounded-[3.5rem] border border-white/10 space-y-8">
               <div className="space-y-4">
                  <h3 className="text-pink-300 font-black text-[10px] uppercase tracking-[0.3em] px-2 flex items-center gap-2">
                    <Zap size={12} className="text-pink-400" /> Գայանեի Հանդերձարան
                  </h3>
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                     {jerseys.map((j) => (
                       <button
                         key={j.id}
                         onClick={() => setJersey(j.id)}
                         className={`flex-shrink-0 w-14 h-14 rounded-full border-4 transition-all flex items-center justify-center ${
                           jersey === j.id ? 'border-white scale-110 shadow-xl' : 'border-white/5 hover:border-white/20'
                         } ${j.color}`}
                       >
                         {jersey === j.id && <Check size={20} className="text-white" />}
                       </button>
                     ))}
                  </div>
               </div>

               <div className="space-y-4">
                  <h3 className="text-pink-300 font-black text-[10px] uppercase tracking-[0.3em] px-2 flex items-center gap-2">
                    <Medal size={12} /> Մարզահագուստի գույն
                  </h3>
                  <div className="flex gap-4">
                     {pantsOptions.map((p) => (
                       <button
                         key={p.id}
                         onClick={() => setPants(p.id)}
                         className={`w-full py-3 rounded-2xl border-2 transition-all font-black text-[10px] uppercase ${
                           pants === p.id ? 'border-white bg-white/20' : 'border-white/5 hover:bg-white/5'
                         }`}
                       >
                         <div className={`w-4 h-4 rounded-full mx-auto mb-1 ${p.id === 'pink' ? (
                           jersey === 'rose' ? 'bg-rose-500' : 
                           jersey === 'pink' ? 'bg-fuchsia-500' : 
                           jersey === 'violet' ? 'bg-violet-500' : 
                           jersey === 'gold' ? 'bg-yellow-500' : 'bg-slate-200'
                         ) : p.color}`} />
                         {p.id}
                       </button>
                     ))}
                  </div>
               </div>
            </div>

            {/* Levels */}
            <div className="grid gap-4 mt-12">
               <h3 className="text-white/40 font-black text-[10px] uppercase tracking-[0.4em] px-4">Մրցաշարեր</h3>
               {CHAMPIONSHIP_DATA.levels.map((level, i) => (
                 <motion.button
                   key={level.id}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.1 * i }}
                   onClick={() => handleLevelSelect(level)}
                   className="w-full bg-white/5 border border-white/5 p-5 rounded-[2.5rem] flex items-center gap-4 hover:bg-white/10 transition-all group"
                 >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                      level.type === 'matching' ? 'bg-sky-500/20 text-sky-400' : 
                      level.type === 'test' ? 'bg-orange-500/20 text-orange-400' : 
                      'bg-yellow-500/20 text-yellow-500'
                    }`}>
                       {level.type === 'matching' ? <Users size={24} /> : 
                        level.type === 'test' ? <Gym size={24} /> : 
                        <Trophy size={24} />}
                    </div>
                    <div className="flex-1 text-left">
                       <h3 className="text-white font-black text-base">{level.title}</h3>
                       <p className="text-white/40 text-[10px] font-bold uppercase tracking-tight">{level.description}</p>
                    </div>
                    <ChevronRight size={16} className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
                 </motion.button>
               ))}
            </div>

            {/* Dictionary Section */}
            <div className="space-y-6 pt-6">
               <div className="flex items-center justify-between px-2">
                 <h2 className="text-white font-black text-xl italic flex items-center gap-2">
                   <Book size={20} className="text-emerald-400" /> Չեմպիոնի Բառարան
                 </h2>
               </div>
               <div className="grid gap-3">
                  {CHAMPIONSHIP_DATA.dictionary.map((item, i) => (
                    <div key={i} className="bg-black/20 p-5 rounded-[2.5rem] border border-white/5 flex items-center justify-between group hover:bg-black/40 transition-all">
                       <div>
                          <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                            item.category === 'positivo' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                          }`}>
                            {item.category}
                          </span>
                          <h3 className="text-lg font-black text-white mt-1 italic">{item.phrase}</h3>
                       </div>
                       <p className="text-white/40 font-bold italic text-xs text-right max-w-[120px]">{item.translation}</p>
                    </div>
                  ))}
               </div>
            </div>
          </motion.div>
        )}

        {screen === 'game' && selectedLevel && (
          <GameSession 
            key="game-session"
            level={selectedLevel} 
            onClose={() => setScreen('dashboard')} 
            lives={lives}
            setLives={setLives}
          />
        )}
      </AnimatePresence>

      {/* Nav */}
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className={`fixed bottom-0 inset-x-0 backdrop-blur-2xl border-t border-white/5 p-4 pb-8 flex items-center justify-around z-40 rounded-t-[3rem] transition-colors duration-700 ${
          jersey === 'rose' ? 'bg-rose-950/90' : 
          jersey === 'pink' ? 'bg-fuchsia-950/90' : 
          jersey === 'violet' ? 'bg-violet-950/90' : 
          jersey === 'gold' ? 'bg-amber-950/90' : 'bg-slate-900/90'
        }`}
      >
        <button onClick={() => setScreen('dashboard')} className={`flex flex-col items-center gap-1 ${screen === 'dashboard' ? 'text-white' : 'opacity-40'}`}>
          <Home size={24} />
          <span className="text-[10px] font-black uppercase">Տուն</span>
        </button>
        <button className="flex flex-col items-center gap-1 opacity-40">
          <Book size={24} />
          <span className="text-[10px] font-black uppercase">Բառարան</span>
        </button>
        <button className="flex flex-col items-center gap-1 opacity-40">
          <Settings size={24} />
          <span className="text-[10px] font-black uppercase">Կարգավորում</span>
        </button>
        <button className="flex flex-col items-center gap-1 opacity-40">
          <User size={24} />
          <span className="text-[10px] font-black uppercase">Պրոֆիլ</span>
        </button>
      </motion.nav>
    </div>
  );
}
