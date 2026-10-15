import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { FileText, Grid, PhoneCall, MapPin } from 'lucide-react';

interface WhyChooseUsProps {
  language: Language;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ language }) => {
  const t = translations[language];

  return (
    <section className="py-24 bg-midnight relative border-t border-steelGrey/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-warmWhite tracking-tight">
            <span>{t.whyHeading}</span>
          </h2>
          <p className="text-sm sm:text-base text-steelGrey">
            {t.whySubheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Feature 1 */}
          <div className="glass-card rounded-2xl p-6 border border-steelGrey/15 hover:border-builderOrange/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-midnight border border-steelGrey/25 flex items-center justify-center text-builderOrange mb-5 group-hover:scale-110 group-hover:border-builderOrange transition-all shadow">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-warmWhite mb-2">{t.why1Title}</h3>
            <p className="text-xs text-steelGrey leading-relaxed">{t.why1Desc}</p>
          </div>

          {/* Feature 2 */}
          <div className="glass-card rounded-2xl p-6 border border-steelGrey/15 hover:border-builderOrange/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-midnight border border-steelGrey/25 flex items-center justify-center text-goldAccent mb-5 group-hover:scale-110 group-hover:border-goldAccent transition-all shadow">
              <Grid className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-warmWhite mb-2">{t.why2Title}</h3>
            <p className="text-xs text-steelGrey leading-relaxed">{t.why2Desc}</p>
          </div>

          {/* Feature 3 */}
          <div className="glass-card rounded-2xl p-6 border border-steelGrey/15 hover:border-builderOrange/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-midnight border border-steelGrey/25 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 group-hover:border-emerald-400 transition-all shadow">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-warmWhite mb-2">{t.why3Title}</h3>
            <p className="text-xs text-steelGrey leading-relaxed">{t.why3Desc}</p>
          </div>

          {/* Feature 4 */}
          <div className="glass-card rounded-2xl p-6 border border-steelGrey/15 hover:border-builderOrange/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-midnight border border-steelGrey/25 flex items-center justify-center text-builderOrange mb-5 group-hover:scale-110 group-hover:border-builderOrange transition-all shadow">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-warmWhite mb-2">{t.why4Title}</h3>
            <p className="text-xs text-steelGrey leading-relaxed">{t.why4Desc}</p>
          </div>

        </div>

      </div>
    </section>
  );
};
