import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { MapPin, Phone, MessageSquare } from 'lucide-react';

interface ContactFormProps {
  language: Language;
}

export const ContactForm: React.FC<ContactFormProps> = ({ language }) => {
  const t = translations[language];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [product, setProduct] = useState('Balu (River Sand)');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [preferredReplyLang, setPreferredReplyLang] = useState<'Hindi' | 'English'>('Hindi');

  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [statusNotice, setStatusNotice] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    if (!name.trim()) {
      setNameError(true);
      valid = false;
    } else {
      setNameError(false);
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setPhoneError(true);
      valid = false;
    } else {
      setPhoneError(false);
    }

    if (!valid) {
      setStatusNotice({
        type: 'error',
        text: t.statusNoticeError
      });
      return;
    }

    const qtyStr = quantity.trim() ? quantity.trim() : 'Requirement as per estimation';
    const noteStr = message.trim() ? message.trim() : 'Looking for current price and availability in Gangpur Siswan area.';

    const formattedMessage = 
`*Maa Vindhyavasini Traders - Material Enquiry*
----------------------------------------
*Name:* ${name.trim()}
*Phone:* ${phone.trim()}
*Material Required:* ${product}
*Estimated Quantity:* ${qtyStr}
*Project Note:* ${noteStr}
*Preferred Language:* ${preferredReplyLang}
*Location Reference:* Gangpur Siswan, Bihar
----------------------------------------
Namaste Ajit ji, kripya rate aur availability batayein.`;

    setStatusNotice({
      type: 'success',
      text: t.statusNoticeLaunching
    });

    const waUrl = `https://wa.me/919304201774?text=${encodeURIComponent(formattedMessage)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-charcoal/40 to-midnight relative border-t border-steelGrey/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left: Official Business Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-midnight border border-builderOrange/30 text-builderOrange text-xs font-bold uppercase tracking-widest">
              <span>{t.contactBadge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-warmWhite tracking-tight">
              <span>{t.contactHeading}</span>
            </h2>

            <p className="text-sm sm:text-base text-steelGrey leading-relaxed">
              {t.contactSubheading}
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-midnight/80 border border-goldAccent/25 flex items-center gap-4 shadow-lg">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-goldAccent shrink-0 shadow">
                  <img 
                    src="C:/Users/rohii/.gemini/antigravity/brain/7d88a306-1e1a-46ab-8c91-b3225608ce18/.user_uploaded/media_1791638398711_e97e9df0.jpg" 
                    alt="Ajit Kumar Singh - Owner" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <div className="text-[11px] text-steelGrey font-semibold uppercase tracking-wider">{t.businessLabel}</div>
                  <div className="text-base font-extrabold text-warmWhite">Maa Vindhyavasini Traders</div>
                  <div className="text-xs text-goldAccent font-semibold flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>{t.ownerFullLabel}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-midnight/80 border border-steelGrey/15 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-charcoal border border-steelGrey/25 text-builderOrange flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-steelGrey font-semibold uppercase tracking-wider">{t.locationLabel}</div>
                  <div className="text-sm font-bold text-warmWhite">Gangpur Siswan, Bihar, India</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-midnight/80 border border-steelGrey/15 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-charcoal border border-steelGrey/25 text-emerald-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-steelGrey font-semibold uppercase tracking-wider">{t.phoneCallLabel}</div>
                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    <a href="tel:9304201774" className="text-sm font-bold text-warmWhite hover:text-builderOrange transition-colors">
                      +91 9304201774
                    </a>
                    <span className="text-steelGrey/30">•</span>
                    <a href="https://wa.me/919304201774" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-emerald-400 hover:underline">
                      WhatsApp Chat
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Functional Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-steelGrey/20 shadow-2xl relative">
              <h3 className="text-xl font-bold text-warmWhite mb-1">{t.formTitle}</h3>
              <p className="text-xs text-steelGrey mb-6">{t.formSubtitle}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-steelGrey uppercase tracking-wider mb-1.5">
                      {t.labelName} <span className="text-builderOrange">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className={`w-full px-4 py-3 rounded-xl bg-midnight border ${nameError ? 'border-red-500' : 'border-steelGrey/20'} text-warmWhite text-sm placeholder-steelGrey/40 focus:outline-none focus:border-builderOrange transition-colors`}
                    />
                    {nameError && <p className="text-[11px] text-red-400 mt-1">{t.errName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-steelGrey uppercase tracking-wider mb-1.5">
                      {t.labelPhone} <span className="text-builderOrange">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className={`w-full px-4 py-3 rounded-xl bg-midnight border ${phoneError ? 'border-red-500' : 'border-steelGrey/20'} text-warmWhite text-sm placeholder-steelGrey/40 focus:outline-none focus:border-builderOrange transition-colors`}
                    />
                    {phoneError && <p className="text-[11px] text-red-400 mt-1">{t.errPhone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-steelGrey uppercase tracking-wider mb-1.5">
                      {t.labelProduct} <span className="text-builderOrange">*</span>
                    </label>
                    <select
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-midnight border border-steelGrey/20 text-warmWhite text-sm focus:outline-none focus:border-builderOrange transition-colors"
                    >
                      <option value="Balu (River Sand)">Balu / Sand (बालू)</option>
                      <option value="Gitti (Stone Chips)">Gitti / Stone Chips (गिट्टी)</option>
                      <option value="Rod (TMT Steel Bars)">Rod / TMT Steel Bars (सरिया)</option>
                      <option value="Cement">Cement (सीमेंट)</option>
                      <option value="Bricks & Materials">Bricks / Eent (ईंटें)</option>
                      <option value="Hardware & Building Accessories">Hardware & Accessories (हार्डवेयर)</option>
                      <option value="Complete Construction Package">Multiple / Bulk Package (थोक सामग्री)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-steelGrey uppercase tracking-wider mb-1.5">
                      {t.labelQuantity}
                    </label>
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g. 100 bags / 5 tons / 500 sq ft"
                      className="w-full px-4 py-3 rounded-xl bg-midnight border border-steelGrey/20 text-warmWhite text-sm placeholder-steelGrey/40 focus:outline-none focus:border-builderOrange transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-steelGrey uppercase tracking-wider mb-1.5">
                    {t.labelMessage}
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mention site location in Gangpur Siswan / Bihar or questions regarding availability."
                    className="w-full px-4 py-3 rounded-xl bg-midnight border border-steelGrey/20 text-warmWhite text-sm placeholder-steelGrey/40 focus:outline-none focus:border-builderOrange transition-colors"
                  />
                </div>

                <div className="flex items-center gap-4 pt-1">
                  <span className="text-xs text-steelGrey font-medium">{t.labelPrefLang}</span>
                  <label className="inline-flex items-center gap-1.5 text-xs text-warmWhite cursor-pointer">
                    <input
                      type="radio"
                      name="replyLang"
                      checked={preferredReplyLang === 'Hindi'}
                      onChange={() => setPreferredReplyLang('Hindi')}
                      className="text-builderOrange focus:ring-0"
                    />
                    <span>हिंदी (Hindi)</span>
                  </label>
                  <label className="inline-flex items-center gap-1.5 text-xs text-warmWhite cursor-pointer">
                    <input
                      type="radio"
                      name="replyLang"
                      checked={preferredReplyLang === 'English'}
                      onChange={() => setPreferredReplyLang('English')}
                      className="text-builderOrange focus:ring-0"
                    />
                    <span>English</span>
                  </label>
                </div>

                {statusNotice && (
                  <div
                    className={`p-3 rounded-xl text-xs font-medium ${statusNotice.type === 'error' ? 'bg-red-950/80 border border-red-500/40 text-red-300' : 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300'}`}
                  >
                    {statusNotice.text}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-builderOrange hover:bg-orange-600 transition-all shadow-orange-glow active:scale-98 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5 text-white" />
                  <span>{t.btnSubmitWhatsApp}</span>
                </button>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
