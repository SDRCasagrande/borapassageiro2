import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PassageiroV2 } from './pages/v3/PassageiroV2';
import { MotoristaV2 } from './pages/v3/MotoristaV2';
import { Dashboard } from './components/Dashboard';
import { AnalyticsService } from './services/analytics';
import { useEffect } from 'react';

import { CookieConsent } from './components/CookieConsent';
import { SplitHero } from './components/v3/SplitHero';

/* ─── HOME PAGE (DOMÍNIO PRINCIPAL JUNTADO) ──── */
function HomePage() {
  useEffect(() => {
    AnalyticsService.trackVisit();
  }, []);

  return (
    <>
      <Helmet>
        <title>Bora Passageiro | Transporte por App e Motorista Parceiro - PA</title>
        <meta name="description" content="Bora Passageiro — seu app de transporte em Xinguara, PA. Corridas rápidas ou seja um motorista parceiro!" />
        <link rel="canonical" href="https://borapassageiroxinguara.com.br" />
        <meta property="og:title" content="Bora Passageiro — Viaje ou Dirija em Xinguara" />
        <meta property="og:description" content="Peça sua corrida em segundos ou seja um motorista parceiro. Baixe o app agora!" />
        <meta property="og:url" content="https://borapassageiroxinguara.com.br" />
        <meta property="og:image" content="https://borapassageiroxinguara.com.br/assets/logo-bora-full.png" />
      </Helmet>
      
      <main className="min-h-screen bg-[#030712]">
        <SplitHero />
      </main>
      
      <CookieConsent companyName="Bora Passageiro" />
    </>
  );
}

/* ─── IMPORTS ────────────────────────────────── */
import { Login } from './pages/Login';
import { Integrations } from './pages/Integrations';
import { ContentManager } from './pages/ContentManager';

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
  const hostname = window.location.hostname;
  
  // Decide qual componente renderizar na rota raiz (/) com base no subdomínio
  let RootComponent = <HomePage />;
  if (hostname.startsWith('motorista.')) {
    RootComponent = <MotoristaV2 />;
  } else if (hostname.startsWith('passageiro.')) {
    RootComponent = <PassageiroV2 />;
  }

  return (
    <Router>
      <div className="min-h-screen font-sans selection:bg-blue-500 selection:text-white">
        <Routes>
          {/* Rota Raiz Dinâmica (resolve o problema de todas as páginas serem iguais nos subdomínios) */}
          <Route path="/" element={RootComponent} />

          {/* Mantém as rotas de path explícitas para garantir funcionamento de links diretos */}
          <Route path="/passageiro" element={<PassageiroV2 />} />
          <Route path="/motorista" element={<MotoristaV2 />} />

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
