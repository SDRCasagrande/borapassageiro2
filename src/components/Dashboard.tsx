import { useState, useEffect, useCallback } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { AnalyticsService } from '../services/analytics';
import { Download, Users, Smartphone, MessageCircle, Printer, ArrowLeft, MapPin, Globe, LogOut, Settings, Layout, Calendar, TrendingUp, TrendingDown, Clock, RefreshCw, Percent } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

type FilterType = 'today' | 'yesterday' | 'week' | 'month' | 'custom';

export function Dashboard() {
    const [data, setData] = useState<any>(null);
    const [filter, setFilter] = useState<FilterType>('week');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [showCustomDate, setShowCustomDate] = useState(false);
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');
    const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
    const navigate = useNavigate();

    // Calculate days based on filter
    const getDaysFromFilter = (f: FilterType) => {
        switch (f) {
            case 'today': return 1;
            case 'yesterday': return 2;
            case 'week': return 7;
            case 'month': return 30;
            case 'custom': return 90;
            default: return 7;
        }
    };

    const loadData = useCallback(async (showRefreshing = false) => {
        if (showRefreshing) setRefreshing(true);
        else setLoading(true);
        try {
            const days = getDaysFromFilter(filter);
            const response = await AnalyticsService.getChartData(days);
            setData(response);
            setLastUpdate(new Date());
        } catch (error: any) {
            if (error.message === 'Unauthorized') {
                navigate('/login');
            }
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [filter, navigate]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // Auto-refresh every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            loadData(true);
        }, 30000);
        return () => clearInterval(interval);
    }, [loadData]);

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
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
                <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                <p className="text-gray-500 text-sm">Carregando dados...</p>
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
    const sortedByVisits = [...chartData].sort((a: any, b: any) => b.Visitantes - a.Visitantes);
    const bestDay = sortedByVisits[0];
    const worstDay = sortedByVisits[sortedByVisits.length - 1];

    // Calculate daily average
    const avgVisits = Math.round(chartData.reduce((sum: number, d: any) => sum + d.Visitantes, 0) / chartData.length);

    // Conversion rate KPI
    const totalDownloads = totals.playStore + totals.appStore;
    const conversionRate = totals.visits > 0 ? ((totalDownloads / totals.visits) * 100).toFixed(1) : '0.0';

    const filterButtons = [
        { key: 'today', label: 'Hoje', icon: Clock },
        { key: 'yesterday', label: 'Ontem', icon: Calendar },
        { key: 'week', label: '7d', icon: null },
        { key: 'month', label: '30d', icon: null },
        { key: 'custom', label: 'Período', icon: Calendar },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
                {/* Header */}
                <div className="flex flex-col gap-3 print:hidden">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-4">
                            <Link to="/" className="p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors">
                                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                            </Link>
                            <div>
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
                                <div className="flex items-center gap-2 text-gray-400 text-xs">
                                    <span>Bora Passageiro</span>
                                    <span>•</span>
                                    <span>{lastUpdate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                                    {refreshing && <RefreshCw className="w-3 h-3 animate-spin text-blue-500" />}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-1 sm:gap-2 items-center">
                            <button onClick={() => loadData(true)} className="p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors" title="Atualizar">
                                <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
                            </button>
                            <button onClick={handlePrint} className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 hidden sm:block">
                                <Printer className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                            <Link to="/leads" className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 hidden sm:block" title="CRM de Leads">
                                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Link>
                            <Link to="/content" className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 hidden sm:block" title="Gerenciar Site">
                                <Layout className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Link>
                            <Link to="/integrations" className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 hidden sm:block" title="Integrações">
                                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Link>
                            <button onClick={handleLogout} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Date Filter Buttons - scrollable on mobile */}
                    <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0">
                        <div className="bg-white rounded-lg p-1 shadow inline-flex min-w-max">
                            {filterButtons.map((btn) => (
                                <button
                                    key={btn.key}
                                    onClick={() => handleFilterChange(btn.key as FilterType)}
                                    className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-md flex items-center gap-1 whitespace-nowrap ${filter === btn.key ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    {btn.icon && <btn.icon className="w-3 h-3 sm:w-4 sm:h-4" />}
                                    {btn.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mobile quick links */}
                    <div className="flex gap-2 sm:hidden">
                        <Link to="/content" className="flex-1 p-2 bg-purple-50 text-purple-600 rounded-lg text-center text-xs font-medium">
                            <Layout className="w-4 h-4 mx-auto mb-1" /> Site
                        </Link>
                        <Link to="/integrations" className="flex-1 p-2 bg-blue-50 text-blue-600 rounded-lg text-center text-xs font-medium">
                            <Settings className="w-4 h-4 mx-auto mb-1" /> Integrações
                        </Link>
                        <button onClick={handlePrint} className="flex-1 p-2 bg-gray-100 text-gray-600 rounded-lg text-center text-xs font-medium">
                            <Printer className="w-4 h-4 mx-auto mb-1" /> Imprimir
                        </button>
                    </div>
                </div>

                {/* Custom Date Picker */}
                {showCustomDate && (
                    <div className="bg-white p-3 sm:p-4 rounded-xl shadow-lg border border-blue-200 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 animate-fade-in">
                        <Calendar className="w-5 h-5 text-blue-600 hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600 min-w-[24px]">De:</label>
                            <input
                                type="date"
                                value={customStartDate}
                                onChange={(e) => setCustomStartDate(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600 min-w-[24px]">Até:</label>
                            <input
                                type="date"
                                value={customEndDate}
                                onChange={(e) => setCustomEndDate(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button onClick={applyCustomDate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
                                Aplicar
                            </button>
                            <button onClick={() => setShowCustomDate(false)} className="flex-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-sm">
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}

                {/* Stats Cards - 2x2 on mobile, 5 on desktop (added conversion rate) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                    <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 sm:gap-4">
                        <div className="p-2 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl shrink-0"><Users className="w-5 h-5 sm:w-8 sm:h-8 text-blue-600" /></div>
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-gray-500 truncate">Visitantes</p>
                            <h3 className="text-xl sm:text-3xl font-bold text-gray-900">{totals.visits}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 sm:gap-4">
                        <div className="p-2 sm:p-4 bg-green-50 rounded-lg sm:rounded-xl shrink-0"><Download className="w-5 h-5 sm:w-8 sm:h-8 text-green-600" /></div>
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-gray-500 truncate">Play Store</p>
                            <h3 className="text-xl sm:text-3xl font-bold text-gray-900">{totals.playStore}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 sm:gap-4">
                        <div className="p-2 sm:p-4 bg-gray-100 rounded-lg sm:rounded-xl shrink-0"><Smartphone className="w-5 h-5 sm:w-8 sm:h-8 text-gray-800" /></div>
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-gray-500 truncate">App Store</p>
                            <h3 className="text-xl sm:text-3xl font-bold text-gray-900">{totals.appStore}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 sm:gap-4">
                        <div className="p-2 sm:p-4 bg-emerald-50 rounded-lg sm:rounded-xl shrink-0"><MessageCircle className="w-5 h-5 sm:w-8 sm:h-8 text-emerald-600" /></div>
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-gray-500 truncate">WhatsApp</p>
                            <h3 className="text-xl sm:text-3xl font-bold text-gray-900">{totals.whatsapp}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 sm:gap-4 col-span-2 sm:col-span-1">
                        <div className="p-2 sm:p-4 bg-purple-50 rounded-lg sm:rounded-xl shrink-0"><Percent className="w-5 h-5 sm:w-8 sm:h-8 text-purple-600" /></div>
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-gray-500 truncate">Conversão</p>
                            <h3 className="text-xl sm:text-3xl font-bold text-gray-900">{conversionRate}%</h3>
                        </div>
                    </div>
                </div>

                {/* Daily Comparison Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg text-white">
                        <div className="flex items-center gap-2 mb-1 sm:mb-2">
                            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm font-medium opacity-90">Melhor Dia</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold">{bestDay?.Visitantes || 0} visitas</h3>
                        <p className="text-xs sm:text-sm opacity-80 mt-1">{bestDay?.date || '-'}</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg text-white">
                        <div className="flex items-center gap-2 mb-1 sm:mb-2">
                            <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm font-medium opacity-90">Menor Dia</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold">{worstDay?.Visitantes || 0} visitas</h3>
                        <p className="text-xs sm:text-sm opacity-80 mt-1">{worstDay?.date || '-'}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg text-white">
                        <div className="flex items-center gap-2 mb-1 sm:mb-2">
                            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm font-medium opacity-90">Média Diária</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold">{avgVisits} visitas</h3>
                        <p className="text-xs sm:text-sm opacity-80 mt-1">por dia</p>
                    </div>
                </div>

                {/* Main Charts - Responsive */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                    {/* Area Chart */}
                    <div className="bg-gradient-to-br from-white to-blue-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-blue-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-400" />
                        <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                            <span className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center text-xs sm:text-sm">📊</span>
                            Comparativo de Acessos
                        </h3>
                        <div className="h-[250px] sm:h-[320px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e7ff" />
                                    <XAxis dataKey="date" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} width={30} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.15)', background: 'rgba(255,255,255,0.95)', fontSize: '12px' }} />
                                    <Area type="monotone" dataKey="Visitantes" stroke="#3b82f6" strokeWidth={2} fill="url(#colorVisits)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Line Chart */}
                    <div className="bg-gradient-to-br from-white to-purple-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-purple-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-400" />
                        <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                            <span className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-lg flex items-center justify-center text-xs sm:text-sm">📈</span>
                            Tráfego vs Conversão
                        </h3>
                        <div className="h-[250px] sm:h-[320px]">
                            <ResponsiveContainer width="100%" height="100%">
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
                                    <XAxis dataKey="date" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} width={30} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.15)', background: 'rgba(255,255,255,0.95)', fontSize: '12px' }} />
                                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                                    <Line type="monotone" dataKey="Visitantes" stroke="url(#colorLine1)" strokeWidth={2} dot={{ r: 3, fill: '#3b82f6' }} activeDot={{ r: 5 }} />
                                    <Line type="monotone" dataKey="Downloads" stroke="url(#colorLine2)" strokeWidth={2} dot={{ r: 3, fill: '#a855f7' }} activeDot={{ r: 5 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Second Row Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                    {/* Bar Chart */}
                    <div className="bg-gradient-to-br from-white to-emerald-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-emerald-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400" />
                        <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                            <span className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-xs sm:text-sm">📊</span>
                            Detalhamento
                        </h3>
                        <div className="h-[250px] sm:h-[320px]">
                            <ResponsiveContainer width="100%" height="100%">
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
                                    <XAxis dataKey="date" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} width={30} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.15)', background: 'rgba(255,255,255,0.95)', fontSize: '12px' }} cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }} />
                                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                                    <Bar dataKey="PlayStore" fill="url(#barPlayStore)" radius={[4, 4, 0, 0]} stackId="a" />
                                    <Bar dataKey="AppStore" fill="url(#barAppStore)" radius={[4, 4, 0, 0]} stackId="a" />
                                    <Bar dataKey="WhatsApp" fill="url(#barWhatsApp)" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Top Cities */}
                    <div className="bg-gradient-to-br from-white to-amber-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-amber-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-400" />
                        <div className="flex items-center gap-2 mb-4 sm:mb-6">
                            <span className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
                            </span>
                            <h3 className="text-sm sm:text-lg font-bold text-gray-900">Top Cidades</h3>
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                            {topCities.length > 0 ? topCities.map((city: any, index: number) => (
                                <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-white/80 rounded-lg sm:rounded-xl border border-amber-100 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm ${index === 0 ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white' :
                                            index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                                                index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white' :
                                                    'bg-amber-100 text-amber-700'
                                            }`}>
                                            {index + 1}
                                        </div>
                                        <span className="font-medium text-gray-700 text-sm sm:text-base">{city.name}</span>
                                    </div>
                                    <span className="font-bold text-gray-900 bg-amber-100 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">{city.count}</span>
                                </div>
                            )) : (
                                <p className="text-gray-400 italic text-center py-6 sm:py-8 text-sm">Sem dados de localização ainda</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Traffic Sources */}
                <div className="bg-gradient-to-br from-white to-indigo-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-indigo-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 to-purple-400" />
                    <div className="flex items-center gap-2 mb-4 sm:mb-6">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600" />
                        </span>
                        <h3 className="text-sm sm:text-lg font-bold text-gray-900">Origem do Tráfego (UTM)</h3>
                    </div>
                    <div className="h-[250px] sm:h-[300px]">
                        {topSources.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
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
                                        innerRadius={50}
                                        outerRadius={90}
                                        fill="#8884d8"
                                        paddingAngle={3}
                                        dataKey="count"
                                        stroke="none"
                                    >
                                        {topSources.map((_entry: any, index: number) => (
                                            <Cell key={`cell-${index}`} fill={`url(#pieColor${(index % 5) + 1})`} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.15)', background: 'rgba(255,255,255,0.95)', fontSize: '12px' }} />
                                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-gray-400 italic text-center py-12 text-sm">Sem dados de origem ainda</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
