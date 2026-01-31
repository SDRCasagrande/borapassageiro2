import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Save, Layout, Youtube, Megaphone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = 'https://api.bkaiser.com.br';

export function ContentManager() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [contents, setContents] = useState<any[]>([]);

    // New Item State
    const [newItem, setNewItem] = useState({ type: 'youtube', title: '', url: '', section: 'gallery' });

    // Promo State (managed as a specialized content item)
    const [promo, setPromo] = useState({ enabled: false, text: '' });

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
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
                                    value={newItem.title}
                                    onChange={e => setNewItem({ ...newItem, title: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Link do YouTube (ex: https://youtu.be/...)"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
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
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-yellow-500"
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

                    </div>
                </div>
            </div>
        </div>
    );
}
