import { AnalyticsService } from '../services/analytics';

export function ActionButtons() {
    return (
        <div className="flex flex-col sm:flex-row gap-6 mt-10 w-full items-center sm:justify-center md:justify-start">
            <a
                href="https://play.google.com/store/apps/details?id=br.com.devbase.borapassageiro&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => AnalyticsService.trackClick('playStore')}
                className="transform hover:scale-105 transition-transform duration-300 drop-shadow-xl"
            >
                <img
                    src="/assets/btn-google-play.png"
                    alt="Disponível no Google Play"
                    className="h-16 w-auto object-contain"
                />
            </a>

            <a
                href="https://apps.apple.com/br/app/bora-passageiro-clientes/id1579518558"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => AnalyticsService.trackClick('appStore')}
                className="transform hover:scale-105 transition-transform duration-300 drop-shadow-xl"
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
