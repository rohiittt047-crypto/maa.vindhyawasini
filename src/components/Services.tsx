import React from 'react';
import { Language } from '../types';
import { servicesData } from '../data/services';
import { translations } from '../data/translations';
import { ArrowRight, Layers, Shield, Wrench, Package, Truck } from 'lucide-react';

interface ServicesProps {
  language: Language;
}

export const Services: React.FC<ServicesProps> = ({ language }) => {
  const t = translations[language];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-5 h-5 text-builderOrange" />;
      case 'Shield': return <Shield className="w-5 h-5 text-goldAccent" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-builderOrange" />;
      case 'Package': return <Package className="w-5 h-5 text-warmWhite" />;
      case 'Truck': return <Truck className="w-5 h-5 text-builderOrange" />;
      default: return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-charcoal/50 relative border-t border-steelGrey/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-midnight border border-steelGrey/20 text-goldAccent text-xs font-bold uppercase tracking-widest">
            <span>{t.servicesBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-warmWhite tracking-tight">
            <span>{t.servicesHeading}</span>
          </h2>
          <p className="text-sm sm:text-base text-steelGrey leading-relaxed">
            {t.servicesSubheading}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((srv, idx) => (
            <div
              key={srv.id}
              className={`glass-card rounded-2xl p-6 flex flex-col justify-between ${idx === 4 ? 'lg:col-span-2' : ''}`}
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-midnight border border-steelGrey/20 flex items-center justify-center mb-4">
                  {getIcon(srv.iconName)}
                </div>
                <h3 className="text-lg font-bold text-warmWhite mb-2">
                  {language === 'hi' ? srv.titleHi : srv.titleEn}
                </h3>
                <p className="text-xs text-steelGrey leading-relaxed mb-6">
                  {language === 'hi' ? srv.descHi : srv.descEn}
                </p>
              </div>

              <a
                href={`https://wa.me/919304201774?text=${encodeURIComponent(`Namaste Maa Vindhyavasini Traders, mujhe ${srv.queryParam} ke baare mein enquiry karni hai.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-builderOrange hover:text-white transition-colors flex items-center gap-1 group"
              >
                <span>{t.srvEnquire}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
