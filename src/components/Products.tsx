import React from 'react';
import { Language } from '../types';
import { productsData } from '../data/products';
import { translations } from '../data/translations';
import { Phone } from 'lucide-react';

interface ProductsProps {
  language: Language;
}

export const Products: React.FC<ProductsProps> = ({ language }) => {
  const t = translations[language];

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <section id="products" className="py-24 bg-charcoal/50 relative border-t border-steelGrey/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-midnight border border-builderOrange/30 text-builderOrange text-xs font-bold uppercase tracking-widest">
            <span>{t.productBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-warmWhite tracking-tight">
            <span>{t.productHeading}</span>
          </h2>
          <p className="text-sm sm:text-base text-steelGrey leading-relaxed">
            {t.productSubheading}
          </p>
        </div>

        {/* 6 Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {productsData.map((prod) => (
            <div
              key={prod.id}
              className="glass-card rounded-2xl overflow-hidden tilt-card group flex flex-col justify-between"
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
            >
              <div>
                <div className="relative h-60 overflow-hidden bg-midnight">
                  <img
                    src={prod.image}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = prod.fallbackImage;
                    }}
                    alt={language === 'hi' ? prod.nameHi : prod.nameEn}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                  <span className="absolute top-4 right-4 bg-midnight/80 backdrop-blur-md border border-steelGrey/20 text-warmWhite text-[11px] font-bold px-2.5 py-1 rounded-md">
                    {language === 'hi' ? prod.badgeHi : prod.badge}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-warmWhite mb-1 flex items-center justify-between">
                    <span>{language === 'hi' ? prod.nameHi : prod.nameEn}</span>
                    <span className="text-sm text-goldAccent font-hindi font-medium">
                      {language === 'hi' ? prod.categoryHi : prod.categoryEn}
                    </span>
                  </h3>
                  <p className="text-xs text-builderOrange font-semibold mb-3">
                    {language === 'hi' ? prod.subHi : prod.subEn}
                  </p>
                  <p className="text-xs text-steelGrey leading-relaxed mb-6">
                    {language === 'hi' ? prod.descHi : prod.descEn}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-steelGrey/10 flex items-center gap-3">
                <a
                  href={`https://wa.me/919304201774?text=${encodeURIComponent(prod.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-lg text-xs font-bold text-center text-white bg-builderOrange hover:bg-orange-600 transition-colors shadow-sm"
                >
                  {t.btnEnquireNow}
                </a>
                <a
                  href="tel:9304201774"
                  className="py-2.5 px-3 rounded-lg text-xs font-bold text-steelGrey hover:text-warmWhite bg-midnight border border-steelGrey/20 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-builderOrange" />
                  <span>Call</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
