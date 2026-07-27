import React, { createContext, useContext, useState } from 'react';
import { getContent } from '../utils/storage';
import T from '../utils/translations';

const LanguageContext = createContext({ lang: 'en', setLang: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem('site_lang') || 'en');

  const setLang = (l) => {
    setLangState(l);
    localStorage.setItem('site_lang', l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);

export function useContent() {
  const { lang } = useLanguage();
  return getContent(lang);
}

export function useT() {
  const { lang } = useLanguage();
  return T[lang] || T.en;
}
