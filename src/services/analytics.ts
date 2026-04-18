
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

/* ─── UTM & Attribution Helpers ────────────────────────── */
function getUTMParams(): Record<string, string> {
    const params = new URLSearchParams(window.location.search);
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    const result: Record<string, string> = {};
    utmKeys.forEach(key => {
        const val = params.get(key);
        if (val) result[key] = val;
    });
    return result;
}

function getAdClickIds(): Record<string, string> {
    const params = new URLSearchParams(window.location.search);
    const ids: Record<string, string> = {};

    // Facebook Click ID
    const fbclid = params.get('fbclid');
    if (fbclid) ids.fbclid = fbclid;

    // Google Click ID
    const gclid = params.get('gclid');
    if (gclid) ids.gclid = gclid;

    // TikTok Click ID
    const ttclid = params.get('ttclid');
    if (ttclid) ids.ttclid = ttclid;

    // Facebook browser cookies (fbc, fbp)
    try {
        const cookies = document.cookie.split(';').reduce((acc, c) => {
            const [k, v] = c.trim().split('=');
            if (k && v) acc[k] = v;
            return acc;
        }, {} as Record<string, string>);
        if (cookies['_fbc']) ids.fbc = cookies['_fbc'];
        if (cookies['_fbp']) ids.fbp = cookies['_fbp'];
    } catch { /* silent */ }

    return ids;
}

function getPageContext(): Record<string, string> {
    return {
        page: window.location.pathname,
        referrer: document.referrer || '',
        userAgent: navigator.userAgent,
    };
}

// Persist UTMs in sessionStorage so they survive anchor navigations
function persistUTMs() {
    const utms = getUTMParams();
    if (Object.keys(utms).length > 0) {
        sessionStorage.setItem('bp_utms', JSON.stringify(utms));
    }
}

function getPersistedUTMs(): Record<string, string> {
    try {
        return JSON.parse(sessionStorage.getItem('bp_utms') || '{}');
    } catch { return {}; }
}

// Auto-persist on load
if (typeof window !== 'undefined') {
    persistUTMs();
}

export const AnalyticsService = {
    // Track visit with full attribution data
    trackVisit: async () => {
        const today = new Date().toISOString().split('T')[0];
        const sessionKey = `visited_${today}`;

        if (sessionStorage.getItem(sessionKey)) {
            return; // Already tracked this session
        }

        const utms = { ...getPersistedUTMs(), ...getUTMParams() };
        const clickIds = getAdClickIds();
        const context = getPageContext();

        try {
            await fetch(`${API_URL}/api/track`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'visit',
                    ...utms,
                    ...clickIds,
                    ...context,
                }),
            });
            sessionStorage.setItem(sessionKey, 'true');
        } catch (error) {
            console.error('Failed to track visit:', error);
        }
    },

    // Track click events with attribution
    trackClick: async (type: 'playStore' | 'appStore' | 'whatsapp' | 'whatsapp_floating' | 'footer_phone') => {
        const typeMap: Record<string, string> = {
            playStore: 'click_playstore',
            appStore: 'click_appstore',
            whatsapp: 'click_whatsapp',
            whatsapp_floating: 'click_whatsapp',
            footer_phone: 'click_whatsapp',
        };

        const utms = getPersistedUTMs();
        const clickIds = getAdClickIds();

        try {
            await fetch(`${API_URL}/api/track`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: typeMap[type],
                    ...utms,
                    ...clickIds,
                    page: window.location.pathname,
                }),
            });
        } catch (error) {
            console.error('Failed to track click:', error);
        }
    },

    // Track lead form submission (critical for paid traffic attribution)
    trackLead: async (leadType: 'passageiro' | 'motorista', formData: Record<string, string>) => {
        const utms = getPersistedUTMs();
        const clickIds = getAdClickIds();

        try {
            await fetch(`${API_URL}/api/track`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'lead',
                    leadType,
                    ...utms,
                    ...clickIds,
                    page: window.location.pathname,
                    formData,
                }),
            });
        } catch (error) {
            console.error('Failed to track lead:', error);
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

    // Get public integrations (Pixels)
    getPublicIntegrations: async () => {
        try {
            // Depending on backend, we could fetch public configs. 
            // If API doesn't exist, this will fail gracefully.
            const response = await fetch(`${API_URL}/api/integrations/public`).catch(() => null);
            if (!response || !response.ok) return null;
            return await response.json();
        } catch {
            return null;
        }
    }
};
