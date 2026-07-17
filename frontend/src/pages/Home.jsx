import React, { useState, useRef, useEffect } from 'react';
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
  const [activeCard, setActiveCard] = useState(0);
  const carouselRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState(3);
  useEffect(() => {
    const update = () => setVisibleCards(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Merge admin-managed structure with translated titles/descs by slug
  const services = getServices().map(s => {
    const tr = t.advertising.services.find(ts => ts.slug === s.slug);
    if (tr) return { ...s, title: tr.title, desc: tr.desc };
    // For custom services added via admin, use FR fields when in French
    return lang === 'fr'
      ? { ...s, title: s.title_fr || s.title, desc: s.desc_fr || s.desc }
      : s;
  });

  const heroImg  = images.homeHero;
  const aboutImg = images.homeAbout;

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
      <header className="relative pt-28 pb-16 sm:pb-stack-lg overflow-hidden min-h-[60vh] sm:min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.1) 70%), url("${heroImg}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top'
            }}
          />
        </div>
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-margin-desktop relative z-20">
          <div className="max-w-2xl">
            <h1 className="font-black text-white text-3xl sm:text-4xl lg:text-5xl mb-6 tracking-wider uppercase drop-shadow-lg leading-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>{content.heroBadge}</h1>
            <p className="font-body-md text-white mb-8 text-base sm:text-lg leading-relaxed drop-shadow-sm opacity-90">{content.heroSubtext}</p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <button onClick={handleScrollToContact} className="bg-primary text-on-primary px-6 py-3 sm:px-8 sm:py-4 font-label-caps text-label-caps hover:bg-secondary transition-all w-full sm:w-auto text-center">{content.heroCta1}</button>
              <button onClick={handleScrollToSolutions} className="border border-outline text-white px-6 py-3 sm:px-8 sm:py-4 font-label-caps text-label-caps hover:bg-white/10 transition-all w-full sm:w-auto text-center">{content.heroCta2}</button>
            </div>
          </div>
        </div>
      </header>


      {/* About Us */}
      <section id="about" className="py-stack-lg bg-white">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div className="relative">
              <div className="aspect-square w-full bg-surface-container-low overflow-hidden border border-outline-variant/20 rounded-lg">
                <img className="w-full h-full object-cover" src={aboutImg} alt="About" />
              </div>
              <div className="absolute bottom-0 right-0 sm:-bottom-6 sm:-right-6 p-4 sm:p-8 bg-primary text-on-primary">
                <p className="font-bold text-[22px] sm:text-[36px] text-white leading-tight">{content.aboutYears}</p>
                <p className="text-[9px] sm:text-label-caps tracking-widest uppercase text-white mt-0.5">{content.aboutYearsLabel}</p>
              </div>
              <div className="absolute -left-8 -bottom-12 w-40 h-40 rounded-lg overflow-hidden border-4 border-white shadow-xl hidden lg:block">
                <img src={images.homeDesign} alt="Billboard" className="w-full h-full object-cover" />
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

      {/* Expert Graphic Design Section */}
      <section className="py-stack-lg bg-surface">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div className="relative overflow-hidden rounded-lg min-h-[250px] sm:min-h-[400px]">
              <img src={images.homeGraphic} alt="Expert Graphic Design" className="w-full h-full object-cover absolute inset-0" />
            </div>
            <div>
              <span className="font-label-caps text-label-caps text-secondary tracking-widest block mb-4">{t.home.designBadge}</span>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">{t.home.designHeadline}</h2>
              <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">{t.home.designText1}</p>
              <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">{t.home.designText2}</p>
              <Link to="/about-us" className="bg-primary text-on-primary px-6 py-3 font-label-caps text-label-caps rounded hover:bg-secondary transition-all inline-block">{t.home.designCta}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="py-stack-lg bg-white">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">{content.solutionsHeadline}</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">{content.solutionsSubtext}</p>
          </div>
          {/* Carousel */}
          <div className="relative">
            <button
              onClick={() => setActiveCard(i => Math.max(0, i - 1))}
              disabled={activeCard === 0}
              className="absolute left-1 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border border-outline-variant/30 premium-card-shadow flex items-center justify-center text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-secondary hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-lg sm:text-xl">chevron_left</span>
            </button>

            <div ref={carouselRef} className="overflow-hidden mx-8 sm:mx-0">
              <div
                className="flex transition-transform duration-500 ease-in-out gap-4"
                style={{ transform: `translateX(calc(-${activeCard} * (100% / ${visibleCards} + ${visibleCards === 1 ? 16 : visibleCards === 2 ? 8 : 5}px)))` }}
              >
                {services.map((s) => {
                  const svcImg = ({ 'shopping-centers': images.serviceShoppingCenters, 'malls': images.serviceMalls, 'airports': images.serviceAirports, 'urban-zones': images.serviceUrbanZones }[s.slug]) || s.image;
                  return (
                  <div
                    key={s.slug}
                    className="bg-white premium-card-shadow flex flex-col border border-outline-variant/20 group/card hover:bg-secondary transition-colors duration-300 flex-shrink-0 overflow-hidden"
                    style={{ width: `calc(${100 / visibleCards}% - ${visibleCards === 1 ? 0 : visibleCards === 2 ? 8 : 11}px)` }}
                  >
                    <div className="h-52 overflow-hidden flex-shrink-0" style={{ transform: 'translateZ(0)' }}>
                      <img src={svcImg} alt={s.title} loading="eager" decoding="async" className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-105" style={{ willChange: 'transform', imageRendering: 'auto' }} />
                    </div>
                    <div className="p-6 sm:p-8 flex flex-col flex-grow">
                      <h3 className="font-headline-lg text-[20px] mb-4 text-primary group-hover/card:text-white transition-colors">{s.title}</h3>
                      <p className="text-on-surface-variant font-body-sm mb-8 flex-grow group-hover/card:text-white/80 transition-colors">{s.desc}</p>
                      <Link to={`/services/${s.slug}`} className="bg-primary text-on-primary px-4 py-2 font-label-caps text-label-caps rounded flex items-center justify-center gap-2 group/link group-hover/card:bg-white group-hover/card:text-secondary transition-all w-fit">
                        {t.advertising.explore} <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setActiveCard(i => Math.min(services.length - visibleCards, i + 1))}
              disabled={activeCard >= services.length - visibleCards}
              className="absolute right-1 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border border-outline-variant/30 premium-card-shadow flex items-center justify-center text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-secondary hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-lg sm:text-xl">chevron_right</span>
            </button>

            {services.length > visibleCards && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: services.length - visibleCards + 1 }).map((_, i) => (
                  <button key={i} onClick={() => setActiveCard(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${activeCard === i ? 'bg-secondary' : 'bg-outline-variant/40'}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>



      {/* Our Process */}
      <section id="process" className="py-stack-lg bg-white overflow-hidden">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-margin-desktop">
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
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-margin-desktop">
          <div className="bg-primary p-8 sm:p-14 lg:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 bg-secondary-container pointer-events-none transform skew-x-12 translate-x-1/2"></div>
            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-end gap-8">
              <div className="max-w-xl text-center lg:text-left">
                <h2 className="font-display-lg text-white mb-4 text-2xl sm:text-[28px] lg:text-[32px] leading-tight">{content.ctaHeadline}</h2>
                <p className="text-outline-variant text-base sm:text-lg">{content.ctaSubtext}</p>
              </div>
              <button onClick={handleScrollToContact} className="bg-secondary text-on-secondary px-8 py-4 sm:px-12 sm:py-5 font-label-caps text-label-caps hover:bg-secondary-container transition-all shadow-xl w-full sm:w-auto text-center">{content.ctaButton}</button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Quote Form */}
      <QuoteForm showConsent />
    </div>
  );
}
