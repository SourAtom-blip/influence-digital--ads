import React from 'react';
import { Link } from 'react-router-dom';
import { useContent, useLanguage } from '../context/LanguageContext';
import { getImages } from '../utils/storage';
import CounterNumber from '../components/CounterNumber';
import T from '../utils/translations';


export default function AboutUs() {
  const content = useContent();
  const { lang } = useLanguage();
  const ta = (T[lang] || T.en).aboutUs;
  const tadv = (T[lang] || T.en).advertising;
  const tact = (T[lang] || T.en).ourActivities;
  const images  = getImages();
  const aboutImg = images.homeAbout;

  const metrics = [
    { val: content.metric1Val, label: content.metric1Label },
    { val: content.metric2Val, label: content.metric2Label },
    { val: content.metric3Val, label: content.metric3Label },
    { val: content.metric4Val, label: content.metric4Label },
  ];

  const values = [
    { n: '01', title: content.auVal1Title, desc: content.auVal1Desc },
    { n: '02', title: content.auVal2Title, desc: content.auVal2Desc },
    { n: '03', title: content.auVal3Title, desc: content.auVal3Desc },
    { n: '04', title: content.auVal4Title, desc: content.auVal4Desc },
    { n: '05', title: content.auVal5Title, desc: content.auVal5Desc },
    { n: '06', title: content.auVal6Title, desc: content.auVal6Desc },
  ];


  return (
    <div className="bg-surface">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-24 relative overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={images.aboutMain} alt="About Us" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="max-w-container-max mx-auto px-margin-desktop relative z-20">
          <span className="font-label-caps text-label-caps text-secondary-container block mb-4">{content.auBadge}</span>
          <h1 className="font-display-lg text-display-lg text-white mb-6 max-w-3xl">{content.auHeadline}</h1>
          <p className="text-outline-variant text-lg max-w-2xl leading-relaxed">{content.auSubtext}</p>
          <div className="mt-12 flex flex-wrap gap-6">
            <Link to="/contact"
              className="bg-secondary text-white px-8 py-4 font-label-caps text-label-caps hover:bg-secondary-container transition-colors">
              {content.auCtaButton}
            </Link>
            <Link to="/advertising"
              className="border border-white/30 text-white px-8 py-4 font-label-caps text-label-caps hover:bg-white/10 transition-colors">
              {ta.ourServices}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Our Story ────────────────────────────────────────────────── */}
      <section className="py-stack-lg bg-white">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-square w-full bg-surface-container-low overflow-hidden border border-outline-variant/20 rounded-lg">
                <img className="w-full h-full object-cover" src={aboutImg} alt="About Influence" />
              </div>
              <div className="absolute bottom-0 right-0 sm:-bottom-6 sm:-right-6 p-3 sm:p-8 bg-primary text-on-primary">
                <p className="font-bold text-[18px] sm:text-[40px] text-white leading-tight">{content.aboutYears}</p>
                <p className="text-[8px] sm:text-label-caps tracking-widest uppercase text-white mt-0.5">{content.aboutYearsLabel}</p>
              </div>
            </div>
            <div>
              <span className="font-label-caps text-label-caps text-secondary tracking-widest block mb-4">{content.aboutLabel}</span>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">{content.aboutHeadline}</h2>
              <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">{content.aboutText1}</p>
              <p className="font-body-md text-on-surface-variant mb-10 leading-relaxed">{content.aboutText2}</p>
              <Link to="/our-activities"
                className="bg-primary text-on-primary px-6 py-3 font-label-caps text-label-caps rounded hover:bg-secondary transition-all inline-block">
                {content.aboutCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Since 2019 ───────────────────────────────────────────────── */}
      <section className="py-20 bg-surface">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="flex flex-col gap-6">
              <div className="overflow-hidden rounded-lg">
                <img src={images.activitiesFounder} alt="Shopping Mall" className="w-full h-64 object-cover" />
              </div>
              <div className="overflow-hidden rounded-lg">
                <img src={images.activitiesZone1} alt="Bus Stop Display" className="w-full h-64 object-cover" />
              </div>
            </div>
            <div>
              <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed uppercase font-medium">{tact.intro1}</p>
              <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">{tact.intro2}</p>
              <p className="font-body-md text-on-surface-variant leading-relaxed">{tact.intro3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Expert Graphic Design ────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative overflow-hidden rounded-lg min-h-[400px]">
              <img src={images.homeGraphic} alt="Expert Graphic Design" className="w-full h-full object-cover absolute inset-0" />
            </div>
            <div>
              <span className="font-label-caps text-label-caps text-secondary tracking-widest block mb-4">{(T[lang]||T.en).home.designBadge}</span>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">{(T[lang]||T.en).home.designHeadline}</h2>
              <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">{(T[lang]||T.en).home.designText1}</p>
              <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">{(T[lang]||T.en).home.designText2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who We Are ───────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative min-h-[380px] rounded-lg overflow-hidden">
              <img src={images.aboutMain} alt="Advertising Agency" className="w-full h-full object-cover absolute inset-0" />
            </div>
            <div>
              <span className="font-label-caps text-label-caps text-secondary tracking-widest block mb-4">{tadv.whoBadge}</span>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">{tadv.whoHeadline}</h2>
              <p className="font-body-md text-on-surface-variant mb-5 leading-relaxed">{tadv.whoText1}</p>
              <p className="font-body-md text-on-surface-variant leading-relaxed">{tadv.whoText2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Your Brand ───────────────────────────────────────────────── */}
      <section className="py-20 bg-surface">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative min-h-[380px] rounded-lg overflow-hidden">
              <img src={images.advertisingBanner} alt="Your Brand Here" className="w-full h-full object-cover absolute inset-0" />
            </div>
            <div>
              <span className="font-label-caps text-label-caps text-secondary tracking-widest block mb-4">{tadv.brandBadge}</span>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">{tadv.brandHeadline}</h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">{tadv.brandText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Founder Story ────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="font-label-caps text-label-caps text-secondary tracking-widest block mb-4">{tact.founderBadge}</span>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">{tact.founderName}</h2>
              <p className="font-body-md text-on-surface-variant mb-5 leading-relaxed">{tact.founderText1}</p>
              <p className="font-body-md text-on-surface-variant mb-5 leading-relaxed">{tact.founderText2}</p>
              <p className="font-body-md text-on-surface-variant mb-5 leading-relaxed">{tact.founderText3}</p>
              <p className="font-body-md text-on-surface-variant leading-relaxed">{tact.founderText4}</p>
            </div>
            <div className="relative min-h-[400px] rounded-lg overflow-hidden">
              <img src={images.activitiesFounder} alt="Founder" className="w-full h-full object-cover absolute inset-0" />
              <div className="absolute inset-0 bg-primary/50" />
              <div className="relative z-10 flex items-end h-full p-8 min-h-[400px]">
                <div>
                  <p className="font-label-caps text-label-caps text-white/80 tracking-widest">{tact.founderRole}</p>
                  <p className="font-headline-lg text-white mt-1 text-[22px]">{tact.founderName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ─────────────────────────────────────────── */}
      <section className="py-stack-lg bg-surface">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div className="group/card bg-white p-12 border border-outline-variant/20 premium-card-shadow hover:bg-secondary transition-colors duration-300 cursor-default">
              <div className="w-14 h-14 bg-secondary group-hover/card:bg-white/20 flex items-center justify-center mb-8 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-white text-2xl">rocket_launch</span>
              </div>
              <h3 className="font-headline-lg text-[24px] text-primary group-hover/card:text-white mb-4 transition-colors">{content.auMissionTitle}</h3>
              <p className="text-on-surface-variant group-hover/card:text-white/80 leading-relaxed transition-colors">{content.auMissionText}</p>
            </div>
            <div className="group/card bg-white p-12 border border-outline-variant/20 premium-card-shadow hover:bg-secondary transition-colors duration-300 cursor-default">
              <div className="w-14 h-14 bg-secondary group-hover/card:bg-white/20 flex items-center justify-center mb-8 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-white text-2xl">visibility</span>
              </div>
              <h3 className="font-headline-lg text-[24px] text-primary group-hover/card:text-white mb-4 transition-colors">{content.auVisionTitle}</h3>
              <p className="text-on-surface-variant group-hover/card:text-white/80 leading-relaxed transition-colors">{content.auVisionText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Impact Numbers ───────────────────────────────────────────── */}
      <section className="py-24 bg-secondary">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center mb-16">
            <span className="font-label-caps text-label-caps text-white/60 block mb-3">{ta.byNumbers}</span>
            <h2 className="font-headline-lg text-headline-lg text-white">{ta.reachImpact}</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {metrics.map(m => (
              <div key={m.label}>
                <CounterNumber value={m.val} className="font-display-lg text-[56px] font-black text-white mb-2" />
                <div className="font-label-caps text-label-caps text-white/70">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

<<<<<<< Updated upstream
      {/* ── Core Values ──────────────────────────────────────────────── */}
      <section className="py-stack-lg bg-primary">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center mb-16">
            <span className="font-label-caps text-label-caps text-secondary-container block mb-4">WHAT WE STAND FOR</span>
            <h2 className="font-headline-lg text-headline-lg text-white">{content.auValuesTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {values.map(v => (
              <div key={v.n} className="p-8 border border-white/10 hover:bg-secondary transition-colors duration-300 cursor-default">
                <div className="font-label-caps text-label-caps text-secondary-container mb-3">{v.n}</div>
                <h4 className="font-headline-lg text-[18px] text-white mb-3">{v.title}</h4>
                <p className="text-outline-variant text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

=======
>>>>>>> Stashed changes

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-desktop bg-primary p-12 lg:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 bg-secondary-container pointer-events-none transform skew-x-12 translate-x-1/2" />
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="font-display-lg text-white mb-6 text-[40px]">{content.auCtaHeadline}</h2>
              <p className="text-outline-variant text-lg">{content.auCtaSubtext}</p>
            </div>
            <Link to="/contact"
              className="bg-secondary text-white px-12 py-5 font-label-caps text-label-caps text-lg hover:bg-secondary-container transition-all whitespace-nowrap shadow-xl">
              {content.auCtaButton}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
