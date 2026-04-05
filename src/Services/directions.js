import api from './base';

export const DirectionsService = {
    getDirections: async (page = 1) => {
        try {
            const response = await api.get(`directions/?page=${page}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching directions:', error);
            throw error;
        }
    },
    getDirectionBySlug: async (slug) => {
        try {
            const response = await api.get(`directions/${slug}/`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching direction with slug ${slug}:`, error);
            throw error;
        }
    }
};
