import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, Heart, Sparkles } from "lucide-react";
import { LoveConfig } from "../types";
import catFlowers from "../assets/images/cat_flowers_1780515658877.png";
import { playPop } from "../utils/audio";

interface GiftLoveLetterProps {
  onBack: () => void;
  config: LoveConfig;
}

export default function GiftLoveLetter({ onBack, config }: GiftLoveLetterProps) {
  const handleBack = () => {
    playPop();
    onBack();
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto px-4 py-8 select-none relative">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleBack}
        className="self-start mb-6 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-[#E11D48] bg-white hover:bg-rose-50 border border-[#E11D48]/30 rounded-sm shadow-md cursor-pointer transition-all duration-300 font-sans tracking-widest"
      >
        <ArrowLeft className="w-4 h-4" /> Артқа
      </motion.button>

      {/* Decorative Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-20 left-10 text-[#E11D48]/30 text-3xl"
        >
          ❤️
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 text-[#E11D48]/30 text-4xl"
        >
          💖
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full glass rounded-sm border border-rose-100 shadow-2xl overflow-hidden p-6 sm:p-10 flex flex-col items-center text-center relative"
      >
        {/* Paper Background Style Details */}
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#E11D48] via-rose-300 to-[#E11D48]"></div>

        {/* Chibi Cat holding flowers */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          whileHover={{ rotate: [0, -2, 2, -2, 2, 0], scale: 1.05, transition: { type: "tween", duration: 0.4 } }}
          className="relative w-48 h-48 sm:w-56 sm:h-56 mb-6 rounded-sm overflow-hidden bg-white border border-rose-100 p-2 shadow-xl group cursor-grab active:cursor-grabbing"
        >
          <img
            src={catFlowers}
            alt="Cute Chibi Cat holding Flowers"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute bottom-2 right-2 text-[10px] uppercase bg-[#E11D48] text-white font-extrabold px-3 py-1 rounded-sm select-none tracking-widest shadow-md">
            қарау 💖
          </span>
        </motion.div>

        {/* Title / Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-[#E11D48] font-serif tracking-tight flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E11D48]/80" />
            {config.gift1Title}
          </h2>
          <div className="w-24 h-0.5 bg-[#E11D48]/20 mx-auto mt-2 rounded-full"></div>
        </motion.div>

        {/* Letter Text Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative w-full max-w-sm mx-auto py-5 px-6 rounded-sm bg-rose-50/20 border border-rose-100/40 backdrop-blur-md"
        >
          {/* Decorative quote marks */}
          <span className="absolute -top-3 left-4 text-5xl font-serif text-[#E11D48]/20 pointer-events-none select-none">“</span>
          
          <p className="text-base sm:text-lg font-semibold text-[#3A2428]/95 leading-relaxed py-2 font-sans">
            {config.gift1Text}
          </p>

          <span className="absolute -bottom-10 right-4 text-5xl font-serif text-[#E11D48]/20 pointer-events-none select-none">”</span>
        </motion.div>

        {/* Floating Heart Icon Accent */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, type: "tween", ease: "easeInOut" }}
          className="mt-6 flex justify-center"
        >
          <Heart className="w-8 h-8 text-[#E11D48] fill-[#E11D48] drop-shadow-[0_0_8px_rgba(225,29,72,0.4)]" />
        </motion.div>
      </motion.div>
    </div>
  );
}
