import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { Features } from './components/Features';
import { DriverSection } from './components/DriverSection';
import { Dashboard } from './components/Dashboard';
import { DiscountPopup } from './components/DiscountPopup';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { AnalyticsService } from './services/analytics';
import { useEffect } from 'react';

import { PromoBanner } from './components/PromoBanner';
import { VideoGallery } from './components/VideoGallery';

function LandingPage() {
  // Track visit on mount
  useEffect(() => {
    AnalyticsService.trackVisit();
  }, []);

  // Scroll to hash on page load (SPA fix)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Wait for DOM to render all sections
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, []);

  return (
    <>
      <PromoBanner />
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <VideoGallery />
        <Features />
        <Testimonials />
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

// Auth guard for protected routes
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('bp_admin_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans selection:bg-blue-500 selection:text-white">
        <Routes>
          <Route path="/" element={<LandingPage />} />
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
        {/* Cookie Consent Banner - LGPD Compliance */}
        <CookieConsent companyName="Bora Passageiro" />
      </div>
    </Router>
  )
}

export default App
