import { Star, Users } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function Testimonials() {
    const titleRef = useScrollAnimation<HTMLDivElement>({ type: 'fadeUp' });
    const cardRef = useScrollAnimation<HTMLDivElement>({ type: 'scaleIn', delay: 0.3 });

    return (
        <section id="depoimentos" className="py-16 sm:py-24 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 relative z-10">
                <div ref={titleRef} className="text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-wider">
                        <Star className="w-3 h-3 fill-yellow-400" />
                        Avaliação 4.9
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-white">
                        Milhares já usam o{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                            Bora
                        </span>
                    </h2>
                    <p className="text-blue-100/60 max-w-xl mx-auto text-sm sm:text-base md:text-lg">
                        Baixe o app e descubra por que somos o transporte favorito da região
                    </p>
                </div>

                {/* Stats instead of fake testimonials */}
                <div ref={cardRef} className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl sm:rounded-3xl p-6 sm:p-10">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1">4.9</div>
                            <div className="flex justify-center gap-0.5 mb-2">
                                {[1,2,3,4,5].map(i => (
                                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                            <p className="text-xs text-blue-100/50">Avaliação média</p>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">5+</div>
                            <p className="text-xs text-blue-100/50 mt-2">Cidades atendidas</p>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">24h</div>
                            <p className="text-xs text-blue-100/50 mt-2">Suporte disponível</p>
                        </div>
                        <div className="text-center">
                            <div className="flex justify-center mb-1">
                                <Users className="w-7 h-7 sm:w-9 sm:h-9 text-purple-400" />
                            </div>
                            <div className="text-lg sm:text-xl font-black text-white">Crescendo</div>
                            <p className="text-xs text-blue-100/50">Comunidade ativa</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
