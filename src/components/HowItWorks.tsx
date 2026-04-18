import { MapPin, Smartphone, ThumbsUp } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const steps = [
    {
        icon: <Smartphone className="w-8 h-8" />,
        step: '01',
        title: 'Baixe o App',
        description: 'Disponível na Play Store e App Store. Instale em segundos.',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        icon: <MapPin className="w-8 h-8" />,
        step: '02',
        title: 'Peça sua Corrida',
        description: 'Informe seu destino e veja o preço antes de confirmar.',
        color: 'from-purple-500 to-pink-500',
    },
    {
        icon: <ThumbsUp className="w-8 h-8" />,
        step: '03',
        title: 'Viaje Tranquilo',
        description: 'Motorista verificado chega até você. Seguro e rápido.',
        color: 'from-green-500 to-emerald-500',
    },
];

export function HowItWorks() {
    const titleRef = useScrollAnimation<HTMLDivElement>({ type: 'fadeUp' });
    const gridRef = useScrollAnimation<HTMLDivElement>({ type: 'stagger', staggerDelay: 0.2 });

    return (
        <section id="como-funciona" className="py-20 md:py-28 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div ref={titleRef} className="text-center mb-12 md:mb-20 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                        Simples e rápido
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                        Como <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Funciona?</span>
                    </h2>
                    <p className="text-blue-100/60 max-w-xl mx-auto text-base md:text-lg">
                        Em 3 passos simples você já está a caminho do seu destino
                    </p>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative group"
                        >
                            {/* Connection line (desktop only) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-white/10 to-transparent z-0" />
                            )}

                            <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-3xl p-6 md:p-8 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500 hover:-translate-y-2 group">
                                {/* Step number */}
                                <div className="absolute -top-3 -right-2 md:-top-4 md:-right-3 w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-white/40 font-black text-sm md:text-lg">
                                    {step.step}
                                </div>

                                {/* Icon */}
                                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-5 md:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                    {step.icon}
                                </div>

                                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{step.title}</h3>
                                <p className="text-sm md:text-base text-blue-100/60 leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
