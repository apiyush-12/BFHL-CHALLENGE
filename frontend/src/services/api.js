import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://bfhl-backend-asgm.onrender.com/bfhl';

export const submitHierarchies = async (data) => {
    try {
        const response = await axios.post(API_URL, { data });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to connect to the server');
    }
};
