import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/LanguageContext';
import { getImages } from '../utils/storage';
import CounterNumber from '../components/CounterNumber';

function TeamCard({ name, role, bio, photo }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="bg-white p-8 border border-outline-variant/20 premium-card-shadow flex flex-col items-center text-center group/card hover:bg-secondary transition-colors duration-300">
      {photo ? (
        <img
          src={photo}
          alt={name}
          className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-surface group-hover/card:border-white/30 transition-colors"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-secondary group-hover/card:bg-white/20 flex items-center justify-center mb-6 transition-colors">
          <span className="text-white text-2xl font-bold font-display-lg">{initials}</span>
        </div>
      )}
      <h4 className="font-headline-lg text-[18px] text-primary mb-1 group-hover/card:text-white transition-colors">{name}</h4>
      <div className="font-label-caps text-label-caps text-secondary mb-4 group-hover/card:text-white/80 transition-colors">{role}</div>
      <p className="text-on-surface-variant text-sm leading-relaxed group-hover/card:text-white/70 transition-colors">{bio}</p>
    </div>
  );
}

export default function AboutUs() {
  const content = useContent();
  const images  = getImages();
  const aboutImg = images.about.list[images.about.active];

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

  const team = [
    { name: content.auTeam1Name, role: content.auTeam1Role, bio: content.auTeam1Bio, photo: content.auTeam1Photo },
    { name: content.auTeam2Name, role: content.auTeam2Role, bio: content.auTeam2Bio, photo: content.auTeam2Photo },
    { name: content.auTeam3Name, role: content.auTeam3Role, bio: content.auTeam3Bio, photo: content.auTeam3Photo },
    { name: content.auTeam4Name, role: content.auTeam4Role, bio: content.auTeam4Bio, photo: content.auTeam4Photo },
  ];

  return (
    <div className="bg-surface">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-primary pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #0051d5 0%, transparent 60%)' }} />
        <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
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
              Our Services
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
                <img className="w-full h-full object-cover grayscale opacity-90" src={aboutImg} alt="About Influence" />
              </div>
              <div className="absolute -bottom-6 -right-6 p-10 bg-primary text-on-primary">
                <p className="font-display-lg text-[40px] font-bold text-white">{content.aboutYears}</p>
                <p className="font-label-caps text-label-caps text-white">{content.aboutYearsLabel}</p>
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
            <span className="font-label-caps text-label-caps text-white/60 block mb-3">BY THE NUMBERS</span>
            <h2 className="font-headline-lg text-headline-lg text-white">Our Reach, Our Impact</h2>
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

      {/* ── Leadership Team ──────────────────────────────────────────── */}
      <section className="py-stack-lg bg-surface">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center mb-16">
            <span className="font-label-caps text-label-caps text-secondary block mb-4">THE PEOPLE BEHIND THE BRAND</span>
            <h2 className="font-headline-lg text-headline-lg text-primary">{content.auTeamTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {team.map((member, i) => (
              <TeamCard key={i} {...member} />
            ))}
          </div>
        </div>
      </section>

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
