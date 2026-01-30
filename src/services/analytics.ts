
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

const STORAGE_KEY = 'bora_analytics';

export const AnalyticsService = {
    // Initialize or update visit count for today
    trackVisit: () => {
        const today = new Date().toISOString().split('T')[0];
        const data = AnalyticsService.getAllData();

        // Check if entry for today exists
        const todayEntryIndex = data.findIndex(d => d.date === today);

        if (todayEntryIndex >= 0) {
            // Avoid double counting same session? simplified: just increment on load
            // Real app usually checks session storage to not recount reload
            const sessionKey = `visited_${today}`;
            if (!sessionStorage.getItem(sessionKey)) {
                data[todayEntryIndex].visits += 1;
                sessionStorage.setItem(sessionKey, 'true');
                AnalyticsService.saveData(data);
            }
        } else {
            // Create new day entry
            data.push({
                date: today,
                visits: 1,
                clicks: { playStore: 0, appStore: 0, whatsapp: 0 }
            });
            sessionStorage.setItem(`visited_${today}`, 'true');
            AnalyticsService.saveData(data);
        }
    },

    trackClick: (type: 'playStore' | 'appStore' | 'whatsapp') => {
        const today = new Date().toISOString().split('T')[0];
        const data = AnalyticsService.getAllData();
        const todayEntryIndex = data.findIndex(d => d.date === today);

        if (todayEntryIndex >= 0) {
            data[todayEntryIndex].clicks[type] += 1;
            AnalyticsService.saveData(data);
        } else {
            // Should not happen if trackVisit runs on mount, but safe fallback
            data.push({
                date: today,
                visits: 1, // assume visit
                clicks: {
                    playStore: type === 'playStore' ? 1 : 0,
                    appStore: type === 'appStore' ? 1 : 0,
                    whatsapp: type === 'whatsapp' ? 1 : 0
                }
            });
            AnalyticsService.saveData(data);
        }
    },

    getAllData: (): DailyStats[] => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    },

    saveData: (data: DailyStats[]) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },

    // Helper for dashboard chart
    getChartData: () => {
        const data = AnalyticsService.getAllData();
        // Sort by date ascending
        return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
};
