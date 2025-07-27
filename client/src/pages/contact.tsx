import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Phone, Clock, AlertTriangle, MapPin, Send, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/i18n";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = insertContactSchema.extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  preferredLanguage: z.enum(["english", "somali", "both"]),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  subscribeNewsletter: z.boolean().default(false),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest('POST', '/api/contacts', data);
    },
    onSuccess: () => {
      setIsSuccess(true);
      toast({
        title: getTranslation('validation.success', language),
        description: language === 'en' 
          ? "Thank you for your message. We will respond within 24 hours." 
          : "Mahadsanid fariintaada. Waxaan ka jawaabi doonaa 24 saacadood gudahood.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: getTranslation('validation.error', language),
        description: language === 'en'
          ? "There was an error sending your message. Please try again."
          : "Qalad ayaa ka dhacay dirista fariintaada. Fadlan mar kale isku day.",
        variant: "destructive",
      });
    },
  });

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      preferredLanguage: "both",
      inquiryType: "",
      message: "",
      subscribeNewsletter: false,
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const inquiryTypes = [
    { value: "workshop", labelEn: "Workshop Information", labelSo: "Macluumaadka Tababarka" },
    { value: "health", labelEn: "Health Question", labelSo: "Su'aasha Caafimaadka" },
    { value: "volunteer", labelEn: "Volunteer Opportunity", labelSo: "Fursadda Mutadawacnimada" },
    { value: "partnership", labelEn: "Partnership Inquiry", labelSo: "Su'aasha Iskaashiga" },
    { value: "feedback", labelEn: "Program Feedback", labelSo: "Jawaab celinta Barnaamijka" },
    { value: "other", labelEn: "Other", labelSo: "Kale" },
  ];

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-charcoal mb-4">
                {language === 'en' ? 'Message Sent!' : 'Fariinta la diray!'}
              </h1>
              <p className="text-gray-700 mb-6">
                {language === 'en' 
                  ? 'Thank you for contacting us. We will respond within 24 hours.'
                  : 'Mahadsanid inaa nala soo xidhay. Waxaan ka jawaabi doonaa 24 saacadood gudahahood.'
                }
              </p>
              <Button onClick={() => setIsSuccess(false)}>
                {language === 'en' ? 'Send Another Message' : 'Dir Fariinta kale'}
              </Button>
            </div>
          </CardContent>
        </Card>
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
              {getTranslation('contact.title', language)}
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {getTranslation('contact.description', language)}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Information */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-charcoal">
                  {getTranslation('contact.sendMessage', language)}
                </CardTitle>
              </CardHeader>
              <CardContent>
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
                            <Input type="tel" {...field} />
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

                    <FormField
                      control={form.control}
                      name="inquiryType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{getTranslation('contact.inquiryType', language)}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={language === 'en' ? "Select an option..." : "Dooro xulasho..."} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {inquiryTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {language === 'en' ? type.labelEn : type.labelSo}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{getTranslation('contact.message', language)} *</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              rows={5}
                              placeholder={language === 'en' 
                                ? "Please share your question, feedback, or how you'd like to get involved..."
                                : "Fadlan la wadaag su'aashaada, jawaab celintaada, ama sida aad u doonayso inaad ka qaybqaatid..."
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subscribeNewsletter"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-normal">
                              {getTranslation('contact.newsletter', language)}
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {getTranslation('common.loading', language)}
                        </div>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          {getTranslation('contact.sendMessageBtn', language)}
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Direct Contact */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-charcoal">
                    {getTranslation('contact.contactInfo', language)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                      <Mail className="text-primary w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal">Email</p>
                      <p className="text-gray-700">info@somalichealth.ca</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                      <Phone className="text-secondary w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal">Phone</p>
                      <p className="text-gray-700">(416) 555-HEALTH</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                      <Clock className="text-accent w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal">
                        {getTranslation('contact.officeHours', language)}
                      </p>
                      <p className="text-gray-700">
                        {language === 'en' ? 'Monday - Friday: 9 AM - 5 PM' : 'Isniin - Jimce: 9 AM - 5 PM'}
                      </p>
                      <p className="text-gray-700">
                        {language === 'en' ? 'Evening workshops available' : 'Tababarro fiid ah ayaa la heli karaa'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Resources */}
              <Alert className="border-accent/20 bg-accent/5">
                <AlertTriangle className="h-5 w-5 text-accent" />
                <div className="ml-2">
                  <h3 className="text-xl font-bold text-charcoal mb-2">
                    {getTranslation('contact.needSupport', language)}
                  </h3>
                  <AlertDescription className="text-gray-700 mb-4">
                    {getTranslation('contact.emergencyNote', language)}
                  </AlertDescription>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Phone className="text-accent mr-3 w-4 h-4" />
                      <span className="font-semibold">
                        {language === 'en' ? 'Emergency: 911' : 'Degdegga: 911'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="text-accent mr-3 w-4 h-4" />
                      <span>Telehealth Ontario: 1-866-797-0000</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="text-accent mr-3 w-4 h-4" />
                      <span>
                        {language === 'en' 
                          ? 'Crisis Text Line: Text HOME to 686868'
                          : 'Khaddka Qoraalka Dhibaatada: Dir HOME u 686868'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </Alert>

              {/* Workshop Locations */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-charcoal mb-4">
                    {language === 'en' ? 'Workshop Locations' : 'Goobaha Tababarrada'}
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <MapPin className="text-primary w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-charcoal">Abu Hurairah Centre</p>
                        <p className="text-gray-700 text-sm">
                          {language === 'en' 
                            ? 'Main workshop venue - Friday evenings'
                            : 'Goobta tababarrada ugu weyn - Jimce fiidka'
                          }
                        </p>
                        <p className="text-gray-700 text-sm">123 Community Ave, Toronto, ON</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="text-secondary w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-charcoal">Khalid bin Waleed Centre</p>
                        <p className="text-gray-700 text-sm">
                          {language === 'en' 
                            ? "Women's programming - Saturday evenings"
                            : 'Barnaamijyada haweenka - Sabti fiidka'
                          }
                        </p>
                        <p className="text-gray-700 text-sm">456 Cultural Blvd, Toronto, ON</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
