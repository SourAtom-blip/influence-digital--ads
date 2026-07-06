import React from 'react';
import QuoteForm from '../components/QuoteForm';
import { useLanguage } from '../context/LanguageContext';
import { getImages } from '../utils/storage';
import T from '../utils/translations';

export default function FreeQuote() {
  const { lang } = useLanguage();
  const t = (T[lang] || T.en).freeQuote;
  const images = getImages();

  return (
    <div className="bg-surface">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={images.freeQuoteHero} alt="Free Quote" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
          <span className="font-label-caps text-label-caps text-secondary-container block mb-4">{t.heroBadge}</span>
          <h1 className="font-display-lg text-display-lg text-white mb-6 max-w-2xl">{t.heroHeadline}</h1>
          <p className="text-outline-variant text-lg max-w-2xl">{t.heroSubtext}</p>
        </div>
      </section>

      {/* Info + Form */}
      <section className="py-20 bg-white">
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Info Panel */}
          <div>
            <h2 className="font-headline-lg text-[22px] text-primary mb-6">{t.whyTitle}</h2>
            <div className="space-y-6 text-on-surface-variant text-sm leading-relaxed">
              <p>{t.whyText1}</p>
              <p>{t.whyText2}</p>
              <p>{t.whyText3}</p>
            </div>
            <div className="mt-10 p-8 bg-primary">
              <div className="font-label-caps text-label-caps text-secondary-container mb-3">{t.responseLabel}</div>
              <div className="font-display-lg text-[36px] font-bold text-white mb-1">{t.responseTime}</div>
              <p className="text-outline-variant text-sm">{t.responseNote}</p>
            </div>
            <div className="mt-6 text-xs text-on-surface-variant leading-relaxed">{t.disclaimer}</div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <QuoteForm compact showConsent />
          </div>
        </div>
      </section>
    </div>
  );
}
