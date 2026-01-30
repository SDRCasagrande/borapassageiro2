import { Phone } from 'lucide-react';

export function Footer() {
    const whatsappNumber = '5594992777717';
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;

    return (
        <footer className="bg-[#021327] border-t border-white/5 text-blue-200 text-sm py-12">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

                {/* Brand */}
                <div className="space-y-4">
                    <img src="/assets/logo-bora-full.png" alt="Bora Passageiro PA" className="h-16 w-auto object-contain opacity-90" />
                    <p className="text-blue-100/70 leading-relaxed">
                        Conectando você ao seu destino com segurança, agilidade e o melhor preço da cidade.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Empresa</h3>
                    <ul className="space-y-2">
                        <li><a href="#inicio" className="hover:text-blue-400 transition-colors">Início</a></li>
                        <li><a href="#motorista" className="hover:text-blue-400 transition-colors">Seja Motorista</a></li>
                        <li><a href="#seguranca" className="hover:text-blue-400 transition-colors">Segurança</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Contato</h3>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-colors group"
                    >
                        <div className="p-2 rounded-full bg-green-500 text-white">
                            <Phone className="w-4 h-4" />
                        </div>
                        <div>
                            <span className="text-white font-bold block group-hover:text-green-400 transition-colors">(94) 99277-7717</span>
                            <span className="text-xs text-blue-100/50">WhatsApp</span>
                        </div>
                    </a>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-neutral-800 text-center text-xs opacity-50">
                &copy; {new Date().getFullYear()} Bora Passageiro PA. Todos os direitos reservados.
            </div>
        </footer>
    );
}
