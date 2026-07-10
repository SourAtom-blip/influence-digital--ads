import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import QuoteForm from '../components/QuoteForm';
import { useLanguage } from '../context/LanguageContext';
import { getServices, getImages } from '../utils/storage';
import T from '../utils/translations';

export default function ServicePage() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const t = (T[lang] || T.en).servicePage;
  const isFr = lang === 'fr';

  const [allServices, setAllServices] = useState(() => getServices());
  useEffect(() => { setAllServices(getServices()); }, [slug]);
  const images = getImages();
  const SLUG_IMAGES = {
    'shopping-centers': images.serviceShoppingCenters,
    'malls':            images.serviceMalls,
    'airports':         images.serviceAirports,
    'urban-zones':      images.serviceUrbanZones,
  };

  // Try translations.js first (built-in services), then fall back to admin-added services
  const staticService = t.services[slug];
  const adminService  = allServices.find(s => s.slug === slug);
  const service = staticService || (adminService ? {
    icon:       adminService.icon,
    title:      isFr ? adminService.title_fr    || adminService.title    : adminService.title,
    tagline:    isFr ? adminService.tagline_fr  || adminService.tagline  : adminService.tagline,
    paragraphs: [(isFr ? adminService.desc_fr || adminService.desc : adminService.desc) || ''],
  } : null);

  const heroImg = SLUG_IMAGES[slug] || adminService?.image || null;

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
      <section className="relative pt-32 pb-20 min-h-[55vh] flex items-center overflow-hidden">
        {heroImg && (
          <div className="absolute inset-0 z-0">
            <img src={heroImg} alt={service.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/85" />
          </div>
        )}
        {!heroImg && <div className="absolute inset-0 bg-primary" />}
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-margin-desktop relative z-10 w-full">
          <Link to="/advertising" className="inline-flex items-center gap-2 text-white/60 hover:text-white font-label-caps text-label-caps mb-10 transition-colors">
            <span className="material-symbols-outlined text-sm">arrow_back</span> {t.allServices}
          </Link>
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 bg-secondary flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-white text-2xl">{service.icon}</span>
            </div>
            <div>
              <span className="font-label-caps text-label-caps text-secondary-container block mb-3">{t.ourSolutions}</span>
              <h1 className="font-display-lg text-3xl sm:text-4xl lg:text-display-lg text-white mb-4">{service.title}</h1>
              <p className="text-white/70 text-lg max-w-2xl">{service.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Description + Image */}
      <section className="py-20 bg-white">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div className="relative overflow-hidden rounded-lg min-h-[380px]">
              <img src={heroImg || '/images/activities_03.jpg'} alt={service.title} className="w-full h-full object-cover absolute inset-0" />
            </div>
            <div>
              <span className="font-label-caps text-label-caps text-secondary tracking-widest block mb-4">{t.overview}</span>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">{service.title}</h2>
              {service.paragraphs.map((p, i) => (
                <p key={i} className="font-body-md text-on-surface-variant mb-5 leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-secondary">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-headline-lg text-headline-lg text-white mb-2">{t.ctaLaunch(service.title)}</h3>
            <p className="text-white/70 font-body-sm">{t.ctaSubtext}</p>
          </div>
          <Link to="/free-quote" className="bg-white text-secondary px-8 py-4 font-label-caps text-label-caps hover:bg-surface-container-low transition-colors whitespace-nowrap">
            {t.ctaButton}
          </Link>
        </div>
      </section>

      {/* Quote Form */}
      <QuoteForm preselected={service.title} showConsent />

    </div>
  );
}
