import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import { useLanguage, useContent } from '../context/LanguageContext';
import T from '../utils/translations';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const { lang, setLang } = useLanguage();
  const content = useContent();
  const tn = (T[lang] || T.en).nav;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // Hidden admin access: Ctrl+Shift+A
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') navigate('/admin');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollTo(targetId), 120);
    } else {
      scrollTo(targetId);
    }
  };

  const handleFreeQuote = (e) => {
    e.preventDefault();
    setMobileOpen(false);
    navigate('/free-quote');
  };

  const navLinks = [
    { label: tn.home,          to: '/',               active: location.pathname === '/' },
    { label: tn.advertising,   to: '/advertising',    active: location.pathname.startsWith('/advertising') || location.pathname.startsWith('/services') },
    { label: tn.ourActivities, to: '/our-activities', active: location.pathname === '/our-activities' },
    { label: tn.aboutUs,       to: '/about-us',       active: location.pathname === '/about-us' },
    { label: tn.contactUs,     to: '/contact',        active: location.pathname === '/contact' },
  ];

  return (
    <>
      <nav className={`bg-surface/95 backdrop-blur-md fixed top-0 w-full z-50 border-b border-outline-variant/30 h-20 transition-all ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-margin-desktop flex items-center justify-between h-full">
          {/* Logo + Brand */}
          <div onClick={(e) => handleNavClick(e, 'home')} className="flex items-center gap-3 cursor-pointer min-w-0">
            <img alt="Influence Digital Ads" className="h-8 sm:h-10 flex-shrink-0" src={logoImg} />
            <span className="font-display-lg text-[18px] sm:text-[22px] lg:text-[24px] font-bold text-primary tracking-tighter truncate">{content.navBrand}</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(l => (
              <Link key={l.to} to={l.to}
                className={`font-medium transition-colors hover:text-secondary ${l.active ? 'text-secondary' : 'text-on-surface-variant'}`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="h-5 w-px bg-outline-variant/30"></div>
            <div className="flex items-center gap-1 font-label-caps text-label-caps font-semibold">
              <span onClick={() => setLang('en')}
                className={`cursor-pointer transition-colors ${lang === 'en' ? 'text-on-surface' : 'text-on-surface/50 hover:text-on-surface'}`}>EN</span>
              <span className="text-outline-variant select-none">/</span>
              <span onClick={() => setLang('fr')}
                className={`cursor-pointer text-secondary transition-colors ${lang === 'fr' ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}>FR</span>
            </div>
            <button onClick={handleFreeQuote} className="bg-primary text-on-primary px-6 py-2.5 font-label-caps text-label-caps hover:bg-secondary transition-colors">
              {tn.freeQuote}
            </button>
          </div>

          {/* Mobile Right Section */}
          <div className="flex lg:hidden items-center gap-3">
            <div className="flex items-center gap-1 font-label-caps text-[11px] font-semibold">
              <span onClick={() => setLang('en')} className={`cursor-pointer ${lang === 'en' ? 'text-on-surface' : 'text-on-surface/40'}`}>EN</span>
              <span className="text-outline-variant">/</span>
              <span onClick={() => setLang('fr')} className={`cursor-pointer text-secondary ${lang === 'fr' ? 'opacity-100' : 'opacity-70'}`}>FR</span>
            </div>
            <button onClick={() => setMobileOpen(p => !p)} className="p-2 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute top-20 left-0 right-0 bg-white border-b border-outline-variant/20 shadow-xl"
            onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 space-y-1">
              {navLinks.map(l => (
                <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${l.active ? 'text-secondary bg-surface' : 'text-on-surface-variant hover:bg-surface-container'}`}>
                  {l.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-outline-variant/20 mt-3">
                <button onClick={handleFreeQuote}
                  className="block w-full text-center bg-primary text-on-primary px-6 py-3 font-label-caps text-label-caps hover:bg-secondary transition-colors rounded">
                  {tn.freeQuote}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
