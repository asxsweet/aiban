import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Settings, Palette, User, Volume2, VolumeX, Eye } from "lucide-react";
import { LoveConfig, DEFAULT_CONFIG } from "./types";
import { playPop, playChime } from "./utils/audio";

// Import custom sections
import GiftSelector from "./components/GiftSelector";
import GiftLoveLetter from "./components/GiftLoveLetter";
import GiftVirtualHug from "./components/GiftVirtualHug";
import GiftPhotoAlbum from "./components/GiftPhotoAlbum";
import GiftTicTacToe from "./components/GiftTicTacToe";
import CertificateAward from "./components/CertificateAward";
import SettingsPanel from "./components/SettingsPanel";
import Confetti from "./components/Confetti";

// Assets
import catFlowers from "./assets/images/cat_flowers_1780515658877.png";
import catAngryGun from "./assets/images/cat_angry_gun_1780515683483.png";

type AppState =
  | "love-ask"
  | "love-rejected"
  | "gift-menu"
  | "gift-1-letter"
  | "gift-2-hug"
  | "gift-3-album"
  | "gift-4-tictactoe"
  | "certificate";

export default function App() {
  const [appState, setAppState] = useState<AppState>("love-ask");
  const [config, setConfig] = useState<LoveConfig>(DEFAULT_CONFIG);
  const [openedGifts, setOpenedGifts] = useState<Set<number>>(new Set());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Growth counter for the YES button when the user hovers/clicks NO
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [noClicks, setNoClicks] = useState(0);

  // Load customized config from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("love_card_config_v2");
      if (saved) {
        setConfig(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Failed to read config from localStorage", e);
    }
  }, []);

  const handleSaveConfig = (newConfig: LoveConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem("love_card_config_v2", JSON.stringify(newConfig));
    } catch (e) {
      console.warn("Failed to write config to localStorage", e);
    }
  };

  const handleLoveAccepted = () => {
    playChime();
    setShowCelebration(true);
    
    // Switch state after a cute short heart celebration flash
    setTimeout(() => {
      setAppState("gift-menu");
      setShowCelebration(false);
    }, 2000);
  };

  const handleLoveRejected = () => {
    playPop();
    setNoClicks((prev) => prev + 1);
    // Increase size of YES button on every rejection to make it virtually impossible to refuse! 😄
    setYesButtonScale((prev) => prev + 0.155);
    setAppState("love-rejected");
  };

  const handleTryAgain = () => {
    playPop();
    setAppState("love-ask");
  };

  const handleOpenGift = (giftId: number) => {
    // Record opened progress
    setOpenedGifts((prev) => {
      const updated = new Set(prev);
      updated.add(giftId);
      return updated;
    });

    // Route to sub-pages
    switch (giftId) {
      case 1:
        setAppState("gift-1-letter");
        break;
      case 2:
        setAppState("gift-2-hug");
        break;
      case 3:
        setAppState("gift-3-album");
        break;
      case 4:
        setAppState("gift-4-tictactoe");
        break;
    }
  };

  return (
    <div className="min-h-screen text-[#3A2428] flex flex-col justify-between selection:bg-[#E11D48]/20 relative overflow-hidden font-sans">
      
      {/* Dynamic Celebration Overlay */}
      <Confetti active={showCelebration} type="full" />

      {/* Decorative Background elements from Artistic Flair */}
      <div className="absolute inset-0 pointer-events-none no-print overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#E11D48] opacity-[0.05] blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-[#FF4B72] opacity-[0.05] blur-[100px] rounded-full"></div>
        
        {/* Floating vertical text on sides */}
        <div className="absolute top-24 right-4 sm:right-8 vertical-text text-[9px] uppercase tracking-[0.4em] text-[#E11D48]/30 whitespace-nowrap select-none">
          РОМАНТИК •АСИК  • OUTSTANDING • EXCELLENCE
        </div>
        <div className="absolute bottom-24 left-4 sm:left-8 vertical-text text-[9px] uppercase tracking-[0.4em] text-[#E11D48]/20 whitespace-nowrap select-none">
          PREPARED WITH LOVE FOR MY FAVORITE PERSON
        </div>
      </div>

      {/* Decorative tiny top header badge */}
      <header className="px-6 sm:px-12 py-8 flex justify-between items-center z-20 no-print">
        <div className="text-xl sm:text-2xl font-bold tracking-tighter uppercase font-sans">
          LOVE <span className="text-[#E11D48]">HUB</span>
        </div>
        
        {/* Creator Controls Indicator */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="px-5 py-2.5 bg-[#E11D48] hover:bg-[#ff3b5f] text-white font-bold text-[10px] uppercase tracking-widest rounded-sm transition-all duration-300 shadow-lg shadow-[#E11D48]/20 cursor-pointer flex items-center gap-1.5"
          >
            <Settings className="w-3.5 h-3.5 text-white animate-spin-slow" />
            <span>EDIT CARD</span>
          </button>
        </div>
      </header>

      {/* Main Container / Content routers */}
      <main className="flex-1 flex items-center justify-center p-4 relative z-10 w-full">
        <AnimatePresence mode="wait">
          
          {/* ASK VIEW: "DO YOU LOVE ME??" */}
          {appState === "love-ask" && (
            <motion.div
              key="ask"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center text-center max-w-md w-full p-6 sm:p-10 rounded-sm glass border border-rose-100 shadow-2xl"
            >
              <h1 className="font-serif leading-none tracking-tight mb-8">
                <span className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-[#3A2428]/60 block mb-2">Менің жаным,</span>
                <span className="text-3xl sm:text-4xl font-bold tracking-tighter text-[#3A2428] block">Сіз мені</span>
                <span className="text-4xl sm:text-5xl font-bold outline-text block tracking-wide mt-1 uppercase">жақсы көресіз бе??</span>
              </h1>

              {/* Sweet Chibi Cat holding roses */}
              <motion.div
                whileHover={{ rotate: [0, -3, 3, 0], scale: 1.05, transition: { type: "tween", duration: 0.3 } }}
                className="w-48 h-48 sm:w-56 sm:h-56 rounded-sm bg-white/80 border border-rose-100/80 mb-8 p-3 shadow-2xl flex items-center justify-center transition-all duration-700 cursor-grab active:cursor-grabbing"
              >
                <img
                  src={catFlowers}
                  alt="Cute Kitten with Bow holding Roses"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </motion.div>

              {/* Yes & No Buttons container */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <motion.button
                  style={{ scale: yesButtonScale }}
                  whileHover={{ scale: yesButtonScale * 1.05 }}
                  whileTap={{ scale: yesButtonScale * 0.95 }}
                  onClick={handleLoveAccepted}
                  className="w-full sm:w-auto bg-[#E11D48] text-white hover:bg-[#ff3b5f] font-extrabold text-xs tracking-wider uppercase px-8 py-4 rounded-sm shadow-lg shadow-[#E11D48]/10 cursor-pointer transition-all leading-none font-sans"
                >
                  Ия ❤️
                </motion.button>

                <motion.button
                  whileHover={{ x: [0, -5, 5, -5, 5, 0], transition: { type: "tween", duration: 0.3 } }}
                  onClick={handleLoveRejected}
                  className="w-full sm:w-auto bg-transparent border border-[#E11D48]/30 text-[#E11D48] hover:bg-rose-50 font-extrabold text-xs tracking-wider uppercase px-6 py-4 rounded-sm shadow-md cursor-pointer transition-all leading-none font-sans"
                >
                  Жоқ 💔
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* REJECTED VIEW: "HOW DARE YOU!" */}
          {appState === "love-rejected" && (
            <motion.div
              key="rejected"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center text-center max-w-md w-full p-6 sm:p-10 rounded-sm glass border border-rose-300 shadow-2xl"
            >
              <h1 className="font-serif leading-none tracking-tight mb-4">
                <span className="text-[#D32F2F] text-3xl sm:text-4xl font-extrabold tracking-tighter uppercase block">Бұл недегеніңіз!</span>
                <span className="text-rose-500 text-[10px] uppercase tracking-[0.25em] font-medium mt-2 block">Бұндай таңдау жоқ!</span>
              </h1>

              {/* Angry gangster cat with NYC Cap */}
              <motion.div
                animate={{
                  y: [0, -4, 0, -4, 0],
                  rotate: [0, -2, 2, -2, 0],
                }}
                transition={{ repeat: Infinity, duration: 1.5, type: "tween" }}
                className="w-48 h-48 sm:w-56 sm:h-56 rounded-sm bg-rose-50 border border-rose-100 mb-8 p-3 shadow-inner flex items-center justify-center"
              >
                <img
                  src={catAngryGun}
                  alt="Angry Kitten with NYC Cap and Toy Gun"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleTryAgain}
                className="w-full sm:w-auto bg-[#D2143A] hover:bg-rose-600 text-white font-extrabold text-xs px-8 py-4 rounded-sm shadow-lg shadow-rose-900/15 cursor-pointer transition-all font-sans uppercase tracking-widest"
              >
                Қайттан ойлан 🔁
              </motion.button>
            </motion.div>
          )}

          {/* GAME/GIFT SELECTION DASHBOARD */}
          {appState === "gift-menu" && (
            <motion.div
              key="gifts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <GiftSelector
                config={config}
                openedGifts={openedGifts}
                onSelectGift={handleOpenGift}
                onClaimCertificate={() => setAppState("certificate")}
              />
            </motion.div>
          )}

          {/* GIFT 1 - LOVE LETTER */}
          {appState === "gift-1-letter" && (
            <motion.div
              key="letter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <GiftLoveLetter
                config={config}
                onBack={() => setAppState("gift-menu")}
              />
            </motion.div>
          )}

          {/* GIFT 2 - VIRTUAL HUG */}
          {appState === "gift-2-hug" && (
            <motion.div
              key="hug"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <GiftVirtualHug
                config={config}
                onBack={() => setAppState("gift-menu")}
              />
            </motion.div>
          )}

          {/* GIFT 3 - MEMORIES photo album */}
          {appState === "gift-3-album" && (
            <motion.div
              key="album"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <GiftPhotoAlbum
                config={config}
                onBack={() => setAppState("gift-menu")}
              />
            </motion.div>
          )}

          {/* GIFT 4 - TIC TAC TOE game challenge */}
          {appState === "gift-4-tictactoe" && (
            <motion.div
              key="tictactoe"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <GiftTicTacToe
                config={config}
                onBack={() => setAppState("gift-menu")}
              />
            </motion.div>
          )}

          {/* STATE 8 - WINNER CERTIFICATE DIPLOMA DUAL */}
          {appState === "certificate" && (
            <motion.div
              key="cert"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <CertificateAward
                config={config}
                onBack={() => setAppState("gift-menu")}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Tiny quiet bottom footer footer (hidden while printing) */}
      <footer className="py-4 text-center text-[10px] text-rose-500/60 font-mono tracking-widest no-print">
        шынайы махаббатпен• жасалған
      </footer>

      {/* Sliding Customizable Creator Editor panel */}
      <AnimatePresence>
        {isSettingsOpen && (
          <>
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-subtle z-40 no-print"
            />
            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              className="fixed inset-y-0 right-0 z-50 w-full sm:w-md bg-white border-l border-slate-100 shadow-2xl flex flex-col no-print"
            >
              <SettingsPanel
                config={config}
                isOpen={isSettingsOpen}
                onSave={handleSaveConfig}
                onClose={() => setIsSettingsOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
