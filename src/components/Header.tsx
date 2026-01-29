import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-blue-900/10 backdrop-blur-md border-b border-white/5 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                {/* Logo Area */}
                <div className="flex items-center gap-2">
                    <img src="/assets/logo-bora.png" alt="Bora Passageiro" className="h-12 w-auto object-contain hover:opacity-90 transition-opacity" />
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <a href="#inicio" className="text-sm font-medium hover:text-blue-400 transition-colors">Início</a>
                    <a href="#motorista" className="text-sm font-medium hover:text-blue-400 transition-colors">Seja Motorista</a>
                    <a href="#seguranca" className="text-sm font-medium hover:text-blue-400 transition-colors">Segurança</a>
                </nav>

                {/* CTA */}
                <div className="flex items-center gap-4">
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 right-0 bg-[#021327] border-b border-white/10 p-4 shadow-xl animate-in slide-in-from-top-5">
                    <nav className="flex flex-col space-y-4">
                        <a
                            href="#inicio"
                            className="text-white hover:text-blue-400 py-2 border-b border-white/5 font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Início
                        </a>
                        <a
                            href="#motorista"
                            className="text-white hover:text-blue-400 py-2 border-b border-white/5 font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Seja Motorista
                        </a>
                        <a
                            href="#seguranca"
                            className="text-white hover:text-blue-400 py-2 border-b border-white/5 font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Segurança
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}
