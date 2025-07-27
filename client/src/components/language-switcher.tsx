import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      onClick={toggleLanguage}
      variant="default"
      size="sm"
      className="bg-primary text-primary-foreground hover:bg-primary/90"
    >
      <Globe className="w-4 h-4 mr-1" />
      {language === 'en' ? 'SO' : 'EN'}
    </Button>
  );
}
