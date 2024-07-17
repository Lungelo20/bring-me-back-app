import axiosInstance from './axios';

// Fetch Missing Pereson Reports
export const fetchMissingPersonReports = async () => {
    try {
        const response = await axiosInstance.get('/MissingPersonReport');
        return response.data;
    } catch (error) {
        console.error('Error fetching missing person reports:', error);
        throw error;
    }
};

// Fetch Missing Item Reports
export const fetchMissingItemReports = async () => {
    try {
        const response = await axiosInstance.get('/MissingItemReport');
        return response.data;
    } catch (error) {
        console.error('Error fetching missing item reports:', error);
        throw error;
    }
};

// Fetch Found Person Reports
export const fetchFoundPersonReports = async () => {
    try {
        const response = await axiosInstance.get('/FoundPersonReport');
        return response.data;
    } catch (error) {
        console.error('Error fetching found person reports:', error);
        throw error;
    }
};

// Fetch Found Item Reports
export const fetchFoundItemReports = async () => {
    try {
        const response = await axiosInstance.get('/FoundItemReport');
        return response.data;
    } catch (error) {
        console.error('Error fetching found item reports:', error);
        throw error;
    }
};

// Filter Missing Person Reports
export const filterMissingPersonReports = async (filterParams) => {
    try {
        const response = await axiosInstance.post('/MissingPersonReport/filter', filterParams);
        return response.data;
    } catch (error) {
        console.error('Error filtering missing person reports:', error);
        throw error;
    }
};


// Filter Missing Item Reports
export const filterMissingItemReports = async (filterParams) => {
    try {
        const response = await axiosInstance.post('/MissingItemReport/filter', filterParams);
        return response.data;
    } catch (error) {
        console.error('Error filtering missing item reports:', error);
        throw error;
    }
};

// Filter Found Person Reports
export const filterFoundPersonReports = async (filterParams) => {
    try {
        const response = await axiosInstance.post('/FoundPersonReport/filter', filterParams);
        return response.data;
    } catch (error) {
        console.error('Error filtering found person reports:', error);
        throw error;
    }
};

// Filter Found Item Reports
export const filterFoundItemReports = async (filterParams) => {
    try {
        const response = await axiosInstance.post('/FoundItemReport/filter', filterParams);
        return response.data;
    } catch (error) {
        console.error('Error filtering found item reports:', error);
        throw error;
    }
};
