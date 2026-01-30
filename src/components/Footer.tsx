import { Instagram, Facebook, Phone, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-[#021327] border-t border-white/5 text-blue-200 text-sm py-12">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                {/* Brand */}
                <div className="space-y-4">
                    <img src="/assets/logo-bora-full.png" alt="Bora Passageiro PA" className="h-16 w-auto object-contain opacity-90" />
                    <p className="text-blue-100/70 leading-relaxed">
                        Conectando você ao seu destino com segurança, agilidade e o melhor preço da cidade.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Empresa</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Sobre Nós</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Seja Motorista</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Carreiras</a></li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Legal</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Termos de Uso</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Privacidade</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Normas de Segurança</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Contato</h3>
                    <div className="flex gap-4 mb-4">
                        <a href="https://www.instagram.com/bora.passageiroxinguara/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white hover:text-cyan-400">
                            <Instagram className="h-5 w-5" />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white hover:text-cyan-400">
                            <Facebook className="h-5 w-5" />
                        </a>
                    </div>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-blue-500" />
                            <span>suporte@borapassageiro.com.br</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-blue-500" />
                            <span>0800 123 4567</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-neutral-800 text-center text-xs opacity-50">
                &copy; {new Date().getFullYear()} Bora Passageiro Tecnologia Ltda. Todos os direitos reservados.
            </div>
        </footer>
    );
}
