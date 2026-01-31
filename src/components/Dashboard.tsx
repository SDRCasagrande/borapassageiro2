import { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { AnalyticsService } from '../services/analytics';
import { Download, Users, Smartphone, MessageCircle, Printer, ArrowLeft, MapPin, Globe, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function Dashboard() {
    const [data, setData] = useState<any>(null);
    const [filter, setFilter] = useState<'week' | 'month' | 'all'>('week');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const response = await AnalyticsService.getChartData(filter === 'all' ? 90 : filter === 'week' ? 7 : 30);
                setData(response);
            } catch (error: any) {
                if (error.message === 'Unauthorized') {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [filter, navigate]);

    const handlePrint = () => {
        window.print();
    };

    const handleLogout = () => {
        AnalyticsService.logout();
    };

    if (loading || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    const { daily, totals, topCities, topSources } = data;

    // Format daily data for charts
    const chartData = daily.map((d: any) => ({
        date: d.date.split('-').slice(1).join('/'),
        Visitantes: d.visits,
        Downloads: d.clicks.playStore + d.clicks.appStore,
        WhatsApp: d.clicks.whatsapp,
        PlayStore: d.clicks.playStore,
        AppStore: d.clicks.appStore
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

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
                            <p className="text-gray-500">Monitoramento em Tempo Real</p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="bg-white rounded-lg p-1 shadow flex">
                            <button onClick={() => setFilter('week')} className={`px-4 py-2 text-sm font-medium rounded-md ${filter === 'week' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>7 Dias</button>
                            <button onClick={() => setFilter('month')} className={`px-4 py-2 text-sm font-medium rounded-md ${filter === 'month' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>30 Dias</button>
                        </div>
                        <button onClick={handlePrint} className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"><Printer className="w-5 h-5" /></button>
                        <button onClick={handleLogout} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"><LogOut className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-4 bg-blue-50 rounded-xl"><Users className="w-8 h-8 text-blue-600" /></div>
                        <div><p className="text-sm font-medium text-gray-500">Total Visitantes</p><h3 className="text-3xl font-bold text-gray-900">{totals.visits}</h3></div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-4 bg-green-50 rounded-xl"><Download className="w-8 h-8 text-green-600" /></div>
                        <div><p className="text-sm font-medium text-gray-500">Play Store</p><h3 className="text-3xl font-bold text-gray-900">{totals.playStore}</h3></div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-4 bg-gray-100 rounded-xl"><Smartphone className="w-8 h-8 text-gray-800" /></div>
                        <div><p className="text-sm font-medium text-gray-500">App Store</p><h3 className="text-3xl font-bold text-gray-900">{totals.appStore}</h3></div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-4 bg-emerald-50 rounded-xl"><MessageCircle className="w-8 h-8 text-emerald-600" /></div>
                        <div><p className="text-sm font-medium text-gray-500">WhatsApp</p><h3 className="text-3xl font-bold text-gray-900">{totals.whatsapp}</h3></div>
                    </div>
                </div>

                {/* Main Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-[400px]">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Tráfego vs Conversão</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Legend />
                                <Line type="monotone" dataKey="Visitantes" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                                <Line type="monotone" dataKey="Downloads" stroke="#a855f7" strokeWidth={3} dot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-[400px]">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Detalhamento de Conversão</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{ fill: 'transparent' }} />
                                <Legend />
                                <Bar dataKey="PlayStore" fill="#22c55e" radius={[4, 4, 0, 0]} stackId="a" />
                                <Bar dataKey="AppStore" fill="#000000" radius={[4, 4, 0, 0]} stackId="a" />
                                <Bar dataKey="WhatsApp" fill="#ef4444" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* New Insights Section (Geography & Sources) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Top Cities */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-6">
                            <MapPin className="w-5 h-5 text-blue-600" />
                            <h3 className="text-lg font-bold text-gray-900">Top Cidades</h3>
                        </div>
                        <div className="space-y-4">
                            {topCities.length > 0 ? topCities.map((city: any, index: number) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                                            {index + 1}
                                        </div>
                                        <span className="font-medium text-gray-700">{city.name}</span>
                                    </div>
                                    <span className="font-bold text-gray-900">{city.count} visitas</span>
                                </div>
                            )) : (
                                <p className="text-gray-400 italic text-center py-8">Sem dados de localização ainda</p>
                            )}
                        </div>
                    </div>

                    {/* Traffic Sources */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-6">
                            <Globe className="w-5 h-5 text-purple-600" />
                            <h3 className="text-lg font-bold text-gray-900">Origem do Tráfego (UTM)</h3>
                        </div>
                        <div className="h-[300px]">
                            {topSources.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={topSources}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="count"
                                        >
                                            {topSources.map((entry: any, index: number) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <p className="text-gray-400 italic text-center py-12">Sem dados de origem ainda</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
