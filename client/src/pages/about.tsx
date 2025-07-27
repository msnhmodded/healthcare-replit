import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Heart, Scale, HandHeart, Target, BookOpen, Lightbulb } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";

export default function About() {
  const { language } = useLanguage();

  const approaches = [
    {
      icon: Users,
      titleEn: "Community-Centered",
      titleSo: "Bulshada-dhexe",
      descriptionEn: "Every program decision stems from genuine community needs identified through ongoing dialogue and feedback.",
      descriptionSo: "Go'aan kasta oo barnaamij ah wuxuu ka yimaadhaa baahiyaha dhabta ah ee bulshada ee lagu aqoonsaday wadahadallo iyo jawaab celin joogto ah."
    },
    {
      icon: Scale,
      titleEn: "Culturally Responsive",
      titleSo: "Jawaab Dhaqan",
      descriptionEn: "Programs honor Somali cultural values while addressing the realities of living in Toronto's diverse healthcare landscape.",
      descriptionSo: "Barnaamijyadu waxay sharfaan qiyamka dhaqanka Soomaalida halka ay wajahayaan xaqiiqooyinka nololka muuqaalka kala duwan ee daryeelka caafimaadka Toronto."
    },
    {
      icon: HandHeart,
      titleEn: "Evidence-Based",
      titleSo: "Caddaymo ku saleysan",
      descriptionEn: "Health education combines best practices from community health promotion with lived experience and clinical expertise.",
      descriptionSo: "Waxbarashada caafimaadku wuxuu isku darayaa habka ugu fiican ee horumarinta caafimaadka bulshada iyo khibradda nolol iyo khibradda caafimaadka."
    }
  ];

  const challenges = [
    {
      icon: Target,
      titleEn: "Acceptance and Lifestyle Change",
      titleSo: "Aqbalida iyo Isbedelka Habka Nolol-maalmeedka",
      descriptionEn: "Many community members struggle to accept new diagnoses and find it difficult to change long-established habits and routines, even when diagnosed with conditions like diabetes or heart disease.",
      descriptionSo: "Xubnaha badan ee bulshadu way la dagaallamaan aqbalida daawada cusub waxayna adag u helaan inay beddelaan caadooyinka iyo nidaamyada muddo dheer la dejiyay, xitaa marka lagu daaweeyo xaalado sida sonkorowga ama cudurka wadnaha."
    },
    {
      icon: BookOpen,
      titleEn: "Healthcare Navigation",
      titleSo: "Hagista Daryeelka Caafimaadka",
      descriptionEn: "Language barriers persist even with interpretation services, particularly when medical concepts don't translate directly into cultural understanding of health and illness.",
      descriptionSo: "Caqabadaha luqadu way sii jiraan xitaa marka lagu sameeyo adeegyada turjumaadda, gaar ahaan marka fikradaha caafimaadka aan si toos ah loogu turjumin fahanka dhaqanka ee caafimaadka iyo cudurka."
    },
    {
      icon: Lightbulb,
      titleEn: "Trust Building",
      titleSo: "Dhismaha Kalsoonida",
      descriptionEn: "Healthcare misinformation circulates rapidly through social media and community networks, often filling gaps left by inadequate communication from healthcare providers.",
      descriptionSo: "Macluumaadka qaldan ee caafimaadka ayaa si degdeg ah ugu wareega baraha bulshada iyo shabakadaha bulshada, inta badan buuxinaya farqyada ay ka tageen isgaarasii aan ku filneyn ee bixiyeyaasha daryeelka caafimaadka."
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
                ? "About the Somali Health Equity Collective"
                : "Ku saabsan Ururka Sinnaanta Caafimaadka Soomaalida"
              }
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {language === 'en' 
                ? "We are a community-driven initiative working to bridge the gap between healthcare providers and Somali families in Toronto through education, advocacy, and culturally-responsive programming."
                : "Waxaan nahay hindise bulshad-wadda ah oo ka shaqeeya buuxinta farqiga u dhexeeya bixiyeyaasha daryeelka caafimaadka iyo qoysaska Soomaalida Toronto iyagoo loo marayo waxbarasho, u ololayn, iyo barnaamij ku habboon dhaqanka."
              }
            </p>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Target className="text-primary text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-charcoal mb-4">
                  {language === 'en' ? "Our Mission" : "Ujeedkeenna"}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'en' 
                    ? "To bridge the gap between healthcare providers and community members through education that is relevant and meaningful in our daily lives. We center community voices and build on existing strengths within Somali neighbourhoods across Toronto."
                    : "In aan buuxinno farqiga u dhexeeya bixiyeyaasha daryeelka caafimaadka iyo xubnaha bulshada iyagoo loo marayo waxbarasho ku habboon oo macno leh nolol-maalmeedkeenna. Waxaan dhexda u dhignaa codadka bulshada waxaana ku dhisnaa awoodaha jira ee xaafadaha Soomaalida ee Toronto."
                  }
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Heart className="text-secondary text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-charcoal mb-4">
                  {language === 'en' ? "Our Vision" : "Aragggeenna"}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'en' 
                    ? "A Toronto where Somali families have equitable access to culturally-competent healthcare, where community members feel confident advocating for their health needs, and where healthcare providers understand and respect our cultural values."
                    : "Toronto ah oo qoysaska Soomaalidu helaan gelitaan sinnaan ah oo daryeel caafimaad oo awood u leh dhaqanka, halka xubnaha bulshadu ay kalsoonaan u qabaan u ololaynta baahiyahooda caafimaadka, iyo halka bixiyeyaasha daryeelka caafimaadku fahmaan oo ixtiraamaan qiyamkeenna dhaqameed."
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Understanding Health Disparities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">
              {language === 'en' 
                ? "Understanding Health Disparities Contextually"
                : "Fahamka Kala duwanaanshaha Caafimaadka si Xaalad ahaan"
              }
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {language === 'en' 
                ? "When we discuss health disparities affecting Somali families in Toronto, we recognize the complex challenges that go beyond individual lifestyle choices."
                : "Marka aan ka hadalno kala duwanaanshaha caafimaadka saameyn ku yeelan qoysaska Soomaalida Toronto, waxaan aqoonsanaynaa caqabadaha adag ee ka baxsan doorashooyinka habka nolol-maalmeedka ee shakhsi ahaaneed."
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => {
              const IconComponent = challenge.icon;
              return (
                <Card key={index} className="border-l-4 border-accent">
                  <CardContent className="p-6">
                    <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="text-accent text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-charcoal mb-3">
                      {language === 'en' ? challenge.titleEn : challenge.titleSo}
                    </h3>
                    <p className="text-gray-700 text-sm">
                      {language === 'en' ? challenge.descriptionEn : challenge.descriptionSo}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">
              {language === 'en' ? "Our Collaborative Approach" : "Habkeenna Iskaashiga"}
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {language === 'en' 
                ? "Our work is grounded in three core principles that ensure our programs are effective, respectful, and responsive to community needs."
                : "Shaqadeennu waxay ku salaysan tahay saddex mabda'a oo muhiim ah kuwaas oo hubinaya in barnaamijyadayadu yihiin kuwo wax ku ool ah, ixtiraam badan, oo ka jawaabaya baahiyaha bulshada."
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {approaches.map((approach, index) => {
              const IconComponent = approach.icon;
              return (
                <Card key={index} className="bg-white text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="text-primary text-2xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-charcoal mb-4">
                      {language === 'en' ? approach.titleEn : approach.titleSo}
                    </h3>
                    <p className="text-gray-700">
                      {language === 'en' ? approach.descriptionEn : approach.descriptionSo}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {language === 'en' 
              ? "Ready to Get Involved?"
              : "Diyaar u tahay inaad ka qaybqaatid?"
            }
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {language === 'en' 
              ? "Join us in building healthier communities through education, advocacy, and cultural understanding."
              : "Nagu biir dhismaha bulshooyin caafimaad fiican iyagoo loo marayo waxbarasho, u ololayn, iyo fahamka dhaqanka."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/workshops">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                {language === 'en' ? "Attend Workshops" : "Ka qaybgal Tababarrada"}
              </Button>
            </Link>
            <Link href="/involvement">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                {language === 'en' ? "Volunteer With Us" : "Nala Mutadawacda"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
