import React from 'react';
import QuoteForm from '../components/QuoteForm';
import { useLanguage, useContent } from '../context/LanguageContext';
import T from '../utils/translations';

export default function Contact() {
  const { lang } = useLanguage();
  const t = (T[lang] || T.en).contact;
  const content = useContent();

  const badge             = content.contactBadge         || t.badge;
  const headline          = content.contactHeadline      || t.headline;
  const subtext           = content.contactSubtext       || t.subtext;
  const getInTouch        = content.contactGetInTouch    || t.getInTouch;
  const requestQuote      = content.contactRequestQuote  || t.requestQuote;
  const responseLabel     = content.contactResponseLabel || t.responseLabel;
  const responseTime      = content.contactResponseTime  || t.responseTime;
  const responseNote      = content.contactResponseNote  || t.responseNote;

  const info = [
    { icon: t.info[0].icon, label: content.contactInfo1Label || t.info[0].label, value: content.contactInfo1Value || t.info[0].value },
    { icon: t.info[1].icon, label: content.contactInfo2Label || t.info[1].label, value: content.contactInfo2Value || t.info[1].value },
    { icon: t.info[2].icon, label: content.contactInfo3Label || t.info[2].label, value: content.contactInfo3Value || t.info[2].value },
    { icon: t.info[3].icon, label: content.contactInfo4Label || t.info[3].label, value: content.contactInfo4Value || t.info[3].value },
  ];

  return (
    <div className="bg-surface">
      {/* Hero */}
      <section className="bg-primary pt-32 pb-20">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <span className="font-label-caps text-label-caps text-secondary-container block mb-4">{badge}</span>
          <h1 className="font-display-lg text-display-lg text-white mb-6 max-w-2xl">{headline}</h1>
          <p className="text-outline-variant text-lg max-w-xl">{subtext}</p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-20 bg-white">
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Info Panel */}
          <div>
            <h2 className="font-headline-lg text-[22px] text-primary mb-8">{getInTouch}</h2>
            <div className="space-y-8">
              {info.map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-surface-container flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-secondary text-xl">{c.icon}</span>
                  </div>
                  <div>
                    <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">{c.label}</div>
                    <div className="text-primary text-sm font-medium">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-primary">
              <div className="font-label-caps text-label-caps text-secondary-container mb-3">{responseLabel}</div>
              <div className="font-display-lg text-[36px] font-bold text-white mb-1">{responseTime}</div>
              <p className="text-outline-variant text-sm">{responseNote}</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <h2 className="font-headline-lg text-[22px] text-primary mb-8">{requestQuote}</h2>
            <QuoteForm compact />
          </div>
        </div>
      </section>
    </div>
  );
}
