import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Book, Users, Handshake, Heart, UserCheck } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/i18n";

export default function Home() {
  const { language } = useLanguage();

  const impactStats = [
    {
      icon: Users,
      value: "500+",
      labelKey: "home.membersReached",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: UserCheck,
      value: "45",
      labelKey: "home.workshopsCompleted",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: Handshake,
      value: "8",
      labelKey: "home.partnerships",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Heart,
      value: "250+",
      labelKey: "home.familiesSupported",
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
              <span className="inline-block">{getTranslation('home.heroTitle', language)}</span><br />
              <span className="text-yellow-300 inline-block animate-bounce-subtle">{getTranslation('home.heroSubtitle', language)}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up stagger-delay-1">
              {getTranslation('home.heroDescription', language)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in stagger-delay-2">
              <Link href="/workshops">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 shadow-lg hover-lift hover-glow">
                  <CalendarDays className="w-5 h-5 mr-2" />
                  {getTranslation('home.findWorkshops', language)}
                </Button>
              </Link>
              <Link href="/resources">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white/10 hover:border-white hover-lift"
                >
                  <Book className="w-5 h-5 mr-2" />
                  {getTranslation('home.healthResources', language)}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">
              {getTranslation('home.communityImpact', language)}
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {getTranslation('home.impactDescription', language)}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className={`text-center animate-fade-in hover-lift stagger-delay-${index + 1}`}>
                  <div className={`${stat.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 hover-glow transition-all duration-300`}>
                    <IconComponent className={`${stat.color} text-2xl`} />
                  </div>
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                  <div className="text-gray-700 font-medium">
                    {getTranslation(stat.labelKey, language)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workshop Categories Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">
              {getTranslation('workshops.title', language)}
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {getTranslation('workshops.description', language)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="text-primary text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-3">
                  {getTranslation('workshops.chronicDisease', language)}
                </h3>
                <p className="text-gray-700 mb-4">
                  {language === 'en' 
                    ? "Learn practical strategies for managing diabetes, cardiovascular disease, and other chronic conditions within cultural and family contexts."
                    : "Baro xeeladaha wax ku ool ah ee maaraynta sonkorowga, cudurrada wadnaha, iyo xaaladaha kale ee raaga ah gudaha xaalladaha dhaqanka iyo qoyska."
                  }
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• {language === 'en' ? 'Diabetes education and meal planning' : 'Waxbarashada sonkorowga iyo qorshaha cuntada'}</li>
                  <li>• {language === 'en' ? 'Heart health and exercise guidance' : 'Caafimaadka wadnaha iyo hagista jimicsiga'}</li>
                  <li>• {language === 'en' ? 'Medication management' : 'Maaraynta daawooyinka'}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="text-secondary text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-3">
                  {getTranslation('workshops.mentalHealth', language)}
                </h3>
                <p className="text-gray-700 mb-4">
                  {language === 'en' 
                    ? "Address mental health challenges with culturally-appropriate strategies that honor Islamic values and community support systems."
                    : "Wajahi caqabadaha caafimaadka maskaxda iyagoo la adeegsanayo xeeladaha ku haboon dhaqanka kuwaas oo sharfa qiyamka Islaamka iyo nidaamyada taageerada bulshada."
                  }
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• {language === 'en' ? 'Stress management techniques' : 'Farsamooyinka maaraynta walbahaarka'}</li>
                  <li>• {language === 'en' ? 'Community support networks' : 'Shabakadaha taageerada bulshada'}</li>
                  <li>• {language === 'en' ? 'Accessing mental health services' : 'Helitaanka adeegyada caafimaadka maskaxda'}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Book className="text-accent text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-3">
                  {getTranslation('workshops.healthcareNavigation', language)}
                </h3>
                <p className="text-gray-700 mb-4">
                  {language === 'en' 
                    ? "Build confidence in advocating for your health needs and navigating Ontario's healthcare system effectively."
                    : "Ku dhis kalsoonida u ololaynta baahiyahaaga caafimaadka iyo u maaraynta nidaamka daryeelka caafimaadka Ontario si wax ku ool ah."
                  }
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• {language === 'en' ? 'Finding culturally competent providers' : 'Helitaanka bixiyeyaasha awood u leh dhaqanka'}</li>
                  <li>• {language === 'en' ? 'Understanding your rights' : 'Fahamka xuquuqahaaga'}</li>
                  <li>• {language === 'en' ? 'Communicating with healthcare teams' : 'La xidhiidhka kooxaha daryeelka caafimaadka'}</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/workshops">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <CalendarDays className="w-5 h-5 mr-2" />
                {getTranslation('workshops.viewFullCalendar', language)}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
