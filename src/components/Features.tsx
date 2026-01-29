import { ShieldCheck, Zap, Wallet, Star } from 'lucide-react';

export function Features() {
    const features = [
        {
            icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
            title: "Segurança Total",
            description: "Motoristas verificados e monitoramento em tempo real de todas as corridas."
        },
        {
            icon: <Zap className="w-8 h-8 text-blue-500" />,
            title: "Chega Rápido",
            description: "Nossa tecnologia encontra o motorista mais próximo em segundos."
        },
        {
            icon: <Wallet className="w-8 h-8 text-blue-500" />,
            title: "Preço Justo",
            description: "Sem tarifas dinâmicas abusivas. Você sabe quanto vai pagar antes de chamar."
        },
        {
            icon: <Star className="w-8 h-8 text-blue-500" />,
            title: "Melhor Avaliados",
            description: "Apenas os melhores motoristas continuam na plataforma para garantir sua experiência."
        }
    ];

    return (
        <section id="seguranca" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">
                        POR QUE ESCOLHER O <span className="text-blue-500">BORA?</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Mais do que apenas um app de transporte. Somos a escolha inteligente para quem valoriza segurança e economia.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-[#0b1d30]/50 p-6 rounded-2xl border border-white/5 hover:border-blue-400/50 transition-all hover:-translate-y-1 group backdrop-blur-sm">
                            <div className="w-14 h-14 bg-[#0F2942] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/10 text-white">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                            <p className="text-sm text-blue-100/70 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
