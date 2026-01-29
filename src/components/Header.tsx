import { Menu, User } from 'lucide-react';

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-blue-900/10 backdrop-blur-md border-b border-white/5 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                {/* Logo Area */}
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-black italic tracking-tighter text-blue-500">BORA</span>
                    <span className="text-xl font-bold tracking-tight text-white">PASSAGEIRO</span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <a href="#inicio" className="text-sm font-medium hover:text-blue-400 transition-colors">Início</a>
                    <a href="#motorista" className="text-sm font-medium hover:text-blue-400 transition-colors">Seja Motorista</a>
                    <a href="#seguranca" className="text-sm font-medium hover:text-blue-400 transition-colors">Segurança</a>
                    <a href="#ajuda" className="text-sm font-medium hover:text-blue-400 transition-colors">Ajuda</a>
                </nav>

                {/* CTA */}
                <div className="flex items-center gap-4">
                    <button className="hidden md:flex items-center gap-2 text-sm font-bold border border-white/20 bg-white/10 text-white px-5 py-2.5 rounded-full hover:bg-white/20 transition-all">
                        <User className="w-4 h-4" />
                        Entrar
                    </button>
                    <button className="md:hidden text-white p-2">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}
