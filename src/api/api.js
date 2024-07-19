import axiosInstance from './axios';

// Get all users
export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// Get a user by ID
export const getUserById = async (id) => {
    try {
        const response = await axiosInstance.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

// Create a new user
export const createUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/Users/register', JSON.stringify(userData), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// Login user
export const loginUser = async (credentials) => {
    try {
      const response = await axiosInstance.post('/Users/login', JSON.stringify(credentials));
      return response.data;
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  };

// Update a user
export const updateUser = async (id, userData) => {
    try {
        const response = await axiosInstance.put(`/users/${id}`, JSON.stringify(userData), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

// Delete a user
export const deleteUser = async (id) => {
    try {
        const response = await axiosInstance.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

export const getReports = async () => {
    const response = await axiosInstance.get('/reports');
    return response.data;
  };
  
  export const getReportById = async (id) => {
    const response = await axiosInstance.get(`/reports/${id}`);
    return response.data;
  };
  
  export const createReport = async (reportData) => {
    try {
        const response = await axiosInstance.post('/reports', reportData);
        console.log('Report created:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating report:', error);
        throw error;
    }
};
  
  export const updateReport = async (id, report) => {
    const response = await axiosInstance.put(`/reports/${id}`, report);
    return response.data;
  };
  
  export const archiveReport = async (id) => {
    const response = await axiosInstance.delete(`/reports/${id}`);
    return response.data;
  };

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
