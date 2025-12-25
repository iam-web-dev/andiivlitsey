import api from './base';

export const BannersService = {
    getBanners: async (page = 1) => {
        try {
            const response = await api.get(`banners/?page=${page}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching banners:', error);
            throw error;
        }
    }
};
