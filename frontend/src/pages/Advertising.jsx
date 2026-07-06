import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, useContent } from '../context/LanguageContext';
import CounterNumber from '../components/CounterNumber';
import { getServices, getImages } from '../utils/storage';
import T from '../utils/translations';

export default function Advertising() {
  const { lang } = useLanguage();
  const t = (T[lang] || T.en).advertising;
  const content = useContent();
  const images = getImages();
  const [activeCard, setActiveCard] = useState(0);

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
    const isFr = lang === 'fr';
    return {
      slug:  s.slug,
      icon:  s.icon  || tr.icon  || '',
      title: tr.title || (isFr ? s.title_fr || s.title : s.title) || '',
      desc:  tr.desc  || (isFr ? s.desc_fr  || s.desc  : s.desc)  || '',
      stat:  s.stat  || tr.stat  || '',
    };
  });

  return (
    <div className="bg-surface">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={images.advertisingHero} alt="Advertising" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
          <span className="font-label-caps text-label-caps text-secondary-container block mb-4">{badge}</span>
          <h1 className="font-display-lg text-display-lg text-white mb-6 max-w-2xl">{headline}</h1>
          <p className="text-outline-variant text-lg max-w-2xl">{subtext}</p>
        </div>
      </section>


      {/* AD Experiences That Drive Performance */}
      <section className="py-20 bg-white">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative min-h-[400px] rounded-lg overflow-hidden">
              <img src={images.advertisingMid} alt="AD Experiences" className="w-full h-full object-cover absolute inset-0" />
            </div>
            <div>
              <span className="font-label-caps text-label-caps text-secondary tracking-widest block mb-4">{t.perfBadge}</span>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">{t.perfHeadline}</h2>
              <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">{t.perfText1}</p>
              <h3 className="font-headline-lg text-[20px] text-primary mb-4">{t.perfSubhead}</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed">{t.perfText2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-surface">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-12">{allChannels}</h2>
          <div className="relative">
            <button
              onClick={() => setActiveCard(i => Math.max(0, i - 1))}
              disabled={activeCard === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-11 h-11 rounded-full bg-white border border-outline-variant/30 premium-card-shadow flex items-center justify-center text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-secondary hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-xl">chevron_left</span>
            </button>

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out gap-gutter"
                style={{ transform: `translateX(calc(-${activeCard} * (100% / 3 + 8px)))` }}
              >
                {services.map((s) => (
                  <div key={s.slug} className="bg-white p-10 premium-card-shadow flex flex-col border border-outline-variant/20 group/card hover:bg-secondary transition-colors duration-300 flex-shrink-0" style={{ width: 'calc(33.333% - 11px)' }}>
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

            <button
              onClick={() => setActiveCard(i => Math.min(services.length - 3, i + 1))}
              disabled={activeCard >= services.length - 3}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-11 h-11 rounded-full bg-white border border-outline-variant/30 premium-card-shadow flex items-center justify-center text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-secondary hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-xl">chevron_right</span>
            </button>

            {services.length > 3 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: services.length - 2 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCard(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${activeCard === i ? 'bg-secondary' : 'bg-outline-variant/40'}`}
                  />
                ))}
              </div>
            )}
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
          <Link to="/free-quote" className="bg-secondary text-white px-10 py-4 font-label-caps text-label-caps hover:bg-secondary-container transition-colors whitespace-nowrap">
            {ctaButton}
          </Link>
        </div>
      </section>
    </div>
  );
}
