import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, useContent } from '../context/LanguageContext';
import CounterNumber from '../components/CounterNumber';
import { getServices } from '../utils/storage';
import T from '../utils/translations';

export default function Advertising() {
  const { lang } = useLanguage();
  const t = (T[lang] || T.en).advertising;
  const content = useContent();

  // Allow admin to override the key page-level text; fall back to translations
  const badge       = content.advBadge       || t.badge;
  const headline    = content.advHeadline    || t.headline;
  const subtext     = content.advSubtext     || t.subtext;
  const allChannels = content.advAllChannels || t.allChannels;
  const ctaHeadline = content.advCtaHeadline || t.ctaHeadline;
  const ctaSubtext  = content.advCtaSubtext  || t.ctaSubtext;
  const ctaButton   = content.advCtaButton   || t.ctaButton;

  // Stats — use admin-overridden values when set, else fall back to translations
  const stats = [
    [content.advStat1Val || t.stats[0][0], content.advStat1Label || t.stats[0][1]],
    [content.advStat2Val || t.stats[1][0], content.advStat2Label || t.stats[1][1]],
    [content.advStat3Val || t.stats[2][0], content.advStat3Label || t.stats[2][1]],
    [content.advStat4Val || t.stats[3][0], content.advStat4Label || t.stats[3][1]],
  ];

  // Service cards — driven by storage (admin-editable); fall back to translations per slug
  const services = getServices().map(s => {
    const tr = t.services.find(ts => ts.slug === s.slug) || {};
    return {
      slug:  s.slug,
      icon:  s.icon  || tr.icon  || '',
      title: s.title || tr.title || '',
      desc:  s.desc  || tr.desc  || '',
      stat:  s.stat  || tr.stat  || '',
    };
  });

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

      {/* Stats bar */}
      <section className="bg-secondary py-10">
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map(([val, lbl]) => (
            <div key={lbl}>
              <CounterNumber value={val} className="font-display-lg text-[36px] font-bold text-white" />
              <div className="font-label-caps text-label-caps text-white/70">{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-surface">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-12">{allChannels}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {services.map((s) => (
              <div key={s.slug} className="bg-white p-10 premium-card-shadow flex flex-col border border-outline-variant/20 group/card hover:bg-secondary transition-colors duration-300">
                <span className="material-symbols-outlined text-secondary text-4xl mb-6 group-hover/card:text-white transition-colors">{s.icon}</span>
                <span className="font-label-caps text-label-caps text-secondary mb-2 group-hover/card:text-white/80 transition-colors">{s.stat}</span>
                <h3 className="font-headline-lg text-[20px] mb-4 text-primary group-hover/card:text-white transition-colors">{s.title}</h3>
                <p className="text-on-surface-variant font-body-sm mb-8 flex-grow group-hover/card:text-white/80 transition-colors">{s.desc}</p>
                <Link to={`/services/${s.slug}`} className="bg-primary text-on-primary px-4 py-2 font-label-caps text-label-caps rounded flex items-center justify-center gap-2 group/link group-hover/card:bg-white group-hover/card:text-secondary transition-all w-fit">
                  {t.explore} <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-container-max mx-auto px-margin-desktop flex flex-col lg:flex-row items-center justify-between gap-10">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-white mb-3">{ctaHeadline}</h2>
            <p className="text-outline-variant">{ctaSubtext}</p>
          </div>
          <Link to="/contact" className="bg-secondary text-white px-10 py-4 font-label-caps text-label-caps hover:bg-secondary-container transition-colors whitespace-nowrap">
            {ctaButton}
          </Link>
        </div>
      </section>
    </div>
  );
}
