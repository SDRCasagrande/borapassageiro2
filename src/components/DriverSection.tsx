import { CheckCircle2 } from 'lucide-react';
import { AnalyticsService } from '../services/analytics';

// Using inline SVG for Whatsapp to ensure brand accuracy and avoid icon library issues.

export function DriverSection() {
    return (
        <section id="motorista" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* Left Card - Mockup */}
                    <div className="relative flex justify-center">
                        {/* Background Decoration */}
                        <div className="absolute inset-0 bg-cyan-500/20 blur-[80px] rounded-full"></div>

                        <div className="relative bg-[#1a1f2e] border border-gray-700/50 p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full transform hover:scale-[1.02] transition-transform duration-500">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg shadow-green-500/30 border-2 border-green-500">
                                    <img src="/assets/driver-profile.png" alt="Motorista" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">Motorista Parceiro</h3>
                                    <p className="text-green-400 text-xs font-medium">Ganhos semanais</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-[#131620] p-4 rounded-xl border border-gray-700/30">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-400">Corridas realizadas</span>
                                        <span className="text-green-400 font-bold">+45</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-[75%]"></div>
                                    </div>
                                </div>

                                <div className="bg-[#131620] p-4 rounded-xl border border-gray-700/30">
                                    <span className="text-gray-400 text-xs block mb-1">Ganhos esta semana</span>
                                    <span className="text-white text-3xl font-bold tracking-tight">R$ 1.850</span>
                                </div>

                                <div className="flex items-center gap-2 text-yellow-400 text-sm font-bold bg-yellow-400/10 p-2 rounded-lg justify-center">
                                    <span>★</span>
                                    <span>Avaliação 4.9 estrelas</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="space-y-8 text-center md:text-left">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-green-500/20 text-green-400 font-bold text-xs uppercase tracking-wider mb-2">
                            ● Vagas abertas
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                            Seja um Motorista <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Parceiro</span>
                        </h2>

                        <p className="text-lg text-blue-100 font-medium leading-relaxed">
                            Trabalhe no seu horário, ganhe uma renda extra e faça parte da maior rede de transporte de Xinguara e Região.
                            Cadastro simples e rápido!
                        </p>

                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-white/90">
                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                                <span>Flexibilidade total de horários</span>
                            </li>
                            <li className="flex items-center gap-3 text-white/90">
                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                                <span>Aceita carro ou moto</span>
                            </li>
                        </ul>

                        <a
                            href="https://wa.me/5594992777717"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => AnalyticsService.trackClick('whatsapp')}
                            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-green-500/20 transform hover:-translate-y-1 transition-all"
                        >
                            {/* SVG for specific whatsapp look */}
                            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Quero ser motorista
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
