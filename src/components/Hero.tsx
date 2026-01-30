import { ActionButtons } from './ActionButtons';
import { ShieldCheck, Star } from 'lucide-react';

export function Hero() {
    return (
        <section id="inicio" className="relative min-h-[90vh] flex items-center pt-28 pb-12 overflow-hidden">

            <div className="container mx-auto px-4 z-10 grid md:grid-cols-2 gap-8 items-center">
                {/* Text Content */}
                <div className="text-center md:text-left space-y-6">
                    {/* Big Logo */}
                    <img
                        src="/assets/logo-bora-full.png"
                        alt="Bora Passageiro PA"
                        className="h-20 md:h-28 w-auto object-contain mx-auto md:mx-0 drop-shadow-2xl"
                    />

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-lg">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                        Disponível em Xinguara e Região - PA
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none text-white drop-shadow-lg">
                        Seu transporte <br />
                        rápido e seguro
                    </h1>

                    <p className="text-lg md:text-xl text-blue-50 max-w-lg mx-auto md:mx-0 font-medium leading-relaxed drop-shadow-md">
                        Carros e motos à sua disposição. Peça sua corrida em segundos e chegue ao seu destino com conforto.
                    </p>

                    <ActionButtons />

                    <div className="flex items-center justify-center md:justify-start gap-6 pt-4 text-sm font-semibold text-white/90">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-cyan-300" />
                            <span>100% Seguro</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            <span>4.9 Avaliação</span>
                        </div>
                    </div>
                </div>

                {/* Phone Mockup Container */}
                <div className="relative flex justify-center items-center mt-12 md:mt-0 perspective-1000">

                    {/* Modern Phone Frame */}
                    <div className="relative w-[300px] h-[620px] bg-slate-950 rounded-[3rem] border-[6px] border-slate-900 shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:-rotate-1 ring-1 ring-white/10">

                        {/* Status Bar Mock */}
                        <div className="absolute top-0 w-full h-8 z-30 flex justify-between items-center px-6 pt-2 opacity-80">
                            <span className="text-[10px] font-bold text-white">9:41</span>
                            <div className="flex gap-1.5">
                                <div className="w-4 h-2.5 bg-white rounded-[2px]" />
                                <div className="w-0.5 h-1 bg-white" />
                            </div>
                        </div>

                        {/* Dynamic Island */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 h-7 w-24 bg-black rounded-full z-30 ring-1 ring-white/5" />

                        {/* Screen Content - Map UI */}
                        <div className="w-full h-full relative bg-[#0f172a] overflow-hidden">
                            {/* Map Background Pattern */}
                            <div className="absolute inset-0 opacity-20"
                                style={{
                                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                                    backgroundSize: '24px 24px'
                                }}>
                            </div>

                            {/* Street Lines (Simulated) */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full bg-slate-800/80 transform -skew-x-12 blur-[1px]"></div>
                            <div className="absolute top-[30%] left-0 w-full h-4 bg-slate-800/80 transform skew-y-6 blur-[1px]"></div>
                            <div className="absolute top-[60%] left-0 w-full h-6 bg-slate-800/80 transform -skew-y-3 blur-[1px]"></div>

                            {/* Center Pin (User Location) */}
                            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                                <div className="relative">
                                    <div className="w-16 h-16 bg-cyan-500/20 rounded-full animate-ping absolute"></div>
                                    <div className="w-4 h-4 bg-cyan-400 rounded-full border-2 border-white shadow-[0_0_15px_rgba(34,211,238,0.6)] relative z-10"></div>
                                </div>
                            </div>

                            {/* Nearby Cars */}
                            <div className="absolute top-[30%] left-[30%] w-8 h-8 opacity-60">
                                <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.4)]"></div>
                            </div>
                            <div className="absolute top-[50%] right-[20%] w-8 h-8 opacity-60 animate-pulse">
                                <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.4)]"></div>
                            </div>

                            {/* Bottom Sheet Mockup */}
                            <div className="absolute bottom-0 w-full bg-slate-900/90 backdrop-blur-xl rounded-t-[2.5rem] p-6 pb-8 z-20 border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
                                <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6"></div>

                                <h3 className="text-white font-bold text-lg mb-4 ml-1">Para onde vamos?</h3>

                                <div className="space-y-3">
                                    {/* Input 1 */}
                                    <div className="bg-slate-800/50 rounded-2xl p-3 flex items-center gap-3 border border-white/5">
                                        <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                                        <div className="h-4 w-32 bg-white/10 rounded-full"></div>
                                    </div>

                                    {/* Input 2 */}
                                    <div className="bg-slate-800/50 rounded-2xl p-3 flex items-center gap-3 border border-white/5">
                                        <div className="w-2 h-2 rounded-sm bg-purple-400"></div>
                                        <div className="text-sm text-slate-400 font-medium">Digite o destino...</div>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <button className="w-full mt-6 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-black text-lg py-4 rounded-2xl shadow-[0_4px_20px_rgba(34,211,238,0.3)] transition-colors">
                                    CHAMAR BORA
                                </button>
                            </div>

                            {/* Logo Overlay */}
                            <div className="absolute top-12 left-1/2 -translate-x-1/2 opacity-20 font-black text-3xl tracking-tighter text-white select-none pointer-events-none text-center leading-tight">
                                BORA<br />Passageiro
                            </div>
                        </div>

                        {/* Home Indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-30"></div>
                    </div>

                    {/* Glow effect */}
                    <div className="absolute -z-10 w-[300px] h-[500px] bg-blue-600/20 rounded-full blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
}
