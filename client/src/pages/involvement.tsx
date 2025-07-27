import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Heart, HandHeart, Calendar, MapPin, Clock, Mail, ExternalLink, UserPlus, Building, Stethoscope } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation, getTranslationContent } from "@/lib/i18n";
import { TeamMemberCard } from "@/components/team-member";
import { Link } from "wouter";
import { TeamMember } from "@shared/schema";

const volunteerOpportunities = [
  {
    id: 1,
    titleEn: "Workshop Assistant",
    titleSo: "Kaalmiye Tababarka",
    descriptionEn: "Help facilitate workshops by providing translation support, assisting with registration, and supporting participants during sessions.",
    descriptionSo: "Ku caawin hawlaynta tababarrada adiga oo bixinaya taageero turjumaad, caawinta diiwaangelinta, iyo taageerada ka-qaybgalayaasha inta lagu jiro fadhigu.",
    timeCommitment: { en: "4-6 hours/month", so: "4-6 saacadood/bilkasta" },
    skills: [
      { en: "Bilingual (English/Somali)", so: "Laba luqadood (Ingiriisi/Soomaali)" },
      { en: "Community engagement", so: "Wadashaqeynta bulshada" },
      { en: "Public speaking comfort", so: "Raaxada hadal-jeedinta dadweynaha" }
    ],
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    id: 2,
    titleEn: "Health Resource Developer",
    titleSo: "Horumariye Khayraadka Caafimaadka",
    descriptionEn: "Research, write, and translate health education materials that are culturally appropriate and accessible to community members.",
    descriptionSo: "Cilmi-baadh, qor, oo turjun walxaha waxbarashada caafimaadka ee ku habboon dhaqanka oo ay marin karaan xubnaha bulshada.",
    timeCommitment: { en: "6-8 hours/month", so: "6-8 saacadood/bilkasta" },
    skills: [
      { en: "Research and writing", so: "Cilmi-baadh iyo qoraal" },
      { en: "Health knowledge", so: "Aqoonta caafimaadka" },
      { en: "Translation skills", so: "Xirfadaha turjumaadda" }
    ],
    icon: Heart,
    color: "text-secondary",
    bgColor: "bg-secondary/10"
  },
  {
    id: 3,
    titleEn: "Community Outreach Coordinator",
    titleSo: "Isku-dubaridaha Gacanta-saarista Bulshada",
    descriptionEn: "Connect with community organizations, mosques, and cultural centers to promote workshops and build partnerships.",
    descriptionSo: "La xiriir hay'adaha bulshada, masaajidka, iyo xarumaha dhaqanka si loo kordhiyo tababarrada oo loo dhiso iskaashiga.",
    timeCommitment: { en: "5-7 hours/month", so: "5-7 saacadood/bilkasta" },
    skills: [
      { en: "Networking abilities", so: "Awoodaha shabakadeynta" },
      { en: "Community knowledge", so: "Aqoonta bulshada" },
      { en: "Communication skills", so: "Xirfadaha isgaarsiinta" }
    ],
    icon: HandHeart,
    color: "text-accent",
    bgColor: "bg-accent/10"
  }
];

const partnershipTypes = [
  {
    titleEn: "Healthcare Providers",
    titleSo: "Bixiyeyaasha Daryeelka Caafimaadka",
    descriptionEn: "Clinics, hospitals, and healthcare professionals who want to improve cultural competency and serve Somali families better.",
    descriptionSo: "Ciibaallada, isbitaalada, iyo takhaatiirta caafimaadka ee doonaya inay horumariyaan awoodaha dhaqanka oo ay si fiican ugu adeegaan qoysaska Soomaalida.",
    benefits: [
      { en: "Cultural competency training", so: "Tababarka awooda dhaqameed" },
      { en: "Community referral network", so: "Shabakada tixraaca bulshada" },
      { en: "Improved patient outcomes", so: "Wanaajinta natiijooyinka bukaannada" }
    ],
    icon: Stethoscope,
    color: "text-primary"
  },
  {
    titleEn: "Community Organizations",
    titleSo: "Hay'adaha Bulshada",
    descriptionEn: "Local organizations, settlement agencies, and cultural centers interested in expanding health programming.",
    descriptionSo: "Hay'adaha maxalliga ah, wakaaladaha deganaanshaha, iyo xarumaha dhaqanka ee xiisaynaya balaadhinta barnaamijyada caafimaadka.",
    benefits: [
      { en: "Shared programming opportunities", so: "Fursadaha barnaamijka la wadaago" },
      { en: "Resource sharing", so: "Wadaagista khayraadka" },
      { en: "Community impact expansion", so: "Balaadhinta saameynta bulshada" }
    ],
    icon: Building,
    color: "text-secondary"
  },
  {
    titleEn: "Educational Institutions",
    titleSo: "Hay'adaha Waxbarashada",
    descriptionEn: "Universities, colleges, and research institutions looking to collaborate on health equity research and student placements.",
    descriptionSo: "Jaamacadaha, kulliyooyinka, iyo hay'adaha cilmi-baadhista ee raadinaya inay iskaashato cilmi-baadhista sinnaanta caafimaadka iyo meelaynta ardayda.",
    benefits: [
      { en: "Research collaboration", so: "Iskaashiga cilmi-baadhista" },
      { en: "Student learning opportunities", so: "Fursadaha barashada ardayda" },
      { en: "Evidence-based programming", so: "Barnaamijka ku saleysan caddaymaha" }
    ],
    icon: Users,
    color: "text-accent"
  }
];

export default function Involvement() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'volunteer' | 'partner'>('volunteer');

  const { data: teamMembers = [], isLoading } = useQuery<TeamMember[]>({
    queryKey: ['/api/team'],
  });

  const handleContactTeamMember = (memberId: string) => {
    const member = teamMembers.find((m) => m.id === memberId);
    if (member?.email) {
      window.location.href = `mailto:${member.email}`;
    }
  };

  const tabs = [
    {
      key: 'volunteer' as const,
      labelEn: 'Volunteer Opportunities',
      labelSo: 'Fursadaha Mutadawacnimada',
      icon: UserPlus
    },
    {
      key: 'partner' as const,
      labelEn: 'Partnership Opportunities',
      labelSo: 'Fursadaha Iskaashiga',
      icon: HandHeart
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-charcoal mb-6">
              {language === 'en' 
                ? "Get Involved with SHEC"
                : "Kala qaybgal SHEC"
              }
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {language === 'en' 
                ? "Join our mission to build healthier communities through volunteer work, partnerships, and community engagement. Every contribution makes a difference."
                : "Nagu biir ujeedkeenna dhismaha bulshooyin caafimaad fiican leh iyagoo loo marayo shaqada iskaa wax u qabashada, iskaashiga, iyo wadashaqeynta bulshada. Wax kasta oo la soo daro wuu isbeddel keenayaalahaa."
              }
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-col sm:flex-row justify-center mb-12">
            <div className="bg-gray-100 p-1 rounded-lg">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <Button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    variant={activeTab === tab.key ? "default" : "ghost"}
                    className={`px-6 py-3 ${activeTab === tab.key ? '' : 'text-gray-700'}`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {language === 'en' ? tab.labelEn : tab.labelSo}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      {activeTab === 'volunteer' && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {volunteerOpportunities.map((opportunity) => {
                const IconComponent = opportunity.icon;
                return (
                  <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${opportunity.bgColor}`}>
                          <IconComponent className={`w-6 h-6 ${opportunity.color}`} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">
                            {language === 'en' ? opportunity.titleEn : opportunity.titleSo}
                          </CardTitle>
                          <div className="flex items-center mt-2">
                            <Clock className="w-4 h-4 text-gray-600 mr-2" />
                            <span className="text-sm text-gray-600">
                              {getTranslationContent(opportunity.timeCommitment, language)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-6">
                        {language === 'en' ? opportunity.descriptionEn : opportunity.descriptionSo}
                      </p>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-charcoal mb-3">
                          {language === 'en' ? 'Skills Needed:' : 'Xirfadaha loo baahan yahay:'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {opportunity.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {getTranslationContent(skill, language)}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Link href="/contact">
                        <Button className="w-full">
                          <Mail className="w-4 h-4 mr-2" />
                          {language === 'en' ? 'Apply Now' : 'Codsii Hadda'}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Volunteer Benefits */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-charcoal mb-6 text-center">
                  {language === 'en' ? 'Why Volunteer with SHEC?' : 'Maxay tahay sababta aad SHEC ula mutadawacdo?'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="text-primary text-2xl" />
                    </div>
                    <h3 className="font-semibold text-charcoal mb-2">
                      {language === 'en' ? 'Make a Real Impact' : 'Samee Saameyn Dhabta ah'}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {language === 'en' 
                        ? 'Directly contribute to improving health outcomes in your community'
                        : 'Si toos ah ugu qaybqaad wanaajinta natiijooyinka caafimaadka bulshada'
                      }
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="text-secondary text-2xl" />
                    </div>
                    <h3 className="font-semibold text-charcoal mb-2">
                      {language === 'en' ? 'Build Connections' : 'Dhis Xiriirro'}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {language === 'en' 
                        ? 'Connect with like-minded community members and healthcare professionals'
                        : 'La xiriir xubnaha bulshada oo la fikirka ah iyo takhaatiirta caafimaadka'
                      }
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <HandHeart className="text-accent text-2xl" />
                    </div>
                    <h3 className="font-semibold text-charcoal mb-2">
                      {language === 'en' ? 'Develop Skills' : 'Korori Xirfadaha'}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {language === 'en' 
                        ? 'Gain experience in health education, community outreach, and cultural competency'
                        : 'Hel khibrad waxbarashada caafimaadka, gacanta-saarista bulshada, iyo awooda dhaqameed'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Partnership Opportunities */}
      {activeTab === 'partner' && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-charcoal mb-4">
                {language === 'en' ? 'Partnership Opportunities' : 'Fursadaha Iskaashiga'}
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                {language === 'en' 
                  ? "We're always looking to collaborate with organizations that share our commitment to health equity and culturally-responsive care."
                  : "Waxaan had iyo jeer raadinaynaa inaan la kaashataa hay'ado wadaaga ballanqaadkeenna sinnaanta caafimaadka iyo daryeelka ku habboon dhaqanka."
                }
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {partnershipTypes.map((partnership, index) => {
                const IconComponent = partnership.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 bg-gray-100`}>
                          <IconComponent className={`w-6 h-6 ${partnership.color}`} />
                        </div>
                        <CardTitle className="text-lg">
                          {language === 'en' ? partnership.titleEn : partnership.titleSo}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-6">
                        {language === 'en' ? partnership.descriptionEn : partnership.descriptionSo}
                      </p>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-charcoal mb-3">
                          {language === 'en' ? 'Partnership Benefits:' : 'Faa\'iidooyinka Iskaashiga:'}
                        </h4>
                        <ul className="space-y-2">
                          {partnership.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-700">
                              <div className="w-2 h-2 bg-success rounded-full mr-3 flex-shrink-0"></div>
                              {getTranslationContent(benefit, language)}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Link href="/contact">
                        <Button className="w-full">
                          <Mail className="w-4 h-4 mr-2" />
                          {language === 'en' ? 'Discuss Partnership' : 'Ka hadal Iskaashiga'}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Current Partners Preview */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-charcoal mb-6 text-center">
                  {language === 'en' ? 'Our Current Partners' : 'Saaxiibadayada Hadda'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-center p-6 rounded-lg bg-gray-50">
                    <Building className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-charcoal mb-2">Abu Hurairah Centre</h3>
                    <p className="text-sm text-gray-700">
                      {language === 'en' 
                        ? 'Primary venue partner providing space for workshops and community engagement'
                        : 'Saaxiibka goobaha ugu muhiimsan ee bixiya meel tababarro iyo wadashaqeynta bulshada'
                      }
                    </p>
                  </div>
                  <div className="text-center p-6 rounded-lg bg-gray-50">
                    <Heart className="w-12 h-12 text-secondary mx-auto mb-4" />
                    <h3 className="font-semibold text-charcoal mb-2">Khalid bin Waleed Centre</h3>
                    <p className="text-sm text-gray-700">
                      {language === 'en' 
                        ? "Women's programming partner focusing on culturally-appropriate health discussions"
                        : 'Saaxiibka barnaamijyada haweenka ee diiradda saara wadahadalada caafimaadka ee ku haboon dhaqanka'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Team Section */}
      {!isLoading && teamMembers.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-charcoal mb-4">
                {language === 'en' ? 'Meet Our Team' : 'La kulaan Kooxdayada'}
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                {language === 'en' 
                  ? "Led by community members with deep understanding of Somali culture and healthcare challenges."
                  : "Waxaa hogaamiya xubnaha bulshada oo leh faham qoto dheer oo ku saabsan dhaqanka Soomaalida iyo caqabadaha daryeelka caafimaadka."
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member: any) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  onContact={handleContactTeamMember}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {language === 'en' 
              ? "Ready to Make a Difference?"
              : "Diyaar u tahay inaad isbeddel samaysid?"
            }
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            {language === 'en' 
              ? "Whether you want to volunteer, partner with us, or simply stay connected, we'd love to hear from you."
              : "Haddii aad doonayso inaad mutadawacdo, nala kaashatid, ama uun xiriir la jirto, waxaan jeclaan lahaa inaan ka maqalno."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-secondary hover:bg-gray-100">
                <Mail className="w-5 h-5 mr-2" />
                {language === 'en' ? "Get in Touch" : 'Nala soo xiriir'}
              </Button>
            </Link>
            <Link href="/workshops">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Calendar className="w-5 h-5 mr-2" />
                {language === 'en' ? "Attend a Workshop" : 'Ka qaybgal Tababarka'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
