import { Phone, Instagram } from 'lucide-react';

export function Footer() {
    const whatsappNumber = '5594992777717';
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;

    return (
        <footer className="bg-[#021327] border-t border-white/5 text-blue-200 text-sm py-10 md:py-12">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                {/* Brand */}
                <div className="space-y-4 sm:col-span-2 md:col-span-1">
                    <img src="/assets/logo-bora-full.png" alt="Bora Passageiro PA" className="h-14 md:h-16 w-auto object-contain opacity-90" />
                    <p className="text-blue-100/70 leading-relaxed text-sm">
                        Conectando você ao seu destino com segurança, agilidade e o melhor preço da cidade.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Navegação</h3>
                    <ul className="space-y-2">
                        <li><a href="#inicio" className="hover:text-blue-400 transition-colors">Início</a></li>
                        <li><a href="#como-funciona" className="hover:text-blue-400 transition-colors">Como Funciona</a></li>
                        <li><a href="#seguranca" className="hover:text-blue-400 transition-colors">Segurança</a></li>
                        <li><a href="#depoimentos" className="hover:text-blue-400 transition-colors">Depoimentos</a></li>
                        <li><a href="#motorista" className="hover:text-blue-400 transition-colors">Seja Motorista</a></li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Legal</h3>
                    <ul className="space-y-2 text-blue-100/60 text-xs">
                        <li>Bora Passageiro PA</li>
                        <li>Xinguara - Pará</li>
                        <li className="pt-2 text-blue-100/40">Transporte por aplicativo</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Contato</h3>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-colors group mb-3"
                    >
                        <div className="p-2 rounded-full bg-green-500 text-white shrink-0">
                            <Phone className="w-4 h-4" />
                        </div>
                        <div>
                            <span className="text-white font-bold block group-hover:text-green-400 transition-colors text-sm">(94) 99277-7717</span>
                            <span className="text-xs text-blue-100/50">WhatsApp</span>
                        </div>
                    </a>

                    {/* Social */}
                    <div className="flex gap-2 mt-3">
                        <a href="https://www.instagram.com/borapassageiro.pa/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-500/20 hover:border-pink-500/30 transition-all">
                            <Instagram className="w-4 h-4 text-white/70" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-neutral-800 text-center text-xs opacity-50">
                &copy; {new Date().getFullYear()} Bora Passageiro PA. Todos os direitos reservados.
            </div>
        </footer>
    );
}
