import { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { CookieConsent } from '../components/CookieConsent';
import { ActionButtons } from '../components/ActionButtons';
import { useScrollAnimation, useCountUp } from '../hooks/useScrollAnimation';
import { AnalyticsService } from '../services/analytics';
import {
    CheckCircle2, DollarSign, Clock, Car, FileText, Shield,
    Calculator, Send, User, Phone, ChevronDown, Star, TrendingUp,
    Bike
} from 'lucide-react';

export function Motorista() {
    useEffect(() => {
        AnalyticsService.trackVisit();
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Helmet>
                <title>Seja Motorista Parceiro | Bora Passageiro Xinguara - PA</title>
                <meta name="description" content="Dirija e ganhe mais! Seja motorista parceiro do Bora Passageiro em Xinguara e região. Horário flexível, ganhos acima da média. Cadastre-se agora!" />
                <link rel="canonical" href="https://borapassageiroxinguara.com.br/motorista" />
                <meta property="og:title" content="Seja Motorista Parceiro | Bora Passageiro Xinguara" />
                <meta property="og:description" content="Dirija e ganhe mais! Trabalhe no seu horário com carro ou moto. Ganhos acima da média em Xinguara e região." />
                <meta property="og:url" content="https://borapassageiroxinguara.com.br/motorista" />
                <meta property="og:image" content="https://borapassageiroxinguara.com.br/assets/logo-bora-full.png" />
            </Helmet>
            <Header />
            <main>
                <MotoristaHero />
                <EarningsCalculator />
                <Requirements />
                <Benefits />
                <MotoristaTestimonials />
                <LeadFormMotorista />
                <DownloadCTA />
            </main>
            <Footer />
            <FloatingWhatsApp />
            <CookieConsent companyName="Bora Passageiro" />
        </>
    );
}

/* ─── HERO ─────────────────────────────────────────── */
function MotoristaHero() {
    const titleRef = useScrollAnimation<HTMLDivElement>({ type: 'fadeUp', delay: 0.2 });
    const cardRef = useScrollAnimation<HTMLDivElement>({ type: 'slideRight', delay: 0.5 });

    return (
        <section id="inicio" className="relative min-h-[85vh] md:min-h-[90vh] flex items-center pt-20 sm:pt-28 pb-8 sm:pb-12 overflow-hidden">
            <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 z-10 grid md:grid-cols-2 gap-6 md:gap-12 items-center">
                {/* Text */}
                <div ref={titleRef} className="text-center md:text-left space-y-6">
                    <img
                        src="/assets/logo-bora-full.png"
                        alt="Bora Passageiro PA"
                        className="h-12 sm:h-16 md:h-24 w-auto object-contain mx-auto md:mx-0 drop-shadow-2xl"
                    />

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-lg">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        App Legalizado — Vagas Abertas
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none text-white drop-shadow-lg">
                        Dirija e <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                            ganhe mais
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-blue-50 max-w-lg mx-auto md:mx-0 font-medium leading-relaxed drop-shadow-md">
                        Trabalhe no seu horário, sem patrão. Seja parceiro do Bora Passageiro e aumente sua renda com carro ou moto.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                        <a
                            href="#cadastro-motorista"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg shadow-green-500/25 transform hover:-translate-y-1 transition-all text-base sm:text-lg"
                        >
                            <Car className="w-5 h-5" />
                            Quero ser motorista
                        </a>
                        <a
                            href="https://wa.me/5594992777717?text=Vim%20pelo%20site%20e%20quero%20ser%20um%20Motorista%20do%20Bora%20Passageiro"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => AnalyticsService.trackClick('whatsapp')}
                            className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all text-sm sm:text-base"
                        >
                            <Phone className="w-5 h-5" />
                            Falar no WhatsApp
                        </a>
                    </div>

                    <div className="flex items-center justify-center md:justify-start gap-6 pt-4 text-sm font-semibold text-white/90">
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-green-400" />
                            <span>Você fica com 90% da corrida</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-cyan-300" />
                            <span>Horário flexível</span>
                        </div>
                    </div>
                </div>

                {/* Driver Card Mockup */}
                <div ref={cardRef} className="relative flex justify-center items-center mt-6 md:mt-0">
                    <div className="absolute -z-10 w-[200px] sm:w-[300px] h-[350px] sm:h-[500px] bg-green-600/20 rounded-full blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                    <div className="relative bg-[#1a1f2e] border border-gray-700/50 p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl max-w-[280px] sm:max-w-sm w-full transform hover:scale-[1.02] transition-transform duration-500">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg shadow-green-500/30 border-2 border-green-500 bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                                <Car className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Motorista Parceiro</h3>
                                <p className="text-green-400 text-xs font-medium">Resumo semanal</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="bg-[#131620] p-5 rounded-xl border border-gray-700/30">
                                <span className="text-gray-400 text-xs block mb-1">Ganhos esta semana (90%)</span>
                                <span className="text-white text-3xl sm:text-4xl font-black tracking-tight">R$ 2.450</span>
                                <div className="flex items-center gap-1 mt-2 text-green-400 text-sm font-medium">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>+18% vs semana passada</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-[#131620] p-4 rounded-xl border border-gray-700/30 text-center">
                                    <span className="text-gray-400 text-xs block mb-1">Corridas</span>
                                    <span className="text-white text-2xl font-bold">62</span>
                                </div>
                                <div className="bg-[#131620] p-4 rounded-xl border border-gray-700/30 text-center">
                                    <span className="text-gray-400 text-xs block mb-1">Avaliação</span>
                                    <div className="flex items-center justify-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        <span className="text-white text-2xl font-bold">4.9</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 p-3 rounded-xl text-center">
                                <span className="text-green-400 text-sm font-bold">🏆 Top 10 Motoristas da Região</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─── EARNINGS CALCULATOR ───────────────────────────── */
function EarningsCalculator() {
    const [hours, setHours] = useState(8);
    const [days, setDays] = useState(5);
    const sectionRef = useScrollAnimation<HTMLElement>({ type: 'fadeUp' });

    const earnings = useMemo(() => {
        const avgPerHour = 28; // R$ per hour estimate (gross)
        const grossDaily = hours * avgPerHour;
        const daily = Math.round(grossDaily * 0.9); // 90% para o motorista
        const weekly = daily * days;
        const monthly = weekly * 4;
        return { daily, weekly, monthly };
    }, [hours, days]);

    const dailyRef = useCountUp(earnings.daily);
    const weeklyRef = useCountUp(earnings.weekly);
    const monthlyRef = useCountUp(earnings.monthly);

    return (
        <section ref={sectionRef} id="calculadora" className="py-20 md:py-28 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                }} />
            </div>

            <div className="max-w-4xl mx-auto px-3 sm:px-4 relative z-10">
                <div className="text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider">
                        <Calculator className="w-3 h-3" />
                        Calculadora de Ganhos
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                        Quanto você pode{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                            ganhar?
                        </span>
                    </h2>
                    <p className="text-blue-100/60 max-w-lg mx-auto">
                        Você fica com <strong className="text-green-400">90% do valor</strong> de cada corrida. Ajuste e veja sua estimativa:
                    </p>
                </div>

                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 space-y-6 sm:space-y-8">
                    {/* Sliders */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-white font-medium flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-cyan-400" />
                                    Horas por dia
                                </label>
                                <span className="text-cyan-400 font-bold text-lg">{hours}h</span>
                            </div>
                            <input
                                type="range"
                                min="2"
                                max="14"
                                value={hours}
                                onChange={(e) => setHours(Number(e.target.value))}
                                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                            />
                            <div className="flex justify-between text-xs text-white/30">
                                <span>2h</span>
                                <span>14h</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-white font-medium flex items-center gap-2">
                                    <ChevronDown className="w-4 h-4 text-green-400" />
                                    Dias por semana
                                </label>
                                <span className="text-green-400 font-bold text-lg">{days}d</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="7"
                                value={days}
                                onChange={(e) => setDays(Number(e.target.value))}
                                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-400 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                            />
                            <div className="flex justify-between text-xs text-white/30">
                                <span>1 dia</span>
                                <span>7 dias</span>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center">
                            <span className="text-cyan-400/70 text-xs font-medium block mb-1">Por dia</span>
                            <span className="text-white text-xl sm:text-2xl md:text-3xl font-black">
                                R$ <span ref={dailyRef}>{earnings.daily}</span>
                            </span>
                        </div>
                        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center">
                            <span className="text-green-400/70 text-xs font-medium block mb-1">Por semana</span>
                            <span className="text-white text-xl sm:text-2xl md:text-3xl font-black">
                                R$ <span ref={weeklyRef}>{earnings.weekly}</span>
                            </span>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center">
                            <span className="text-yellow-400/70 text-xs font-medium block mb-1">Por mês</span>
                            <span className="text-white text-xl sm:text-2xl md:text-3xl font-black">
                                R$ <span ref={monthlyRef}>{earnings.monthly}</span>
                            </span>
                        </div>
                    </div>

                    <p className="text-center text-xs text-white/30">
                        *Valores já com desconto de 10% da taxa do app. Ganhos reais podem variar conforme demanda.
                    </p>
                </div>
            </div>
        </section>
    );
}

/* ─── REQUIREMENTS ───────────────────────────────────── */
function Requirements() {
    const gridRef = useScrollAnimation<HTMLDivElement>({ type: 'stagger' });

    const requirements = [
        { icon: <FileText className="w-6 h-6" />, title: 'CNH válida', desc: 'Categoria A (moto) ou B (carro)', color: 'from-blue-500 to-cyan-500' },
        { icon: <Car className="w-6 h-6" />, title: 'Veículo em boas condições', desc: 'Documentação em dia (CRLV)', color: 'from-purple-500 to-pink-500' },
        { icon: <Shield className="w-6 h-6" />, title: 'Antecedentes limpos', desc: 'Sem registros criminais', color: 'from-green-500 to-emerald-500' },
        { icon: <Bike className="w-6 h-6" />, title: 'Carro ou Moto', desc: 'Aceitamos ambos os veículos', color: 'from-orange-500 to-yellow-500' },
    ];

    return (
        <section id="requisitos" className="py-20 md:py-28 relative">
            <div className="max-w-5xl mx-auto px-3 sm:px-4">
                <div className="text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider">
                        <FileText className="w-3 h-3" />
                        O que você precisa
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            Requisitos
                        </span>{' '}
                        simples
                    </h2>
                    <p className="text-blue-100/60 max-w-lg mx-auto">
                        Cadastro rápido e sem burocracia. Comece a ganhar em poucos dias!
                    </p>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                    {requirements.map((req, i) => (
                        <div key={i} className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500 hover:-translate-y-1 group flex items-start gap-3 sm:gap-4">
                            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${req.color} flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                                {req.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">{req.title}</h3>
                                <p className="text-sm text-blue-100/60">{req.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─── BENEFITS ──────────────────────────────────────── */
function Benefits() {
    const gridRef = useScrollAnimation<HTMLDivElement>({ type: 'stagger' });

    const benefits = [
        { icon: <Shield className="w-7 h-7" />, title: 'App Legalizado', desc: 'Aplicativo regularizado. Trabalhe tranquilo e protegido pela lei.' },
        { icon: <DollarSign className="w-7 h-7" />, title: 'Taxa Reduzida — 90/10', desc: 'Você fica com 90% do valor da corrida. Só 10% é do aplicativo.' },
        { icon: <TrendingUp className="w-7 h-7" />, title: 'Tarifa Dinâmica em Tempo Real', desc: 'Preços ajustam automaticamente conforme demanda. Mais demanda = mais ganho.' },
        { icon: <Car className="w-7 h-7" />, title: 'Rode Menos Vazio', desc: 'Cálculo interno inteligente: o passageiro mais próximo sempre chega até você.' },
        { icon: <Star className="w-7 h-7" />, title: 'Parceiros Exclusivos', desc: 'Posto de gasolina, lava jato, oficina e estética com desconto para motoristas Bora.' },
        { icon: <Clock className="w-7 h-7" />, title: 'Suporte 24h + App da Região', desc: 'Somos da região e estamos sempre disponíveis. Suporte rápido via WhatsApp.' },
    ];

    return (
        <section className="py-20 md:py-24 relative overflow-hidden">
            <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-green-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-5xl mx-auto px-3 sm:px-4 relative z-10">
                <div className="text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-white">
                        Vantagens de ser{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                            parceiro
                        </span>
                    </h2>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {benefits.map((b, i) => (
                        <div key={i} className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/[0.06] hover:border-green-500/20 transition-all duration-300 group">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                                {b.icon}
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">{b.title}</h3>
                            <p className="text-xs sm:text-sm text-blue-100/60 leading-relaxed">{b.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─── MOTORISTA STATS ─────────────────────────────────── */
function MotoristaTestimonials() {
    const sectionRef = useScrollAnimation<HTMLElement>({ type: 'fadeUp' });

    return (
        <section ref={sectionRef} className="py-16 sm:py-24 relative">
            <div className="max-w-4xl mx-auto px-3 sm:px-4">
                <div className="text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
                        Por que motoristas{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                            escolhem o Bora
                        </span>
                    </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                    <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
                        <div className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">90%</div>
                        <p className="text-xs sm:text-sm text-blue-100/50 mt-1 sm:mt-2">Fica com o motorista</p>
                    </div>
                    <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
                        <div className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">5+</div>
                        <p className="text-xs sm:text-sm text-blue-100/50 mt-1 sm:mt-2">Cidades atendidas</p>
                    </div>
                    <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
                        <div className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">24h</div>
                        <p className="text-xs sm:text-sm text-blue-100/50 mt-1 sm:mt-2">Suporte via WhatsApp</p>
                    </div>
                    <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
                        <div className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">10%</div>
                        <p className="text-xs sm:text-sm text-blue-100/50 mt-1 sm:mt-2">Taxa do aplicativo</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─── LEAD FORM MOTORISTA ────────────────────────────── */
function LeadFormMotorista() {
    const [form, setForm] = useState({
        nome: '', cpf: '', telefone: '', modeloCarro: '', anoCarro: '', tipoVeiculo: 'carro'
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const sectionRef = useScrollAnimation<HTMLElement>({ type: 'fadeUp' });

    const API_URL = import.meta.env.VITE_API_URL || 'https://api.bkaiser.com.br';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.nome || !form.telefone) return;

        setLoading(true);
        try {
            await fetch(`${API_URL}/api/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, type: 'motorista', timestamp: new Date().toISOString() }),
            }).catch(() => {
                const leads = JSON.parse(localStorage.getItem('bp_leads') || '[]');
                leads.push({ ...form, type: 'motorista', timestamp: new Date().toISOString() });
                localStorage.setItem('bp_leads', JSON.stringify(leads));
            });

            AnalyticsService.trackClick('whatsapp');
            AnalyticsService.trackLead('motorista', form);
            setSuccess(true);

            setTimeout(() => {
                const msg = encodeURIComponent(
                    `Olá! Sou ${form.nome} e quero ser motorista parceiro do Bora Passageiro!\n\n🚗 Veículo: ${form.modeloCarro || 'Não informado'} (${form.anoCarro || 'N/A'})\n📱 Tel: ${form.telefone}`
                );
                window.open(`https://wa.me/5594992777717?text=${msg}`, '_blank');
            }, 1500);
        } catch {
            // Silent
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <section ref={sectionRef} id="cadastro-motorista" className="py-20 relative">
                <div className="max-w-lg mx-auto px-4 text-center">
                    <div className="bg-white/[0.04] backdrop-blur-sm border border-green-500/20 rounded-3xl p-10 space-y-4">
                        <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-2xl flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 text-green-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Pré-cadastro Enviado!</h3>
                        <p className="text-blue-100/70">Redirecionando para o WhatsApp...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section ref={sectionRef} id="cadastro-motorista" className="py-20 md:py-28 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-2xl mx-auto px-4 relative z-10">
                <div className="text-center mb-10 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider">
                        <Send className="w-3 h-3" />
                        Pré-cadastro
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                        Faça seu{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                            cadastro
                        </span>
                    </h2>
                    <p className="text-blue-100/60 max-w-lg mx-auto">
                        Preencha seus dados e nossa equipe entrará em contato para finalizar seu cadastro
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-3xl p-6 md:p-8 space-y-5">
                    {/* Nome */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-blue-100/80 flex items-center gap-2">
                            <User className="w-4 h-4 text-green-400" />
                            Nome Completo
                        </label>
                        <input type="text" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Seu nome completo" required className="w-full px-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all text-sm" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Telefone */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-blue-100/80 flex items-center gap-2">
                                <Phone className="w-4 h-4 text-green-400" />
                                Telefone / WhatsApp
                            </label>
                            <input type="tel" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} placeholder="(94) 99999-9999" required className="w-full px-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all text-sm" />
                        </div>

                        {/* CPF */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-blue-100/80 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-green-400" />
                                CPF <span className="text-white/30 text-xs">(opcional)</span>
                            </label>
                            <input type="text" value={form.cpf} onChange={(e) => setForm({ ...form, cpf: e.target.value })} placeholder="000.000.000-00" className="w-full px-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all text-sm" />
                        </div>
                    </div>

                    {/* Tipo Veículo */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-blue-100/80">Tipo de Veículo</label>
                        <div className="flex gap-3">
                            {[{ val: 'carro', label: 'Carro', icon: <Car className="w-4 h-4" /> }, { val: 'moto', label: 'Moto', icon: <Bike className="w-4 h-4" /> }].map((v) => (
                                <button key={v.val} type="button" onClick={() => setForm({ ...form, tipoVeiculo: v.val })} className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 font-medium text-sm transition-all ${form.tipoVeiculo === v.val ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-white/[0.04] border-white/10 text-white/50 hover:bg-white/[0.08]'}`}>
                                    {v.icon}
                                    {v.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-blue-100/80">Modelo do Veículo</label>
                            <input type="text" value={form.modeloCarro} onChange={(e) => setForm({ ...form, modeloCarro: e.target.value })} placeholder="Ex: Gol, Onix, CG 160..." className="w-full px-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-blue-100/80">Ano</label>
                            <input type="text" value={form.anoCarro} onChange={(e) => setForm({ ...form, anoCarro: e.target.value })} placeholder="Ex: 2020" className="w-full px-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all text-sm" />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold text-lg shadow-lg shadow-green-500/25 transform hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                Quero ser motorista parceiro!
                            </>
                        )}
                    </button>

                    <p className="text-center text-xs text-white/30 mt-3">
                        Ao enviar, você será redirecionado ao WhatsApp para concluir o cadastro.
                    </p>
                </form>
            </div>
        </section>
    );
}

/* ─── DOWNLOAD CTA ───────────────────────────────────── */
function DownloadCTA() {
    const sectionRef = useScrollAnimation<HTMLElement>({ type: 'scaleIn' });

    return (
        <section ref={sectionRef} className="py-20 md:py-24 relative">
            <div className="max-w-3xl mx-auto px-4 text-center space-y-8">
                <h2 className="text-3xl md:text-5xl font-black text-white">
                    Baixe o app e <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">comece agora</span>
                </h2>
                <p className="text-blue-100/60 text-lg max-w-xl mx-auto">
                    Disponível gratuitamente na Play Store e App Store. Comece a dirigir e ganhar hoje mesmo!
                </p>
                <ActionButtons />
            </div>
        </section>
    );
}
