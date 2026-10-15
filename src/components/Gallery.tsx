import React, { useState } from 'react';
import { Language, GalleryItem } from '../types';
import { galleryData } from '../data/services';
import { translations } from '../data/translations';
import { X } from 'lucide-react';

interface GalleryProps {
  language: Language;
}

export const Gallery: React.FC<GalleryProps> = ({ language }) => {
  const t = translations[language];
  const [filter, setFilter] = useState<'all' | 'steel' | 'aggregates' | 'cement'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = galleryData.filter(item => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <section id="gallery" className="py-24 bg-midnight relative border-t border-steelGrey/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal border border-steelGrey/20 text-builderOrange text-xs font-bold uppercase tracking-widest">
            <span>{t.galleryBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-warmWhite tracking-tight">
            <span>{t.galleryHeading}</span>
          </h2>
          <p className="text-sm sm:text-base text-steelGrey leading-relaxed">
            {t.gallerySubheading}
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filter === 'all' ? 'bg-builderOrange text-white' : 'bg-midnight text-steelGrey border border-steelGrey/20 hover:text-warmWhite'}`}
            >
              {t.galleryFilterAll}
            </button>
            <button
              onClick={() => setFilter('steel')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filter === 'steel' ? 'bg-builderOrange text-white' : 'bg-midnight text-steelGrey border border-steelGrey/20 hover:text-warmWhite'}`}
            >
              {t.galleryFilterSteel}
            </button>
            <button
              onClick={() => setFilter('aggregates')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filter === 'aggregates' ? 'bg-builderOrange text-white' : 'bg-midnight text-steelGrey border border-steelGrey/20 hover:text-warmWhite'}`}
            >
              {t.galleryFilterAggregates}
            </button>
            <button
              onClick={() => setFilter('cement')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filter === 'cement' ? 'bg-builderOrange text-white' : 'bg-midnight text-steelGrey border border-steelGrey/20 hover:text-warmWhite'}`}
            >
              {t.galleryFilterCement}
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer border border-steelGrey/15"
            >
              <img
                src={item.image}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = item.fallbackImage;
                }}
                alt={language === 'hi' ? item.titleHi : item.titleEn}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[11px] font-bold text-builderOrange uppercase tracking-wider">
                  {item.category.toUpperCase()}
                </span>
                <h4 className="text-sm font-bold text-warmWhite">
                  {language === 'hi' ? item.titleHi : item.titleEn}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-midnight rounded-2xl overflow-hidden border border-steelGrey/30 shadow-2xl">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-charcoal/80 text-steelGrey hover:text-white border border-steelGrey/20"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="h-[380px] sm:h-[460px] bg-black">
              <img
                src={selectedItem.image}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = selectedItem.fallbackImage;
                }}
                alt={language === 'hi' ? selectedItem.titleHi : selectedItem.titleEn}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-5 bg-charcoal flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-warmWhite">
                  {language === 'hi' ? selectedItem.titleHi : selectedItem.titleEn}
                </h3>
                <p className="text-xs text-steelGrey">
                  {language === 'hi' ? selectedItem.descHi : selectedItem.descEn}
                </p>
              </div>
              <a
                href={`https://wa.me/919304201774?text=${encodeURIComponent(`Namaste Maa Vindhyavasini Traders, mujhe ${selectedItem.query} ke baare mein jaankari chahiye.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-builderOrange hover:bg-orange-600 transition-colors"
              >
                Enquire About This Material
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
