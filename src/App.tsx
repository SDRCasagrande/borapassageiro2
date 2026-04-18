import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { Features } from './components/Features';
import { Dashboard } from './components/Dashboard';
import { DiscountPopup } from './components/DiscountPopup';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { LeadFormPassageiro } from './components/LeadFormPassageiro';
import { AnalyticsService } from './services/analytics';
import { useEffect } from 'react';

import { PromoBanner } from './components/PromoBanner';
import { VideoGallery } from './components/VideoGallery';
import { CookieConsent } from './components/CookieConsent';

/* ─── SITE PASSAGEIRO ─────────────────────────── */
function SitePassageiro() {
  useEffect(() => {
    AnalyticsService.trackVisit();
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Bora Passageiro | Transporte por App em Xinguara e Região - PA</title>
        <meta name="description" content="Bora Passageiro — seu app de transporte em Xinguara, PA. Corridas rápidas, seguras e com preço justo. Baixe agora na Play Store ou App Store!" />
        <link rel="canonical" href="https://borapassageiroxinguara.com.br" />
        <meta property="og:title" content="Bora Passageiro — Transporte Rápido e Seguro em Xinguara" />
        <meta property="og:description" content="Peça sua corrida em segundos. Carros e motos à disposição em Xinguara e região. Baixe o app agora!" />
        <meta property="og:url" content="https://borapassageiroxinguara.com.br" />
        <meta property="og:image" content="https://borapassageiroxinguara.com.br/assets/logo-bora-full.png" />
      </Helmet>
      <PromoBanner />
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <VideoGallery />
        <Features />
        <Testimonials />
        <LeadFormPassageiro />
      </main>
      <Footer />
      <DiscountPopup />
      <FloatingWhatsApp />
      <CookieConsent companyName="Bora Passageiro" />
    </>
  );
}

/* ─── IMPORTS ────────────────────────────────── */
import { Login } from './pages/Login';
import { Integrations } from './pages/Integrations';
import { ContentManager } from './pages/ContentManager';
import { Motorista } from './pages/Motorista';

// Auth guard for protected routes
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('bp_admin_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

/* ─── APP ROOT ───────────────────────────────── */
function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans selection:bg-blue-500 selection:text-white">
        <Routes>
          {/* Site Passageiro (standalone) */}
          <Route path="/" element={<SitePassageiro />} />
          <Route path="/passageiro" element={<SitePassageiro />} />

          {/* Site Motorista (standalone) */}
          <Route path="/motorista" element={<Motorista />} />

          {/* Admin Routes (shared) */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/integrations" element={
            <ProtectedRoute>
              <Integrations />
            </ProtectedRoute>
          } />
          <Route path="/content" element={
            <ProtectedRoute>
              <ContentManager />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
