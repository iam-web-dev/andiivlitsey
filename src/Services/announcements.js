import api from './base';

export const AnnouncementsService = {
    getAnnouncements: async (page = 1) => {
        try {
            const response = await api.get(`announcements/?page=${page}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching announcements:', error);
            throw error;
        }
    },
    getAnnouncementById: async (id) => {
        try {
            const response = await api.get(`announcements/${id}/`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching announcement with id ${id}:`, error);
            throw error;
        }
    }
};
