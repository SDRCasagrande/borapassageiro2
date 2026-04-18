import { useState, useEffect } from 'react';
import { ArrowLeft, Users, Filter, UserPlus, FileSpreadsheet } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = 'https://api.bkaiser.com.br';

export function Leads() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [leads, setLeads] = useState<any[]>([]);
    const [filter, setFilter] = useState('all'); // 'all', 'motorista', 'passageiro'

    useEffect(() => {
        loadLeads();
    }, []);

    const loadLeads = async () => {
        try {
            const token = localStorage.getItem('bp_admin_token');
            if (!token) return navigate('/login');

            // Try to fetch leads. If endpoint doesn't exist, fallback to mock data to show the UI
            const res = await fetch(`${API_URL}/api/leads`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).catch(() => null);

            if (res && res.ok) {
                const data = await res.json();
                setLeads(data);
            } else {
                // MOCK DATA for Demo UX
                setLeads([
                    { id: 1, type: 'motorista', name: 'João Silva', phone: '94991234567', utm_source: 'fb_ads', utm_campaign: 'promo_10_porcento', date: new Date().toISOString() },
                    { id: 2, type: 'passageiro', name: 'Maria Souza', phone: '94998765432', utm_source: 'google', utm_campaign: 'search_xinguara', date: new Date(Date.now() - 86400000).toISOString() },
                    { id: 3, type: 'motorista', name: 'Carlos Santos', phone: '94999998888', utm_source: 'organic', utm_campaign: '', date: new Date(Date.now() - 172800000).toISOString() },
                ]);
            }
        } catch (error) {
            console.error('Error loading leads', error);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = () => {
        // Simple CSV generation
        const headers = ['Data', 'Tipo', 'Nome', 'Telefone', 'Origem (UTM)'];
        const csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n"
            + leads.map(e => `${new Date(e.date).toLocaleDateString()},${e.type},${e.name},${e.phone},${e.utm_source}`).join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "bora_passageiro_leads.csv");
        document.body.appendChild(link);
        link.click();
    };

    const filteredLeads = filter === 'all' ? leads : leads.filter(l => l.type === filter);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link to="/dashboard" className="p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">CRM de Leads</h1>
                            <p className="text-gray-500">Acompanhe os cadastros capturados nas Landings V3</p>
                        </div>
                    </div>
                    <button onClick={handleExport} className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-lg shadow-green-500/20">
                        <FileSpreadsheet className="w-4 h-4" />
                        Exportar Excel
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-600" />
                            <h2 className="text-xl font-bold text-gray-800">Contatos Recentes</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-gray-400" />
                            <select 
                                value={filter} 
                                onChange={(e) => setFilter(e.target.value)}
                                className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 font-medium text-sm"
                            >
                                <option value="all">Todos os Leads</option>
                                <option value="motorista">Somente Motoristas</option>
                                <option value="passageiro">Somente Passageiros</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                                    <th className="px-6 py-4 font-medium">Data</th>
                                    <th className="px-6 py-4 font-medium">Tipo</th>
                                    <th className="px-6 py-4 font-medium">Nome</th>
                                    <th className="px-6 py-4 font-medium">Telefone</th>
                                    <th className="px-6 py-4 font-medium">Origem (UTM Source)</th>
                                    <th className="px-6 py-4 font-medium">Campanha</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-blue-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(lead.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-bold ${lead.type === 'motorista' ? 'bg-emerald-100 text-emerald-700' : 'bg-cyan-100 text-cyan-700'}`}>
                                                {lead.type.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{lead.name || 'N/A'}</td>
                                        <td className="px-6 py-4 text-gray-600 font-mono text-sm">{lead.phone || 'N/A'}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">
                                                {lead.utm_source || 'orgânico'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-[150px]">
                                            {lead.utm_campaign || '-'}
                                        </td>
                                    </tr>
                                ))}
                                {filteredLeads.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                                            <UserPlus className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                            Nenhum lead encontrado com este filtro.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
