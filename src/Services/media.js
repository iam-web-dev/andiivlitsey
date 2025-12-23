import api from './base';

export const MediaService = {
    getVideoGallery: async (page = 1) => {
        try {
            const response = await api.get(`video-gallery/?page=${page}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching video gallery:', error);
            throw error;
        }
    },
    getGallery: async (page = 1) => {
        try {
            const response = await api.get(`gallery/?page=${page}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching photo gallery:', error);
            throw error;
        }
    }
};
