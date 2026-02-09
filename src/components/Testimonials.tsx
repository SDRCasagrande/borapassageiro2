import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Maria Silva',
        role: 'Passageira',
        text: 'Uso o Bora Passageiro todos os dias para ir ao trabalho. Rápido, seguro e com preço justo. Melhor app de transporte da região!',
        rating: 5,
        avatar: 'MS',
    },
    {
        name: 'Carlos Oliveira',
        role: 'Motorista Parceiro',
        text: 'Desde que comecei a trabalhar com o Bora, minha renda aumentou muito. A plataforma é fácil de usar e o suporte é excelente.',
        rating: 5,
        avatar: 'CO',
    },
    {
        name: 'Ana Souza',
        role: 'Passageira',
        text: 'Sempre que preciso de uma corrida, abro o Bora. O motorista chega rapidinho e o pagamento é super prático via Pix.',
        rating: 5,
        avatar: 'AS',
    },
    {
        name: 'Pedro Santos',
        role: 'Passageiro',
        text: 'Segurança é o que mais prezo e o Bora entrega isso. Motoristas verificados e monitoramento em tempo real. Top demais!',
        rating: 5,
        avatar: 'PS',
    },
];

export function Testimonials() {
    return (
        <section id="depoimentos" className="py-20 md:py-28 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 md:mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-wider">
                        <Star className="w-3 h-3 fill-yellow-400" />
                        Avaliação 4.9
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                        O que dizem <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">nossos usuários</span>
                    </h2>
                    <p className="text-blue-100/60 max-w-xl mx-auto text-base md:text-lg">
                        Milhares de pessoas já escolheram o Bora como seu app de transporte
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {testimonials.map((t, index) => (
                        <div
                            key={index}
                            className="relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl md:rounded-3xl p-5 md:p-6 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300"
                        >
                            {/* Quote icon */}
                            <Quote className="absolute top-4 right-4 w-6 h-6 md:w-8 md:h-8 text-white/5" />

                            {/* Stars */}
                            <div className="flex gap-1 mb-3 md:mb-4">
                                {Array.from({ length: t.rating }).map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-blue-100/80 text-sm md:text-base leading-relaxed mb-4 md:mb-5">
                                "{t.text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                                    {t.avatar}
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">{t.name}</p>
                                    <p className="text-blue-100/50 text-xs">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
