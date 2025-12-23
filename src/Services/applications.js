import api from './base';

export const ApplicationsService = {
    createApplication: async (data) => {
        try {
            const response = await api.post('applications/', data);
            return response.data;
        } catch (error) {
            console.error('Error creating application:', error);
            throw error;
        }
    }
};
