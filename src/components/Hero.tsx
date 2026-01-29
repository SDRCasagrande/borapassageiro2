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
                <div className="relative flex justify-center items-center mt-12 md:mt-0">
                    {/* CSS Phone Frame */}
                    <div className="relative w-[300px] h-[600px] bg-black rounded-[3rem] border-[8px] border-gray-900 shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105">
                        {/* Dynamic Island / Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-28 bg-black rounded-b-2xl z-20"></div>

                        {/* Status Bar Mock (optional, just space) */}
                        <div className="w-full h-8 bg-black/10 absolute top-0 z-10"></div>

                        {/* Screen Content */}
                        <img
                            src="/assets/app-screen.png"
                            alt="App Bora Passageiro"
                            className="w-full h-full object-cover"
                        />

                        {/* Home Indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/20 rounded-full z-20"></div>
                    </div>

                    {/* Glow effect behind phone */}
                    <div className="absolute -z-10 w-[300px] h-[500px] bg-blue-500/30 rounded-full blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                </div>
            </div>
        </section>
    );
}
