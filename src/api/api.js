import axiosInstance from './axios';

export const fetchData = async () => {
    try {
        const response = await axiosInstance.get('/reports');
        console.log('Data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

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
        console.log('Registerd successfully!')
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// Function to log in or generate token
export const loginUser = async (credentials) => {
    try {
        const response = await axiosInstance.post('/users/login', JSON.stringify(credentials));
        const token = response.data.token; // Adjust based on your API response structure        
        const  user  = response.data; // Adjust based on your API response structure    
           
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('jwtToken', token); // Save token in local storage
        console.log('Logged-in successfully!')
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
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
  
 
  export const createMissingPersonReport = async (reportData) => {
    try {
        // Ensure recentPhotos is an array
        if (!Array.isArray(reportData.recentPhotos)) {
            reportData.recentPhotos = [];
        }
        const response = await axiosInstance.post('/reports/CreateMissingPersonReport', reportData);
        console.log('Missing person report created:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error creating missing person report:', error.response.data);
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw error;
    }
};

export const createMissingItemReport = async (reportData) => {
    try {
         // Ensure recentPhotos is an array
         if (!Array.isArray(reportData.recentPhotos)) {
            reportData.recentPhotos = [];
        }
        const response = await axiosInstance.post('/reports/CreateMissingItemReport', reportData);
        console.log('Missing item report created:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error creating missing item report:', error.response.data);
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw error;
    }
};

export const createFoundPersonReport = async (reportData) => {
    try {
         // Ensure recentPhotos is an array
         if (!Array.isArray(reportData.recentPhotos)) {
            reportData.recentPhotos = [];
        }
        const response = await axiosInstance.post('/reports/CreateFoundPersonReport', reportData);
        console.log('Found person report created:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error creating found person report:', error.response.data);
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw error;
    }
};

export const createFoundItemReport = async (reportData) => {
    try {
         // Ensure recentPhotos is an array
         if (!Array.isArray(reportData.recentPhotos)) {
            reportData.recentPhotos = [];
        }
        const response = await axiosInstance.post('/reports/CreateFoundItemReport', reportData);
        console.log('Found item report created:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error creating found item report:', error.response.data);
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw error;
    }
};

  ///           UPDATE REPORTS            ///
  export const updateShortReport = async (id, report) => {
    const response = await axiosInstance.put(`/reports/updatershortreport/${id}`, report);
    return response.data;
  };

  export const updateMissingPersonReport = async (id, report) => {
    const response = await axiosInstance.put(`/reports/updatemissingperson/${id}`, report);
    return response.data;
  };
  
  export const updateMissingItemReport = async (id, report) => {
    const response = await axiosInstance.put(`/reports/updatemissingitem/${id}`, report);
    return response.data;
  };
  
  export const updateFoundPersonReport = async (id, report) => {
    const response = await axiosInstance.put(`/reports/updatefoundperson/${id}`, report);
    return response.data;
  };
  
  export const updateFoundItemReport = async (id, report) => {
    const response = await axiosInstance.put(`/reports/updatefounditem/${id}`, report);
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
