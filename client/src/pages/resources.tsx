import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  FileText, 
  Play, 
  Download, 
  ExternalLink, 
  Search, 
  Filter, 
  CheckCircle, 
  Calculator,
  Apple,
  BookOpen,
  Eye,
  X
} from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { getTranslationContent } from "@/lib/i18n";
import { resourcesData, resourceCategories, type ResourceItem } from "@shared/resources-data";

// Tool components
import { BMICalculator } from "@/components/tools/BMICalculator";
import { MedicationTracker } from "@/components/tools/MedicationTracker";
import { SymptomJournal } from "@/components/tools/SymptomJournal";
import { AppointmentReminder } from "@/components/tools/AppointmentReminder";
import { HealthGoalsTracker } from "@/components/tools/HealthGoalsTracker";

const iconMap = {
  FileText,
  Play,
  Download,
  Calculator,
  Apple,
  BookOpen,
  ExternalLink,
  CheckCircle,
};

function ResourceCard({ resource, onAction }: { resource: ResourceItem, onAction: (resource: ResourceItem, action: string) => void }) {
  const { language } = useLanguage();
  
  const getActionButtons = (resource: ResourceItem) => {
    switch (resource.type) {
      case 'pdf':
      case 'form':
        return (
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={() => onAction(resource, 'download')}
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Download' : 'Soo deji'}
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onAction(resource, 'view')}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        );
      case 'video':
        return (
          <Button 
            size="sm" 
            onClick={() => onAction(resource, 'watch')}
            className="w-full"
          >
            <Play className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Watch Video' : 'Daawashada Video'}
          </Button>
        );
      case 'tool':
        return (
          <Button 
            size="sm" 
            onClick={() => onAction(resource, 'open')}
            className="w-full"
          >
            <Calculator className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Open Tool' : 'Fur Qalabka'}
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-charcoal flex-1 leading-tight">
            {getTranslationContent(resource.title, language)}
          </h3>
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center ml-3 flex-shrink-0">
            <FileText className="w-5 h-5 text-primary" />
          </div>
        </div>
        
        <p className="text-gray-700 text-sm mb-4 flex-1">
          {getTranslationContent(resource.description, language)}
        </p>
        
        <div className="mt-auto">
          {getActionButtons(resource)}
        </div>
      </CardContent>
    </Card>
  );
}

function CategoryCard({ category, onNavigate }: { category: any, onNavigate: (categoryKey: string) => void }) {
  const { language } = useLanguage();
  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || FileText;
  
  // Get sample resources for this category
  const categoryResources = resourcesData.filter(r => r.category === category.key);
  
  return (
    <Card 
      className="bg-gray-50 hover:shadow-lg transition-shadow h-full cursor-pointer group"
      onClick={() => onNavigate(category.key)}
    >
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${category.bgColor} group-hover:scale-105 transition-transform`}>
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
          {categoryResources.slice(0, 3).map((item, index) => (
            <li key={index} className="flex items-center text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 text-success mr-2 flex-shrink-0" />
              <span>{getTranslationContent(item.title, language)}</span>
            </li>
          ))}
        </ul>
        
        <div className="text-primary font-semibold hover:text-primary/80 flex items-center text-sm mt-auto group-hover:translate-x-1 transition-transform">
          {language === 'en' ? 'View All' : 'Dhammaantood Arag'}
          <ExternalLink className="w-4 h-4 ml-1" />
        </div>
      </CardContent>
    </Card>
  );
}

function ToolModal({ toolKey, isOpen, onClose }: { toolKey: string | null, isOpen: boolean, onClose: () => void }) {
  const { language } = useLanguage();
  
  const getToolComponent = () => {
    switch (toolKey) {
      case 'bmi-calculator':
        return <BMICalculator />;
      case 'medication-tracker':
        return <MedicationTracker />;
      case 'symptom-journal':
        return <SymptomJournal />;
      case 'appointment-reminder':
        return <AppointmentReminder />;
      case 'health-goals-tracker':
        return <HealthGoalsTracker />;
      default:
        return (
          <div className="p-8 text-center">
            <p className="text-gray-600">
              {language === 'en' ? 'Tool not found' : 'Qalabka lama helin'}
            </p>
          </div>
        );
    }
  };

  const getToolTitle = () => {
    const titles = {
      'bmi-calculator': { en: 'BMI Calculator', so: 'Xisaabiyaha BMI' },
      'medication-tracker': { en: 'Medication Tracker', so: 'Raadraaca Daawooyinka' },
      'symptom-journal': { en: 'Symptom Journal', so: 'Buugga Calaamadaha' },
      'appointment-reminder': { en: 'Appointment Reminder', so: 'Xusuusinta Ballaanta' },
      'health-goals-tracker': { en: 'Health Goals Tracker', so: 'Raadraaca Yoolalka Caafimaadka' }
    };
    return titles[toolKey as keyof typeof titles]?.[language] || 'Tool';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{getToolTitle()}</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        {getToolComponent()}
      </DialogContent>
    </Dialog>
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
  const [toolModalOpen, setToolModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  // Filter and search logic
  const filteredResources = useMemo(() => {
    let filtered = resourcesData;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(resource => 
        resource.title.en.toLowerCase().includes(searchLower) ||
        resource.title.so.toLowerCase().includes(searchLower) ||
        resource.description.en.toLowerCase().includes(searchLower) ||
        resource.description.so.toLowerCase().includes(searchLower) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    return filtered;
  }, [selectedCategory, searchTerm]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setLocation('/resources');
    } else {
      setLocation(`/resources?category=${category}`);
    }
  };

  const handleResourceAction = (resource: ResourceItem, action: string) => {
    switch (action) {
      case 'download':
        if (resource.fileUrl) {
          // Create a temporary link to trigger download
          const link = document.createElement('a');
          link.href = resource.fileUrl;
          link.download = getTranslationContent(resource.title, language);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        break;
      case 'view':
        if (resource.fileUrl) {
          window.open(resource.fileUrl, '_blank');
        }
        break;
      case 'watch':
        if (resource.linkUrl) {
          window.open(resource.linkUrl, '_blank');
        }
        break;
      case 'open':
        if (resource.toolKey) {
          setSelectedTool(resource.toolKey);
          setToolModalOpen(true);
        }
        break;
    }
  };

  const displayCategories = selectedCategory === 'all' 
    ? resourceCategories.filter(cat => cat.key !== 'all')
    : [];

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

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {selectedCategory === 'all' ? (
            /* Category Overview */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayCategories.map((category) => (
                <CategoryCard
                  key={category.key}
                  category={category}
                  onNavigate={handleCategoryChange}
                />
              ))}
            </div>
          ) : (
            /* Category-specific resources */
            <div>
              <div className="mb-8">
                <Button
                  variant="outline"
                  onClick={() => handleCategoryChange('all')}
                  className="mb-4"
                >
                  ← {language === 'en' ? 'Back to All Resources' : 'Dib ugu noqo Dhammaan Khayraadka'}
                </Button>
                <h2 className="text-2xl font-bold text-charcoal mb-2">
                  {resourceCategories.find(c => c.key === selectedCategory) && 
                    (language === 'en' 
                      ? resourceCategories.find(c => c.key === selectedCategory)!.labelEn
                      : resourceCategories.find(c => c.key === selectedCategory)!.labelSo
                    )
                  }
                </h2>
                <p className="text-gray-600">
                  {language === 'en' 
                    ? `Showing ${filteredResources.length} resource${filteredResources.length !== 1 ? 's' : ''}`
                    : `Muujinaya ${filteredResources.length} khayraad${filteredResources.length !== 1 ? 'ka' : ''}`
                  }
                  {searchTerm && (
                    <span className="ml-2">
                      {language === 'en' ? `matching "${searchTerm}"` : `la mid ah "${searchTerm}"`}
                    </span>
                  )}
                </p>
              </div>

              {filteredResources.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-4">
                    {searchTerm ? (
                      language === 'en' 
                        ? `No resources found matching "${searchTerm}"`
                        : `Lama helin khayraad la mid ah "${searchTerm}"`
                    ) : (
                      language === 'en' 
                        ? "No resources available in this category"
                        : "Lama helin khayraad ku jira qaybtan"
                    )}
                  </div>
                  <Button onClick={() => { setSearchTerm(''); handleCategoryChange('all'); }}>
                    {language === 'en' ? 'View All Resources' : 'Arag Dhammaan Khayraadka'}
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      onAction={handleResourceAction}
                    />
                  ))}
                </div>
              )}
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

      {/* Tool Modal */}
      <ToolModal 
        toolKey={selectedTool}
        isOpen={toolModalOpen}
        onClose={() => {
          setToolModalOpen(false);
          setSelectedTool(null);
        }}
      />
    </div>
  );
}