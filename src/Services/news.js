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
    getNewsById: async (id) => {
        try {
            const response = await api.get(`news/${id}/`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching news with id ${id}:`, error);
            throw error;
        }
    }
};
