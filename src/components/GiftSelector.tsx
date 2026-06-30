import React from "react";
import { motion } from "motion/react";
import { Heart, CheckCircle2, Gift } from "lucide-react";
import { LoveConfig } from "../types";
import { playPop, playChime } from "../utils/audio";

interface GiftSelectorProps {
  onSelectGift: (giftId: number) => void;
  openedGifts: Set<number>;
  onClaimCertificate: () => void;
  config: LoveConfig;
}

export default function GiftSelector({
  onSelectGift,
  openedGifts,
  onClaimCertificate,
  config,
}: GiftSelectorProps) {
  const gifts = [
    {
      id: 1,
      name: "Махаббат хаты 💌",
      description: "Сізге шағын хат...",
      accentColor: "from-pink-400 to-rose-500",
      ribbonColor: "bg-rose-500",
      boxColor: "bg-rose-100",
    },
    {
      id: 2,
      name: "Виртуалды құшақ 🤗",
      description: "Күніңізді құшақпен толтыр...",
      accentColor: "from-rose-400 to-fuchsia-500",
      ribbonColor: "bg-fuchsia-500",
      boxColor: "bg-fuchsia-100",
    },
    {
      id: 3,
      name: "Альбом 📸",
      description: "Сұлу қыздың сұлу суреттері...",
      accentColor: "from-fuchsia-400 to-purple-500",
      ribbonColor: "bg-purple-500",
      boxColor: "bg-purple-100",
    },
    {
      id: 4,
      name: "Шағын ойын ойнайсыз ба? 🎮",
      description: "Сыйлық иегері болуға сонғы қадам...",
      accentColor: "from-purple-400 to-violet-500",
      ribbonColor: "bg-violet-500",
      boxColor: "bg-violet-100",
    },
  ];

  const handleSelect = (id: number) => {
    playPop();
    onSelectGift(id);
  };

  const allOpened = openedGifts.size >= 4;

  const handleClaim = () => {
    playChime();
    onClaimCertificate();
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-4xl mx-auto px-4 py-8 select-none">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-rose-100 text-[#E11D48] border border-rose-200 mb-3 animate-pulse">
          <Heart className="w-3.5 h-3.5 fill-[#E11D48]" /> Жақыным Менің Адамым
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#3A2428] tracking-tight uppercase font-serif">
          Сыйлықтар <span className="outline-text">сіз үшін</span>
        </h1>
        <p className="mt-2 text-[10px] uppercase tracking-widest text-[#E11D48] font-semibold font-sans">
          Ашу үшін кез келген сыйлықты бас
        </p>
      </motion.div>

      {/* Grid of 4 Gift Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl mb-12">
        {gifts.map((gift, index) => {
          const isOpened = openedGifts.has(gift.id);

          return (
            <motion.div
              key={gift.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.03 }}
              className="relative p-6 rounded-sm glass hover:border-rose-450 hover:bg-white/90 transition-all cursor-pointer overflow-hidden flex flex-col items-center text-center group"
              onClick={() => handleSelect(gift.id)}
            >
              {/* Decorative background aura */}
              <div className={`absolute -right-12 -top-12 w-32 h-32 rounded-full bg-gradient-to-br ${gift.accentColor} opacity-[0.12] blur-xl group-hover:scale-125 transition-transform duration-500`} />

              {/* Opened/Seen Badge */}
              {isOpened && (
                <div className="absolute top-4 right-4 flex items-center gap-1 text-[#E11D48] bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider animate-bounce">
                  <CheckCircle2 className="w-3 h-3" /> Ашылған
                </div>
              )}

              {/* The Interactive CSS Gift Box */}
              <div className="relative w-32 h-32 my-4 flex items-center justify-center">
                {/* Bow on Top */}
                <motion.div 
                  className="absolute -top-1 z-20 flex"
                  animate={isOpened ? { rotate: [0, -5, 5, -5, 5, 0], scale: 1.05 } : { rotate: [0, -2, 2, 0] }}
                  transition={{ repeat: Infinity, duration: 2, repeatDelay: 1, type: "tween", ease: "easeInOut" }}
                >
                  <div className={`w-6 h-6 rounded-full ${gift.ribbonColor} shadow-md flex items-center justify-center relative -mr-2`}>
                    <div className="absolute w-5 h-8 border-2 border-inherit rounded-full rotate-45 -top-6 -left-2 opacity-80" style={{ borderColor: "rgba(0,0,0,0.1)" }}></div>
                  </div>
                  <div className={`w-6 h-6 rounded-full ${gift.ribbonColor} shadow-md flex items-center justify-center relative`}>
                    <div className="absolute w-5 h-8 border-2 border-inherit rounded-full -rotate-45 -top-6 -right-2 opacity-80" style={{ borderColor: "rgba(0,0,0,0.1)" }}></div>
                  </div>
                </motion.div>

                {/* Gift Lid */}
                <motion.div
                  className={`absolute top-5 w-24 h-5 rounded-sm ${gift.ribbonColor} z-10 shadow-md group-hover:-translate-y-2 transition-transform duration-300 flex justify-center`}
                >
                  {/* Vertical ribbon on lid */}
                  <div className="w-4 h-full bg-black/5"></div>
                </motion.div>

                {/* Gift Box Body */}
                <div className={`absolute bottom-5 w-20 h-20 rounded-b-sm ${gift.boxColor} border border-rose-250/20 border-t-4 border-black/5 shadow-inner overflow-hidden flex flex-col justify-end items-center pb-4 group-hover:scale-95 transition-all duration-300`}>
                  {/* Vertical ribbon matching the lid */}
                  <div className="absolute inset-y-0 w-4 bg-rose-500/20"></div>
                  
                  {/* Cute Heart in Center of box */}
                  <Heart className={`w-6 h-6 z-10 transition-transform duration-300 group-hover:scale-110 ${isOpened ? "fill-[#E11D48] text-[#E11D48]" : "text-[#3A2428]/40 fill-[#3A2428]/10"}`} />
                </div>

                {/* Secret item peeking behind lid on hover */}
                <motion.div
                  className="absolute top-1 w-12 h-12 flex items-center justify-center text-xl pointer-events-none group-hover:-translate-y-4 transition-transform duration-300 opacity-0 group-hover:opacity-100"
                >
                  🎁
                </motion.div>
              </div>

              {/* Title & Desc */}
              <h3 className="text-lg font-bold text-[#3A2428] tracking-tight mb-1 font-sans">
                {gift.name}
              </h3>
              <p className="text-xs text-[#3A2428]/70 font-medium px-4 font-sans line-clamp-2">
                {gift.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Unlocked Special Prize Banner */}
      <motion.div
        animate={allOpened ? { scale: [1, 1.02, 1], y: 0, opacity: 1 } : { y: 20, opacity: 0.6 }}
        transition={{ repeat: allOpened ? Infinity : 0, duration: 2, type: "tween", ease: "easeInOut" }}
        className={`w-full max-w-2xl px-6 py-6 rounded-sm border text-center transition-all duration-500 ${
          allOpened
            ? "glass-accent border-rose-300 shadow-xl shadow-rose-100"
            : "bg-white/60 border-rose-100 opacity-80 pointer-events-none"
        }`}
      >
        {!allOpened ? (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-[#3A2428]/60">
            <Gift className="w-5 h-5 text-[#E11D48]/60 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider font-sans">
             Басты сыйлықты алу үшін ({openedGifts.size}/4) барлық 4 сыйлықты аш!
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <span className="text-2xl">👑 🏆 👑</span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#E11D48] tracking-tight">
              Сіздің басты сыйлығыңыз дайын!
            </h2>
            <p className="text-[10px] text-[#3A2428]/80 font-bold uppercase tracking-[0.2em] leading-none font-sans">
              Ең сұлу қыздың мәртебесі ашылды
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClaim}
              className="mt-2 bg-[#E11D48] hover:bg-[#ff3b5f] text-white font-extrabold text-xs px-8 py-3.5 rounded-sm shadow-lg shadow-rose-200 cursor-pointer transition-all duration-300 font-sans uppercase tracking-widest"
            >
              Басты сыйлықты аш 📜
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
