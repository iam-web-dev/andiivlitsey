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
    getDirectionById: async (id) => {
        try {
            const response = await api.get(`directions/${id}/`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching direction with id ${id}:`, error);
            throw error;
        }
    }
};
