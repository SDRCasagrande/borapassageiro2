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

function LandingPage() {
  // Track visit on mount
  useEffect(() => {
    AnalyticsService.trackVisit();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <DriverSection />
      </main>
      <Footer />
      <DiscountPopup />
      <FloatingWhatsApp />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans selection:bg-blue-500 selection:text-white">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
