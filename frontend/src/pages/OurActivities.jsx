import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, useContent } from '../context/LanguageContext';
import { getCapabilities, getImages } from '../utils/storage';
import T from '../utils/translations';

export default function OurActivities() {
  const { lang } = useLanguage();
  const t = (T[lang] || T.en).ourActivities;
  const content = useContent();
  const images = getImages();

  // Page-level headings — admin-editable, fall back to translations
  const badge        = content.oaBadge        || t.badge;
  const headline     = content.oaHeadline     || t.headline;
  const subtext      = content.oaSubtext      || t.subtext;
  const processTitle = content.oaProcessTitle || t.processTitle;
  const capBadge     = content.oaCapBadge     || t.capBadge;
  const capHeadline  = content.oaCapHeadline  || t.capHeadline;
  const capSubtext   = content.oaCapSubtext   || t.capSubtext;
  const ctaHeadline  = content.oaCtaHeadline  || t.ctaHeadline;
  const ctaSubtext   = content.oaCtaSubtext   || t.ctaSubtext;
  const ctaButton    = content.oaCtaButton    || t.ctaButton;

  // Process steps — admin-editable titles/descs; icons stay from translations
  const steps = t.steps.map((s, i) => ({
    ...s,
    title: content[`oaStep${i + 1}Title`] || s.title,
    desc:  content[`oaStep${i + 1}Desc`]  || s.desc,
  }));


  // Capabilities — driven by storage (admin-editable), use FR fields when in French
  const isFr = lang === 'fr';
  const capabilities = getCapabilities().map(c => ({
    ...c,
    title: isFr ? c.title_fr || c.title : c.title,
    desc:  isFr ? c.desc_fr  || c.desc  : c.desc,
  }));

  return (
    <div className="bg-surface">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={images.activitiesHero} alt="Our Activities" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-margin-desktop relative z-10">
          <span className="font-label-caps text-label-caps text-secondary-container block mb-4">{badge}</span>
          <h1 className="font-display-lg text-3xl sm:text-4xl lg:text-display-lg text-white mb-6 max-w-2xl">{headline}</h1>
          <p className="text-outline-variant text-base sm:text-lg max-w-2xl">{subtext}</p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-margin-desktop">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-16 text-center">{processTitle}</h2>
          <div className="relative">
            <div className="absolute top-8 left-0 w-full h-px bg-outline-variant/20 hidden lg:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
              {steps.map((p) => (
                <div key={p.step} className="bg-white relative z-10">
                  <div className="w-16 h-16 bg-primary flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-white text-2xl">{p.icon}</span>
                  </div>
                  <div className="font-label-caps text-label-caps text-secondary mb-2">{p.step}</div>
                  <h4 className="font-headline-lg text-[20px] text-primary mb-4">{p.title}</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Activities Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-margin-desktop">
          <div className="text-center mb-16">
            <span className="font-label-caps text-label-caps text-secondary block mb-4">{(T[lang] || T.en).advertising.whereOpBadge}</span>
            <h2 className="font-headline-lg text-headline-lg text-primary">{(T[lang] || T.en).advertising.whereOpHeadline}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {(T[lang] || T.en).advertising.services.map((area, i) => ({
              ...area,
              img: [images.activitiesZone2, images.activitiesZone3, images.activitiesZone4, images.activitiesZone5][i],
            })).map((area) => (
              <div key={area.title} className="bg-surface border border-outline-variant/20 premium-card-shadow group/card hover:bg-secondary transition-colors duration-300 overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img src={area.img} alt={area.title} className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6 text-center">
                  <span className="material-symbols-outlined text-secondary text-3xl mb-3 block group-hover/card:text-white transition-colors">{area.icon}</span>
                  <h4 className="font-headline-lg text-[18px] text-primary mb-3 group-hover/card:text-white transition-colors">{area.title}</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed group-hover/card:text-white/80 transition-colors">{area.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-20 bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-margin-desktop text-center">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4">{ctaHeadline}</h2>
          <p className="text-on-surface-variant mb-8">{ctaSubtext}</p>
          <Link to="/contact" className="bg-primary text-white px-8 py-4 sm:px-10 font-label-caps text-label-caps hover:bg-secondary transition-colors inline-block w-full sm:w-auto">
            {ctaButton}
          </Link>
        </div>
      </section>
    </div>
  );
}
