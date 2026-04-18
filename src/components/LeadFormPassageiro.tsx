import { useState } from 'react';
import { Send, CheckCircle2, MapPin, Phone, User } from 'lucide-react';
import { AnalyticsService } from '../services/analytics';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.bkaiser.com.br';

export function LeadFormPassageiro() {
    const [form, setForm] = useState({ nome: '', telefone: '', bairro: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const sectionRef = useScrollAnimation<HTMLElement>({ type: 'fadeUp' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.nome || !form.telefone) return;

        setLoading(true);
        try {
            // Try saving to API
            await fetch(`${API_URL}/api/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, type: 'passageiro', timestamp: new Date().toISOString() }),
            }).catch(() => {
                // Fallback: save to localStorage
                const leads = JSON.parse(localStorage.getItem('bp_leads') || '[]');
                leads.push({ ...form, type: 'passageiro', timestamp: new Date().toISOString() });
                localStorage.setItem('bp_leads', JSON.stringify(leads));
            });

            AnalyticsService.trackClick('whatsapp');
            AnalyticsService.trackLead('passageiro', form);
            setSuccess(true);

            // Redirect to WhatsApp after short delay
            setTimeout(() => {
                const msg = encodeURIComponent(
                    `Olá! Meu nome é ${form.nome}, moro no bairro ${form.bairro || 'Xinguara'} e quero baixar o app Bora Passageiro! Meu telefone: ${form.telefone}`
                );
                window.open(`https://wa.me/5594992777717?text=${msg}`, '_blank');
            }, 1500);
        } catch {
            // Silent fail
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <section ref={sectionRef} id="cadastro-passageiro" className="py-20 md:py-28 relative">
                <div className="max-w-lg mx-auto px-4 text-center">
                    <div className="bg-white/[0.04] backdrop-blur-sm border border-green-500/20 rounded-3xl p-10 space-y-4">
                        <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-2xl flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 text-green-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Cadastro Enviado!</h3>
                        <p className="text-blue-100/70">Redirecionando para o WhatsApp...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section ref={sectionRef} id="cadastro-passageiro" className="py-20 md:py-28 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-2xl mx-auto px-4 relative z-10">
                <div className="text-center mb-10 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                        <Send className="w-3 h-3" />
                        Cadastre-se
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                        Quer viajar com o{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                            Bora?
                        </span>
                    </h2>
                    <p className="text-blue-100/60 max-w-lg mx-auto">
                        Preencha seus dados e entraremos em contato pelo WhatsApp para te ajudar a baixar o app
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-3xl p-6 md:p-8 space-y-5">
                    {/* Nome */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-blue-100/80 flex items-center gap-2">
                            <User className="w-4 h-4 text-cyan-400" />
                            Seu Nome
                        </label>
                        <input
                            type="text"
                            value={form.nome}
                            onChange={(e) => setForm({ ...form, nome: e.target.value })}
                            placeholder="Digite seu nome completo"
                            required
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm"
                        />
                    </div>

                    {/* Telefone */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-blue-100/80 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-cyan-400" />
                            Telefone / WhatsApp
                        </label>
                        <input
                            type="tel"
                            value={form.telefone}
                            onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                            placeholder="(94) 99999-9999"
                            required
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm"
                        />
                    </div>

                    {/* Bairro */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-blue-100/80 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-cyan-400" />
                            Bairro <span className="text-white/30 text-xs">(opcional)</span>
                        </label>
                        <input
                            type="text"
                            value={form.bairro}
                            onChange={(e) => setForm({ ...form, bairro: e.target.value })}
                            placeholder="Ex: Centro, Jardim América..."
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-lg shadow-lg shadow-cyan-500/25 transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                Quero baixar o app!
                            </>
                        )}
                    </button>

                    <p className="text-center text-xs text-white/30 mt-3">
                        Ao enviar, você será redirecionado ao WhatsApp para concluir o cadastro.
                    </p>
                </form>
            </div>
        </section>
    );
}
