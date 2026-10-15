import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { MapPin, User, Phone, MessageSquare } from 'lucide-react';

interface AboutUsProps {
  language: Language;
}

export const AboutUs: React.FC<AboutUsProps> = ({ language }) => {
  const t = translations[language];

  return (
    <section id="about" className="py-24 bg-charcoal/40 relative border-t border-steelGrey/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Proprietor Official Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-goldAccent/30 shadow-2xl bg-midnight group">
              <div className="h-[480px] w-full overflow-hidden relative">
                <img
                  src="C:/Users/rohii/.gemini/antigravity/brain/7d88a306-1e1a-46ab-8c91-b3225608ce18/.user_uploaded/media_1791639440719_4fe3845b.jpg"
                  alt="Ajit Kumar Singh - Proprietor"
                  className="w-full h-full object-cover object-top filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-midnight/30 via-transparent to-midnight/80" />
              </div>
              
              {/* Verified Owner Badge on Top */}
              <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-midnight/90 backdrop-blur-md border border-goldAccent/40 shadow-lg text-xs font-bold text-goldAccent">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Verified Proprietor</span>
              </div>

              {/* Owner Information Card */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-midnight/95 backdrop-blur-md border border-steelGrey/25 shadow-xl">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-goldAccent shadow shrink-0">
                      <img
                        src="C:/Users/rohii/.gemini/antigravity/brain/7d88a306-1e1a-46ab-8c91-b3225608ce18/.user_uploaded/media_1791639440719_4fe3845b.jpg"
                        alt="Ajit Kumar Singh"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <div className="text-[11px] text-steelGrey uppercase tracking-wider font-semibold">{t.aboutBadgeTitle}</div>
                      <div className="text-base font-extrabold text-warmWhite">{t.aboutOwnerName}</div>
                      <div className="text-xs text-builderOrange font-medium">Maa Vindhyavasini Traders</div>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <a
                      href="tel:9304201774"
                      className="p-2.5 rounded-xl bg-builderOrange text-white hover:bg-orange-600 transition-colors shadow"
                      title="Call Ajit Kumar Singh"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <a
                      href="https://wa.me/919304201774"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow"
                      title="WhatsApp Ajit Kumar Singh"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-goldAccent/50 rounded-tl-2xl pointer-events-none" />
          </div>

          {/* Right Copy */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-midnight border border-steelGrey/20 text-builderOrange text-xs font-bold uppercase tracking-widest">
              <span>{t.aboutPreheading}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-warmWhite tracking-tight">
              <span>{t.aboutHeading}</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-steelGrey leading-relaxed">
              <p>{t.aboutCopy}</p>
              <p className="text-xs sm:text-sm text-steelGrey/80">{t.aboutSecondaryCopy}</p>
            </div>

            {/* Local Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-midnight/70 border border-steelGrey/15">
                <div className="w-8 h-8 rounded-lg bg-charcoal border border-steelGrey/20 flex items-center justify-center text-builderOrange mb-3">
                  <MapPin className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-warmWhite mb-1">{t.pillar1Title}</h4>
                <p className="text-xs text-steelGrey">{t.pillar1Desc}</p>
              </div>

              <div className="p-4 rounded-xl bg-midnight/70 border border-steelGrey/15">
                <div className="w-8 h-8 rounded-lg bg-charcoal border border-steelGrey/20 flex items-center justify-center text-goldAccent mb-3">
                  <User className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-warmWhite mb-1">{t.pillar2Title}</h4>
                <p className="text-xs text-steelGrey">{t.pillar2Desc}</p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="tel:9304201774"
                className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-builderOrange hover:bg-orange-600 transition-colors shadow-sm flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>{t.aboutCallBtn}</span>
              </a>
              <a
                href="https://wa.me/919304201774"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-warmWhite bg-midnight border border-steelGrey/25 hover:border-builderOrange transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>{t.aboutWaBtn}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
