import { useState, useEffect } from 'react'
import { X, Cookie, Shield, ChevronDown, ChevronUp } from 'lucide-react'

interface CookieConsentProps {
    companyName?: string
    onAccept?: () => void
    onDecline?: () => void
}

export function CookieConsent({
    companyName = 'Bora Passageiro',
    onAccept,
    onDecline
}: CookieConsentProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [showDetails, setShowDetails] = useState(false)

    useEffect(() => {
        // Check if user already made a choice
        const consent = localStorage.getItem('cookie_consent')
        if (!consent) {
            // Small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1500)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'accepted')
        localStorage.setItem('cookie_consent_date', new Date().toISOString())
        setIsVisible(false)
        onAccept?.()
    }

    const handleDecline = () => {
        localStorage.setItem('cookie_consent', 'declined')
        localStorage.setItem('cookie_consent_date', new Date().toISOString())
        setIsVisible(false)
        onDecline?.()
    }

    if (!isVisible) return null

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]" />

            {/* Modal */}
            <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6">
                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-full">
                            <Cookie className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-bold text-lg">
                                Coleta de Dados para Pesquisa
                            </h3>
                            <p className="text-white/80 text-sm">
                                Sua privacidade é importante para nós
                            </p>
                        </div>
                        <button
                            onClick={handleDecline}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                        <p className="text-gray-700 leading-relaxed mb-4">
                            O <strong>{companyName}</strong> coleta dados de navegação e localização
                            <strong> exclusivamente para fins de pesquisa</strong> e melhoria dos nossos serviços
                            de transporte na região. Seus dados são tratados com segurança e nunca
                            serão compartilhados com terceiros.
                        </p>

                        {/* Details Toggle */}
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 text-sm font-medium mb-4 transition-colors"
                        >
                            <Shield className="w-4 h-4" />
                            <span>O que coletamos?</span>
                            {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        {showDetails && (
                            <div className="bg-amber-50 rounded-xl p-4 mb-4 text-sm text-gray-600 space-y-2 border border-amber-100">
                                <p><strong>📍 Localização aproximada:</strong> Para entender rotas mais solicitadas</p>
                                <p><strong>📊 Dados de navegação:</strong> Páginas visitadas e tempo de permanência</p>
                                <p><strong>📱 Informações do dispositivo:</strong> Tipo de navegador e sistema operacional</p>
                                <p className="pt-2 border-t border-amber-200 text-amber-700">
                                    <strong>🔒 Garantia:</strong> Dados anonimizados, sem identificação pessoal.
                                    Usados apenas para pesquisa interna.
                                </p>
                            </div>
                        )}

                        {/* Legal disclaimer */}
                        <p className="text-xs text-gray-400 mb-5">
                            Ao clicar em "Aceitar", você concorda com nossa coleta de dados para fins
                            de pesquisa, em conformidade com a LGPD (Lei Geral de Proteção de Dados).
                        </p>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleAccept}
                                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-6 rounded-xl font-bold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                            >
                                ✓ Aceitar e Continuar
                            </button>
                            <button
                                onClick={handleDecline}
                                className="flex-1 bg-gray-100 text-gray-600 py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                            >
                                Recusar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slide-up {
                    animation: slide-up 0.4s ease-out;
                }
            `}</style>
        </>
    )
}

export default CookieConsent
