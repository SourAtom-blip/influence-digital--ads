import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, useContent } from '../context/LanguageContext';
import { getCapabilities } from '../utils/storage';
import T from '../utils/translations';

export default function OurActivities() {
  const { lang } = useLanguage();
  const t = (T[lang] || T.en).ourActivities;
  const content = useContent();

  // Page-level headings — admin-editable, fall back to translations
  const badge        = content.oaBadge        || t.badge;
  const headline     = content.oaHeadline     || t.headline;
  const subtext      = content.oaSubtext      || t.subtext;
  const processTitle = content.oaProcessTitle || t.processTitle;
  const capBadge     = content.oaCapBadge     || t.capBadge;
  const capHeadline  = content.oaCapHeadline  || t.capHeadline;
  const capSubtext   = content.oaCapSubtext   || t.capSubtext;
  const whyBadge     = content.oaWhyBadge     || t.whyBadge;
  const whyHeadline  = content.oaWhyHeadline  || t.whyHeadline;
  const whySubtext   = content.oaWhySubtext   || t.whySubtext;
  const ctaHeadline  = content.oaCtaHeadline  || t.ctaHeadline;
  const ctaSubtext   = content.oaCtaSubtext   || t.ctaSubtext;
  const ctaButton    = content.oaCtaButton    || t.ctaButton;

  // Process steps — admin-editable titles/descs; icons stay from translations
  const steps = t.steps.map((s, i) => ({
    ...s,
    title: content[`oaStep${i + 1}Title`] || s.title,
    desc:  content[`oaStep${i + 1}Desc`]  || s.desc,
  }));

  // Why items — admin-editable; numbers stay hardcoded
  const whyItems = t.whyItems.map(([num, defTitle, defDesc], i) => [
    num,
    content[`oaWhy${i + 1}Title`] || defTitle,
    content[`oaWhy${i + 1}Desc`]  || defDesc,
  ]);

  // Capabilities — driven by storage (admin-editable), fall back to translations
  const capabilities = getCapabilities();

  return (
    <div className="bg-surface">
      {/* Hero */}
      <section className="bg-primary pt-32 pb-20">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <span className="font-label-caps text-label-caps text-secondary-container block mb-4">{badge}</span>
          <h1 className="font-display-lg text-display-lg text-white mb-6 max-w-2xl">{headline}</h1>
          <p className="text-outline-variant text-lg max-w-2xl">{subtext}</p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-container-max mx-auto px-margin-desktop">
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

      {/* Capabilities */}
      <section className="py-20 bg-surface">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="mb-16">
            <span className="font-label-caps text-label-caps text-secondary block mb-4">{capBadge}</span>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">{capHeadline}</h2>
            <p className="text-on-surface-variant max-w-xl">{capSubtext}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {capabilities.map((c) => (
              <div key={c.id || c.title} className="bg-white p-8 border border-outline-variant/20 premium-card-shadow group/card hover:bg-secondary transition-colors duration-300">
                <span className="material-symbols-outlined text-secondary text-3xl mb-4 block group-hover/card:text-white transition-colors">{c.icon}</span>
                <h4 className="font-headline-lg text-[17px] text-primary mb-3 group-hover/card:text-white transition-colors">{c.title}</h4>
                <p className="text-on-surface-variant font-body-sm group-hover/card:text-white/80 transition-colors">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us — The Influence Advantage */}
      <section className="py-20 bg-primary">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <span className="font-label-caps text-label-caps text-secondary-container mb-4 block">{whyBadge}</span>
              <h2 className="font-headline-lg text-headline-lg text-white">{whyHeadline}</h2>
            </div>
            <p className="text-outline-variant max-w-sm text-sm">{whySubtext}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {whyItems.map(([num, title, desc]) => (
              <div key={num} className="p-8 border border-white/10 hover:bg-secondary transition-colors duration-300 cursor-default">
                <div className="font-label-caps text-label-caps text-secondary-container mb-2">{num}</div>
                <h4 className="font-headline-lg text-[18px] mb-3 text-white">{title}</h4>
                <p className="text-outline-variant text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-desktop text-center">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4">{ctaHeadline}</h2>
          <p className="text-on-surface-variant mb-8">{ctaSubtext}</p>
          <Link to="/contact" className="bg-primary text-white px-10 py-4 font-label-caps text-label-caps hover:bg-secondary transition-colors inline-block">
            {ctaButton}
          </Link>
        </div>
      </section>
    </div>
  );
}
