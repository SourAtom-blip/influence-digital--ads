import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import { useContent, useLanguage } from '../context/LanguageContext';
import T from '../utils/translations';

export default function Footer() {
  const c = useContent();
  const { lang } = useLanguage();
  const t = T[lang] || T.en;
  const tf = t.footer;
  const adv = t.advertising.services;

  return (
    <footer className="bg-primary pt-stack-lg pb-stack-md border-t border-white/5">
      <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-8">
            <img alt="Influence Digital Ads" className="h-12 brightness-0 invert" src={logoImg} />
          </div>
          <p className="font-body-sm text-outline-variant mb-8 pr-8">{c.footerDesc}</p>
          <div className="flex gap-4">
            <a className="text-outline-variant hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined">face_nod</span>
            </a>
            <a className="text-outline-variant hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined">linked_camera</span>
            </a>
            <a className="text-outline-variant hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined">post_add</span>
            </a>
          </div>
        </div>
        <div>
          <h5 className="font-label-caps text-label-caps text-secondary-container mb-6 text-[16px] font-bold uppercase">{tf.solutions}</h5>
          <ul className="space-y-4 font-body-sm text-outline-variant">
            {adv.map(s => (
              <li key={s.slug}><Link className="hover:text-white transition-colors" to={`/services/${s.slug}`}>{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="font-label-caps text-label-caps text-secondary-container mb-6 text-[16px] font-bold uppercase">{tf.company}</h5>
          <ul className="space-y-4 font-body-sm text-outline-variant">
            <li><Link className="hover:text-white transition-colors" to="/about-us">{tf.aboutUs}</Link></li>
            <li><Link className="hover:text-white transition-colors" to="/our-activities">{tf.ourActivities}</Link></li>
            <li><Link className="hover:text-white transition-colors" to="/advertising">{tf.advertising}</Link></li>
            <li><Link className="hover:text-white transition-colors" to="/contact">{tf.contactUs}</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-label-caps text-label-caps text-secondary-container mb-6 text-[16px] font-bold uppercase">{tf.contact}</h5>
          <ul className="space-y-4 font-body-sm text-outline-variant">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-sm mt-1">location_on</span>
              {c.footerAddress}
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-sm">call</span>
              {c.footerPhone}
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-sm">mail</span>
              {c.footerEmail}
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-container-max mx-auto px-margin-desktop mt-16 pt-8 border-t border-white/5 flex justify-center items-center">
        <p className="font-body-sm text-outline-variant text-[12px] opacity-60">
          {c.footerCopyright.replace(/\d{4}/, new Date().getFullYear())}
        </p>
      </div>
    </footer>
  );
}
