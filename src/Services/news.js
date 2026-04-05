import api from './base';

export const News = {
    getNews: async (page = 1) => {
        try {
            const response = await api.get(`news/`);
            return response.data;
        } catch (error) {
            console.error('Error fetching news:', error);
            throw error;
        }
    },
    getNewsBySlug: async (slug) => {
        try {
            const response = await api.get(`news/${slug}/`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching news with slug ${slug}:`, error);
            throw error;
        }
    }
};
