import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Users, Heart, Brain, UserRound, CalendarDays } from "lucide-react";
import { WorkshopCard } from "@/components/workshop-card";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/i18n";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertWorkshopRegistrationSchema, Workshop } from "@shared/schema";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";

const registrationSchema = insertWorkshopRegistrationSchema.extend({
  workshopId: z.string().min(1, "Workshop ID is required"),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function Workshops() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedWorkshopId, setSelectedWorkshopId] = useState<string | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const { data: workshops = [], isLoading } = useQuery<Workshop[]>({
    queryKey: ['/api/workshops'],
  });

  const registrationMutation = useMutation({
    mutationFn: async (data: RegistrationFormData) => {
      const { workshopId, ...registrationData } = data;
      return apiRequest('POST', `/api/workshops/${workshopId}/register`, registrationData);
    },
    onSuccess: () => {
      toast({
        title: getTranslation('validation.success', language),
        description: language === 'en' 
          ? "You have been successfully registered for the workshop." 
          : "Si guul leh ayaad ugu diiwaan gashay tababarka.",
      });
      setIsRegistrationOpen(false);
      queryClient.invalidateQueries({ queryKey: ['/api/workshops'] });
    },
    onError: () => {
      toast({
        title: getTranslation('validation.error', language),
        description: language === 'en'
          ? "Failed to register for workshop. Please try again."
          : "Lama diiwaan galin tababarka. Fadlan mar kale isku day.",
        variant: "destructive",
      });
    },
  });

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      workshopId: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      preferredLanguage: "both",
    },
  });

  const handleRegister = (workshopId: string) => {
    setSelectedWorkshopId(workshopId);
    form.setValue('workshopId', workshopId);
    setIsRegistrationOpen(true);
  };

  const handleLearnMore = (workshopId: string) => {
    // Navigate to workshop detail or show more info
    console.log('Learn more about workshop:', workshopId);
  };

  const onSubmit = (data: RegistrationFormData) => {
    registrationMutation.mutate(data);
  };

  const categories = [
    { 
      key: "all", 
      labelEn: "All Workshops", 
      labelSo: "Dhammaan Tababarrada",
      icon: CalendarDays,
      color: "text-gray-700"
    },
    { 
      key: "chronic-disease", 
      labelEn: "Chronic Disease Management", 
      labelSo: "Maaraynta Cudurrada Raagaya",
      icon: Heart,
      color: "text-primary"
    },
    { 
      key: "mental-health", 
      labelEn: "Mental Health & Wellness", 
      labelSo: "Caafimaadka Maskaxda",
      icon: Brain,
      color: "text-secondary"
    },
    { 
      key: "navigation", 
      labelEn: "Healthcare Navigation", 
      labelSo: "Hagista Daryeelka Caafimaadka",
      icon: UserRound,
      color: "text-accent"
    }
  ];

  const filteredWorkshops = selectedCategory === "all" 
    ? workshops 
    : workshops.filter((workshop: any) => workshop.category === selectedCategory);

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
              {getTranslation('workshops.title', language)}
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {getTranslation('workshops.description', language)}
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  variant={selectedCategory === category.key ? "default" : "outline"}
                  className={selectedCategory === category.key ? "" : "hover:bg-gray-100"}
                >
                  <IconComponent className={`w-4 h-4 mr-2 ${category.color}`} />
                  {language === 'en' ? category.labelEn : category.labelSo}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workshops List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-charcoal mb-4">
              {getTranslation('workshops.upcomingWorkshops', language)}
            </h2>
            <p className="text-gray-700">
              {language === 'en' 
                ? `Showing ${filteredWorkshops.length} workshop${filteredWorkshops.length !== 1 ? 's' : ''}`
                : `Muujinaya ${filteredWorkshops.length} tababar${filteredWorkshops.length !== 1 ? 'ro' : ''}`
              }
            </p>
          </div>

          {filteredWorkshops.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {language === 'en' ? "No workshops found" : "Lama helin tababarro"}
                </h3>
                <p className="text-gray-600">
                  {language === 'en' 
                    ? "Check back soon for new workshop announcements."
                    : "Ku soo laabo dhawaan ogosiinyooyinka tababarrada cusub."
                  }
                </p>
                <Button
                  className="mt-4"
                  onClick={() => setSelectedCategory("all")}
                >
                  {language === 'en' ? "View All Workshops" : "Arag Dhammaan Tababarrada"}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredWorkshops.map((workshop: any) => (
                <WorkshopCard
                  key={workshop.id}
                  workshop={workshop}
                  onRegister={handleRegister}
                  onLearnMore={handleLearnMore}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Registration Dialog */}
      <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {language === 'en' ? "Register for Workshop" : "Iska diiwaan geli Tababarka"}
            </DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{getTranslation('contact.firstName', language)} *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{getTranslation('contact.lastName', language)} *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getTranslation('contact.email', language)} *</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getTranslation('contact.phone', language)}</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredLanguage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getTranslation('contact.preferredLanguage', language)}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="english">{getTranslation('common.english', language)}</SelectItem>
                        <SelectItem value="somali">{getTranslation('common.somali', language)}</SelectItem>
                        <SelectItem value="both">{getTranslation('common.both', language)}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 pt-4">
                <Button 
                  type="submit" 
                  disabled={registrationMutation.isPending}
                  className="flex-1"
                >
                  {registrationMutation.isPending 
                    ? getTranslation('common.loading', language)
                    : getTranslation('common.register', language)
                  }
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsRegistrationOpen(false)}
                  className="flex-1"
                >
                  {getTranslation('common.cancel', language)}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
