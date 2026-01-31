import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Save, Layout, Youtube, Megaphone, Gift, Tag, Percent } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = 'https://api.bkaiser.com.br';

interface PromoCode {
    id?: string;
    code: string;
    discount: string;
    description: string;
    isActive: boolean;
}

export function ContentManager() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [contents, setContents] = useState<any[]>([]);

    // New Item State
    const [newItem, setNewItem] = useState({ type: 'youtube', title: '', url: '', section: 'gallery' });

    // Promo Bar State
    const [promo, setPromo] = useState({ enabled: false, text: '' });

    // Popup Promo Codes State
    const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
    const [newPromoCode, setNewPromoCode] = useState<PromoCode>({ code: '', discount: '', description: '', isActive: true });
    const [popupConfig, setPopupConfig] = useState({ enabled: true, title: 'Oferta Exclusiva!', subtitle: 'Baixe agora e ganhe desconto!' });

    useEffect(() => {
        loadContent();
    }, []);

    const loadContent = async () => {
        try {
            const token = localStorage.getItem('bp_admin_token');
            if (!token) return navigate('/login');

            const res = await fetch(`${API_URL}/api/content`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();

            setContents(data.filter((i: any) => i.section === 'gallery'));

            // Find promo config
            const promoItem = data.find((i: any) => i.section === 'promo');
            if (promoItem) {
                setPromo({ enabled: promoItem.isActive, text: promoItem.content });
            }
        } catch (error) {
            console.error('Error loading content', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddGallery = async () => {
        if (!newItem.url) return;

        try {
            const token = localStorage.getItem('bp_admin_token');
            await fetch(`${API_URL}/api/content`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    section: 'gallery',
                    type: 'youtube',
                    title: newItem.title || 'Vídeo sem título',
                    url: newItem.url,
                    order: contents.length
                })
            });
            setNewItem({ type: 'youtube', title: '', url: '', section: 'gallery' });
            loadContent();
        } catch (error) {
            alert('Erro ao adicionar vídeo');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza?')) return;
        try {
            const token = localStorage.getItem('bp_admin_token');
            await fetch(`${API_URL}/api/content/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            loadContent();
        } catch (error) {
            alert('Erro ao deletar');
        }
    };

    const handleSavePromo = async () => {
        try {
            const token = localStorage.getItem('bp_admin_token');
            // We search for existing promo to update, or create new
            // For simplicity, let's assume one distinct promo item or we find it via API logic. 
            // Ideally we'd need the ID, but let's assume the API handles "upsert" logic or we fetch id first.
            // Since our API endpoint does generic create/update, we need to know the ID technically.
            // Let's reload to find ID first (done in loadContent)
            // Note: The API I wrote earlier does upsert if ID provided, else create.
            // So we need to fetch the ID of the 'promo' section item from `contents` or store it in state.

            // Re-fetch strictly for ID safest match for now if not stored in state fully.
            // Actually, let's just fetch all content again to be sure.
            const res = await fetch(`${API_URL}/api/content`, { headers: { 'Authorization': `Bearer ${token}` } });
            const allData = await res.json();
            const existingPromo = allData.find((i: any) => i.section === 'promo');

            await fetch(`${API_URL}/api/content`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: existingPromo?.id, // If exists, update
                    section: 'promo',
                    type: 'text',
                    content: promo.text,
                    isActive: promo.enabled
                })
            });
            alert('Promoção atualizada!');
        } catch (error) {
            alert('Erro ao salvar promoção');
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/dashboard" className="p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Gerenciar Site</h1>
                        <p className="text-gray-500">Adicione vídeos e controle promoções</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Column 1: Gallery */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 sticky top-0 bg-white z-10">
                                <div className="p-2 rounded-lg bg-red-50 text-red-600">
                                    <Youtube className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Galeria de Vídeos</h3>
                            </div>

                            {/* Add Form */}
                            <div className="bg-gray-50 p-4 rounded-xl mb-6 space-y-3">
                                <h4 className="font-medium text-gray-700">Adicionar Novo</h4>
                                <input
                                    type="text"
                                    placeholder="Título (Opcional)"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder:text-gray-400"
                                    value={newItem.title}
                                    onChange={e => setNewItem({ ...newItem, title: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Link do YouTube (ex: https://youtu.be/...)"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder:text-gray-400"
                                    value={newItem.url}
                                    onChange={e => setNewItem({ ...newItem, url: e.target.value })}
                                />
                                <button
                                    onClick={handleAddGallery}
                                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold flex items-center justify-center gap-2"
                                >
                                    <Plus className="w-4 h-4" /> Adicionar Vídeo
                                </button>
                            </div>

                            {/* List */}
                            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                                {contents.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                        <div className="w-32 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                                            {item.url ? (
                                                <img
                                                    src={`https://img.youtube.com/vi/${item.url}/mqdefault.jpg`}
                                                    alt="Thumbnail"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <Youtube className="w-8 h-8" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <h5 className="font-bold text-gray-900 line-clamp-1">{item.title || 'Sem título'}</h5>
                                            <p className="text-xs text-gray-500 truncate">{item.url}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                                {contents.length === 0 && (
                                    <p className="text-center text-gray-400 py-8">Nenhum vídeo adicionado.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Promo & Preview */}
                    <div className="space-y-6">

                        {/* Promo Settings */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <div className="p-2 rounded-lg bg-yellow-50 text-yellow-600">
                                    <Megaphone className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Barra de Promoção</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                                    <span className="font-medium text-gray-700">Status Promocional</span>
                                    <button
                                        onClick={() => setPromo({ ...promo, enabled: !promo.enabled })}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${promo.enabled ? 'bg-green-500' : 'bg-gray-300'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${promo.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Mensagem da Barra</label>
                                    <textarea
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-yellow-400 outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-gray-900 placeholder:text-gray-400"
                                        placeholder="Ex: Use o cupom BORA10 e ganhe 10% OFF!"
                                        value={promo.text}
                                        onChange={e => setPromo({ ...promo, text: e.target.value })}
                                    />
                                </div>

                                <button
                                    onClick={handleSavePromo}
                                    className="w-full py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 font-bold shadow-lg shadow-yellow-500/30 flex items-center justify-center gap-2"
                                >
                                    <Save className="w-4 h-4" /> Salvar Promoção
                                </button>
                            </div>
                        </div>

                        {/* Visual Preview Hint */}
                        <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-blue-600/30 relative overflow-hidden">
                            <Layout className="w-32 h-32 absolute -right-6 -bottom-6 text-white/10" />
                            <h4 className="text-xl font-bold mb-2">Visualizar no Site</h4>
                            <p className="text-blue-100 mb-4">Veja como está ficando sua galeria e promoções em tempo real.</p>
                            <Link
                                to="/"
                                target="_blank"
                                className="inline-flex px-4 py-2 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors"
                            >
                                Abrir Site
                            </Link>
                        </div>

                        {/* Popup Promo Section */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                                    <Gift className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900">Popup de Promoção</h3>
                                    <p className="text-sm text-gray-500">Configure o popup de desconto</p>
                                </div>
                                <button
                                    onClick={() => setPopupConfig({ ...popupConfig, enabled: !popupConfig.enabled })}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${popupConfig.enabled ? 'bg-green-500' : 'bg-gray-300'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${popupConfig.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {/* Popup Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Título do Popup</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900"
                                        placeholder="Ex: Oferta Exclusiva!"
                                        value={popupConfig.title}
                                        onChange={e => setPopupConfig({ ...popupConfig, title: e.target.value })}
                                    />
                                </div>

                                {/* Popup Subtitle */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Texto do Popup</label>
                                    <textarea
                                        rows={2}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900"
                                        placeholder="Ex: Baixe agora e ganhe 50% OFF!"
                                        value={popupConfig.subtitle}
                                        onChange={e => setPopupConfig({ ...popupConfig, subtitle: e.target.value })}
                                    />
                                </div>

                                {/* Add Promo Code */}
                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                                    <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                        <Tag className="w-4 h-4 text-purple-600" />
                                        Adicionar Código de Desconto
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2 mb-3">
                                        <input
                                            type="text"
                                            className="px-3 py-2 rounded-lg border border-purple-200 outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900 text-sm"
                                            placeholder="Código (ex: BORA50)"
                                            value={newPromoCode.code}
                                            onChange={e => setNewPromoCode({ ...newPromoCode, code: e.target.value.toUpperCase() })}
                                        />
                                        <input
                                            type="text"
                                            className="px-3 py-2 rounded-lg border border-purple-200 outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900 text-sm"
                                            placeholder="Desconto (ex: 50%)"
                                            value={newPromoCode.discount}
                                            onChange={e => setNewPromoCode({ ...newPromoCode, discount: e.target.value })}
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 rounded-lg border border-purple-200 outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900 text-sm mb-3"
                                        placeholder="Descrição (ex: nas primeiras 5 corridas)"
                                        value={newPromoCode.description}
                                        onChange={e => setNewPromoCode({ ...newPromoCode, description: e.target.value })}
                                    />
                                    <button
                                        onClick={() => {
                                            if (newPromoCode.code && newPromoCode.discount) {
                                                setPromoCodes([...promoCodes, { ...newPromoCode, id: Date.now().toString() }]);
                                                setNewPromoCode({ code: '', discount: '', description: '', isActive: true });
                                            }
                                        }}
                                        className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-bold text-sm flex items-center justify-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" /> Adicionar Código
                                    </button>
                                </div>

                                {/* List of Promo Codes */}
                                {promoCodes.length > 0 && (
                                    <div className="space-y-2">
                                        <h4 className="font-medium text-gray-700 flex items-center gap-2">
                                            <Percent className="w-4 h-4" />
                                            Códigos Ativos ({promoCodes.length})
                                        </h4>
                                        {promoCodes.map((code) => (
                                            <div key={code.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <span className="px-2 py-1 bg-purple-100 text-purple-700 font-mono font-bold text-sm rounded">{code.code}</span>
                                                    <span className="text-green-600 font-bold">{code.discount}</span>
                                                    <span className="text-gray-500 text-sm">{code.description}</span>
                                                </div>
                                                <button
                                                    onClick={() => setPromoCodes(promoCodes.filter(c => c.id !== code.id))}
                                                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <button
                                    onClick={() => {
                                        // TODO: Save to API when backend is ready
                                        localStorage.setItem('bp_popup_config', JSON.stringify(popupConfig));
                                        localStorage.setItem('bp_promo_codes', JSON.stringify(promoCodes));
                                        alert('Configurações do Popup salvas!');
                                    }}
                                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl hover:from-purple-700 hover:to-pink-600 font-bold shadow-lg flex items-center justify-center gap-2"
                                >
                                    <Save className="w-4 h-4" /> Salvar Popup
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
