import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal border-t border-steelGrey/15 text-steelGrey pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-steelGrey/10">
          
          {/* Brand & Description */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-midnight border border-steelGrey/20 p-2 flex items-center justify-center">
                <svg className="w-full h-full text-builderOrange" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4L6 14V38L24 44L42 38V14L24 4Z" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M24 4V44" stroke="#D5AA66" strokeWidth="2" />
                  <path d="M6 14L24 24L42 14" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <div className="text-base font-extrabold text-warmWhite">MAA VINDHYAVASINI TRADERS</div>
                <div className="text-xs text-builderOrange font-semibold uppercase tracking-wider">Gangpur Siswan, Bihar</div>
              </div>
            </div>

            <p className="text-xs text-steelGrey leading-relaxed max-w-sm">
              {t.footerAbout}
            </p>

            <div className="pt-2 text-xs">
              <span className="text-warmWhite font-semibold">{t.ownerTitle}</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-warmWhite">{t.footerNavTitle}</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-builderOrange transition-colors">{t.navHome}</a></li>
              <li><a href="#products" className="hover:text-builderOrange transition-colors">{t.navProducts}</a></li>
              <li><a href="#materials-3d" className="hover:text-builderOrange transition-colors">{t.nav3D}</a></li>
              <li><a href="#about" className="hover:text-builderOrange transition-colors">{t.navAbout}</a></li>
              <li><a href="#services" className="hover:text-builderOrange transition-colors">{t.navServices}</a></li>
              <li><a href="#gallery" className="hover:text-builderOrange transition-colors">{t.navGallery}</a></li>
              <li><a href="#contact" className="hover:text-builderOrange transition-colors">{t.navContact}</a></li>
            </ul>
          </div>

          {/* Key Materials */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-warmWhite">{t.footerProdTitle}</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#products" className="hover:text-builderOrange transition-colors">Balu (River Sand)</a></li>
              <li><a href="#products" className="hover:text-builderOrange transition-colors">Gitti (Stone Chips)</a></li>
              <li><a href="#products" className="hover:text-builderOrange transition-colors">Rod (TMT Steel Bars)</a></li>
              <li><a href="#products" className="hover:text-builderOrange transition-colors">Cement</a></li>
              <li><a href="#products" className="hover:text-builderOrange transition-colors">Bricks & Masonry</a></li>
              <li><a href="#products" className="hover:text-builderOrange transition-colors">Building Hardware</a></li>
            </ul>
          </div>

          {/* Official Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-warmWhite">{t.footerContactTitle}</h4>
            <div className="space-y-2.5 text-xs">
              <div>
                <div className="text-[11px] text-steelGrey/70">Phone & WhatsApp:</div>
                <a href="tel:9304201774" className="text-warmWhite font-bold hover:text-builderOrange transition-colors block">
                  +91 9304201774
                </a>
              </div>
              <div>
                <div className="text-[11px] text-steelGrey/70">Location:</div>
                <div className="text-warmWhite font-medium">Gangpur Siswan, Bihar, India</div>
              </div>
              <div>
                <div className="text-[11px] text-steelGrey/70">Proprietor:</div>
                <div className="text-warmWhite font-medium">Ajit Kumar Singh</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-steelGrey gap-3">
          <p>
            © {currentYear} Maa Vindhyavasini Traders. All rights reserved.
          </p>
          <p className="text-steelGrey/60 text-[11px]">
            Gangpur Siswan, Bihar • Authentic Building Materials & Hardware
          </p>
        </div>

      </div>
    </footer>
  );
};
