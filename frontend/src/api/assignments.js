import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Create new assignment
export const createAssignment = async (data) => {
    const response = await api.post('/assignments/analyze', data);
    return response.data;
};

// Get all assignments
export const getAssignments = async () => {
    const response = await api.get('/assignments');
    return response.data;
};

// Update assignment
export const updateAssignment = async (id, data) => {
    const response = await api.put(`/assignments/${id}`, data);
    return response.data;
};

// Delete assignment
export const deleteAssignment = async (id) => {
    const response = await api.delete(`/assignments/${id}`);
    return response.data;
};
