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

/* ─── DOWNLOAD PAGE (DOMÍNIO PRINCIPAL) ──────── */
function DownloadPage() {
  useEffect(() => {
    AnalyticsService.trackVisit();
  }, []);

  return (
    <>
      <Helmet>
        <title>Bora Passageiro | Baixe o App - Xinguara e Região - PA</title>
        <meta name="description" content="Baixe o Bora Passageiro — app de transporte em Xinguara, PA. Disponível na Play Store e App Store!" />
        <link rel="canonical" href="https://borapassageiroxinguara.com.br" />
        <meta property="og:title" content="Bora Passageiro — Baixe o App" />
        <meta property="og:description" content="App de transporte em Xinguara e região. Baixe agora!" />
        <meta property="og:url" content="https://borapassageiroxinguara.com.br" />
        <meta property="og:image" content="https://borapassageiroxinguara.com.br/assets/logo-bora-full.png" />
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
        {/* Aurora Background Orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 text-center space-y-8 max-w-lg">
          {/* Logo */}
          <img
            src="/assets/logo-bora-full.png"
            alt="Bora Passageiro"
            className="h-24 sm:h-32 md:h-40 w-auto object-contain mx-auto drop-shadow-2xl"
          />

          {/* Title */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Seu transporte{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                rápido e seguro
              </span>
            </h1>
            <p className="text-blue-100/60 text-base sm:text-lg max-w-md mx-auto">
              Baixe o app e peça sua corrida em segundos. Disponível para Xinguara e região.
            </p>
          </div>

          {/* Store Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-2">
            <a
              href="https://play.google.com/store/apps/details?id=br.com.devbase.borapassageiro&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => AnalyticsService.trackClick('playStore')}
              className="transform hover:scale-105 transition-all duration-300 drop-shadow-xl hover:drop-shadow-2xl"
            >
              <img
                src="/assets/btn-google-play.png"
                alt="Disponível no Google Play"
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </a>

            <a
              href="https://apps.apple.com/br/app/bora-passageiro-clientes/id1579518558"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => AnalyticsService.trackClick('appStore')}
              className="transform hover:scale-105 transition-all duration-300 drop-shadow-xl hover:drop-shadow-2xl"
            >
              <img
                src="/assets/btn-app-store.png"
                alt="Disponível na App Store"
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </a>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-white/70 text-xs font-medium backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            App Legalizado — Xinguara, Conceição, Redenção e Região
          </div>
        </div>

        {/* Footer credit */}
        <div className="absolute bottom-6 text-center text-xs text-white/20">
          © {new Date().getFullYear()} Bora Passageiro PA
        </div>
      </div>

      <FloatingWhatsApp />
    </>
  );
}

/* ─── LANDING PASSAGEIRO (TRÁFEGO PAGO) ──────── */
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
        <link rel="canonical" href="https://borapassageiroxinguara.com.br/passageiro" />
        <meta property="og:title" content="Bora Passageiro — Transporte Rápido e Seguro em Xinguara" />
        <meta property="og:description" content="Peça sua corrida em segundos. Carros e motos à disposição em Xinguara e região. Baixe o app agora!" />
        <meta property="og:url" content="https://borapassageiroxinguara.com.br/passageiro" />
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
          {/* Download Page (domínio principal) */}
          <Route path="/" element={<DownloadPage />} />

          {/* Landing Passageiro (tráfego pago) */}
          <Route path="/passageiro" element={<SitePassageiro />} />

          {/* Landing Motorista (tráfego pago) */}
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
