import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Heart, 
  Trophy, 
  Flag,
  Zap,
  AlertCircle,
  Dumbbell as Gym,
  Medal,
  Activity,
  CheckCircle2,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Target
} from 'lucide-react';
import { CHAMPIONSHIP_DATA, Level, MatchingPair, SentenceChallenge } from './verbData';

interface GameSessionProps {
  level: Level;
  onClose: () => void;
  lives: number;
  setLives: (l: number) => void;
}

export default function GameSession({ level, onClose, lives, setLives }: GameSessionProps) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matches, setMatches] = useState<string[]>([]);
  const [wrongMatch, setWrongMatch] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [matchingPairs, setMatchingPairs] = useState<MatchingPair[]>([]);
  const [shuffledLeft, setShuffledLeft] = useState<MatchingPair[]>([]);
  const [shuffledRight, setShuffledRight] = useState<MatchingPair[]>([]);
  const [sentenceChallenges, setSentenceChallenges] = useState<SentenceChallenge[]>([]);

  useEffect(() => {
    if (level.type === 'matching') {
      const base = [...CHAMPIONSHIP_DATA.matching];
      setMatchingPairs(base);
      setShuffledLeft([...base].sort(() => Math.random() - 0.5));
      setShuffledRight([...base].sort(() => Math.random() - 0.5));
    } else {
      const shuffled = [...CHAMPIONSHIP_DATA.sentences].sort(() => Math.random() - 0.5);
      setSentenceChallenges(shuffled);
    }
  }, [level.type]);

  const progress = level.type === 'matching' 
    ? (matches.length / matchingPairs.length) * 100 
    : ((currentSentenceIdx) / sentenceChallenges.length) * 100;

  // Matching Logic
  useEffect(() => {
    if (selectedLeft && selectedRight) {
      const pair = matchingPairs.find(p => p.original === selectedLeft);
      if (pair && pair.translation === selectedRight) {
        setMatches(prev => [...prev, selectedLeft]);
        setSelectedLeft(null);
        setSelectedRight(null);
        if (matches.length + 1 === matchingPairs.length) {
          setTimeout(() => setFeedback('correct'), 500);
        }
      } else {
        setWrongMatch(true);
        setTimeout(() => {
          setWrongMatch(false);
          setSelectedLeft(null);
          setSelectedRight(null);
          if (lives > 0) setLives(lives - 1);
        }, 1000);
      }
    }
  }, [selectedLeft, selectedRight, matchingPairs, matches, lives, setLives]);

  const handleSentenceAnswer = (ans: string) => {
    if (feedback) return;
    const isCorrect = ans === sentenceChallenges[currentSentenceIdx].answer;
    if (isCorrect) {
      setFeedback('correct');
    } else {
      setFeedback('wrong');
      if (lives > 0) setLives(lives - 1);
    }
  };

  const nextAction = () => {
    if (level.type !== 'matching') {
      if (currentSentenceIdx + 1 < sentenceChallenges.length) {
        setCurrentSentenceIdx(prev => prev + 1);
        setFeedback(null);
      } else {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-[#4c0519] z-[100] flex flex-col pt-safe overflow-hidden font-sans">
      {/* Fashion Top UI */}
      <div className="bg-rose-950 shadow-2xl border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        <div className="relative z-50 flex items-center gap-4 p-4">
          <button onClick={onClose} className="p-2 bg-white/10 rounded-2xl text-white hover:bg-white/20 transition-colors">
            <X size={24} />
          </button>
          <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
            <motion.div 
              className="h-full bg-pink-400 shadow-[0_0_20px_rgba(244,114,182,0.6)]" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl border border-white/10">
            <Zap className="text-pink-400 fill-pink-400" size={18} />
            <span className="text-white font-black text-lg">{lives}</span>
          </div>
        </div>

        {/* Action Header */}
        <div className="h-[20vh] flex flex-col items-center justify-center relative overflow-hidden py-4">
           <div className="absolute top-0 w-full h-[1px] bg-white/5" />
           <motion.div 
              animate={{ 
                scale: feedback === 'correct' ? [1, 1.2, 1] : 1,
                rotate: feedback === 'wrong' ? [0, -10, 10, 0] : 0
              }}
              className="relative"
           >
              {level.type === 'matching' ? <Activity size={80} className="text-pink-400 opacity-20" /> : <Target size={80} className="text-pink-400 opacity-20" />}
              {feedback === 'correct' && (
                <div className="absolute inset-0 flex items-center justify-center text-pink-400">
                   <Trophy size={64} className="drop-shadow-[0_0_20px_rgba(244,114,182,0.5)]" />
                </div>
              )}
           </motion.div>
           <h2 className="text-white/60 text-[10px] uppercase font-black tracking-[0.4em] mt-4">Գայանեի Մոդայի Դասընթաց</h2>
        </div>
      </div>

      {/* Game Content */}
      <div className="flex-1 flex flex-col p-6 w-full max-w-xl mx-auto overflow-y-auto pb-48 relative z-10 scrollbar-hide">
        {level.type === 'matching' ? (
          <div className="space-y-6 py-4">
            <p className="text-pink-200 text-center font-black text-sm uppercase mb-4 italic">Բուտիկի Որակավորում</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                {shuffledLeft.map((pair) => (
                  <button
                    key={pair.id}
                    disabled={matches.includes(pair.original)}
                    onClick={() => setSelectedLeft(pair.original)}
                    className={`w-full p-6 rounded-[2.5rem] border-b-8 font-black transition-all flex items-center gap-3 min-h-[5rem] text-sm sm:text-base ${
                      matches.includes(pair.original) 
                        ? 'bg-rose-400/20 border-rose-400/40 text-rose-400 opacity-30 scale-95 shadow-none' 
                        : selectedLeft === pair.original
                          ? (wrongMatch ? 'bg-red-600 border-red-800 text-white animate-shake' : 'bg-pink-500 border-pink-700 text-white shadow-2xl -translate-y-1')
                          : 'bg-white/10 border-white/5 text-rose-100 hover:bg-white/20'
                    }`}
                  >
                    <Zap size={16} className={matches.includes(pair.original) ? 'opacity-0' : 'text-pink-400'} />
                    {pair.original}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                 {shuffledRight.map((pair) => {
                   const matchedPair = matchingPairs.find(m => m.translation === pair.translation && matches.includes(m.original));
                   const isMatched = !!matchedPair;
                   return (
                    <button
                      key={`trans-${pair.id}`}
                      disabled={isMatched}
                      onClick={() => setSelectedRight(pair.translation)}
                      className={`w-full p-6 rounded-[2.5rem] border-b-8 font-black transition-all min-h-[5rem] text-sm sm:text-base ${
                        isMatched 
                          ? 'bg-rose-400/20 border-rose-400/40 text-rose-400 opacity-30 scale-95 shadow-none' 
                          : selectedRight === pair.translation
                            ? (wrongMatch ? 'bg-red-600 border-red-800 text-white animate-shake' : 'bg-pink-500 border-pink-700 text-white shadow-2xl -translate-y-1')
                            : 'bg-white/15 border-white/5 text-white hover:bg-white/25'
                      }`}
                    >
                      {pair.translation}
                    </button>
                   );
                 })}
              </div>
            </div>
          </div>
        ) : (
          /* Sentence Challenge: Positive to Negative */
          sentenceChallenges[currentSentenceIdx] && (
            <div className="flex-1 flex flex-col gap-6 py-4">
              <div className="text-center space-y-2">
                 <h2 className="text-white font-black text-2xl italic tracking-tighter shadow-sm flex items-center justify-center gap-3">
                    {level.type === 'championship' ? <Medal size={28} className="text-pink-400" /> : <TrendingDown className="text-red-400" />}
                    {level.type === 'championship' ? 'Մոդայիկ Փուլ: Վերափոխիր' : 'Փոխիր Ժխտականի'}
                 </h2>
                 <p className="text-pink-400/60 text-xs font-bold uppercase">
                    {level.type === 'championship' ? 'Ստացեք մոդայի չեմպիոնի տիտղոսը' : 'Գնումների մարտահրավեր'}
                 </p>
              </div>
              
              <div className="space-y-8">
                 {/* Flashy Sentence Card */}
                 <div className="bg-rose-900/50 backdrop-blur-3xl p-10 rounded-[4rem] shadow-2xl border-2 border-white/10 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                       <Activity size={100} />
                    </div>
                    
                    <div className="space-y-6">
                       <div className="flex flex-col items-center gap-1">
                          <span className="text-[10px] font-black uppercase text-pink-500 tracking-widest px-3 py-1 bg-pink-500/10 rounded-full">Հագուստի խանութ</span>
                          <p className="text-xl font-bold text-pink-400 italic">"{sentenceChallenges[currentSentenceIdx].positive}"</p>
                       </div>

                       <div className="h-px w-1/2 mx-auto bg-white/10" />

                       <p className="text-3xl sm:text-4xl font-black text-white leading-tight italic">
                          {sentenceChallenges[currentSentenceIdx].sentence.split('___').map((part, i) => (
                            <React.Fragment key={i}>
                              {part}
                              {i === 0 && <span className="text-pink-400 border-b-8 border-pink-400/30 mx-2 px-1">___</span>}
                            </React.Fragment>
                          ))}
                       </p>
                       
                       <div className="pt-2">
                          <p className="text-pink-500/60 font-bold italic text-sm underline decoration-pink-800 underline-offset-4">{sentenceChallenges[currentSentenceIdx].translation}</p>
                       </div>
                    </div>
                 </div>

                 {/* Options Grid */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sentenceChallenges[currentSentenceIdx].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSentenceAnswer(opt)}
                        disabled={!!feedback}
                        className={`p-7 rounded-[3rem] border-b-[8px] font-black text-xl transition-all active:scale-95 active:border-b-0 ${
                          !feedback 
                            ? 'bg-white/5 border-white/10 text-white hover:bg-pink-500 hover:border-pink-700 shadow-xl' 
                            : opt === sentenceChallenges[currentSentenceIdx].answer 
                              ? 'bg-pink-400 border-pink-600 text-rose-950 animate-pulse' 
                              : 'bg-white/5 opacity-20 border-white/5 text-rose-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                 </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Championship Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div 
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            exit={{ y: 200 }}
            className={`fixed bottom-0 inset-x-0 p-10 pt-12 rounded-t-[5rem] shadow-[0_-20px_100px_rgba(0,0,0,0.8)] z-[110] border-t-8 ${
              feedback === 'correct' ? 'bg-pink-600 border-pink-400' : 'bg-red-700 border-red-500'
            }`}
          >
             <div className="max-w-xl mx-auto space-y-8">
                <div className="flex items-center gap-6 text-white">
                   <div className="bg-white/20 p-5 rounded-[2rem] backdrop-blur-xl shadow-inner">
                     {feedback === 'correct' ? <Trophy size={48} className="text-pink-200 drop-shadow-2xl" /> : <AlertCircle size={48} />}
                   </div>
                   <div className="flex-1">
                      <h3 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
                        {feedback === 'correct' ? 'ՄՈԴԱՅԻԿ!' : 'ՍԽԱԼ ՈՐՈՇՈՒՄ!'}
                      </h3>
                      <p className="font-bold opacity-80 mt-1 italic tracking-tight">
                        {feedback === 'correct' ? 'Փայլուն աշխատանք է, շարունակիր:' : 'Սխալ ընտրություն, փորձիր մեկ այլ տարբերակ:'}
                      </p>
                   </div>
                </div>

                <button 
                  onClick={nextAction}
                  className={`w-full py-7 rounded-[3rem] font-black uppercase tracking-[0.4em] shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] text-xl ${
                    feedback === 'correct' ? 'bg-white text-pink-900' : 'bg-white text-red-700'
                  }`}
                >
                  {feedback === 'correct' ? 'Հաջորդը' : 'Նորից'}
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
