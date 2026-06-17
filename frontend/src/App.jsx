import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(e) { return { error: e }; }
  componentDidCatch(e, info) { console.error('[Crash]', e.message, info.componentStack); }
  reset = () => { localStorage.setItem('site_lang', 'en'); window.location.reload(); };
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{ padding: '40px', maxWidth: '600px', margin: '80px auto', fontFamily: 'sans-serif' }}>
        <h2 style={{ color: '#c00' }}>Something went wrong</h2>
        <pre style={{ background: '#f5f5f5', padding: '16px', fontSize: '13px', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
          {this.state.error.message}
        </pre>
        <p style={{ color: '#555' }}>This may be a language switch issue. Click below to reset to English and reload.</p>
        <button onClick={this.reset} style={{ padding: '10px 24px', background: '#1a1a2e', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
          Reset to English &amp; Reload
        </button>
      </div>
    );
  }
}
import { fetchImages, fetchServices, fetchContent } from './utils/storage';
import { LanguageProvider } from './context/LanguageContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Admin from './pages/Admin';
import ServicePage from './pages/ServicePage';
import Advertising from './pages/Advertising';
import OurActivities from './pages/OurActivities';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';

function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    fetchImages();
    fetchServices();
    fetchContent('en');
    fetchContent('fr');
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-on-surface bg-surface">
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/advertising" element={<Advertising />} />
          <Route path="/our-activities" element={<OurActivities />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <Router>
          <Layout />
        </Router>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
