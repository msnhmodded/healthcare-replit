import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, MapPin, Languages, Users, UserPlus } from "lucide-react";
import { Workshop } from "@shared/schema";
import { useLanguage } from "@/hooks/use-language";
import { getTranslationContent, getTranslation } from "@/lib/i18n";
import { format } from "date-fns";

interface WorkshopCardProps {
  workshop: Workshop;
  onRegister: (workshopId: string) => void;
  onLearnMore: (workshopId: string) => void;
}

export function WorkshopCard({ workshop, onRegister, onLearnMore }: WorkshopCardProps) {
  const { language } = useLanguage();
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'chronic-disease':
        return 'border-primary bg-primary/5';
      case 'mental-health':
        return 'border-secondary bg-secondary/5';
      case 'navigation':
        return 'border-accent bg-accent/5';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const isFull = workshop.currentAttendees >= workshop.maxAttendees;
  const spotsLeft = workshop.maxAttendees - workshop.currentAttendees;

  return (
    <Card className={`border-l-4 ${getCategoryColor(workshop.category)} rounded-r-lg hover-lift animate-fade-in transition-all duration-300`}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0 flex-1">
            <h4 className="text-lg font-semibold text-charcoal mb-2">
              {getTranslationContent(workshop.title as any, language)}
            </h4>
            <p className="text-gray-700 mb-3 text-sm">
              {getTranslationContent(workshop.description as any, language)}
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center text-gray-700 text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  {format(new Date(workshop.date), 'MMMM d, yyyy | h:mm a')} - {format(new Date(workshop.endDate), 'h:mm a')}
                </span>
              </div>
              <div className="flex items-center text-gray-700 text-sm">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{workshop.location}</span>
              </div>
              <div className="flex items-center text-gray-700 text-sm">
                <Languages className="w-4 h-4 mr-2" />
                <span>{getTranslation('common.both', language)}</span>
              </div>
              <div className="flex items-center text-gray-700 text-sm">
                <Users className="w-4 h-4 mr-2" />
                <span>
                  {isFull 
                    ? (language === 'en' ? 'Full' : 'Buuxa')
                    : `${spotsLeft} ${language === 'en' ? 'spots left' : 'meel harsan'}`
                  }
                </span>
              </div>
              {workshop.facilitator && (
                <div className="text-gray-700 text-sm">
                  <span className="font-medium">
                    {language === 'en' ? 'Facilitator: ' : 'Hoggaamiye: '}
                  </span>
                  {workshop.facilitator}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 py-4 border-t bg-gray-50/50">
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Button
            onClick={() => onRegister(workshop.id)}
            disabled={isFull}
            className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 hover-glow transition-all duration-300"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            {getTranslation('common.register', language)}
          </Button>
          <Button
            variant="secondary"
            onClick={() => onLearnMore(workshop.id)}
            className="bg-gray-200 text-charcoal hover:bg-gray-300 hover-lift transition-all duration-300"
          >
            {getTranslation('common.learnMore', language)}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
