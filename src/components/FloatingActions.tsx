import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Quick Phone Call Button */}
      <a
        href="tel:9304201774"
        className="w-12 h-12 rounded-full bg-charcoal border border-steelGrey/30 text-warmWhite flex items-center justify-center shadow-lg hover:border-builderOrange hover:text-builderOrange transition-all active:scale-95 group"
        aria-label="Call Maa Vindhyavasini Traders"
      >
        <Phone className="w-5 h-5 text-builderOrange" />
      </a>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919304201774?text=Namaste%20Maa%20Vindhyavasini%20Traders,%20mujhe%20materials%20ke%20bare%20mein%20enquiry%20karni%20hai."
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl transition-all hover:scale-105 active:scale-95 group"
        aria-label="Chat on WhatsApp with Maa Vindhyavasini Traders"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-builderOrange rounded-full border-2 border-midnight animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-builderOrange rounded-full border-2 border-midnight" />
        <MessageSquare className="w-6 h-6 shrink-0" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline">WhatsApp Enquiry</span>
      </a>
    </div>
  );
};
