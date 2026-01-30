import { useState, useEffect } from 'react';
import { X, Tag } from 'lucide-react';

export function DiscountPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show popup after 3 seconds
        const timer = setTimeout(() => {
            const hasSeenPopup = localStorage.getItem('hasSeenDiscountPopup');
            if (!hasSeenPopup) {
                setIsOpen(true);
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('hasSeenDiscountPopup', 'true');
    };

    const handleClaim = () => {
        const downloadSection = document.getElementById('download');
        if (downloadSection) {
            downloadSection.scrollIntoView({ behavior: 'smooth' });
        }
        handleClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-sm overflow-hidden bg-white shadow-2xl rounded-2xl animate-scale-in">
                {/* Header Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-600 to-purple-600">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                </div>

                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 p-1 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="relative pt-20 px-6 pb-6 text-center">
                    {/* Icon Badge */}
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl mb-4 border-4 border-white">
                        <Tag className="w-10 h-10 text-blue-600" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Oferta Exclusiva!</h3>
                    <p className="text-gray-500 mb-6">
                        Bora virar passageiro VIP? Baixe agora e ganhe <span className="font-bold text-blue-600">50% OFF</span> nas suas primeiras 5 corridas!
                    </p>

                    <button
                        onClick={handleClaim}
                        className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        Quero meu Desconto
                    </button>

                    <button
                        onClick={handleClose}
                        className="mt-3 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        Não, obrigado
                    </button>
                </div>
            </div>
        </div>
    );
}
