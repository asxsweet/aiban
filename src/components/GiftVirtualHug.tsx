import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Heart, Sparkles, Send } from "lucide-react";
import { LoveConfig } from "../types";
import bearsHugging from "../assets/images/bears_hugging_1780515706814.png";
import Confetti from "./Confetti";
import { playPop, playChime } from "../utils/audio";

interface GiftVirtualHugProps {
  onBack: () => void;
  config: LoveConfig;
}

export default function GiftVirtualHug({ onBack, config }: GiftVirtualHugProps) {
  const [hugCount, setHugCount] = useState(0);
  const [isHugging, setIsHugging] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  const handleBack = () => {
    playPop();
    onBack();
  };

  const triggerHug = () => {
    if (isHugging) return;
    setIsHugging(true);
    setHugCount(prev => prev + 1);
    setShowHearts(true);
    playChime();

    setTimeout(() => {
      setIsHugging(false);
    }, 1000);

    setTimeout(() => {
      setShowHearts(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto px-4 py-8 relative select-none">
      {/* Heart Confetti Explosion on Hug */}
      <Confetti active={showHearts} type="hearts" />

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

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full glass rounded-sm border border-rose-100 shadow-2xl p-6 sm:p-10 flex flex-col items-center text-center relative overflow-hidden"
      >
        {/* Soft Warm Top Border */}
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#E11D48] via-rose-300 to-[#E11D48]"></div>

        {/* Floating Hug Count Badge */}
        <AnimatePresence>
          {hugCount > 0 && (
            <motion.div
              initial={{ scale: 0.3, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute top-6 right-6 bg-[#E11D48]/10 text-[#E11D48] border border-[#E11D48]/25 px-3 py-1 rounded-sm text-xs font-bold font-sans flex items-center gap-1 shadow-sm uppercase tracking-wider"
            >
              <Heart className="w-3 h-3 fill-[#E11D48] text-[#E11D48]" /> Құшақ саны: <span className="font-mono">{hugCount}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Teddy Bears Hugging Graphic */}
        <motion.div
          animate={isHugging ? {
            scale: [1, 1.12, 0.98, 1.05, 1],
            rotate: [0, -3, 3, -2, 2, 0],
          } : {}}
          transition={{ duration: 0.8, ease: "easeInOut", type: "tween" }}
          onClick={triggerHug}
          className="relative w-48 h-48 sm:w-56 sm:h-56 mb-6 rounded-sm overflow-hidden bg-rose-50/30 border border-rose-100 p-2 shadow-inner group cursor-pointer"
        >
          <img
            src={bearsHugging}
            alt="Cute Teddy Bears Hugging"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Subtle click bubble indicator */}
         
        </motion.div>

        {/* Title */}
        <motion.div className="mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#E11D48] font-serif tracking-tight flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E11D48]/80" />
            Виртуалды құшақ
          </h2>
          <div className="w-20 h-0.5 bg-[#E11D48]/20 mx-auto mt-2 rounded-full"></div>
        </motion.div>

        {/* Config text description */}
        <p className="text-sm sm:text-base text-[#3A2428]/80 font-sans max-w-sm mb-8 leading-relaxed">
          {config.gift2Text}
        </p>

        {/* Interactive Send Hug Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={triggerHug}
          className="relative inline-flex items-center gap-2 bg-[#E11D48] hover:bg-[#ff3b5f] text-white font-extrabold text-xs px-8 py-4 rounded-sm shadow-lg shadow-[#E11D48]/25 cursor-pointer transition-all duration-300 font-sans uppercase tracking-widest"
        >
          <Send className="w-4 h-4 fill-white text-white" />
          {hugCount === 0 ? "Құшағыңа алшы!" : "Тағы тағы!"}
        </motion.button>
      </motion.div>
    </div>
  );
}
