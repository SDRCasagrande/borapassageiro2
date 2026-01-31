
// Types
export interface DailyStats {
    date: string;
    visits: number;
    clicks: {
        playStore: number;
        appStore: number;
        whatsapp: number;
    };
}

// API Base URL - configure this based on your deployment
const API_URL = import.meta.env.VITE_API_URL || 'https://api.bkaiser.com.br';

export const AnalyticsService = {
    // Track visit
    trackVisit: async () => {
        // Avoid double counting same session
        const today = new Date().toISOString().split('T')[0];
        const sessionKey = `visited_${today}`;

        if (sessionStorage.getItem(sessionKey)) {
            return; // Already tracked this session
        }

        try {
            await fetch(`${API_URL}/api/track`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'visit' }),
            });
            sessionStorage.setItem(sessionKey, 'true');
        } catch (error) {
            console.error('Failed to track visit:', error);
        }
    },

    trackClick: async (type: 'playStore' | 'appStore' | 'whatsapp' | 'whatsapp_floating' | 'footer_phone') => {
        const typeMap: Record<string, string> = {
            playStore: 'click_playstore',
            appStore: 'click_appstore',
            whatsapp: 'click_whatsapp',
            whatsapp_floating: 'click_whatsapp',
            footer_phone: 'click_whatsapp',
        };

        try {
            await fetch(`${API_URL}/api/track`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: typeMap[type] }),
            });
        } catch (error) {
            console.error('Failed to track click:', error);
        }
    },

    // Fetch stats from API for dashboard
    async getChartData(days = 30) {
        try {
            const token = localStorage.getItem('bp_admin_token');
            const headers: any = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${API_URL}/api/stats?days=${days}`, {
                headers
            });

            if (response.status === 401) {
                throw new Error('Unauthorized');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch stats:', error);
            throw error;
        }
    },

    logout() {
        localStorage.removeItem('bp_admin_token');
        window.location.href = '/login';
    },
    // Get totals for dashboard summary cards
    getTotals: async () => {
        try {
            const response = await fetch(`${API_URL}/api/stats?days=30`);
            if (!response.ok) throw new Error('API error');
            const data = await response.json();
            return data.totals || { visits: 0, playStore: 0, appStore: 0, whatsapp: 0 };
        } catch (error) {
            console.error('Failed to fetch totals:', error);
            return { visits: 0, playStore: 0, appStore: 0, whatsapp: 0 };
        }
    },

    // Legacy method for backward compatibility (deprecated)
    getAllData: (): DailyStats[] => {
        console.warn('getAllData is deprecated, use getChartData instead');
        return [];
    },

    saveData: () => {
        console.warn('saveData is deprecated, data is now saved via API');
    },
};
