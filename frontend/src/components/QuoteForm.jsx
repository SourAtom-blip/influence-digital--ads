import React, { useState } from 'react';
import { apiSubmitQuote } from '../utils/api';
import { useContent, useLanguage } from '../context/LanguageContext';

function saveLeadLocally(data) {
  try {
    const existing = JSON.parse(localStorage.getItem('site_leads') ?? '[]');
    existing.unshift({ ...data, _id: Date.now().toString(), status: 'Pending', createdAt: new Date().toISOString() });
    localStorage.setItem('site_leads', JSON.stringify(existing));
    return true;
  } catch { return false; }
}

const T = {
  en: {
    name: 'Name *', title: 'Title', email: 'Email *', company: 'Company',
    telephone: 'Telephone', location: 'Country / City', targetArea: 'Target Area *',
    duration: 'Advertising Duration *', namePh: 'Your full name', titlePh: 'Job title',
    emailPh: 'work@company.com', companyPh: 'Company name', telPh: '+1 (000) 000-0000',
    locationPh: 'Location', selectArea: 'Select target area', selectDuration: 'Select duration',
    submit: 'Submit Request', submitting: 'Submitting...',
    success: 'Thank you! Your request has been submitted. We will contact you within 24 hours.',
    areas: ['Shopping Center','Malls','Airports','Urban Zones'],
    durations: ['2 Weeks','3 Weeks','4 Weeks','6 Weeks','8 Weeks','10 Weeks'],
    consentText1: 'In order to offer you a personalized digital panel, adapted to your advertising needs and your budget, we need some information.',
    consentText2: 'The data collected through this form are confidential and processed by Influence Digital Ads. They allow our teams to contact you to answer your request.',
    consentCheck: 'I agree that my data will be processed by Influence Digital Ads for the purpose of responding to my request.',
    consentError: 'Please agree to the data processing before submitting.',
  },
  fr: {
    name: 'Nom *', title: 'Titre', email: 'E-mail *', company: 'Entreprise',
    telephone: 'Téléphone', location: 'Pays / Ville', targetArea: 'Zone Cible *',
    duration: 'Durée Publicitaire *', namePh: 'Votre nom complet', titlePh: 'Poste occupé',
    emailPh: 'travail@entreprise.com', companyPh: "Nom de l'entreprise", telPh: '+1 (000) 000-0000',
    locationPh: 'Emplacement', selectArea: 'Sélectionner une zone cible', selectDuration: 'Sélectionner une durée',
    submit: 'Envoyer la Demande', submitting: 'Envoi en cours...',
    success: 'Merci ! Votre demande a été soumise. Nous vous contacterons dans les 24 heures.',
    areas: ['Centre Commercial','Centres Commerciaux','Aéroports','Zones Urbaines'],
    durations: ['2 Semaines','3 Semaines','4 Semaines','6 Semaines','8 Semaines','10 Semaines'],
    consentText1: "Afin de vous proposer un panneau numérique personnalisé, adapté à vos besoins publicitaires et à votre budget, nous avons besoin de quelques informations.",
    consentText2: "Les données collectées via ce formulaire sont confidentielles et traitées par Influence Digital Ads. Elles permettent à nos équipes de vous contacter pour répondre à votre demande.",
    consentCheck: "J'accepte que mes données soient traitées par Influence Digital Ads dans le but de répondre à ma demande.",
    consentError: "Veuillez accepter le traitement des données avant de soumettre.",
  },
};

export default function QuoteForm({ preselected = '', compact = false, showConsent = false }) {
  const content = useContent();
  const { lang } = useLanguage();
  const t = T[lang] || T.en;
  const empty = { name: '', title: '', email: '', company: '', telephone: '', location: '', targetArea: preselected, duration: '' };
  const [formData, setFormData] = useState(empty);
  const [status, setStatus]     = useState({ type: null, message: '' });
  const [loading, setLoading]   = useState(false);
  const [agreed, setAgreed]     = useState(false);
  const [consentError, setConsentError] = useState(false);

  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showConsent && !agreed) { setConsentError(true); return; }
    setConsentError(false);
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      await apiSubmitQuote(formData);
      setStatus({ type: 'success', message: t.success });
    } catch {
      const saved = saveLeadLocally(formData);
      if (saved) {
        setStatus({ type: 'success', message: t.success });
      } else {
        setStatus({ type: 'error', message: t.error || 'Submission failed. Please try again.' });
        setLoading(false);
        return;
      }
    }
    setFormData({ ...empty, targetArea: '' });
    setLoading(false);
  };

  const inputCls = 'w-full px-4 py-3 border border-outline-variant/30 rounded focus:border-secondary outline-none transition-colors text-sm';

  const inner = (
    <div className={compact ? '' : 'max-w-2xl mx-auto'}>
      {!compact && (
        <div className="text-center mb-10">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4">{content.formHeadline}</h2>
          <p className="text-on-surface-variant">{content.formSubtext}</p>
        </div>
      )}

          {status.message && (
            <div className={`p-4 mb-6 rounded font-medium text-sm ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="font-label-caps text-xs text-on-surface font-semibold block mb-1.5">{t.name}</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder={t.namePh} className={inputCls} />
              </div>
              <div>
                <label className="font-label-caps text-xs text-on-surface font-semibold block mb-1.5">{t.title}</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder={t.titlePh} className={inputCls} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="font-label-caps text-xs text-on-surface font-semibold block mb-1.5">{t.email}</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder={t.emailPh} className={inputCls} />
              </div>
              <div>
                <label className="font-label-caps text-xs text-on-surface font-semibold block mb-1.5">{t.company}</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder={t.companyPh} className={inputCls} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="font-label-caps text-xs text-on-surface font-semibold block mb-1.5">{t.telephone}</label>
                <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} placeholder={t.telPh} className={inputCls} />
              </div>
              <div>
                <label className="font-label-caps text-xs text-on-surface font-semibold block mb-1.5">{t.location}</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder={t.locationPh} className={inputCls} />
              </div>
            </div>

            <div>
              <label className="font-label-caps text-xs text-on-surface font-semibold block mb-1.5">{t.targetArea}</label>
              <div className="relative">
                <select name="targetArea" value={formData.targetArea} onChange={handleChange} required className={`${inputCls} appearance-none bg-white pr-10`}>
                  <option value="" disabled>{t.selectArea}</option>
                  {t.areas.map(a => <option key={a}>{a}</option>)}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-sm">arrow_drop_down</span>
              </div>
            </div>

            <div>
              <label className="font-label-caps text-xs text-on-surface font-semibold block mb-1.5">{t.duration}</label>
              <div className="relative">
                <select name="duration" value={formData.duration} onChange={handleChange} required className={`${inputCls} appearance-none bg-white pr-10`}>
                  <option value="" disabled>{t.selectDuration}</option>
                  {t.durations.map(d => <option key={d}>{d}</option>)}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-sm">arrow_drop_down</span>
              </div>
            </div>

            {showConsent && (
              <div className="mt-2 p-5 bg-surface border border-outline-variant/20 rounded-lg">
                <p className="text-on-surface-variant text-sm leading-relaxed mb-3">{t.consentText1}</p>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-4">{t.consentText2}</p>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={e => { setAgreed(e.target.checked); if (e.target.checked) setConsentError(false); }}
                    className="mt-0.5 w-4 h-4 accent-primary flex-shrink-0"
                  />
                  <span className="text-on-surface-variant text-sm leading-relaxed">{t.consentCheck}</span>
                </label>
                {consentError && (
                  <p className="mt-2 text-red-600 text-xs font-medium">{t.consentError}</p>
                )}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full bg-primary text-on-primary py-4 font-label-caps text-label-caps hover:bg-secondary transition-all shadow-lg mt-2 disabled:opacity-60">
              {loading ? t.submitting : t.submit}
            </button>
          </form>
    </div>
  );

  if (compact) return inner;

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white">
      <div className="max-w-container-max mx-auto px-4 sm:px-8 lg:px-margin-desktop">
        {inner}
      </div>
    </section>
  );
}
