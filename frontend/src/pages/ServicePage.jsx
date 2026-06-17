import React from 'react';
import { useParams, Link } from 'react-router-dom';
import QuoteForm from '../components/QuoteForm';
import { useLanguage } from '../context/LanguageContext';
import T from '../utils/translations';

function scrollToQuote() {
  const el = document.getElementById('quote');
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: 'smooth' });
}

export default function ServicePage() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const t = (T[lang] || T.en).servicePage;
  const service = t.services[slug];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface pt-20">
        <div className="text-center">
          <h1 className="font-headline-lg text-headline-lg text-primary mb-4">{t.notFound}</h1>
          <Link to="/" className="text-secondary hover:underline font-label-caps text-label-caps">{t.backHome}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface">
      {/* Hero */}
      <section className="bg-primary pt-32 pb-20">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <Link to="/advertising" className="inline-flex items-center gap-2 text-outline-variant hover:text-white font-label-caps text-label-caps mb-8 transition-colors">
            <span className="material-symbols-outlined text-sm">arrow_back</span> {t.allServices}
          </Link>
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-secondary flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-white text-3xl">{service.icon}</span>
            </div>
            <div>
              <span className="font-label-caps text-label-caps text-secondary-container block mb-3">{t.ourSolutions}</span>
              <h1 className="font-display-lg text-display-lg text-white mb-4">{service.title}</h1>
              <p className="text-outline-variant text-lg max-w-2xl">{service.tagline}</p>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg">
            {service.stats.map((s) => (
              <div key={s.label}>
                <div className="font-display-lg text-[36px] font-bold text-white">{s.value}</div>
                <div className="font-label-caps text-label-caps text-outline-variant">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-20 bg-white">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="max-w-3xl">
            <span className="font-label-caps text-label-caps text-secondary tracking-widest block mb-4">{t.overview}</span>
            <p className="text-on-surface text-lg leading-relaxed">{service.description}</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-surface">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-12">{t.whatsIncluded}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {service.highlights.map((h) => (
              <div key={h.label} className="bg-white p-8 border border-outline-variant/20 premium-card-shadow">
                <span className="material-symbols-outlined text-secondary text-3xl mb-4 block">{h.icon}</span>
                <h4 className="font-headline-lg text-[17px] text-primary mb-2">{h.label}</h4>
                <p className="text-on-surface-variant font-body-sm">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-secondary">
        <div className="max-w-container-max mx-auto px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-headline-lg text-headline-lg text-white mb-2">{t.ctaLaunch(service.title)}</h3>
            <p className="text-white/70 font-body-sm">{t.ctaSubtext}</p>
          </div>
          <button onClick={scrollToQuote} className="bg-white text-secondary px-8 py-4 font-label-caps text-label-caps hover:bg-surface-container-low transition-colors whitespace-nowrap">
            {t.ctaButton}
          </button>
        </div>
      </section>

      {/* Quote Form */}
      <div id="quote">
        <QuoteForm preselected={service.title} />
      </div>
    </div>
  );
}
