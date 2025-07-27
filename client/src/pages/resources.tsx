import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Play, Download, ExternalLink, Search, Filter, CheckCircle } from "lucide-react";
import { Resource } from "@shared/schema";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation, getTranslationContent } from "@/lib/i18n";

const resourceCategories = [
  {
    key: "all",
    labelEn: "All Resources",
    labelSo: "Dhammaan Khayraadka",
    icon: FileText,
    color: "text-gray-700",
    bgColor: "bg-gray-100"
  },
  {
    key: "health-guides",
    labelEn: "Health Guides",
    labelSo: "Hagaha Caafimaadka",
    icon: FileText,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    key: "nutrition",
    labelEn: "Nutrition Resources",
    labelSo: "Khayraadka Nafaqada",
    icon: FileText,
    color: "text-secondary",
    bgColor: "bg-secondary/10"
  },
  {
    key: "videos",
    labelEn: "Video Library",
    labelSo: "Maktabadda Video",
    icon: Play,
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    key: "tools",
    labelEn: "Mobile Tools",
    labelSo: "Qalabka Gacanta",
    icon: FileText,
    color: "text-warning",
    bgColor: "bg-warning/10"
  },
  {
    key: "directory",
    labelEn: "Healthcare Directory",
    labelSo: "Buugga Daryeelka Caafimaadka",
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    key: "forms",
    labelEn: "Downloadable Forms",
    labelSo: "Foomamka la soo dejin karo",
    icon: Download,
    color: "text-green-600",
    bgColor: "bg-green-100"
  }
];

const getSampleResources = (category: string, language: 'en' | 'so') => {
  const samples: Record<string, Array<{en: string, so: string}>> = {
    'health-guides': [
      { en: 'Diabetes Management Guide', so: 'Hagaha Maaraynta Sonkorowga' },
      { en: 'Heart Health Handbook', so: 'Buugga Caafimaadka Wadnaha' },
      { en: 'Mental Wellness Guide', so: 'Hagaha Ladnaanta Maskaxda' },
      { en: 'Hypertension Control', so: 'Kontoroolka Dhiig-karka' },
      { en: 'Preventive Care Checklist', so: 'Liiska Daryeelka Ka-hortagga' }
    ],
    'nutrition': [
      { en: 'Healthy Somali Recipes', so: 'Cuntooyinka Caafimaadka leh ee Soomaalida' },
      { en: 'Diabetic Meal Planning', so: 'Qorshaha Cuntada Sonkoraha' },
      { en: 'Family Nutrition Tips', so: 'Tilmaamaha Nafaqada Qoyska' },
      { en: 'Traditional Foods & Health', so: 'Cuntooyinka Dhaqameedka & Caafimaadka' },
      { en: 'Ramadan Healthy Eating', so: 'Cuntada Caafimaadka leh ee Ramadaanka' }
    ],
    'videos': [
      { en: 'Workshop Recordings', so: 'Duubista Tababarrada' },
      { en: 'Exercise Demonstrations', so: 'Bandhigga Jimicsiga' },
      { en: 'Community Stories', so: 'Sheekooyinka Bulshada' },
      { en: 'Medication Management', so: 'Maaraynta Daawooyinka' },
      { en: 'Healthcare Navigation', so: 'Hagista Daryeelka Caafimaadka' }
    ],
    'tools': [
      { en: 'BMI Calculator', so: 'Xisaabiyaha BMI' },
      { en: 'Medication Tracker', so: 'Raadraaca Daawooyinka' },
      { en: 'Symptom Journal', so: 'Buugga Calaamadaha' },
      { en: 'Appointment Reminder', so: 'Xusuusinta Ballaanta' },
      { en: 'Health Goals Tracker', so: 'Raadraaca Yoolalka Caafimaadka' }
    ],
    'directory': [
      { en: 'Family Doctors', so: 'Takhaatiirta Qoyska' },
      { en: 'Specialists & Clinics', so: 'Takhaasusyada & Cisbitaalada' },
      { en: 'Mental Health Services', so: 'Adeegyada Caafimaadka Maskaxda' },
      { en: 'Pharmacy Locations', so: 'Goobaha Farmashiyada' },
      { en: 'Emergency Services', so: 'Adeegyada Degdegga ah' }
    ],
    'forms': [
      { en: 'Appointment Preparation', so: 'Diyaarinta Ballaanta' },
      { en: 'Medical History Template', so: 'Qaabka Taariihka Caafimaadka' },
      { en: 'Emergency Contact Cards', so: 'Kaardadka Xiriirka Degdegga ah' },
      { en: 'Insurance Information', so: 'Macluumaadka Caymiska' },
      { en: 'Medication List Template', so: 'Qaabka Liiska Daawooyinka' }
    ]
  };
  return samples[category] || [];
};

function ResourceCard({ category, onViewCategory }: { category: any, onViewCategory: (cat: string) => void }) {
  const { language } = useLanguage();
  const IconComponent = category.icon;
  const sampleResources = getSampleResources(category.key, language);

  return (
    <Card className="bg-gray-50 hover:shadow-lg transition-shadow h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${category.bgColor}`}>
            <IconComponent className={`w-6 h-6 ${category.color}`} />
          </div>
          <h3 className="text-xl font-semibold text-charcoal">
            {language === 'en' ? category.labelEn : category.labelSo}
          </h3>
        </div>
        
        <p className="text-gray-700 mb-4 flex-1">
          {language === 'en' 
            ? `Access ${category.labelEn.toLowerCase()} designed specifically for Somali families in Toronto.`
            : `Hel ${category.labelSo} oo loogu talagalay gaar ahaan qoysaska Soomaalida Toronto.`
          }
        </p>
        
        <ul className="space-y-2 mb-6">
          {sampleResources.slice(0, 3).map((item, index) => (
            <li key={index} className="flex items-center text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 text-success mr-2 flex-shrink-0" />
              <span>{getTranslationContent(item, language)}</span>
            </li>
          ))}
        </ul>
        
        <Button
          variant="ghost"
          onClick={() => onViewCategory(category.key)}
          className="text-primary font-semibold hover:text-primary/80 p-0 mt-auto self-start"
        >
          {language === 'en' ? 'View All' : 'Dhammaantood Arag'}
          <ExternalLink className="w-4 h-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Resources() {
  const { language } = useLanguage();
  const [location, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const params = new URLSearchParams(location.split('?')[1] || '');
    return params.get('category') || 'all';
  });

  const { data: resources = [], isLoading } = useQuery({
    queryKey: selectedCategory === 'all' ? ['/api/resources'] : ['/api/resources', { category: selectedCategory }],
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setLocation('/resources');
    } else {
      setLocation(`/resources?category=${category}`);
    }
  };

  const displayResources = selectedCategory === 'all' 
    ? resourceCategories.filter(cat => cat.key !== 'all')
    : [resourceCategories.find(cat => cat.key === selectedCategory)].filter(Boolean);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-lg text-gray-700">{getTranslation('common.loading', language)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-charcoal mb-4">
              {language === 'en' ? "Health Education Resources" : "Khayraadka Waxbarashada Caafimaadka"}
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {language === 'en' 
                ? "Access culturally-appropriate health information, guides, and tools designed specifically for Somali families. All resources are available in both English and Somali."
                : "Hel macluumaadka caafimaadka ee ku habboon dhaqanka, hagaha, iyo qalabka loo sameeyay gaar ahaan qoysaska Soomaalida. Dhammaan khayraadka waxaa lagu heli karaa Ingiriiska iyo Soomaaliga labadaba."
              }
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <Input
                placeholder={language === 'en' ? "Search resources..." : "Raadi khayraadka..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="md:w-64">
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {resourceCategories.map((category) => (
                    <SelectItem key={category.key} value={category.key}>
                      {language === 'en' ? category.labelEn : category.labelSo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {selectedCategory === 'all' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayResources.map((category) => (
                <ResourceCard
                  key={category.key}
                  category={category}
                  onViewCategory={handleCategoryChange}
                />
              ))}
            </div>
          ) : (
            <div>
              <div className="mb-8">
                <Button
                  variant="outline"
                  onClick={() => handleCategoryChange('all')}
                  className="mb-4"
                >
                  ← {language === 'en' ? 'Back to All Resources' : 'Dib ugu noqo Dhammaan Khayraadka'}
                </Button>
                <h2 className="text-2xl font-bold text-charcoal">
                  {displayResources[0] && (language === 'en' ? displayResources[0].labelEn : displayResources[0].labelSo)}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getSampleResources(selectedCategory, language).map((resource, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold text-charcoal flex-1">
                          {getTranslationContent(resource, language)}
                        </h3>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ml-3 ${displayResources[0]?.bgColor}`}>
                          <FileText className={`w-5 h-5 ${displayResources[0]?.color}`} />
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mb-4">
                        {language === 'en' 
                          ? "Comprehensive resource designed for Somali families in Toronto."
                          : "Khayraad shaafici ah oo loogu talagalay qoysaska Soomaalida Toronto."
                        }
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          {language === 'en' ? 'Download' : 'Soo deji'}
                        </Button>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {language === 'en' 
              ? "Need Additional Support?"
              : "Waxaad u baahan tahay Taageero Dheeraad ah?"
            }
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {language === 'en' 
              ? "Our team is here to help you find the right resources and navigate your health journey."
              : "Kooxdayadu halkan bay u joogtaa si ay kuu caawiso inaad hesho khayraadka saxda ah oo ay kuu hagiso safarkaga caafimaadka."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100"
              onClick={() => setLocation('/contact')}
            >
              {language === 'en' ? "Contact Our Team" : 'La xiriir Kooxdayada'}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => setLocation('/workshops')}
            >
              {language === 'en' ? "Join a Workshop" : 'Ku biir Tababarka'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
