import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnalyticsService } from '../../services/analytics';
import { FloatingWhatsApp } from '../../components/FloatingWhatsApp';
import { Car, DollarSign, Clock, TrendingUp, HandCoins, ArrowRight } from 'lucide-react';
import { CookieConsent } from '../../components/CookieConsent';

/* ─── PREMIUM HEADER MOTORISTA ─────────────────────────── */
function PremiumHeaderMotorista() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f18]/80 backdrop-blur-xl border-b border-white/5 text-white transition-all duration-300">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2">
          <img src="/assets/logo-novo.png" alt="Bora Motorista" className="h-16 sm:h-20 w-auto object-contain brightness-0 invert" />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#ganhos" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Ganhos & Taxas</a>
          <a href="#requisitos" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Requisitos</a>
        </nav>
        <a href="https://wa.me/5594992777717?text=Quero%20ser%20motorista" target="_blank" rel="noopener noreferrer" className="text-sm font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-5 py-2.5 rounded-full hover:scale-105 transition-transform shadow-lg shadow-emerald-500/20">
          Cadastre-se Já
        </a>
      </div>
    </header>
  );
}

/* ─── HERO MOTORISTA V3 ────────────────────────────────── */
function MotoristaHeroV3() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-[#030712]">
      {/* Dynamic Backgrounds */}
      <motion.div style={{ y: y1 }} className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-emerald-600/10 rounded-full blur-[150px] mix-blend-screen" />
      <motion.div style={{ y: y2 }} className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-teal-600/10 rounded-full blur-[120px] mix-blend-screen" />
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Copy */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold uppercase tracking-wider"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Vagas na Região do Xingu
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter leading-[1.1]"
          >
            Sua dedicação,<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">seu lucro real.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-emerald-50/60 max-w-lg font-medium"
          >
            O Bora Passageiro repassa o lucro de forma justa. Nossa taxa fixa de 10% garante que o dinheiro fique no seu bolso de verdade.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <a href="https://wa.me/5594992777717?text=Quero%20ser%20motorista" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)]">
              Começar Agora <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#ganhos" className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 px-8 rounded-xl transition-all">
              Simular Ganhos
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center gap-6 pt-4 text-emerald-50/50 text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Ganhos Diários
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              Horário Flexível
            </div>
          </motion.div>
        </div>

        {/* Right Side: Visual Fintech Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotateY: 30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.4, type: "spring" }}
          className="relative perspective-1000 hidden lg:block"
        >
          <div className="relative z-20 w-full max-w-md mx-auto bg-gradient-to-br from-[#1a2332] to-[#0c1322] border border-white/10 p-8 rounded-[2rem] shadow-2xl overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-emerald-500/10 before:to-transparent before:pointer-events-none">
            {/* Glossy top highlight */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
            
            <div className="flex justify-between items-start mb-12 relative z-10">
              <div>
                <p className="text-emerald-400 font-bold text-sm tracking-widest uppercase mb-1">Seu Saldo</p>
                <h3 className="text-5xl font-black text-white tracking-tighter">R$ 1.845<span className="text-2xl text-white/40">,50</span></h3>
              </div>
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-400" />
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center p-4 bg-black/40 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Corridas Hoje</p>
                    <p className="text-sm text-white/50">24 finalizadas</p>
                  </div>
                </div>
                <span className="text-emerald-400 font-bold">+ R$ 340,00</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-black/40 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center">
                    <HandCoins className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Bora Passageiro</p>
                    <p className="text-sm text-white/50">Taxa do App</p>
                  </div>
                </div>
                <span className="text-white/40 font-bold">- R$ 34,00</span>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
              <div className="text-sm text-white/50">Dividendo Semanal</div>
              <div className="inline-flex items-center gap-1 text-emerald-400 font-bold text-sm">
                <TrendingUp className="w-4 h-4" />
                +24% vs semana anterior
              </div>
            </div>
          </div>
          
          {/* Decorative elements behind card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[url('/assets/noise.png')] opacity-20 pointer-events-none rounded-full blur-xl mix-blend-overlay z-0" />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── NEO-FINTECH CALCULATOR ───────────────────────────── */
function EarningsNeoCalculator() {
  const [rides, setRides] = useState(15);
  const averageTicket = 15; // R$ 15 avg per ride
  const totalGross = rides * averageTicket;
  const boraFee = totalGross * 0.10; // 10%
  const netEarningsDay = totalGross - boraFee;
  const netEarningsMonth = netEarningsDay * 25; // 25 days/month

  return (
    <section id="ganhos" className="py-24 bg-[#0a0f18] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Simulador <span className="text-emerald-400">Transparente</span></h2>
          <p className="mt-4 text-lg text-emerald-50/60 max-w-2xl mx-auto">
            Sem taxas ocultas, sem letras miúdas. Calcule exatamente quanto vai para o seu bolso com a nossa taxa de 10%.
          </p>
        </div>

        <div className="bg-[#121a28] rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl flex flex-col lg:flex-row max-w-5xl mx-auto">
          {/* Controls */}
          <div className="p-8 md:p-12 lg:w-1/2 border-b lg:border-b-0 lg:border-r border-white/5">
            <h3 className="text-2xl font-bold text-white mb-8">Quantas corridas por dia?</h3>
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-emerald-50/50 font-medium">Média diária</span>
                  <span className="text-4xl font-black text-emerald-400">{rides}</span>
                </div>
                <input 
                  type="range" 
                  min="5" max="40" 
                  value={rides}
                  onChange={(e) => setRides(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-black/50 accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-white/30 font-bold">
                  <span>5 corridas</span>
                  <span>40 corridas</span>
                </div>
              </div>
              
              <div className="bg-black/30 rounded-2xl p-6 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-white/60 font-medium text-sm">Ticket Médio Estimado</p>
                  <p className="text-xs text-white/40 mt-1">Valor base de simulação em Xinguara</p>
                </div>
                <span className="text-xl font-bold text-white">R$ 15,00</span>
              </div>
            </div>
          </div>

          {/* Result Widget */}
          <div className="p-8 md:p-12 lg:w-1/2 bg-gradient-to-br from-[#162032] to-[#0c1322] flex flex-col justify-center">
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-emerald-400 font-bold tracking-widest text-sm uppercase">Ganhos Mensais (25 dias)</p>
                <h4 className="text-6xl sm:text-7xl font-black text-white tracking-tighter">
                  R$ {netEarningsMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </h4>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/5">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Faturamento Bruto Dia</span>
                  <span className="text-white font-medium">R$ {totalGross.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Taxa Bora Passeio (10%)</span>
                  <span className="text-rose-400 font-medium">- R$ {boraFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm pt-3 border-t border-white/5">
                  <span className="text-emerald-100/70 font-bold">Líquido no Bolso (Dia)</span>
                  <span className="text-emerald-400 font-bold text-lg">R$ {netEarningsDay.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── EXPORT V3 ────────────────────────────────────────── */
export function MotoristaV2() {
  useEffect(() => {
    AnalyticsService.trackVisit();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#030712] min-h-screen selection:bg-emerald-500/30 selection:text-emerald-50">
      <Helmet>
        <title>Seja Motorista Parceiro | Bora Passageiro V3</title>
        <meta name="description" content="Dirija, faça seus horários e pague apenas 10% de taxa fixa. Renda extra de verdade em Xinguara e região." />
      </Helmet>

      <PremiumHeaderMotorista />
      
      <main>
        <MotoristaHeroV3 />
        <EarningsNeoCalculator />
      </main>

      <FloatingWhatsApp />
      <CookieConsent companyName="Bora Passageiro" />
    </div>
  );
}
