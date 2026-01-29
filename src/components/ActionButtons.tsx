import { Apple } from 'lucide-react';

export function ActionButtons() {
    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <a
                href="https://apps.apple.com/br/app/bora-passageiro-clientes/id1579518558"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-all transform hover:scale-105 shadow-lg min-w-[200px] justify-center"
            >
                <Apple className="w-8 h-8" />
                <div className="flex flex-col items-start">
                    <span className="text-xs font-medium">Baixar na</span>
                    <span className="text-lg font-bold leading-none">App Store</span>
                </div>
            </a>

            <a
                href="https://play.google.com/store/apps/details?id=br.com.devbase.borapassageiro&hl=pt_BR"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-all transform hover:scale-105 shadow-lg min-w-[200px] justify-center"
            >
                <div className="w-8 h-8 flex items-center justify-center">
                    {/* Using Smartphone as placeholder for Play Store icon if verified icon not available in lucide */}
                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.609 1.814L13.792 12 3.61 22.186C3.094 21.91 2.808 21.317 2.808 20.597V3.403C2.808 2.683 3.094 2.09 3.609 1.814Z" fill="#00E2F7" />
                        <path d="M13.792 12L19.535 6.25701L15.939 4.22601L13.792 12Z" fill="#714FE8" />
                        <path d="M19.535 6.25696L17.729 5.23696C16.892 4.76496 15.689 4.90896 14.885 5.37896L13.792 11.999L19.535 6.25696Z" fill="#EA4335" />
                        <path d="M19.535 17.743L13.792 12L14.885 18.621C15.688 19.091 16.891 19.235 17.728 18.763L19.535 17.743Z" fill="#FABB00" />
                        <path d="M13.792 12L15.939 19.774L19.535 17.743L13.792 12Z" fill="#34A853" />
                    </svg>
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-xs font-medium">Disponível no</span>
                    <span className="text-lg font-bold leading-none">Google Play</span>
                </div>
            </a>
        </div>
    );
}
