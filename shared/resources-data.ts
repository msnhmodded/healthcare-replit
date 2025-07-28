export interface ResourceItem {
  id: string;
  title: { en: string; so: string };
  description: { en: string; so: string };
  type: "pdf" | "video" | "form" | "tool";
  category: string;
  fileUrl?: string;
  linkUrl?: string;
  toolKey?: string;
  thumbnailUrl?: string;
  tags: string[];
}

export const resourcesData: ResourceItem[] = [
  // Health Guides
  {
    id: "diabetes-guide",
    title: { 
      en: "Diabetes Management Guide", 
      so: "Hagaha Maaraynta Sonkorowga" 
    },
    description: { 
      en: "Comprehensive guide for managing diabetes while maintaining traditional dietary practices",
      so: "Hage shaafici ah oo loogu talagalay maaraynta sonkorowga halka aad ku dhawrayso dhaqanka cuntada dhaqameedka"
    },
    type: "pdf",
    category: "health-guides",
    fileUrl: "/resources/diabetes-guide.pdf",
    thumbnailUrl: "/images/diabetes-guide-thumb.jpg",
    tags: ["diabetes", "sonkorowga", "management", "diet"]
  },
  {
    id: "heart-health-handbook",
    title: { 
      en: "Heart Health Handbook", 
      so: "Buugga Caafimaadka Wadnaha" 
    },
    description: { 
      en: "Essential information for maintaining heart health in Somali families",
      so: "Macluumaad muhiim ah oo loogu talagalay ilaalinta caafimaadka wadnaha qoysaska Soomaalida"
    },
    type: "pdf",
    category: "health-guides",
    fileUrl: "/resources/heart-health-handbook.pdf",
    tags: ["heart", "wadnaha", "cardiovascular", "prevention"]
  },
  {
    id: "mental-wellness-guide",
    title: { 
      en: "Mental Wellness Guide", 
      so: "Hagaha Ladnaanta Maskaxda" 
    },
    description: { 
      en: "Culturally-sensitive approach to mental health and wellness",
      so: "Hab ku habboon dhaqanka oo loogu talagalay caafimaadka maskaxda iyo ladnaanta"
    },
    type: "pdf",
    category: "health-guides",
    fileUrl: "/resources/mental-wellness-guide.pdf",
    tags: ["mental health", "maskaxda", "wellness", "stress"]
  },

  // Nutrition Resources
  {
    id: "healthy-somali-recipes",
    title: { 
      en: "Healthy Somali Recipes", 
      so: "Cuntooyinka Caafimaadka leh ee Soomaalida" 
    },
    description: { 
      en: "Traditional recipes adapted for better health outcomes",
      so: "Cuntooyinka dhaqameedka oo loo habeeyay natiijooyin caafimaad oo fiican"
    },
    type: "pdf",
    category: "nutrition",
    fileUrl: "/resources/healthy-recipes.pdf",
    tags: ["recipes", "cuntooyinka", "nutrition", "traditional"]
  },
  {
    id: "diabetic-meal-planning",
    title: { 
      en: "Diabetic Meal Planning", 
      so: "Qorshaha Cuntada Sonkoraha" 
    },
    description: { 
      en: "Meal planning strategies for managing diabetes with Somali cuisine",
      so: "Xeeladaha qorshaha cuntada si loogu maareyo sonkorowga cuntada Soomaalida"
    },
    type: "pdf",
    category: "nutrition",
    fileUrl: "/resources/diabetic-meal-planning.pdf",
    tags: ["diabetes", "meal planning", "qorshaha", "diet"]
  },
  {
    id: "ramadan-healthy-eating",
    title: { 
      en: "Ramadan Healthy Eating", 
      so: "Cuntada Caafimaadka leh ee Ramadaanka" 
    },
    description: { 
      en: "Nutritional guidance for maintaining health during Ramadan",
      so: "Tilmaamaha nafaqada si loo ilaaliyo caafimaadka inta lagu jiro Ramadaanka"
    },
    type: "pdf",
    category: "nutrition",
    fileUrl: "/resources/ramadan-healthy-eating.pdf",
    tags: ["ramadan", "fasting", "soonka", "nutrition"]
  },

  // Video Library
  {
    id: "diabetes-workshop-recording",
    title: { 
      en: "Diabetes Workshop Recording", 
      so: "Duubista Tababarka Sonkorowga" 
    },
    description: { 
      en: "Full recording of our diabetes management workshop",
      so: "Duubista buuxa ee tababarkayaga maaraynta sonkorowga"
    },
    type: "video",
    category: "videos",
    linkUrl: "https://youtube.com/watch?v=example1",
    thumbnailUrl: "/images/diabetes-workshop-thumb.jpg",
    tags: ["workshop", "diabetes", "video", "education"]
  },
  {
    id: "exercise-demonstrations",
    title: { 
      en: "Exercise Demonstrations", 
      so: "Bandhigga Jimicsiga" 
    },
    description: { 
      en: "Safe exercise routines adapted for Somali families",
      so: "Jimicsi ammaan ah oo loogu habeeyay qoysaska Soomaalida"
    },
    type: "video",
    category: "videos",
    linkUrl: "https://youtube.com/watch?v=example2",
    thumbnailUrl: "/images/exercise-demo-thumb.jpg",
    tags: ["exercise", "jimicsi", "fitness", "health"]
  },

  // Mobile Tools
  {
    id: "bmi-calculator",
    title: { 
      en: "BMI Calculator", 
      so: "Xisaabiyaha BMI" 
    },
    description: { 
      en: "Calculate your Body Mass Index with cultural context",
      so: "Xisaabi tirada miisaanka jidhkaaga iyadoo la eegayo dhaqanka"
    },
    type: "tool",
    category: "tools",
    toolKey: "bmi-calculator",
    tags: ["BMI", "calculator", "weight", "health"]
  },
  {
    id: "medication-tracker",
    title: { 
      en: "Medication Tracker", 
      so: "Raadraaca Daawooyinka" 
    },
    description: { 
      en: "Track your medications and set reminders",
      so: "Raadraac daawooyinkaaga oo dhig xusuusinta"
    },
    type: "tool",
    category: "tools",
    toolKey: "medication-tracker",
    tags: ["medication", "daawooyin", "tracker", "reminders"]
  },
  {
    id: "symptom-journal",
    title: { 
      en: "Symptom Journal", 
      so: "Buugga Calaamadaha" 
    },
    description: { 
      en: "Keep track of symptoms and health changes",
      so: "Ilaaliso calaamadaha iyo isbeddellada caafimaadka"
    },
    type: "tool",
    category: "tools",
    toolKey: "symptom-journal",
    tags: ["symptoms", "journal", "tracking", "health"]
  },
  {
    id: "appointment-reminder",
    title: { 
      en: "Appointment Reminder", 
      so: "Xusuusinta Ballaanta" 
    },
    description: { 
      en: "Schedule and manage healthcare appointments",
      so: "Jadwalka iyo maaraynta ballaanta daryeelka caafimaadka"
    },
    type: "tool",
    category: "tools",
    toolKey: "appointment-reminder",
    tags: ["appointments", "ballaan", "reminder", "healthcare"]
  },
  {
    id: "health-goals-tracker",
    title: { 
      en: "Health Goals Tracker", 
      so: "Raadraaca Yoolalka Caafimaadka" 
    },
    description: { 
      en: "Set and track your health improvement goals",
      so: "Dhig oo raadraac yoolalka hagista caafimaadkaaga"
    },
    type: "tool",
    category: "tools",
    toolKey: "health-goals-tracker",
    tags: ["goals", "yoolal", "progress", "health"]
  },

  // Healthcare Directory
  {
    id: "family-doctors-directory",
    title: { 
      en: "Family Doctors Directory", 
      so: "Buugga Takhaatiirta Qoyska" 
    },
    description: { 
      en: "Find culturally-competent family doctors in Toronto",
      so: "Hel takhaatiir qoys oo awood u leh dhaqanka Toronto"
    },
    type: "pdf",
    category: "directory",
    fileUrl: "/resources/family-doctors-directory.pdf",
    tags: ["doctors", "takhaatiir", "family", "directory"]
  },
  {
    id: "mental-health-services",
    title: { 
      en: "Mental Health Services", 
      so: "Adeegyada Caafimaadka Maskaxda" 
    },
    description: { 
      en: "Directory of mental health services for Somali community",
      so: "Buugga adeegyada caafimaadka maskaxda ee bulshada Soomaalida"
    },
    type: "pdf",
    category: "directory",
    fileUrl: "/resources/mental-health-services.pdf",
    tags: ["mental health", "services", "adeegyada", "support"]
  },

  // Downloadable Forms
  {
    id: "appointment-preparation-form",
    title: { 
      en: "Appointment Preparation Form", 
      so: "Foomka Diyaarinta Ballaanta" 
    },
    description: { 
      en: "Prepare for medical appointments with this comprehensive form",
      so: "Isu diyaari ballaanta caafimaadka foomkan shaaficiga ah"
    },
    type: "form",
    category: "forms",
    fileUrl: "/resources/appointment-preparation-form.pdf",
    tags: ["appointment", "preparation", "form", "medical"]
  },
  {
    id: "medical-history-template",
    title: { 
      en: "Medical History Template", 
      so: "Qaabka Taariihka Caafimaadka" 
    },
    description: { 
      en: "Template for organizing your medical history information",
      so: "Qaab si loo habeeyo macluumaadka taariihka caafimaadkaaga"
    },
    type: "form",
    category: "forms",
    fileUrl: "/resources/medical-history-template.pdf",
    tags: ["medical history", "template", "qaab", "organization"]
  },
  {
    id: "emergency-contact-cards",
    title: { 
      en: "Emergency Contact Cards", 
      so: "Kaardadka Xiriirka Degdegga ah" 
    },
    description: { 
      en: "Printable emergency contact cards for your wallet",
      so: "Kaardad la daabici karo oo xiriirka degdegga ah loogu talagalay boorsooyinka"
    },
    type: "form",
    category: "forms",
    fileUrl: "/resources/emergency-contact-cards.pdf",
    tags: ["emergency", "contact", "cards", "degdeg"]
  }
];

export const resourceCategories = [
  {
    key: "all",
    labelEn: "All Resources",
    labelSo: "Dhammaan Khayraadka",
    icon: "FileText",
    color: "text-gray-700",
    bgColor: "bg-gray-100"
  },
  {
    key: "health-guides",
    labelEn: "Health Guides",
    labelSo: "Hagaha Caafimaadka",
    icon: "FileText",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    key: "nutrition",
    labelEn: "Nutrition Resources",
    labelSo: "Khayraadka Nafaqada",
    icon: "Apple",
    color: "text-secondary",
    bgColor: "bg-secondary/10"
  },
  {
    key: "videos",
    labelEn: "Video Library",
    labelSo: "Maktabadda Video",
    icon: "Play",
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    key: "tools",
    labelEn: "Mobile Tools",
    labelSo: "Qalabka Gacanta",
    icon: "Calculator",
    color: "text-warning",
    bgColor: "bg-warning/10"
  },
  {
    key: "directory",
    labelEn: "Healthcare Directory",
    labelSo: "Buugga Daryeelka Caafimaadka",
    icon: "BookOpen",
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    key: "forms",
    labelEn: "Downloadable Forms",
    labelSo: "Foomamka la soo dejin karo",
    icon: "Download",
    color: "text-green-600",
    bgColor: "bg-green-100"
  }
];