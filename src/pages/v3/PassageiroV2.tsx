import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnalyticsService } from '../../services/analytics';
import { Shield, Clock, MapPin, Smartphone } from 'lucide-react';
import { ActionButtons } from '../../components/ActionButtons';
import { FloatingWhatsApp } from '../../components/FloatingWhatsApp';

/* ─── PREMIUM HEADER ───────────────────────────────────── */
function PremiumHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/5 text-white transition-all duration-300">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2">
          <img src="/assets/logo-novo.png" alt="Bora Passageiro" className="h-16 sm:h-20 w-auto object-contain brightness-0 invert" />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#vantagens" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Vantagens</a>
          <a href="#como-funciona" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Como Funciona</a>
          <a href="#seguranca" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Segurança</a>
        </nav>
        <a href="#download" className="text-sm font-bold bg-white text-black px-5 py-2.5 rounded-full hover:scale-105 transition-transform">
          Baixar App
        </a>
      </div>
    </header>
  );
}

/* ─── ULTRA MODERN HERO ────────────────────────────────── */
function PassageiroHeroV3() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="inicio" className="relative min-h-[95vh] flex items-center justify-center pt-24 overflow-hidden bg-[#030712]">
      {/* Dynamic Backgrounds */}
      <motion.div style={{ y: y1 }} className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-cyan-600/20 rounded-full blur-[120px] mix-blend-screen" />
      <motion.div style={{ y: y2 }} className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-blue-600/20 rounded-full blur-[100px] mix-blend-screen" />
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center text-center space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <span className="text-xs sm:text-sm font-semibold text-cyan-50 uppercase tracking-widest">
            A Revolução Mobilidade PA
          </span>
        </motion.div>

        <motion.h1 
          style={{ opacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-tighter leading-[0.9]"
        >
          Meio Caminho <br className="hidden sm:block" />
          <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Andado.</span>
        </motion.h1>

        <motion.p 
          style={{ opacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-blue-100/60 max-w-2xl font-medium"
        >
          Carros no conforto do seu toque. Mais segurança, rapidez e tecnologia premium pelas ruas de Xinguara.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-8 w-full max-w-sm"
        >
          <ActionButtons />
        </motion.div>
      </div>

      {/* Floating 3D Phone Mockup Illustration */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, type: "spring" }}
        className="absolute bottom-[-20%] right-[-5%] md:right-[10%] w-[300px] md:w-[400px] pointer-events-none opacity-50 md:opacity-100"
      >
        <img src="/assets/mockup-app.png" alt="App Preview" className="w-full h-auto drop-shadow-2xl" onError={(e) => e.currentTarget.style.display = 'none'} />
      </motion.div>
    </section>
  );
}

/* ─── BENTO GRID FEATURES ──────────────────────────────── */
function BentoGridFeatures() {
  return (
    <section id="vantagens" className="py-24 sm:py-32 bg-[#030712] relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Menos atrito. <br/><span className="text-cyan-400">Mais viagem.</span></h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Card 1 - Large */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-gradient-to-br from-[#0c1322] to-[#0a101d] rounded-[2rem] border border-white/5 p-8 sm:p-12 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700">
              <Smartphone className="w-32 h-32 text-cyan-500" />
            </div>
            <div className="relative z-10 w-full md:w-2/3 h-full flex flex-col justify-between">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Carros em Segundos</h3>
                <p className="text-blue-100/60 text-lg leading-relaxed">
                  Sem espera longa. Nosso algoritmo otimizado em escala conecta você instantaneamente ao motorista mais próximo.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2 - Vertical */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-[#0c1322] to-[#0a101d] rounded-[2rem] border border-white/5 p-8 relative overflow-hidden group"
          >
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-40 transition-opacity duration-500">
              <Shield className="w-48 h-48 text-blue-500" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Proteção Level Max</h3>
              <p className="text-blue-100/60 text-base">
                Monitoramento GPS em tempo real e verificação severa de antecedentes dos motoristas.
              </p>
            </div>
          </motion.div>

          {/* Card 3 - Small */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-[#0c1322] rounded-[2rem] border border-white/5 p-8"
          >
            <MapPin className="w-8 h-8 text-white/40 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Cobertura Ampla</h3>
            <p className="text-white/50 text-sm">Xinguara, Conceição e Redenção 100% integradas.</p>
          </motion.div>

          {/* Card 4 - Wide */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-[#0c1322] rounded-[2rem] border border-white/5 p-8 flex flex-col sm:flex-row items-center gap-8"
          >
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-4">Avaliado em 4.9/5 ★</h3>
              <p className="text-white/50">Centenas de corridas elogiadas todos os dias devido ao nosso padrão rigoroso de qualidade nas vias.</p>
            </div>
            <div className="w-full sm:w-auto">
              <ActionButtons />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ─── V3 PAGE EXPORT ───────────────────────────────────── */
export function PassageiroV2() {
  useEffect(() => {
    AnalyticsService.trackVisit();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#030712] min-h-screen selection:bg-cyan-500/30 selection:text-cyan-50">
      <Helmet>
        <title>Bora Passageiro | A Revolução da Mobilidade em Xinguara</title>
        <meta name="description" content="Carros confortáveis no seu toque. Peça em segundos com segurança total. Baixe o app do Bora Passageiro." />
      </Helmet>

      <PremiumHeader />
      
      <main>
        <PassageiroHeroV3 />
        <BentoGridFeatures />
      </main>

      <FloatingWhatsApp />
    </div>
  );
}
