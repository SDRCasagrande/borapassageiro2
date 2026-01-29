export function ActionButtons() {
    return (
        <div className="flex flex-col sm:flex-row gap-6 mt-10 w-full justify-center md:justify-start">
            <a
                href="https://play.google.com/store/apps/details?id=br.com.seuapp.passageiro"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-105 transition-transform duration-300 drop-shadow-xl"
            >
                <img
                    src="/assets/btn-google-play.png"
                    alt="Disponível no Google Play"
                    className="h-16 w-auto object-contain"
                    onError={(e) => e.currentTarget.style.display = 'none'} // Fallback if image fails
                />
            </a>

            <a
                href="https://apps.apple.com/br/app/seu-app-passageiro/id123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-105 transition-transform duration-300 drop-shadow-xl"
            >
                <img
                    src="/assets/btn-app-store.png"
                    alt="Disponível na App Store"
                    className="h-16 w-auto object-contain"
                    onError={(e) => e.currentTarget.style.display = 'none'}
                />
            </a>
        </div>
    );
}
