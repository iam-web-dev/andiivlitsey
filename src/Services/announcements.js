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
    getAnnouncementBySlug: async (slug) => {
        try {
            const response = await api.get(`announcements/${slug}/`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching announcement with slug ${slug}:`, error);
            throw error;
        }
    }
};
