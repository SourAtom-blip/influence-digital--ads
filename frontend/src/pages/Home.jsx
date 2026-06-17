import React from 'react';
import { Link } from 'react-router-dom';
import QuoteForm from '../components/QuoteForm';
import CounterNumber from '../components/CounterNumber';
import { getImages, getServices, getTrustedBrands } from '../utils/storage';
import { useContent, useLanguage } from '../context/LanguageContext';
import T from '../utils/translations';

export default function Home() {
  const images  = getImages();
  const content = useContent();
  const { lang } = useLanguage();
  const t       = T[lang] || T.en;
  const brands  = getTrustedBrands();

  // Merge admin-managed structure with translated titles/descs by slug
  const services = getServices().map(s => {
    const tr = t.advertising.services.find(ts => ts.slug === s.slug);
    return tr ? { ...s, title: tr.title, desc: tr.desc } : s;
  });

  const heroImg  = images.hero.list[images.hero.active];
  const aboutImg = images.about.list[images.about.active];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: 'smooth' });
  };

  const handleScrollToContact  = (e) => { e.preventDefault(); scrollTo('contact'); };
  const handleScrollToSolutions = (e) => { e.preventDefault(); scrollTo('solutions'); };

  const whyItems = [
    { n:'01', title: content.why1Title, desc: content.why1Desc },
    { n:'02', title: content.why2Title, desc: content.why2Desc },
    { n:'03', title: content.why3Title, desc: content.why3Desc },
    { n:'04', title: content.why4Title, desc: content.why4Desc },
    { n:'05', title: content.why5Title, desc: content.why5Desc },
    { n:'06', title: content.why6Title, desc: content.why6Desc },
  ];

  const metrics = [
    { val: content.metric1Val, label: content.metric1Label },
    { val: content.metric2Val, label: content.metric2Label },
    { val: content.metric3Val, label: content.metric3Label },
    { val: content.metric4Val, label: content.metric4Label },
  ];

  const steps = [
    { n:'01', title: content.process1Title, desc: content.process1Desc },
    { n:'02', title: content.process2Title, desc: content.process2Desc },
    { n:'03', title: content.process3Title, desc: content.process3Desc },
    { n:'04', title: content.process4Title, desc: content.process4Desc },
  ];

  return (
    <div id="home">
      {/* Hero Section */}
      <header className="relative pt-32 pb-stack-lg overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full grayscale mix-blend-multiply opacity-90"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.6) 30%, rgba(0, 0, 0, 0) 70%), url("${heroImg}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }}
          />
        </div>
        <div className="max-w-container-max mx-auto px-margin-desktop relative z-20">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-secondary-container/10 text-secondary font-label-caps text-label-caps mb-6 rounded-full">{content.heroBadge}</span>
            <h1 className="font-display-lg text-display-lg text-white mb-6 drop-shadow-md">{content.heroHeadline}</h1>
            <p className="font-body-md text-white mb-10 text-lg leading-relaxed drop-shadow-sm opacity-90">{content.heroSubtext}</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={handleScrollToContact} className="bg-primary text-on-primary px-8 py-4 font-label-caps text-label-caps hover:bg-secondary transition-all">{content.heroCta1}</button>
              <button onClick={handleScrollToSolutions} className="border border-outline text-primary px-8 py-4 font-label-caps text-label-caps hover:bg-surface-container transition-all">{content.heroCta2}</button>
            </div>
            <div className="mt-16 grid grid-cols-3 gap-8 p-8 border border-white/10 backdrop-blur-md bg-black/20 rounded-lg">
              <div>
                <CounterNumber value={content.heroStat1Val} className="font-display-lg text-[32px] font-bold text-white" />
                <div className="font-label-caps text-label-caps text-white/80 font-bold">{content.heroStat1Label}</div>
              </div>
              <div>
                <CounterNumber value={content.heroStat2Val} className="font-display-lg text-[32px] font-bold text-white" />
                <div className="font-label-caps text-label-caps text-white/80 font-bold">{content.heroStat2Label}</div>
              </div>
              <div>
                <CounterNumber value={content.heroStat3Val} className="font-display-lg text-[32px] font-bold text-white" />
                <div className="font-label-caps text-label-caps text-white/80 font-bold">{content.heroStat3Label}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Trusted By — infinite scrolling marquee */}
      <section className="py-12 border-y border-outline-variant/20 bg-secondary overflow-hidden">
        <p className="text-center font-label-caps text-label-caps mb-8 text-white font-bold px-margin-desktop">{content.trustedLabel}</p>
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {[...brands, ...brands].map((brand, i) => (
              <a
                key={i}
                href={brand.siteUrl || '#'}
                target={brand.siteUrl && brand.siteUrl !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex-shrink-0 mx-10 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
              >
                {brand.logoUrl ? (
                  <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    className="h-8 max-w-[120px] object-contain brightness-0 invert"
                  />
                ) : (
                  <div className="h-8 w-32 rounded bg-white/80 flex items-center justify-center">
                    <span className="text-secondary text-xs font-label-caps font-bold px-2 truncate">{brand.name}</span>
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-stack-lg bg-white">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-square w-full bg-surface-container-low overflow-hidden border border-outline-variant/20 rounded-lg">
                <img className="w-full h-full object-cover grayscale opacity-90" src={aboutImg} alt="About" />
              </div>
              <div className="absolute -bottom-6 -right-6 p-10 bg-primary text-on-primary">
                <p className="font-display-lg text-[40px] font-bold text-white">{content.aboutYears}</p>
                <p className="font-label-caps text-label-caps text-white">{content.aboutYearsLabel}</p>
              </div>
            </div>
            <div>
              <span className="font-label-caps text-label-caps text-secondary tracking-widest block mb-4">{content.aboutLabel}</span>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">{content.aboutHeadline}</h2>
              <p className="font-body-md text-on-surface-variant mb-6">{content.aboutText1}</p>
              <p className="font-body-md text-on-surface-variant mb-8">{content.aboutText2}</p>
              <Link to="/about-us" className="bg-primary text-on-primary px-6 py-3 font-label-caps text-label-caps rounded hover:bg-secondary transition-all inline-block">{content.aboutCta}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="py-stack-lg bg-surface">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">{content.solutionsHeadline}</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">{content.solutionsSubtext}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {services.map(s => (
              <div key={s.slug} className="bg-white p-10 premium-card-shadow flex flex-col border border-outline-variant/20 group/card hover:bg-secondary transition-colors duration-300">
                <span className="material-symbols-outlined text-secondary text-4xl mb-6 group-hover/card:text-white transition-colors">{s.icon}</span>
                <h3 className="font-headline-lg text-[20px] mb-4 text-primary group-hover/card:text-white transition-colors">{s.title}</h3>
                <p className="text-on-surface-variant font-body-sm mb-8 flex-grow group-hover/card:text-white/80 transition-colors">{s.desc}</p>
                <Link to={`/services/${s.slug}`} className="bg-primary text-on-primary px-4 py-2 font-label-caps text-label-caps rounded flex items-center justify-center gap-2 group/link group-hover/card:bg-white group-hover/card:text-secondary transition-all w-fit">
                  {t.advertising.explore} <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-stack-lg bg-primary text-on-primary">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <span className="font-label-caps text-label-caps text-secondary-container mb-4 block">{content.whyLabel}</span>
              <h2 className="font-headline-lg text-headline-lg mb-4 text-white">{content.whyHeadline}</h2>
            </div>
            <div className="font-body-md text-outline-variant max-w-sm">{content.whySubtext}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {whyItems.map(item => (
              <div key={item.n} className="p-8 border border-white/10 hover:bg-secondary transition-colors duration-300 cursor-default">
                <div className="font-label-caps text-label-caps text-secondary-container mb-2">{item.n}</div>
                <h4 className="font-headline-lg text-[18px] mb-3 text-white">{item.title}</h4>
                <p className="text-outline-variant text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-24 bg-secondary text-on-secondary">
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {metrics.map(m => (
            <div key={m.label}>
              <CounterNumber value={m.val} className="font-display-lg text-[48px] font-black mb-2 text-white" />
              <div className="font-label-caps text-label-caps opacity-80 text-white">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Process */}
      <section id="process" className="py-stack-lg bg-white overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-16 text-center">{content.processHeadline}</h2>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-outline-variant/30 -translate-y-1/2 hidden lg:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
              {steps.map(step => (
                <div key={step.n} className="bg-white p-6 relative z-10">
                  <div className="w-12 h-12 bg-primary text-on-primary flex items-center justify-center mb-6 font-bold rounded-full text-white">{step.n}</div>
                  <h4 className="font-headline-lg text-[20px] mb-3 text-primary">{step.title}</h4>
                  <p className="text-on-surface-variant text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-desktop bg-primary p-12 lg:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 bg-secondary-container pointer-events-none transform skew-x-12 translate-x-1/2"></div>
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="font-display-lg text-white mb-6 text-[40px]">{content.ctaHeadline}</h2>
              <p className="text-outline-variant text-lg">{content.ctaSubtext}</p>
            </div>
            <button onClick={handleScrollToContact} className="bg-secondary text-on-secondary px-12 py-5 font-label-caps text-label-caps text-lg hover:bg-secondary-container transition-all whitespace-nowrap shadow-xl">{content.ctaButton}</button>
          </div>
        </div>
      </section>

      {/* Interactive Quote Form */}
      <QuoteForm />
    </div>
  );
}
