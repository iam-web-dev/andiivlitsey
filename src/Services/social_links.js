import api from './base';

export const SocialLinksService = {
    getSocialLinks: async () => {
        try {
            const response = await api.get('social-links/');
            return response.data;
        } catch (error) {
            console.error('Error fetching social links:', error);
            throw error;
        }
    }
};
