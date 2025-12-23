import api from './base';

export const ContactsService = {
    getContacts: async () => {
        try {
            const response = await api.get('contact/');
            return response.data;
        } catch (error) {
            console.error('Error fetching contacts:', error);
            throw error;
        }
    }
};
