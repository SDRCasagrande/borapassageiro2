import { useState, useEffect } from 'react';
import { X, Megaphone } from 'lucide-react';

const API_URL = 'https://api.bkaiser.com.br';

export function PromoBanner() {
    const [promo, setPromo] = useState<any>(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/api/content/public`)
            .then(res => res.json())
            .then(data => {
                const activePromo = data.find((i: any) => i.section === 'promo' && i.isActive);
                if (activePromo) setPromo(activePromo);
            })
            .catch(() => { });
    }, []);

    if (!promo || !visible) return null;

    return (
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-3 relative z-50 shadow-lg">
            <div className="container mx-auto flex items-center justify-center gap-2 text-sm md:text-base font-bold text-center px-8">
                <Megaphone className="w-4 h-4 md:w-5 md:h-5 animate-bounce" />
                <span>{promo.content}</span>
            </div>
            <button
                onClick={() => setVisible(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
