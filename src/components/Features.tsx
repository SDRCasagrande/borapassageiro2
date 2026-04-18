import { ShieldCheck, Zap, Wallet, Star, Receipt, Gift, Tag, Award } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function Features() {
    const features = [
        {
            icon: <ShieldCheck className="w-8 h-8" />,
            title: "App Legalizado",
            description: "Chega de viagem clandestina. App regularizado para sua segurança e tranquilidade.",
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: "Motoristas Rigorosamente Avaliados",
            description: "Todos os motoristas passam por avaliação rigorosa. Só os melhores estão na plataforma.",
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Viagem Rápida e Segura",
            description: "Rápido, confortável e com monitoramento em tempo real de todas as corridas.",
            color: 'from-cyan-500 to-blue-500',
        },
        {
            icon: <Receipt className="w-8 h-8" />,
            title: "Registro + Recibo Disponível",
            description: "Todas as viagens ficam registradas no banco de dados com recibo digital disponível.",
            color: 'from-green-500 to-emerald-500',
        },
        {
            icon: <Wallet className="w-8 h-8" />,
            title: "Preços Justos",
            description: "Sem surpresas na hora de pagar. Preço transparente antes de chamar a corrida.",
            color: 'from-yellow-500 to-orange-500',
        },
        {
            icon: <Gift className="w-8 h-8" />,
            title: "Cashback e Indicação",
            description: "Ganhe créditos indicando amigos. Cada indicação vira saldo para sua próxima viagem.",
            color: 'from-pink-500 to-rose-500',
        },
        {
            icon: <Tag className="w-8 h-8" />,
            title: "Cupons Padrão e Relâmpago",
            description: "Cupons de desconto regulares e promoções relâmpago exclusivas para passageiros.",
            color: 'from-violet-500 to-purple-500',
        },
        {
            icon: <Star className="w-8 h-8" />,
            title: "App Bom Tem Nome: Bora",
            description: "O app de transporte da sua região. Feito por quem conhece a cidade e suas necessidades.",
            color: 'from-emerald-500 to-teal-500',
        },
    ];

    const titleRef = useScrollAnimation<HTMLDivElement>({ type: 'fadeUp' });
    const gridRef = useScrollAnimation<HTMLDivElement>({ type: 'stagger', staggerDelay: 0.08 });

    return (
        <section id="seguranca" className="py-16 sm:py-24 relative">
            <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                <div ref={titleRef} className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                        <ShieldCheck className="w-3 h-3" />
                        Por que escolher o Bora
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-white">
                        Tudo que você precisa em{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                            um só app
                        </span>
                    </h2>
                    <p className="text-blue-100/60 max-w-2xl mx-auto">
                        Mais do que transporte. Segurança, economia e tecnologia da sua região.
                    </p>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white/[0.03] backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/[0.06] hover:border-cyan-500/20 transition-all duration-500 hover:-translate-y-1 group">
                            <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-500 shadow-lg text-white`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                            <p className="text-sm text-blue-100/60 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
