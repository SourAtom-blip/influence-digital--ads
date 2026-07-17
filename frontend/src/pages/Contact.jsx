import React, { useState } from 'react';
import { useLanguage, useContent } from '../context/LanguageContext';
import { getImages } from '../utils/storage';
import { apiSubmitQuote } from '../utils/api';
import T from '../utils/translations';

export default function Contact() {
  const { lang } = useLanguage();
  const t = (T[lang] || T.en).contact;
  const content = useContent();
  const images = getImages();

  const badge    = content.contactBadge    || t.badge;
  const headline = content.contactHeadline || t.headline;
  const subtext  = content.contactSubtext  || t.subtext;

  const empty = { name: '', telephone: '', email: '', message: '' };
  const [form, setForm]                   = useState(empty);
  const [agreed, setAgreed]               = useState(false);
  const [consentError, setConsentError]   = useState(false);
  const [submitted, setSubmitted]         = useState(false);
  const [loading, setLoading]             = useState(false);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) { setConsentError(true); return; }
    setConsentError(false);
    setLoading(true);
    try {
      await apiSubmitQuote({ ...form, targetArea: 'Contact Form', duration: '-', type: 'contact' });
    } catch {
      try {
        const existing = JSON.parse(localStorage.getItem('site_leads') ?? '[]');
        existing.unshift({ ...form, targetArea: 'Contact Form', duration: '-', type: 'contact', _id: Date.now().toString(), status: 'Pending', createdAt: new Date().toISOString() });
        localStorage.setItem('site_leads', JSON.stringify(existing));
      } catch {}
    }
    setSubmitted(true);
    setLoading(false);
    setForm(empty);
    setAgreed(false);
  };

  const inputCls = 'w-full px-4 py-3 border border-outline-variant/30 rounded focus:border-secondary outline-none transition-colors text-sm bg-white text-on-surface placeholder-on-surface-variant/50';

  return (
    <div className="bg-surface">

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={images.contactHero} alt="Contact Us" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-margin-desktop relative z-10">
          <span className="font-label-caps text-label-caps text-secondary-container block mb-4">{badge}</span>
          <h1 className="font-display-lg text-3xl sm:text-4xl lg:text-display-lg text-white mb-6 max-w-2xl">{headline}</h1>
          <p className="text-outline-variant text-base sm:text-lg max-w-xl">{subtext}</p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-margin-desktop">

          {/* Section heading */}
          <div className="text-center mb-14">
            <span className="font-label-caps text-label-caps text-secondary tracking-widest block mb-4">{t.sectionBadge}</span>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-3">{t.sectionHead}</h2>
            <p className="text-on-surface-variant text-sm">{t.sectionSub}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

            {/* Form — 2 cols */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="flex items-center justify-center h-64 bg-surface rounded-lg border border-outline-variant/20">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-secondary text-5xl block mb-4">check_circle</span>
                    <p className="text-primary font-medium text-lg">{t.successHead}</p>
                    <p className="text-on-surface-variant text-sm mt-2">{t.successSub}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-label-caps text-xs text-on-surface font-semibold block mb-1.5">{t.fieldName}</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder={t.fieldNamePh} className={inputCls} />
                    </div>
                    <div>
                      <label className="font-label-caps text-xs text-on-surface font-semibold block mb-1.5">{t.fieldTel}</label>
                      <input type="tel" name="telephone" value={form.telephone} onChange={handleChange} placeholder={t.fieldTelPh} className={inputCls} />
                    </div>
                  </div>

                  <div>
                    <label className="font-label-caps text-xs text-on-surface font-semibold block mb-1.5">{t.fieldEmail}</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder={t.fieldEmailPh} className={inputCls} />
                  </div>

                  <div>
                    <label className="font-label-caps text-xs text-on-surface font-semibold block mb-1.5">{t.fieldMsg}</label>
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder={t.fieldMsgPh} rows={6} className={`${inputCls} resize-none`} />
                  </div>

                  {/* Consent checkbox */}
                  <div className="p-4 bg-surface border border-outline-variant/20 rounded">
                    <p className="text-on-surface-variant text-xs leading-relaxed mb-3">{t.consentText}</p>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={e => { setAgreed(e.target.checked); if (e.target.checked) setConsentError(false); }}
                        className="mt-0.5 w-4 h-4 accent-primary flex-shrink-0"
                      />
                      <span className="text-on-surface-variant text-xs leading-relaxed">{t.consentCheck}</span>
                    </label>
                    {consentError && (
                      <p className="text-red-600 text-xs font-medium mt-2">{t.consentError}</p>
                    )}
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full bg-primary text-on-primary py-4 font-label-caps text-label-caps hover:bg-secondary transition-all shadow-lg disabled:opacity-60 mt-2">
                    {loading ? t.sending : t.submit}
                  </button>
                </form>
              )}
            </div>

            {/* Info + Consent — right col */}
            <div className="flex flex-col gap-6">

              {/* Company info card */}
              <div className="bg-primary p-8 text-white">
                <div className="font-label-caps text-label-caps text-secondary-container mb-4">{t.ourContact}</div>
                <h3 className="font-headline-lg text-[18px] text-white mb-6">Influence Digital Ads</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary-container text-base mt-0.5">call</span>
                    <div>
                      <p className="text-white font-semibold">+1 803 295 7599</p>
                      <p className="text-white/60 text-xs">United States</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary-container text-base mt-0.5">call</span>
                    <div>
                      <p className="text-white/80">+223 93 14 14 51</p>
                      <p className="text-white/60 text-xs">Bamako</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary-container text-base mt-0.5">call</span>
                    <div>
                      <p className="text-white/80">+221 77 234 66 33</p>
                      <p className="text-white/60 text-xs">Dakar</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-white/10 space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary-container text-base">language</span>
                      <p className="text-white/70 text-xs">www.influencedigital-ads.com</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary-container text-base">mail</span>
                      <p className="text-white/70 text-xs">info@influencedigital-ads.com</p>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
