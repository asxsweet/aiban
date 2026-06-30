import React, { useRef } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Award, HelpCircle, Heart, Star, Printer } from "lucide-react";
import { LoveConfig } from "../types";
import { playPop, playChime } from "../utils/audio";

interface CertificateAwardProps {
  onBack: () => void;
  config: LoveConfig;
}

// Ағымдағы күнді қазақша форматта алу (мысалы: "01 шілде 2026")
const getCurrentDateKZ = (): string => {
  const months = [
    "қаңтар", "ақпан", "наурыз", "сәуір", "мамыр", "маусым",
    "шілде", "тамыз", "қыркүйек", "қазан", "қараша", "желтоқсан"
  ];
  const now = new Date();
  const day = now.getDate().toString().padStart(2, "0");
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  return `${day} ${month} ${year}`;
};

export default function CertificateAward({ onBack, config }: CertificateAwardProps) {
  const certificateRef = useRef<HTMLDivElement | null>(null);

  const handleBack = () => {
    playPop();
    onBack();
  };

  const handlePrint = () => {
    playChime();
    
    // Simple modern browser print trigger
    const printContent = certificateRef.current?.innerHTML;
    if (!printContent) return;

    // Create print styles dynamically to hide surrounding UI and keep high fidelity layout!
    const style = document.createElement("style");
    style.innerHTML = `
      @media print {
        body { background: #FFF9FA !important; color: #3A2428 !important; padding: 0 !important; margin: 0 !important; }
        .no-print { display: none !important; }
        .cert-container { border: 8px double #E11D48 !important; padding: 2rem !important; box-shadow: none !important; margin: 0 !important; width: 100% !important; max-width: 100% !important; background: #FFFDFE !important; color: #3A2428 !important; }
      }
    `;
    document.head.appendChild(style);

    window.print();
    
    // Clean up print styles
    document.head.removeChild(style);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-4xl mx-auto px-4 py-8 relative select-none">
      
      {/* Decorative Golden Stars in Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + i,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            className="absolute text-[#E11D48] opacity-40"
            style={{
              top: `${15 + i * 15}%`,
              left: `${8 + (i * 17) % 80}%`,
            }}
          >
            <Star className="w-5 h-5 fill-[#E11D48]/30 text-[#E11D48]" />
          </motion.div>
        ))}
      </div>

      {/* Buttons top bar */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-6 no-print">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-[#E11D48] bg-white hover:bg-rose-50 border border-[#E11D48]/30 rounded-sm shadow-md cursor-pointer transition-all duration-300 font-sans tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Сыйлықтарға қайту
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#E11D48] hover:bg-[#ff3b5f] rounded-sm shadow-md cursor-pointer transition-all duration-300 font-sans uppercase tracking-widest"
        >
          <Printer className="w-4 h-4" /> Шығару / PDF түрінде сақтау
        </motion.button>
      </div>

      {/* The Elegant Diploma Certificate Frame */}
      <motion.div
        ref={certificateRef}
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="w-full max-w-3xl bg-white border-8 border-double border-[#E11D48] shadow-2xl rounded-sm relative p-8 sm:p-14 md:p-16 flex flex-col items-center text-center select-text cert-container"
      >
        {/* Calligraphy corner ornaments */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#E11D48]/50 pointer-events-none"></div>
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#E11D48]/50 pointer-events-none"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#E11D48]/50 pointer-events-none"></div>
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#E11D48]/50 pointer-events-none"></div>

        {/* Header Ribbon / Star Emblem */}
        <motion.div
          animate={{ rotate: [0, -2, 2, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="mb-6 flex flex-col items-center"
        >
          <Award className="w-16 h-16 text-[#E11D48] fill-rose-50 drop-shadow-sm" />
        </motion.div>

        {/* Certificate title - e.g. "BEST BOYFRIEND AWARD" */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#E11D48] uppercase tracking-wider mb-2 leading-tight drop-shadow-sm select-all">
          {config.awardTitle}
        </h1>

        {/* Presentation subtitle */}
        <p className="text-[#3A2428]/60 font-serif italic text-base sm:text-lg tracking-wide uppercase mt-4 mb-2 opacity-80 leading-none">
          Бұл сертефикат арналады
        </p>

        {/* Recipient's Name */}
        <div className="w-full max-w-lg my-4 relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#3A2428] tracking-wide inline-block py-2 select-all border-b border-[#E11D48]/30 px-6">
            {config.recipientName}
          </h2>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-[#E11D48]"></div>
        </div>

        {/* Award Content / Description text */}
        <p className="text-[#3A2428]/95 font-serif text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl px-2 my-6 select-all italic font-medium">
          {config.awardText}
        </p>

        {/* Footer info: Signature & Stamp */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 w-full mt-8 sm:mt-12 pt-6 border-t border-[#E11D48]/20 items-end">
          {/* Signature field */}
          <div className="flex flex-col items-center">
            <span className="font-signature text-3xl sm:text-4xl text-[#E11D48] block mb-0 leading-none select-all hover:scale-110 duration-200 origin-center">
              {config.signatureText}
            </span>
            <div className="w-36 h-0.5 bg-rose-100"></div>
            <span className="text-[10px] text-[#3A2428]/50 font-sans uppercase tracking-widest mt-1.5 font-bold">
              мөрі басылған ❤️
            </span>
          </div>

          {/* Official Scarlet Seal badge stamp */}
          <div className="flex flex-col items-center relative justify-center order-first sm:order-none">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="relative w-20 h-20 bg-gradient-to-br from-[#E11D48] via-[#FF4B72] to-[#E11D48] rounded-full shadow-lg border border-rose-300 flex items-center justify-center cursor-pointer select-none"
            >
              {/* Star spikes border */}
              <div className="absolute inset-0.5 rounded-full border border-dashed border-white/60"></div>
              
              {/* Inner seal circle */}
              <div className="w-14 h-14 rounded-full bg-white border-2 border-[#E11D48] flex items-center justify-center text-center p-1">
                <Heart className="w-6 h-6 fill-[#E11D48] text-[#E11D48] animate-pulse" />
              </div>

              {/* Scarlet Ribbon hangers */}
              <div className="absolute -bottom-8 left-1/4 w-4 h-10 bg-[#E11D48] rotate-12 origin-top rounded-b-sm shadow-md skew-x-3"></div>
              <div className="absolute -bottom-8 right-1/4 w-4 h-10 bg-[#E11D48]/80 -rotate-12 origin-top rounded-b-sm shadow-md -skew-x-3"></div>
            </motion.div>
          </div>

          {/* Date field — автоматты түрде бүгінгі күн қойылады */}
          <div className="flex flex-col items-center">
            <span className="font-serif text-sm sm:text-base font-bold text-[#3A2428] mb-1 select-all">
              {getCurrentDateKZ()}
            </span>
            <div className="w-36 h-0.5 bg-rose-100"></div>
            <span className="text-[10px] text-[#3A2428]/50 font-sans uppercase tracking-widest mt-1.5 font-bold">
              марапатталған күні 📅
            </span>
          </div>
        </div>

      </motion.div>
    </div>
  );
}