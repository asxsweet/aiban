export interface LoveConfig {
  recipientName: string;
  senderName: string;
  awardTitle: string; // e.g. "BEST BOYFRIEND AWARD", "BEST GIRLFRIEND AWARD"
  awardText: string;
  signatureText: string;
  awardDate: string;
  
  // Gift 1
  gift1Title: string;
  gift1Text: string;
  
  // Gift 2
  gift2Text: string;
  
  // Gift 3
  gift3Title: string;
  polaroidImages: string[]; // URLs or base64 data strings
  polaroidCaptions: string[];
  
  // Gift 4 (Tic Tac Toe)
  gift4Title: string;
  gift4Text: string;
  gift4WonText: string;
}

export const DEFAULT_CONFIG: LoveConfig = {
  recipientName: "Айбанина",
  senderName: "Айгерім",
  awardTitle: "Ең сұлу қызға",
  awardText: "Мен әлемдегі ең бақытты жанмын себебі сіздей аруды жолықтырғаныма өте өте қуаныштымын,сізді дүниеге әкелген анаңызңа мың алғыс және мендей адамды жақсы көргеніңзге және сіздің барыңызға көптен көп рақмет,",
  signatureText: "мен сізді қатты жақсы көремін",
  awardDate: "06 маусым 2026",
  
  gift1Title: "Менің жаныма",
  gift1Text: "Мен сізді жақсы көремін",
  
  gift2Text: "Менің виртуалды құшақпен барған сезімім сізге сезілді деген ойдамын",
  
  gift3Title: "Әлемдегі ең әдемі суреттер",
  polaroidImages: [
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop", // Cute hands holding
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop", // Beach shadow couple
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop"  // Happy aesthetic moment
  ],
  polaroidCaptions: [
    "сіздің күлгеніңіз маған энергия береді🤝",
    "сізбен өткен әрбір уақыт мен үшін өте маңызды 🌅",
    "laughing with you completes me 💖"
  ],
  
  gift4Title: "Толтыр",
  gift4Text: "Арнайы сыйлық үшін жетіспей тұрған орынды толтыр!",
  gift4WonText: "Иееп менің ақылдым сен жүректі толтырдың!артқа қайт <-",
};
