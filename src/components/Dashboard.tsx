import { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line
} from 'recharts';
import { AnalyticsService } from '../services/analytics';
import type { DailyStats } from '../services/analytics';
import { Download, Users, Smartphone, MessageCircle, Printer, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
    const [data, setData] = useState<DailyStats[]>([]);
    const [filter, setFilter] = useState<'week' | 'month' | 'all'>('week');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load real data from API
        const loadData = async () => {
            setLoading(true);
            try {
                const allData = await AnalyticsService.getChartData();
                setData(allData);
            } catch (error) {
                console.error('Failed to load analytics:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const getFilteredData = () => {
        if (filter === 'all') return data;
        const now = new Date();
        const days = filter === 'week' ? 7 : 30;
        const cutoff = new Date(now.setDate(now.getDate() - days));

        return data.filter(d => new Date(d.date) >= cutoff);
    };

    const chartData = getFilteredData().map(d => ({
        date: d.date.split('-').slice(1).join('/'), // MM/DD
        Visitantes: d.visits,
        Downloads: d.clicks.playStore + d.clicks.appStore,
        WhatsApp: d.clicks.whatsapp,
        PlayStore: d.clicks.playStore,
        AppStore: d.clicks.appStore
    }));

    const totalVisits = chartData.reduce((acc, curr) => acc + curr.Visitantes, 0);
    const totalPlayStore = chartData.reduce((acc, curr) => acc + curr.PlayStore, 0);
    const totalAppStore = chartData.reduce((acc, curr) => acc + curr.AppStore, 0);
    const totalWhatsApp = chartData.reduce((acc, curr) => acc + curr.WhatsApp, 0);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Dashboard Bora Passageiro</h1>
                            <p className="text-gray-500">Monitoramento de acessos e cliques</p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="bg-white rounded-lg p-1 shadow flex">
                            <button
                                onClick={() => setFilter('week')}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${filter === 'week' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                7 Dias
                            </button>
                            <button
                                onClick={() => setFilter('month')}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${filter === 'month' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                30 Dias
                            </button>
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${filter === 'all' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                Tudo
                            </button>
                        </div>

                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-800 transition-colors"
                        >
                            <Printer className="w-4 h-4" />
                            <span>Imprimir</span>
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-4 bg-blue-50 rounded-xl">
                            <Users className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Visitantes</p>
                            <h3 className="text-3xl font-bold text-gray-900">{totalVisits}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-4 bg-green-50 rounded-xl">
                            <Download className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Play Store</p>
                            <h3 className="text-3xl font-bold text-gray-900">{totalPlayStore}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-4 bg-gray-100 rounded-xl">
                            <Smartphone className="w-8 h-8 text-gray-800" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">App Store</p>
                            <h3 className="text-3xl font-bold text-gray-900">{totalAppStore}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-4 bg-emerald-50 rounded-xl">
                            <MessageCircle className="w-8 h-8 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">WhatsApp</p>
                            <h3 className="text-3xl font-bold text-gray-900">{totalWhatsApp}</h3>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Main Traffic Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-[400px]">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Tráfego vs Conversão</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="Visitantes" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="Downloads" stroke="#a855f7" strokeWidth={3} dot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Breakdown Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-[400px]">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Detalhamento de Cliques</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ fill: 'transparent' }}
                                />
                                <Legend />
                                <Bar dataKey="PlayStore" fill="#22c55e" radius={[4, 4, 0, 0]} stackId="a" />
                                <Bar dataKey="AppStore" fill="#000000" radius={[4, 4, 0, 0]} stackId="a" />
                                <Bar dataKey="WhatsApp" fill="#ef4444" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <h3 className="text-lg font-medium text-gray-900">Carregando dados...</h3>
                        <p className="text-gray-500">Buscando estatísticas do servidor</p>
                    </div>
                )}

                {/* Empty State / Info */}
                {!loading && chartData.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                        <Smartphone className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">Sem dados ainda</h3>
                        <p className="text-gray-500">Os dados aparecerão aqui assim que os usuários acessarem o site.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
