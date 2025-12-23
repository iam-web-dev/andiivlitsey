import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ctrl.iivandijonlitsey.uz/api/',
    headers: {
        'accept': 'application/json',
        'X-CSRFTOKEN': 'ksXrjozcsWDkfiox4jaJeisE6o8fDIy5LHrUVsa3EuMdjWL38vPZEmAo5EJuqMRh'
    }
});

export default api;
