export type Language = 'en' | 'so';

export interface TranslationContent {
  en: string;
  so: string;
}

export const translations = {
  // Navigation
  nav: {
    home: { en: "Home", so: "Guriga" },
    about: { en: "About", so: "Ku saabsan" },
    workshops: { en: "Workshops", so: "Tababarro" },
    resources: { en: "Resources", so: "Khayraadka" },
    involvement: { en: "Get Involved", so: "Ka qaybgal" },
    contact: { en: "Contact", so: "Xiriir" },
  },
  
  // Common
  common: {
    loading: { en: "Loading...", so: "Soo raraya..." },
    error: { en: "An error occurred", so: "Qalad ayaa dhacay" },
    submit: { en: "Submit", so: "Dir" },
    cancel: { en: "Cancel", so: "Jooji" },
    register: { en: "Register", so: "Diiwaangeli" },
    learnMore: { en: "Learn More", so: "Wax dheeraad ah baro" },
    viewAll: { en: "View All", so: "Dhammaantood arag" },
    english: { en: "English", so: "English" },
    somali: { en: "Somali", so: "Soomaaliga" },
    both: { en: "Both Languages", so: "Labada luqadood" },
  },

  // Home page
  home: {
    heroTitle: { 
      en: "Building Healthier Communities",
      so: "Dhisidda Bulshooyin Caafimaad Fiican leh"
    },
    heroSubtitle: { 
      en: "Together",
      so: "Wada jir"
    },
    heroDescription: { 
      en: "Addressing health disparities in Toronto's Somali community through culturally-responsive workshops, education, and community partnerships.",
      so: "Wajahida kala duwanaanshaha caafimaadka bulshada Soomaalida Toronto iyagoo loo marayo tababarro ku habboon dhaqanka, waxbarasho, iyo iskaashiga bulshada."
    },
    findWorkshops: { en: "Find Workshops", so: "Raadi Tababarro" },
    healthResources: { en: "Health Resources", so: "Khayraadka Caafimaadka" },
    communityImpact: { 
      en: "Our Community Impact",
      so: "Saameynta Bulshadeenna"
    },
    impactDescription: {
      en: "Making a real difference in Toronto's Somali community through education, support, and culturally-responsive healthcare advocacy.",
      so: "Samaynta isbeddel dhabta ah bulshada Soomaalida Toronto iyagoo loo marayo waxbarasho, taageero, iyo u ololaynta daryeelka caafimaadka ee ku habboon dhaqanka."
    },
    membersReached: { en: "Community Members Reached", so: "Xubnaha Bulshada ee la Gaadhay" },
    workshopsCompleted: { en: "Workshops Completed", so: "Tababarro la Dhammaystay" },
    partnerships: { en: "Community Partnerships", so: "Iskaashiga Bulshada" },
    familiesSupported: { en: "Families Supported", so: "Qoysas la Taageeray" },
  },

  // Workshop categories
  workshops: {
    title: { en: "Health Education Workshops", so: "Tababarro Waxbarashada Caafimaadka" },
    description: {
      en: "Join our culturally-responsive workshops designed to address real health challenges facing Somali families in Toronto. All sessions are facilitated in both English and Somali.",
      so: "Ku biir tababarradaayada ku habboon dhaqanka oo loogu talagalay in lagu wajaho caqabadaha caafimaadka dhabta ah ee hortaagan qoysaska Soomaalida Toronto. Dhammaan fadhigaana waxaa lagu maamulaa Ingiriiska iyo Soomaaliga labadaba."
    },
    chronicDisease: { 
      en: "Chronic Disease Management",
      so: "Maaraynta Cudurrada Raagaya"
    },
    mentalHealth: { 
      en: "Mental Health & Wellness",
      so: "Caafimaadka Maskaxda & Ladnaanta"
    },
    healthcareNavigation: { 
      en: "Healthcare Navigation",
      so: "Hagista Daryeelka Caafimaadka"
    },
    upcomingWorkshops: { 
      en: "Upcoming Workshops",
      so: "Tababarro Soo socda"
    },
    viewFullCalendar: { 
      en: "View Full Calendar",
      so: "Arag Kalanderka Dhammaystiran"
    },
  },

  // Contact form
  contact: {
    title: { en: "Get Involved", so: "Ka Qaybgal" },
    description: {
      en: "Have questions about our workshops? Want to share your health story? Looking to volunteer or partner with us? We'd love to hear from you.",
      so: "Su'aalo ayaad ka qabtaa tababarradayada? Waxaad doonaysaa inaad la wadaagto sheekaadaada caafimaadka? Waxaad raadisaa inaad mutadawac noqoto ama nala kaashatid? Waxaan jeclaan lahaa inaan ka maqalno."
    },
    sendMessage: { en: "Send Us a Message", so: "Noo Dir Fariinta" },
    firstName: { en: "First Name", so: "Magaca Hore" },
    lastName: { en: "Last Name", so: "Magaca Dambe" },
    email: { en: "Email Address", so: "Cinwaanka Iimaylka" },
    phone: { en: "Phone Number", so: "Numberka Teleefanka" },
    preferredLanguage: { en: "Preferred Language", so: "Luqadda la Door Bidayo" },
    inquiryType: { en: "Type of Inquiry", so: "Nooca Su'aasha" },
    message: { en: "Message", so: "Fariinta" },
    newsletter: { 
      en: "I'd like to receive updates about workshops and health resources",
      so: "Waxaan jeclaan lahaa inaan helo warbixino ku saabsan tababarro iyo khayraadka caafimaadka"
    },
    sendMessageBtn: { en: "Send Message", so: "Dir Fariinta" },
    contactInfo: { en: "Contact Information", so: "Macluumaadka Xiriirka" },
    officeHours: { en: "Office Hours", so: "Saacadaha Xafiiska" },
    needSupport: { 
      en: "Need Immediate Health Support?",
      so: "Waxaad u baahan tahay Taageero Caafimaad oo Degdeg ah?"
    },
    emergencyNote: {
      en: "For urgent health concerns, please contact your healthcare provider or emergency services directly.",
      so: "Arrimaha caafimaadka degdegga ah, fadlan la xiriir daryeelaha caafimaadkaaga ama adeegyada degdegga ah si toos ah."
    },
  },

  // Form validation
  validation: {
    required: { en: "This field is required", so: "Goobtan waa lagama maarmaan" },
    email: { en: "Please enter a valid email address", so: "Fadlan geli cinwaan iimaylka sax ah" },
    phone: { en: "Please enter a valid phone number", so: "Fadlan geli nambar teleefan sax ah" },
    success: { 
      en: "Thank you for your message. We will respond within 24 hours.",
      so: "Mahadsanid fariintaada. Waxaan ka jawaabi doonaa 24 saacadood gudahood."
    },
    error: { 
      en: "There was an error sending your message. Please try again.",
      so: "Qalad ayaa ka dhacay dirista fariintaada. Fadlan mar kale isku day."
    }
  }
};

export function getTranslation(key: string, language: Language): string {
  const keys = key.split('.');
  let current: any = translations;
  
  for (const k of keys) {
    current = current?.[k];
  }
  
  if (current && typeof current === 'object' && current[language]) {
    return current[language];
  }
  
  return key; // Return key if translation not found
}

export function getTranslationContent(content: TranslationContent, language: Language): string {
  return content[language] || content.en;
}
