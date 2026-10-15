import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Phone, MessageSquare, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ language, onLanguageChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-charcoal/90 border-b border-steelGrey/15 text-xs text-steelGrey py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-builderOrange animate-ping" />
            <span>{t.topBarLocation}</span>
            <span className="text-steelGrey/40 hidden sm:inline">•</span>
            <span className="hidden sm:inline">{t.ownerTitle}</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a href="tel:9304201774" className="hover:text-builderOrange transition-colors flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-builderOrange" />
              <span>+91 9304201774</span>
            </a>
            <a href="https://wa.me/919304201774" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1 font-medium">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Main Navigation */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-midnight/90 backdrop-blur-md py-4 border-b border-steelGrey/10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo and Business Name */}
            <a href="#home" className="flex items-center gap-3.5 group">
              <div className="relative w-11 h-11 rounded-lg bg-gradient-to-br from-charcoal to-midnight border border-steelGrey/25 p-2 flex items-center justify-center shadow-lg group-hover:border-builderOrange transition-colors">
                <svg className="w-full h-full text-builderOrange" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4L6 14V38L24 44L42 38V14L24 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                  <path d="M24 4V44" stroke="#D5AA66" strokeWidth="2" />
                  <path d="M6 14L24 24L42 14" stroke="currentColor" strokeWidth="2" />
                  <path d="M6 38L24 24L42 38" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="24" cy="24" r="3" fill="#FF7628" />
                </svg>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-builderOrange rounded-full border-2 border-midnight" />
              </div>
              <div>
                <span className="block text-base sm:text-lg font-extrabold tracking-tight text-warmWhite group-hover:text-builderOrange transition-colors leading-none">
                  MAA VINDHYAVASINI
                </span>
                <span className="block text-xs font-semibold tracking-widest text-builderOrange uppercase mt-1">
                  TRADERS • <span className="text-steelGrey font-normal tracking-normal text-[11px]">{t.taglineNav}</span>
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-steelGrey">
              <a href="#home" className="hover:text-warmWhite transition-colors">{t.navHome}</a>
              <a href="#products" className="hover:text-warmWhite transition-colors">{t.navProducts}</a>
              <a href="#materials-3d" className="hover:text-warmWhite transition-colors">{t.nav3D}</a>
              <a href="#about" className="hover:text-warmWhite transition-colors">{t.navAbout}</a>
              <a href="#services" className="hover:text-warmWhite transition-colors">{t.navServices}</a>
              <a href="#gallery" className="hover:text-warmWhite transition-colors">{t.navGallery}</a>
              <a href="#contact" className="hover:text-warmWhite transition-colors">{t.navContact}</a>
            </nav>

            {/* Right Controls: Language Switcher & Quote CTA */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="relative inline-flex bg-charcoal border border-steelGrey/20 rounded-full p-1 text-xs font-semibold">
                <button
                  onClick={() => onLanguageChange('en')}
                  className={`px-2.5 py-1 rounded-full transition-all ${language === 'en' ? 'text-warmWhite bg-midnight shadow font-bold' : 'text-steelGrey hover:text-warmWhite'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => onLanguageChange('hi')}
                  className={`px-2.5 py-1 rounded-full transition-all ${language === 'hi' ? 'text-warmWhite bg-midnight shadow font-bold' : 'text-steelGrey hover:text-warmWhite'}`}
                >
                  हिंदी
                </button>
              </div>

              <a
                href="#contact"
                className="inline-flex items-center justify-center px-5 py-2.5 text-xs uppercase tracking-wider font-bold rounded-lg text-white bg-builderOrange hover:bg-orange-600 transition-all shadow-orange-sm hover:shadow-orange-glow active:scale-95"
              >
                <span>{t.btnGetQuote}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </a>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
              <button
                onClick={() => onLanguageChange(language === 'en' ? 'hi' : 'en')}
                className="px-2.5 py-1 rounded-full bg-charcoal border border-steelGrey/25 text-xs font-bold text-builderOrange"
              >
                {language === 'en' ? 'हिंदी' : 'EN'}
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="p-2 rounded-lg text-steelGrey hover:text-warmWhite bg-charcoal/80 border border-steelGrey/20"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Slide-out Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-steelGrey/15 bg-midnight/98 px-6 py-6 transition-all duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-steelGrey/15 mb-3">
              <span className="text-xs text-steelGrey font-medium">भाषा चुनें / Language:</span>
              <div className="inline-flex bg-charcoal border border-steelGrey/20 rounded-lg p-0.5 text-xs font-semibold">
                <button
                  onClick={() => onLanguageChange('en')}
                  className={`px-3 py-1 rounded-md transition-all ${language === 'en' ? 'text-warmWhite bg-midnight shadow font-bold' : 'text-steelGrey hover:text-warmWhite'}`}
                >
                  English
                </button>
                <button
                  onClick={() => onLanguageChange('hi')}
                  className={`px-3 py-1 rounded-md transition-all ${language === 'hi' ? 'text-warmWhite bg-midnight shadow font-bold' : 'text-steelGrey hover:text-warmWhite'}`}
                >
                  हिंदी
                </button>
              </div>
            </div>
            <div className="flex flex-col space-y-4 text-base font-medium text-steelGrey">
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="hover:text-builderOrange transition-colors py-1 border-b border-steelGrey/10">{t.navHome}</a>
              <a href="#products" onClick={() => setMobileMenuOpen(false)} className="hover:text-builderOrange transition-colors py-1 border-b border-steelGrey/10">{t.navProducts}</a>
              <a href="#materials-3d" onClick={() => setMobileMenuOpen(false)} className="hover:text-builderOrange transition-colors py-1 border-b border-steelGrey/10">{t.nav3D}</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-builderOrange transition-colors py-1 border-b border-steelGrey/10">{t.navAbout}</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-builderOrange transition-colors py-1 border-b border-steelGrey/10">{t.navServices}</a>
              <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="hover:text-builderOrange transition-colors py-1 border-b border-steelGrey/10">{t.navGallery}</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-builderOrange transition-colors py-1 border-b border-steelGrey/10">{t.navContact}</a>
              
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 font-bold text-white bg-builderOrange rounded-lg shadow-orange-sm text-sm uppercase tracking-wider"
                >
                  {t.btnGetQuote}
                </a>
                <a
                  href="https://wa.me/919304201774"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-3 font-semibold text-warmWhite bg-emerald-700/80 rounded-lg text-sm flex items-center justify-center gap-2"
                >
                  <span>WhatsApp: +91 9304201774</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
