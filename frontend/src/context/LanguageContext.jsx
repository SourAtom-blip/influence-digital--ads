import React, { createContext, useContext, useState, useEffect } from 'react';
import { getContent, fetchContent } from '../utils/storage';
import T from '../utils/translations';

const LanguageContext = createContext({ lang: 'en', setLang: () => {} });
const ContentContext = createContext({});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem('site_lang') || 'en');
  const [contentEn, setContentEn] = useState(() => getContent('en'));
  const [contentFr, setContentFr] = useState(() => getContent('fr'));

  useEffect(() => {
    fetchContent('en').then(c => setContentEn(prev => ({ ...prev, ...c })));
    fetchContent('fr').then(c => setContentFr(prev => ({ ...prev, ...c })));
  }, []);

  const setLang = (l) => {
    setLangState(l);
    localStorage.setItem('site_lang', l);
  };

  const content = lang === 'fr' ? contentFr : contentEn;

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <ContentContext.Provider value={content}>
        {children}
      </ContentContext.Provider>
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
export const useContent  = () => useContext(ContentContext);

export function useT() {
  const { lang } = useLanguage();
  return T[lang] || T.en;
}

export function useT() {
  const { lang } = useLanguage();
  return T[lang] || T.en;
}
