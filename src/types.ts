export interface LoveConfig {
  recipientName: string;
  senderName: string;
  awardTitle: string; 
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
  polaroidImages: string[]; 
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
  awardText: "Мен әлемдегі ең бақытты жанмын себебі сіздей аруды жолықтырғаныма өте өте қуаныштымын,сіздің мейірімділігіңізбен мен сізден шыққан әр бір сөз мен үшін сондай жақын,шынымды айтсам сіз менің үлкен бақытымсыз,сіз барда барлығы әдемірек және жеңілірек,сіздің менің өмірімде барыңызға рақмет",
  signatureText: "мен сізді қатты жақсы көремін",
  awardDate: "06 маусым 2026",
  
  gift1Title: "Жүрегім,Сұлуым",
  gift1Text: "Сізбен өткізген әрбір уақыт маған маңызды және ценю және сізді өте өте қатты жақсы көремін",
  
  gift2Text: "Құшақпен келген жылу экраннан сезілді деген ойдамын",
  
  gift3Title: "Әлемдегі ең әдемі суреттер",
  polaroidImages: [
    "src/assets/images/image2.jpeg", // Cute hands holding
    "src/assets/images/image3.jpeg", // Beach shadow couple
    "src/assets/images/image1.jpeg"  // Happy aesthetic moment
  ],
  polaroidCaptions: [
    "сіздің әр бір күлкіңіз маған жылу береді ",
    "сізбен өткенкізген әрбір уақыт мен үшін өте маңызды ",
    "сіздің барыңыз,маған Алланың берген сыйы"
  ],
  
  gift4Title: "Толтыр",
  gift4Text: "Арнайы сыйлық үшін жетіспей тұрған орынды толтыр!",
  gift4WonText: "Жаным Жаным ақылдым менің❤️!артқа қайт <-",
};
