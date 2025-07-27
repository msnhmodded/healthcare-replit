import { Heart, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/i18n";

export function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-12 border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 animate-fade-in">
          {/* Organization Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Heart className="text-accent text-2xl mr-3" />
              <span className="text-xl font-bold">Somali Health Equity Collective</span>
            </div>
            <p className="text-gray-200 mb-4 max-w-md">
              {language === 'en' 
                ? "Building healthier communities through culturally-responsive health education, community partnerships, and advocacy for health equity in Toronto's Somali community."
                : "Dhisidda bulshooyin caafimaad fiican leh iyagoo loo marayo waxbarasho caafimaad oo ku habboon dhaqanka, iskaashiga bulshada, iyo u ololaynta sinnaanta caafimaadka bulshada Soomaalida Toronto."
              }
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-200 hover:text-primary transition-all duration-300 hover-glow">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="text-gray-200 hover:text-primary transition-all duration-300 hover-glow">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="text-gray-200 hover:text-primary transition-all duration-300 hover-glow">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="text-gray-200 hover:text-primary transition-all duration-300 hover-glow">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {getTranslation('common.quickLinks', language) || 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              <li><Link href="/workshops" className="text-gray-200 hover:text-primary transition-all duration-300 hover-lift inline-block">{getTranslation('nav.workshops', language)}</Link></li>
              <li><Link href="/resources" className="text-gray-200 hover:text-primary transition-all duration-300 hover-lift inline-block">{getTranslation('nav.resources', language)}</Link></li>
              <li><Link href="/involvement" className="text-gray-200 hover:text-primary transition-all duration-300 hover-lift inline-block">{getTranslation('nav.involvement', language)}</Link></li>
              <li><Link href="/contact" className="text-gray-200 hover:text-primary transition-all duration-300 hover-lift inline-block">{getTranslation('nav.contact', language)}</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {getTranslation('nav.resources', language)}
            </h3>
            <ul className="space-y-2">
              <li><Link href="/resources?category=health-guides" className="text-gray-300 hover:text-white transition-colors">
                {language === 'en' ? 'Health Guides' : 'Hagaha Caafimaadka'}
              </Link></li>
              <li><Link href="/resources?category=videos" className="text-gray-300 hover:text-white transition-colors">
                {language === 'en' ? 'Video Library' : 'Maktabadda Video'}
              </Link></li>
              <li><Link href="/resources?category=directory" className="text-gray-300 hover:text-white transition-colors">
                {language === 'en' ? 'Provider Directory' : 'Buugga Bixiyeyaasha'}
              </Link></li>
              <li><Link href="/resources?category=forms" className="text-gray-300 hover:text-white transition-colors">
                {language === 'en' ? 'Downloadable Forms' : 'Foomamka la soo dejin karo'}
              </Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; 2025 Somali Health Equity Collective. All rights reserved. | 
            <a href="#" className="hover:text-white transition-colors ml-1">Privacy Policy</a> | 
            <a href="#" className="hover:text-white transition-colors ml-1">Terms of Service</a>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            {language === 'en' 
              ? 'This website is optimized for accessibility and available in English and Somali.'
              : 'Websaydhkan waxaa loo habeeyay gelitaanka oo wuxuu ku heli karaa Ingiriiska iyo Soomaaliga.'
            }
          </p>
        </div>
      </div>
    </footer>
  );
}
