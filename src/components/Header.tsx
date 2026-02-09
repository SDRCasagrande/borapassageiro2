import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: '#inicio', label: 'Início' },
        { href: '#como-funciona', label: 'Como Funciona' },
        { href: '#seguranca', label: 'Segurança' },
        { href: '#depoimentos', label: 'Depoimentos' },
        { href: '#motorista', label: 'Seja Motorista' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-blue-900/10 backdrop-blur-md border-b border-white/5 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
                {/* Logo Area */}
                <div className="flex items-center gap-2">
                    <img src="/assets/logo-bora.png" alt="Bora Passageiro PA" className="h-12 sm:h-16 w-auto object-contain hover:opacity-90 transition-opacity" />
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                    {navLinks.map((link) => (
                        <a key={link.href} href={link.href} className="text-sm font-medium hover:text-blue-400 transition-colors">
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* CTA */}
                <div className="flex items-center gap-4">
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Menu"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 sm:top-20 left-0 right-0 bg-[#021327]/95 backdrop-blur-xl border-b border-white/10 p-4 shadow-xl">
                    <nav className="flex flex-col space-y-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-white hover:text-blue-400 py-3 px-4 rounded-xl hover:bg-white/5 font-medium transition-all"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
