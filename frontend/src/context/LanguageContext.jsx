import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getContent, fetchContent } from '../utils/storage';
import T from '../utils/translations';

const LanguageContext = createContext({ lang: 'en', setLang: () => {}, content: {}, refreshContent: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem('site_lang') || 'en');
  const [contentEn, setContentEn] = useState(() => getContent('en'));
  const [contentFr, setContentFr] = useState(() => getContent('fr'));

  useEffect(() => {
    fetchContent('en').then(c => { if (c) setContentEn(c); });
    fetchContent('fr').then(c => { if (c) setContentFr(c); });
  }, []);

  const refreshContent = useCallback(() => {
    fetchContent('en').then(c => { if (c) setContentEn(c); });
    fetchContent('fr').then(c => { if (c) setContentFr(c); });
  }, []);

  const setLang = (l) => {
    setLangState(l);
    localStorage.setItem('site_lang', l);
  };

  const content = lang === 'fr' ? contentFr : contentEn;

  return (
    <LanguageContext.Provider value={{ lang, setLang, content, refreshContent }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);

export function useContent() {
  const { content } = useContext(LanguageContext);
  return content;
}

export function useT() {
  const { lang } = useLanguage();
  return T[lang] || T.en;
}
