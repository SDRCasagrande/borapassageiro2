import { ActionButtons } from './ActionButtons';
import { ShieldCheck, Star } from 'lucide-react';

export function Hero() {
    return (
        <section id="inicio" className="relative min-h-[90vh] flex items-center pt-28 pb-12 overflow-hidden">

            <div className="container mx-auto px-4 z-10 grid md:grid-cols-2 gap-8 items-center">
                {/* Text Content */}
                <div className="text-center md:text-left space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-lg">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                        Disponível em Xinguara e Região
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none text-white drop-shadow-lg">
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

                {/* Phone Mockup */}
                <div className="relative flex justify-center items-center mt-12 md:mt-0 perspective-1000">
                    <div className="relative w-[300px] h-[600px] bg-[#121212] rounded-[3rem] shadow-2xl border-[8px] border-[#1f1f1f] overflow-hidden transform md:rotate-y-12 md:-rotate-x-6 transition-all duration-500 hover:rotate-0">
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-[#1f1f1f] rounded-b-2xl z-20"></div>

                        {/* Screen Content */}
                        <div className="absolute inset-0 bg-gray-900 flex flex-col pt-12">
                            {/* Logo on Phone */}
                            <div className="flex-1 flex flex-col items-center justify-center space-y-6 p-6">
                                <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                                    <span className="text-white text-2xl font-black italic">BORA</span>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-white font-bold text-xl">Bora Passageiro</h3>
                                    <p className="text-gray-400 text-sm">Peça sua corrida agora</p>
                                </div>

                                {/* Fake UI Inputs */}
                                <div className="w-full space-y-3 mt-8">
                                    <div className="bg-gray-800 p-3 rounded-xl flex items-center gap-3 border border-gray-700">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span className="text-gray-400 text-xs">Onde você está?</span>
                                    </div>
                                    <div className="bg-gray-800 p-3 rounded-xl flex items-center gap-3 border border-gray-700">
                                        <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                                        <span className="text-gray-400 text-xs">Para onde vai?</span>
                                    </div>
                                </div>
                            </div>

                            {/* Phone Bottom Bar */}
                            <div className="h-1 w-1/3 bg-gray-600 rounded-full mx-auto mb-2"></div>
                        </div>
                    </div>

                    {/* Glow effect behind phone */}
                    <div className="absolute -z-10 w-[300px] h-[500px] bg-blue-500/30 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                </div>
            </div>
        </section>
    );
}
