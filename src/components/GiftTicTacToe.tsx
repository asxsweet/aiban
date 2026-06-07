import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Heart, RefreshCw, Trophy, Sparkles } from "lucide-react";
import { LoveConfig } from "../types";
import { playPop, playSuccessFanfare, playBuzz } from "../utils/audio";
import Confetti from "./Confetti";

interface GiftTicTacToeProps {
  onBack: () => void;
  config: LoveConfig;
}

export default function GiftTicTacToe({ onBack, config }: GiftTicTacToeProps) {
  // Cells representation:
  // 0: top-left, 1: top-mid, 2: top-right
  // 3: mid-left, 4: center, 5: mid-right
  // 6: bot-left, 7: bot-mid, 8: bot-right
  // Pre-placed hearts on 0 and 8. Center (4) needs to be clicked to complete the diagonal.
  const [board, setBoard] = useState<(string | null)[]>([
    "heart", null, null,
    null, null, null,
    null, null, "heart"
  ]);
  const [hasWon, setHasWon] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleBack = () => {
    playPop();
    onBack();
  };

  const handleCellClick = (index: number) => {
    if (hasWon) return;

    // Pre-placed hearts can't be clicked
    if (index === 0 || index === 8) {
      playBuzz();
      return;
    }

    // Already filled cell
    if (board[index] !== null) {
      playBuzz();
      return;
    }

    if (index === 4) {
      // The winning cell!
      const newBoard = [...board];
      newBoard[4] = "heart";
      setBoard(newBoard);
      setHasWon(true);
      setShowConfetti(true);
      playSuccessFanfare();
    } else {
      // Wrong cell clicked!
      playBuzz();
      setAttempts(prev => prev + 1);
      
      // Flash a little indicator showing that's not the one, but let them try again immediately!
      const newBoard = [...board];
      newBoard[index] = "O";
      setBoard(newBoard);
      
      setTimeout(() => {
        setBoard(prev => {
          const resetBoard = [...prev];
          if (resetBoard[index] === "O") resetBoard[index] = null;
          return resetBoard;
        });
      }, 800);
    }
  };

  const handleReset = () => {
    playPop();
    setBoard([
      "heart", null, null,
      null, null, null,
      null, null, "heart"
    ]);
    setHasWon(false);
    setShowConfetti(false);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto px-4 py-8 relative select-none">
      <Confetti active={showConfetti} type="full" />

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
        className="w-full glass rounded-sm border border-rose-100 shadow-2xl p-6 sm:p-10 flex flex-col items-center relative overflow-hidden"
      >
        {/* Soft Pink Top Border */}
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#E11D48] via-rose-300 to-[#E11D48]"></div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#E11D48] font-serif tracking-tight">
            {config.gift4Title}
          </h2>
          <p className="mt-1 text-[#3A2428]/60 text-[10px] uppercase tracking-widest font-sans font-semibold">
            {config.gift4Text}
          </p>
          <div className="w-16 h-0.5 bg-rose-200 mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Tic Tac Toe Board */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-4 bg-rose-50/50 rounded-sm border border-rose-100 shadow-inner p-4 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-3 w-full h-full relative">
            {board.map((cell, idx) => {
              const isPrePlaced = idx === 0 || idx === 8;
              const isCenter = idx === 4;

              return (
                <motion.div
                  key={idx}
                  whileHover={!hasWon && !isPrePlaced ? { scale: 1.05 } : {}}
                  whileTap={!hasWon && !isPrePlaced ? { scale: 0.95 } : {}}
                  onClick={() => handleCellClick(idx)}
                  className={`relative rounded-sm flex items-center justify-center font-sans font-bold text-2xl transition-all cursor-pointer select-none ${
                    isPrePlaced
                      ? "bg-[#E11D48]/10 border border-[#E11D48]/20 shadow-sm cursor-default"
                      : cell === "O"
                      ? "bg-rose-100/50 border border-red-300 text-red-500"
                      : cell === "heart" && isCenter
                      ? "bg-[#E11D48] shadow-lg shadow-rose-200 text-white"
                      : "bg-white border border-rose-100 shadow-sm"
                  }`}
                >
                  {cell === "heart" && (
                    <motion.div
                      initial={isCenter ? { scale: 0 } : { scale: 1 }}
                      animate={isCenter ? { scale: [0, 1.3, 1], rotate: [0, 15, 0] } : {}}
                      transition={{ duration: 0.5, type: "tween", ease: "backOut" }}
                    >
                      <Heart className={`w-8 h-8 ${isCenter ? "fill-white text-white" : "fill-[#E11D48] text-[#E11D48] animate-pulse"}`} />
                    </motion.div>
                  )}

                  {cell === "O" && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-[#E11D48] font-mono text-xs"
                    >
                      ❌
                    </motion.span>
                  )}

                  {/* Empty cell helper animation hint for center */}
                  {cell === null && idx === 4 && (
                    <motion.span
                      animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
                      transition={{ repeat: Infinity, duration: 1.5, type: "tween", ease: "easeInOut" }}
                      className="absolute text-[#E11D48]/80 fill-none"
                    >
                      <Heart className="w-6 h-6 stroke-1 stroke-dashed text-[#E11D48]" />
                    </motion.span>
                  )}
                </motion.div>
              );
            })}

            {/* Winning Diagonal Line Overlay */}
          {hasWon && (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none z-10"
    viewBox="0 0 100 100"
  >
    <motion.line
      x1="15"
      y1="15"
      x2="85"
      y2="85"
      stroke="#E11D48"
      strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.6 }}
    />
  </svg>
)}
          </div>
        </div>

        {/* Won Success Message panel */}
        <div className="h-20 flex items-center justify-center mt-4 w-full">
          {hasWon ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring" }}
              className="flex flex-col items-center gap-1"
            >
              <h3 className="text-lg font-bold text-[#E11D48] tracking-tight">
                {config.gift4WonText}! ❤️
              </h3>
              <p className="text-[10px] text-[#3A2428]/60 font-bold uppercase tracking-widest">
                X немесе 0 ойыны сәтті аяқталды!
              </p>
            </motion.div>
          ) : (
            attempts > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-rose-50 text-[#E11D48] border border-[#E11D48]/30 rounded-sm text-[10px] uppercase font-bold tracking-widest cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#E11D48]" /> reset challenge
              </motion.button>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
}
