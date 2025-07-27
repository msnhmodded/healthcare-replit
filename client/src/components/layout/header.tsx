import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Heart } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/i18n";

const navigation = [
  { name: 'nav.home', href: '/' },
  { name: 'nav.workshops', href: '/workshops' },
  { name: 'nav.resources', href: '/resources' },
  { name: 'nav.involvement', href: '/involvement' },
  { name: 'nav.contact', href: '/contact' },
];

export function Header() {
  const [location] = useLocation();
  const { language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center hover-lift transition-all duration-300">
              <Heart className="text-accent text-2xl mr-3 animate-bounce-subtle" />
              <span className="text-xl font-bold text-charcoal">SHEC</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover-lift ${
                    location === item.href
                      ? 'text-primary'
                      : 'text-charcoal hover:text-primary'
                  }`}
                >
                  {getTranslation(item.name, language)}
                </Link>
              ))}
            </div>
          </div>

          {/* Language Switcher and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`px-3 py-2 text-base font-medium transition-colors ${
                          location === item.href
                            ? 'text-primary'
                            : 'text-charcoal hover:text-primary'
                        }`}
                      >
                        {getTranslation(item.name, language)}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
