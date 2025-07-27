import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FileText, Play, Download, ExternalLink, CheckCircle } from "lucide-react";
import { Resource } from "@shared/schema";
import { useLanguage } from "@/hooks/use-language";
import { getTranslationContent, getTranslation } from "@/lib/i18n";

interface ResourceCardProps {
  resource: Resource;
  onViewCategory: (category: string) => void;
}

const resourceIcons = {
  'health-guides': FileText,
  'nutrition': FileText,
  'videos': Play,
  'tools': FileText,
  'directory': FileText,
  'forms': Download,
};

const categoryColors = {
  'health-guides': 'bg-primary/10 text-primary',
  'nutrition': 'bg-secondary/10 text-secondary',
  'videos': 'bg-accent/10 text-accent',
  'tools': 'bg-warning/10 text-warning',
  'directory': 'bg-purple-100 text-purple-600',
  'forms': 'bg-green-100 text-green-600',
};

export function ResourceCard({ resource, onViewCategory }: ResourceCardProps) {
  const { language } = useLanguage();
  const IconComponent = resourceIcons[resource.category as keyof typeof resourceIcons] || FileText;
  const colorClass = categoryColors[resource.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-700';

  // Mock sample resources for each category
  const getSampleResources = (category: string) => {
    const samples = {
      'health-guides': [
        { en: 'Diabetes Management Guide', so: 'Hagaha Maaraynta Sonkorowga' },
        { en: 'Heart Health Handbook', so: 'Buugga Caafimaadka Wadnaha' },
        { en: 'Mental Wellness Guide', so: 'Hagaha Ladnaanta Maskaxda' }
      ],
      'nutrition': [
        { en: 'Healthy Somali Recipes', so: 'Cuntooyinka Caafimaadka leh ee Soomaalida' },
        { en: 'Diabetic Meal Planning', so: 'Qorshaha Cuntada Sonkoraha' },
        { en: 'Family Nutrition Tips', so: 'Tilmaamaha Nafaqada Qoyska' }
      ],
      'videos': [
        { en: 'Workshop Recordings', so: 'Duubista Tababarrada' },
        { en: 'Exercise Demonstrations', so: 'Bandhigga Jimicsiga' },
        { en: 'Community Stories', so: 'Sheekooyinka Bulshada' }
      ],
      'tools': [
        { en: 'BMI Calculator', so: 'Xisaabiyaha BMI' },
        { en: 'Medication Tracker', so: 'Raadraaca Daawooyinka' },
        { en: 'Symptom Journal', so: 'Buugga Calaamadaha' }
      ],
      'directory': [
        { en: 'Family Doctors', so: 'Takhaatiirta Qoyska' },
        { en: 'Specialists & Clinics', so: 'Takhaasusyada & Cisbitaalada' },
        { en: 'Mental Health Services', so: 'Adeegyada Caafimaadka Maskaxda' }
      ],
      'forms': [
        { en: 'Appointment Preparation', so: 'Diyaarinta Ballaanta' },
        { en: 'Medical History Template', so: 'Qaabka Taariihka Caafimaadka' },
        { en: 'Emergency Contact Cards', so: 'Kaardadka Xiriirka Degdegga ah' }
      ]
    };
    return samples[category as keyof typeof samples] || [];
  };

  const sampleResources = getSampleResources(resource.category);

  return (
    <Card className="bg-gray-50 hover:shadow-lg transition-shadow hover-lift animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${colorClass}`}>
            <IconComponent className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold text-charcoal">
            {getTranslationContent(resource.title as any, language)}
          </h3>
        </div>
        <p className="text-gray-700 mb-4">
          {getTranslationContent(resource.description as any, language)}
        </p>
        <ul className="space-y-2 mb-6">
          {sampleResources.map((item, index) => (
            <li key={index} className="flex items-center text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 text-success mr-2 flex-shrink-0" />
              <span>{getTranslationContent(item, language)}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="px-6 py-4 border-t">
        <Button
          variant="ghost"
          onClick={() => onViewCategory(resource.category)}
          className="text-primary font-semibold hover:text-primary/80 p-0 hover-glow transition-all duration-300"
        >
          {getTranslation('common.viewAll', language)} {getTranslationContent(resource.title as any, language)}
          <ExternalLink className="w-4 h-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}
