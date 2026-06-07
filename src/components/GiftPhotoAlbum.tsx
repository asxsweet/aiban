import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, X, Maximize2, Sparkles } from "lucide-react";
import { LoveConfig } from "../types";
import { playPop, playChime } from "../utils/audio";

interface GiftPhotoAlbumProps {
  onBack: () => void;
  config: LoveConfig;
}

export default function GiftPhotoAlbum({ onBack, config }: GiftPhotoAlbumProps) {
  const [selectedImage, setSelectedImage] = useState<{ url: string; caption: string; index: number } | null>(null);

  const handleBack = () => {
    playPop();
    onBack();
  };

  const openLightbox = (url: string, caption: string, index: number) => {
    playChime();
    setSelectedImage({ url, caption, index });
  };

  const closeLightbox = () => {
    playPop();
    setSelectedImage(null);
  };

  // Custom rotate/tilt angles for Polaroids to make them look hand-scattered on the cream surface
  const tilts = ["-rotate-3 hover:rotate-0", "rotate-2 hover:rotate-0", "-rotate-1 hover:rotate-0"];

  return (
    <div className="flex flex-col items-center justify-center max-w-4xl mx-auto px-4 py-8 relative select-none">
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
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#E11D48] font-serif tracking-tight flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E11D48]/80 animate-pulse" />
            {config.gift3Title}
          </h2>
          <p className="mt-1 text-[#3A2428]/60 text-[10px] uppercase tracking-widest font-sans font-semibold">
           Толық ашу үшін үстін басыңыз
          </p>
          <div className="w-20 h-0.5 bg-rose-200 mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Polaroid Scrapbook Layout - Classic White Photo Styles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl my-4 justify-items-center">
          {config.polaroidImages.map((imgUrl, idx) => {
            const caption = config.polaroidCaptions[idx] || "Memory 💖";
            const tilt = tilts[idx % tilts.length];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.5, type: "spring" }}
                whileHover={{ scale: 1.05, y: -5, zIndex: 10 }}
                className={`bg-white border border-rose-100 p-4 pb-8 rounded-sm shadow-xl hover:shadow-2xl hover:border-rose-350 transition-all duration-300 transform ${tilt} max-w-[240px] w-full flex flex-col relative group cursor-pointer`}
                onClick={() => openLightbox(imgUrl, caption, idx)}
              >
                {/* Vintage Tape decoration at top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-amber-100/60 border-l border-r border-amber-200/90 backdrop-blur-md rotate-2 group-hover:rotate-0 transition-transform"></div>

                {/* Picture Container */}
                <div className="w-full aspect-square rounded-sm overflow-hidden bg-rose-50/50 border border-rose-100/50 relative mb-4">
                  <img
                    src={imgUrl}
                    alt={caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  {/* Subtle Zoom Icon on Hover */}
                  <div className="absolute inset-0 bg-rose-50/10 group-hover:bg-rose-50/20 transition-colors flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100">
                    <Maximize2 className="w-5 h-5 text-rose-600 drop-shadow-md" />
                  </div>
                </div>

                {/* Polaroid Caption */}
                <p className="text-center font-sans text-[#3A2428]/95 font-medium text-xs mt-1 leading-relaxed px-1">
                  {caption}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Modern Fullscreen Lightbox Zoom Indicator overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-55 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* Close controls */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-sm backdrop-blur-md cursor-pointer transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Immersive centered image frame on a neat white polaroid block */}
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="bg-white border border-rose-100 p-5 pb-10 rounded-sm shadow-2xl max-w-xl w-full flex flex-col relative"
              onClick={(e) => e.stopPropagation()} // stop close on canvas tap
            >
              <div className="w-full max-h-[60vh] rounded-sm overflow-hidden bg-rose-50 border border-rose-100">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain mx-auto"
                />
              </div>
              
              {/* Handwritten expanded caption */}
              <p className="text-center font-serif text-[#E11D48] italic text-lg font-bold tracking-wide mt-4 px-4 leading-relaxed">
                {selectedImage.caption}
              </p>
              
              {/* Image indexing tag */}
              <span className="absolute bottom-2.5 right-4 font-mono text-[10px] text-[#3A2428]/40 tracking-wider">
                {selectedImage.index + 1} OF {config.polaroidImages.length}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
