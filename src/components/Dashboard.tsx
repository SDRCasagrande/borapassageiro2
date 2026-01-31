import { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { AnalyticsService } from '../services/analytics';
import { Download, Users, Smartphone, MessageCircle, Printer, ArrowLeft, MapPin, Globe, LogOut, Settings, Layout, Calendar, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

type FilterType = 'today' | 'yesterday' | 'week' | 'month' | 'custom';

export function Dashboard() {
    const [data, setData] = useState<any>(null);
    const [filter, setFilter] = useState<FilterType>('week');
    const [loading, setLoading] = useState(true);
    const [showCustomDate, setShowCustomDate] = useState(false);
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');
    const navigate = useNavigate();

    // Calculate days based on filter
    const getDaysFromFilter = (f: FilterType) => {
        switch (f) {
            case 'today': return 1;
            case 'yesterday': return 2;
            case 'week': return 7;
            case 'month': return 30;
            case 'custom': return 90; // Will be refined with actual dates
            default: return 7;
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const days = getDaysFromFilter(filter);
                const response = await AnalyticsService.getChartData(days);
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

    const handleFilterChange = (newFilter: FilterType) => {
        if (newFilter === 'custom') {
            setShowCustomDate(true);
        } else {
            setShowCustomDate(false);
            setFilter(newFilter);
        }
    };

    const applyCustomDate = () => {
        if (customStartDate && customEndDate) {
            setFilter('custom');
            setShowCustomDate(false);
        }
    };

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
        fullDate: d.date,
        Visitantes: d.visits,
        Downloads: d.clicks.playStore + d.clicks.appStore,
        WhatsApp: d.clicks.whatsapp,
        PlayStore: d.clicks.playStore,
        AppStore: d.clicks.appStore
    }));

    // Find best and worst days
    const sortedByVisits = [...chartData].sort((a, b) => b.Visitantes - a.Visitantes);
    const bestDay = sortedByVisits[0];
    const worstDay = sortedByVisits[sortedByVisits.length - 1];

    // Calculate daily average
    const avgVisits = Math.round(chartData.reduce((sum: number, d: any) => sum + d.Visitantes, 0) / chartData.length);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    const filterButtons = [
        { key: 'today', label: 'Hoje', icon: Clock },
        { key: 'yesterday', label: 'Ontem', icon: Calendar },
        { key: 'week', label: '7 Dias', icon: null },
        { key: 'month', label: '30 Dias', icon: null },
        { key: 'custom', label: 'Período', icon: Calendar },
    ];

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

                    <div className="flex gap-2 items-center flex-wrap">
                        {/* Date Filter Buttons */}
                        <div className="bg-white rounded-lg p-1 shadow flex flex-wrap">
                            {filterButtons.map((btn) => (
                                <button
                                    key={btn.key}
                                    onClick={() => handleFilterChange(btn.key as FilterType)}
                                    className={`px-3 py-2 text-sm font-medium rounded-md flex items-center gap-1 ${filter === btn.key ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    {btn.icon && <btn.icon className="w-4 h-4" />}
                                    {btn.label}
                                </button>
                            ))}
                        </div>
                        <button onClick={handlePrint} className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"><Printer className="w-5 h-5" /></button>
                        <Link to="/content" className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200" title="Gerenciar Site"><Layout className="w-5 h-5" /></Link>
                        <Link to="/integrations" className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200" title="Integrações"><Settings className="w-5 h-5" /></Link>
                        <button onClick={handleLogout} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"><LogOut className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* Custom Date Picker */}
                {showCustomDate && (
                    <div className="bg-white p-4 rounded-xl shadow-lg border border-blue-200 flex flex-wrap items-center gap-4 animate-fade-in">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600">De:</label>
                            <input
                                type="date"
                                value={customStartDate}
                                onChange={(e) => setCustomStartDate(e.target.value)}
                                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600">Até:</label>
                            <input
                                type="date"
                                value={customEndDate}
                                onChange={(e) => setCustomEndDate(e.target.value)}
                                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <button
                            onClick={applyCustomDate}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                        >
                            Aplicar
                        </button>
                        <button
                            onClick={() => setShowCustomDate(false)}
                            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                        >
                            Cancelar
                        </button>
                    </div>
                )}

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

                {/* Daily Comparison Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl shadow-lg text-white">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-5 h-5" />
                            <span className="text-sm font-medium opacity-90">Melhor Dia</span>
                        </div>
                        <h3 className="text-3xl font-bold">{bestDay?.Visitantes || 0} visitas</h3>
                        <p className="text-sm opacity-80 mt-1">{bestDay?.date || '-'}</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-2xl shadow-lg text-white">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingDown className="w-5 h-5" />
                            <span className="text-sm font-medium opacity-90">Menor Dia</span>
                        </div>
                        <h3 className="text-3xl font-bold">{worstDay?.Visitantes || 0} visitas</h3>
                        <p className="text-sm opacity-80 mt-1">{worstDay?.date || '-'}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl shadow-lg text-white">
                        <div className="flex items-center gap-2 mb-2">
                            <Users className="w-5 h-5" />
                            <span className="text-sm font-medium opacity-90">Média Diária</span>
                        </div>
                        <h3 className="text-3xl font-bold">{avgVisits} visitas</h3>
                        <p className="text-sm opacity-80 mt-1">por dia</p>
                    </div>
                </div>

                {/* Main Charts - Premium Styled */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Area Chart - Comparison */}
                    <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl shadow-lg border border-blue-100 h-[400px] relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-400" />
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">📊</span>
                            Comparativo de Acessos
                        </h3>
                        <ResponsiveContainer width="100%" height={320}>
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e7ff" />
                                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.15)', background: 'rgba(255,255,255,0.95)' }}
                                />
                                <Area type="monotone" dataKey="Visitantes" stroke="#3b82f6" strokeWidth={3} fill="url(#colorVisits)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-gradient-to-br from-white to-purple-50 p-6 rounded-2xl shadow-lg border border-purple-100 h-[400px] relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-400" />
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-sm">📈</span>
                            Tráfego vs Conversão
                        </h3>
                        <ResponsiveContainer width="100%" height={320}>
                            <LineChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorLine1" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#3b82f6" />
                                        <stop offset="100%" stopColor="#06b6d4" />
                                    </linearGradient>
                                    <linearGradient id="colorLine2" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#a855f7" />
                                        <stop offset="100%" stopColor="#ec4899" />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3e8ff" />
                                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.15)', background: 'rgba(255,255,255,0.95)' }} />
                                <Legend />
                                <Line type="monotone" dataKey="Visitantes" stroke="url(#colorLine1)" strokeWidth={3} dot={{ r: 5, fill: '#3b82f6' }} activeDot={{ r: 7 }} />
                                <Line type="monotone" dataKey="Downloads" stroke="url(#colorLine2)" strokeWidth={3} dot={{ r: 5, fill: '#a855f7' }} activeDot={{ r: 7 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Second Row Charts - Premium Styled */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-white to-emerald-50 p-6 rounded-2xl shadow-lg border border-emerald-100 h-[400px] relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400" />
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-sm">📊</span>
                            Detalhamento de Conversão
                        </h3>
                        <ResponsiveContainer width="100%" height={320}>
                            <BarChart data={chartData}>
                                <defs>
                                    <linearGradient id="barPlayStore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#22c55e" />
                                        <stop offset="100%" stopColor="#16a34a" />
                                    </linearGradient>
                                    <linearGradient id="barAppStore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#374151" />
                                        <stop offset="100%" stopColor="#111827" />
                                    </linearGradient>
                                    <linearGradient id="barWhatsApp" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#25d366" />
                                        <stop offset="100%" stopColor="#128c7e" />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d1fae5" />
                                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.15)', background: 'rgba(255,255,255,0.95)' }} cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }} />
                                <Legend />
                                <Bar dataKey="PlayStore" fill="url(#barPlayStore)" radius={[6, 6, 0, 0]} stackId="a" />
                                <Bar dataKey="AppStore" fill="url(#barAppStore)" radius={[6, 6, 0, 0]} stackId="a" />
                                <Bar dataKey="WhatsApp" fill="url(#barWhatsApp)" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Top Cities - Premium */}
                    <div className="bg-gradient-to-br from-white to-amber-50 p-6 rounded-2xl shadow-lg border border-amber-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-400" />
                        <div className="flex items-center gap-2 mb-6">
                            <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                                <MapPin className="w-4 h-4 text-amber-600" />
                            </span>
                            <h3 className="text-lg font-bold text-gray-900">Top Cidades</h3>
                        </div>
                        <div className="space-y-3">
                            {topCities.length > 0 ? topCities.map((city: any, index: number) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-white/80 rounded-xl border border-amber-100 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${index === 0 ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white' :
                                            index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                                                index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white' :
                                                    'bg-amber-100 text-amber-700'
                                            }`}>
                                            {index + 1}
                                        </div>
                                        <span className="font-medium text-gray-700">{city.name}</span>
                                    </div>
                                    <span className="font-bold text-gray-900 bg-amber-100 px-3 py-1 rounded-full text-sm">{city.count} visitas</span>
                                </div>
                            )) : (
                                <p className="text-gray-400 italic text-center py-8">Sem dados de localização ainda</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Traffic Sources - Premium */}
                <div className="bg-gradient-to-br from-white to-indigo-50 p-6 rounded-2xl shadow-lg border border-indigo-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 to-purple-400" />
                    <div className="flex items-center gap-2 mb-6">
                        <span className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <Globe className="w-4 h-4 text-indigo-600" />
                        </span>
                        <h3 className="text-lg font-bold text-gray-900">Origem do Tráfego (UTM)</h3>
                    </div>
                    <div className="h-[300px]">
                        {topSources.length > 0 ? (
                            <ResponsiveContainer width="100%" height={280}>
                                <PieChart>
                                    <defs>
                                        <linearGradient id="pieColor1" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#3b82f6" />
                                            <stop offset="100%" stopColor="#1d4ed8" />
                                        </linearGradient>
                                        <linearGradient id="pieColor2" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#22c55e" />
                                            <stop offset="100%" stopColor="#15803d" />
                                        </linearGradient>
                                        <linearGradient id="pieColor3" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#f59e0b" />
                                            <stop offset="100%" stopColor="#d97706" />
                                        </linearGradient>
                                        <linearGradient id="pieColor4" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#ec4899" />
                                            <stop offset="100%" stopColor="#be185d" />
                                        </linearGradient>
                                        <linearGradient id="pieColor5" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#8b5cf6" />
                                            <stop offset="100%" stopColor="#6d28d9" />
                                        </linearGradient>
                                    </defs>
                                    <Pie
                                        data={topSources}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={110}
                                        fill="#8884d8"
                                        paddingAngle={3}
                                        dataKey="count"
                                        stroke="none"
                                    >
                                        {topSources.map((_entry: any, index: number) => (
                                            <Cell key={`cell-${index}`} fill={`url(#pieColor${(index % 5) + 1})`} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.15)', background: 'rgba(255,255,255,0.95)' }} />
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
    );
}

