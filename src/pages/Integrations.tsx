import { useState, useEffect } from 'react';
import { ArrowLeft, Save, HelpCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AnalyticsService } from '../services/analytics'; // We can reuse or extend this, but I'll use direct fetch for now for simplicity or extend service later.

const API_URL = 'https://api.bkaiser.com.br';

export function Integrations() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Config State
    const [facebook, setFacebook] = useState({ pixelId: '', accessToken: '' });
    const [google, setGoogle] = useState({ measurementId: '', apiSecret: '' });
    const [tiktok, setTikTok] = useState({ pixelId: '', accessToken: '' });

    useEffect(() => {
        loadConfigs();
    }, []);

    const loadConfigs = async () => {
        try {
            const token = localStorage.getItem('bp_admin_token');
            if (!token) return navigate('/login');

            const res = await fetch(`${API_URL}/api/integrations`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.status === 401) return navigate('/login');

            const data = await res.json();

            if (data.facebook) setFacebook(data.facebook);
            if (data.google) setGoogle(data.google);
            if (data.tiktok) setTikTok(data.tiktok);
        } catch (error) {
            console.error('Error loading API configs', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (key: string, data: any) => {
        setSaving(true);
        try {
            const token = localStorage.getItem('bp_admin_token');
            await fetch(`${API_URL}/api/integrations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ key, data })
            });
            alert('Salvo com sucesso!');
        } catch (error) {
            alert('Erro ao salvar');
        } finally {
            setSaving(false);
        }
    };

    const Section = ({ title, icon, color, children }: any) => (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <div className={`flex items-center gap-3 mb-6 pb-4 border-b border-gray-100`}>
                <div className={`p-2 rounded-lg ${color}`}>
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            </div>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/dashboard" className="p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Integrações</h1>
                        <p className="text-gray-500">Gerencie seus pixels e APIs de conversão</p>
                    </div>
                </div>

                {/* Facebook */}
                <Section
                    title="Facebook Ads (Meta)"
                    icon={<svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>}
                    color="bg-blue-50"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pixel ID</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Ex: 1234567890"
                            value={facebook.pixelId}
                            onChange={e => setFacebook({ ...facebook, pixelId: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Access Token (API de Conversões)
                            <a href="https://developers.facebook.com/docs/marketing-api/conversions-api/get-started" target="_blank" className="ml-2 text-blue-500 hover:underline text-xs inline-flex items-center gap-1"><HelpCircle className="w-3 h-3" /> Como pegar?</a>
                        </label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="EAA..."
                            value={facebook.accessToken}
                            onChange={e => setFacebook({ ...facebook, accessToken: e.target.value })}
                        />
                    </div>
                    <div className="pt-2">
                        <button
                            onClick={() => handleSave('facebook', facebook)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                            disabled={saving}
                        >
                            Salvar Facebook
                        </button>
                    </div>
                </Section>

                {/* Google */}
                <Section
                    title="Google Ads / GA4"
                    icon={<svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12.003 12c.006 0 .012 0 .018-.003.012.003.024.003.036.003.006 0 .012-.003.018-.003L12.003 12zM5.388 9.227l.003.003c.636 1.134 1.346 2.217 2.112 3.243-.45.312-.87.666-1.254 1.053l-.009.009-.009.009c-1.398 1.404-2.181 3.297-2.181 5.277 0 .114.003.231.009.345 0 .006 0 .009.003.015h.003l.063.93h.93c.006 0 .009 0 .015.003.114.006.231.009.345.009 1.98 0 3.873-.783 5.277-2.181l.009-.009.009-.009c.387-.384.741-.804 1.053-1.254 1.026.765 2.109 1.476 3.243 2.112h.003l.621 1.104h1.275l.489-1.956c.075-.297.108-.606.108-.915 0-2.13-1.722-3.852-3.843-3.855-.309 0-.618.033-.915.108l-1.956.489-1.104-.621-4.2-7.857L5.388 9.227z" /></svg>}
                    color="bg-orange-50"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Measurement ID (G-XXXXXXXX)</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none"
                            placeholder="G-..."
                            value={google.measurementId}
                            onChange={e => setGoogle({ ...google, measurementId: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">API Secret (Measurement Protocol)</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none"
                            placeholder="..."
                            value={google.apiSecret}
                            onChange={e => setGoogle({ ...google, apiSecret: e.target.value })}
                        />
                    </div>
                    <div className="pt-2">
                        <button
                            onClick={() => handleSave('google', google)}
                            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium transition-colors"
                            disabled={saving}
                        >
                            Salvar Google
                        </button>
                    </div>
                </Section>

                {/* TikTok */}
                <Section
                    title="TikTok Ads"
                    icon={<svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" /></svg>}
                    color="bg-gray-100"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pixel ID</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                            placeholder="..."
                            value={tiktok.pixelId}
                            onChange={e => setTikTok({ ...tiktok, pixelId: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Access Token</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                            placeholder="..."
                            value={tiktok.accessToken}
                            onChange={e => setTikTok({ ...tiktok, accessToken: e.target.value })}
                        />
                    </div>
                    <div className="pt-2">
                        <button
                            onClick={() => handleSave('tiktok', tiktok)}
                            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-medium transition-colors"
                            disabled={saving}
                        >
                            Salvar TikTok
                        </button>
                    </div>
                </Section>
            </div>
        </div>
    );
}
