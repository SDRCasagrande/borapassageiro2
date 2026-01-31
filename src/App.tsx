import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { Features } from './components/Features';
import { DriverSection } from './components/DriverSection';
import { Dashboard } from './components/Dashboard';
import { DiscountPopup } from './components/DiscountPopup';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AnalyticsService } from './services/analytics';
import { useEffect } from 'react';

import { PromoBanner } from './components/PromoBanner';
import { VideoGallery } from './components/VideoGallery';

function LandingPage() {
  // Track visit on mount
  useEffect(() => {
    AnalyticsService.trackVisit();
  }, []);

  return (
    <>
      <PromoBanner />
      <Header />
      <main>
        <Hero />
        <VideoGallery />
        <Features />
        <DriverSection />
      </main>
      <Footer />
      <DiscountPopup />
      <FloatingWhatsApp />
    </>
  );
}

import { Login } from './pages/Login';
import { Integrations } from './pages/Integrations';
import { ContentManager } from './pages/ContentManager';
import { CookieConsent } from './components/CookieConsent';

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans selection:bg-blue-500 selection:text-white">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/content" element={<ContentManager />} />
        </Routes>
        {/* Cookie Consent Banner - LGPD Compliance */}
        <CookieConsent companyName="Bora Passageiro" />
      </div>
    </Router>
  )
}

export default App
