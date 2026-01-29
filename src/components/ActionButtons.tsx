import { useEffect } from 'react';

export function ActionButtons() {
    return (
        <div className="flex flex-col sm:flex-row gap-6 mt-10 w-full justify-center md:justify-start">
            <a
                href="#"
                className="transform hover:scale-105 transition-transform duration-300 drop-shadow-xl"
                onClick={(e) => { e.preventDefault(); alert('Em breve na Google Play!'); }}
            >
                <img
                    src="/assets/btn-google-play.png"
                    alt="Disponível no Google Play"
                    className="h-16 w-auto object-contain"
                />
            </a>

            <a
                href="#"
                className="transform hover:scale-105 transition-transform duration-300 drop-shadow-xl"
                onClick={(e) => { e.preventDefault(); alert('Em breve na App Store!'); }}
            >
                <img
                    src="/assets/btn-app-store.png"
                    alt="Disponível na App Store"
                    className="h-16 w-auto object-contain"
                />
            </a>
        </div>
    );
}
