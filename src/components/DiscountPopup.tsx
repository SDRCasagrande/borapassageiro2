import { useState, useEffect } from 'react';
import { X, Tag, Download } from 'lucide-react';
import { AnalyticsService } from '../services/analytics';

// App Store URLs
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.borapassageiro';
const APP_STORE_URL = 'https://apps.apple.com/app/bora-passageiro/id123456789';

export function DiscountPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [showStoreButtons, setShowStoreButtons] = useState(false);

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
        setShowStoreButtons(false);
        localStorage.setItem('hasSeenDiscountPopup', 'true');
    };

    const handleClaim = () => {
        // Show store buttons instead of scrolling
        setShowStoreButtons(true);
    };

    const handleStoreClick = (store: 'playStore' | 'appStore') => {
        // Track the click (same as landing page buttons)
        AnalyticsService.trackClick(store);

        // Open store URL
        const url = store === 'playStore' ? PLAY_STORE_URL : APP_STORE_URL;
        window.open(url, '_blank');

        // Close popup
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
                        {showStoreButtons ? (
                            <Download className="w-10 h-10 text-green-600" />
                        ) : (
                            <Tag className="w-10 h-10 text-blue-600" />
                        )}
                    </div>

                    {!showStoreButtons ? (
                        <>
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
                        </>
                    ) : (
                        <>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Baixe o App!</h3>
                            <p className="text-gray-500 mb-6">
                                Escolha a loja do seu celular e baixe agora para garantir seu <span className="font-bold text-green-600">desconto VIP</span>!
                            </p>

                            {/* Store Buttons */}
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => handleStoreClick('playStore')}
                                    className="w-full py-3 px-4 bg-black text-white font-semibold rounded-xl flex items-center justify-center gap-3 hover:bg-gray-800 active:scale-95 transition-all shadow-lg"
                                >
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                        alt="Google Play"
                                        className="h-6"
                                    />
                                    <span>Google Play</span>
                                </button>

                                <button
                                    onClick={() => handleStoreClick('appStore')}
                                    className="w-full py-3 px-4 bg-black text-white font-semibold rounded-xl flex items-center justify-center gap-3 hover:bg-gray-800 active:scale-95 transition-all shadow-lg"
                                >
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                    </svg>
                                    <span>App Store</span>
                                </button>
                            </div>

                            <button
                                onClick={handleClose}
                                className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                Fechar
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
