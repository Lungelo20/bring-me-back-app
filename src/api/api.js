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
        // Send login request to the server
        const response = await axiosInstance.post('/users/login', credentials);

        // Adjust based on your API response structure
        const { token, ...user } = response.data;

        // Store user and token in local storage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('jwtToken', token);

        console.log('Logged in successfully!');
        return response.data;
    } catch (error) {
        // Log the error for debugging
        console.error('Error logging in:', error.response ? error.response.data : error.message);

        // Optional: Add more specific error handling based on status codes
        if (error.response && error.response.status === 401) {
            throw new Error('Invalid credentials. Please try again.');
        } else if (error.response && error.response.status === 500) {
            throw new Error('Server error. Please try again later.');
        } else {
            throw new Error('An unexpected error occurred.');
        }
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
        // Ensure recentPhotos is an array of strings
        if (!Array.isArray(reportData.recentPhotos)) {
            reportData.recentPhotos = [];
        } else {
            // Ensure all items in recentPhotos are strings
            reportData.recentPhotos = reportData.recentPhotos.map(photo => String(photo));
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
          // Ensure recentPhotos is an array of strings
        if (!Array.isArray(reportData.recentPhotos)) {
            reportData.recentPhotos = [];
        } else {
            // Ensure all items in recentPhotos are strings
            reportData.recentPhotos = reportData.recentPhotos.map(photo => String(photo));
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
         // Ensure recentPhotos is an array of strings
         if (!Array.isArray(reportData.recentPhotos)) {
            reportData.recentPhotos = [];
        } else {
            // Ensure all items in recentPhotos are strings
            reportData.recentPhotos = reportData.recentPhotos.map(photo => String(photo));
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
         // Ensure recentPhotos is an array of strings
         if (!Array.isArray(reportData.recentPhotos)) {
            reportData.recentPhotos = [];
        } else {
            // Ensure all items in recentPhotos are strings
            reportData.recentPhotos = reportData.recentPhotos.map(photo => String(photo));
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

// API method for comparing missing person reports
export const compareMissingPersonReport = async (reportData) => {
    try {
          // Ensure recentPhotos is an array of strings
          if (!Array.isArray(reportData.recentPhotos)) {
            reportData.recentPhotos = [];
        } else {
            // Ensure all items in recentPhotos are strings
            reportData.recentPhotos = reportData.recentPhotos.map(photo => String(photo));
        }
        const response = await axiosInstance.post('/reports/compare-missing-person-report', reportData);
        return response.data;
    } catch (error) {
        console.error('Error comparing missing person report:', error);
        throw error;
    }
};

// API method for comparing found person reports
export const compareFoundPersonReport = async (reportData) => {
    try {
          // Ensure recentPhotos is an array of strings
          if (!Array.isArray(reportData.recentPhotos)) {
            reportData.recentPhotos = [];
        } else {
            // Ensure all items in recentPhotos are strings
            reportData.recentPhotos = reportData.recentPhotos.map(photo => String(photo));
        }
        const response = await axiosInstance.post('/reports/compare-found-person-report', reportData);
        return response.data;
    } catch (error) {
        console.error('Error comparing found person report:', error);
        throw error;
    }
};

// API method for comparing missing item reports
export const compareMissingItemReport = async (reportData) => {
    try {
          // Ensure recentPhotos is an array of strings
          if (!Array.isArray(reportData.recentPhotos)) {
            reportData.recentPhotos = [];
        } else {
            // Ensure all items in recentPhotos are strings
            reportData.recentPhotos = reportData.recentPhotos.map(photo => String(photo));
        }
        const response = await axiosInstance.post('/reports/compare-missing-item-report', reportData);
        return response.data;
    } catch (error) {
        console.error('Error comparing person report:', error);
        throw error;
    }
};

// API method for comparing person reports
export const compareFoundItemReport = async (reportData) => {
    try {
          // Ensure recentPhotos is an array of strings
          if (!Array.isArray(reportData.recentPhotos)) {
            reportData.recentPhotos = [];
        } else {
            // Ensure all items in recentPhotos are strings
            reportData.recentPhotos = reportData.recentPhotos.map(photo => String(photo));
        }
        const response = await axiosInstance.post('/reports/compare-found-item-report', reportData);
        return response.data;
    } catch (error) {
        console.error('Error comparing found item report:', error);
        throw error;
    }
};

  ///           UPDATE REPORTS            ///
  export const updateShortReport = async (id, report) => {
    const response = await axiosInstance.put(`/reports/updatershortreport/${id}`, report);
    return response.data;
  };

  export const updateMissingPersonReport = async (id, report) => {
     // Ensure recentPhotos is an array of strings
     if (!Array.isArray(report.recentPhotos)) {
        report.recentPhotos = [];
    } else {
        // Ensure all items in recentPhotos are strings
        report.recentPhotos = report.recentPhotos.map(photo => String(photo));
    }
    const response = await axiosInstance.put(`/reports/updatemissingperson/${id}`, report);
    return response.data;
  };
  
  export const updateMissingItemReport = async (id, report) => {
     // Ensure recentPhotos is an array of strings
     if (!Array.isArray(report.recentPhotos)) {
        report.recentPhotos = [];
    } else {
        // Ensure all items in recentPhotos are strings
        report.recentPhotos = report.recentPhotos.map(photo => String(photo));
    }
    const response = await axiosInstance.put(`/reports/updatemissingitem/${id}`, report);
    return response.data;
  };
  
  export const updateFoundPersonReport = async (id, report) => {
     // Ensure recentPhotos is an array of strings
     if (!Array.isArray(report.recentPhotos)) {
        report.recentPhotos = [];
    } else {
        // Ensure all items in recentPhotos are strings
        report.recentPhotos = report.recentPhotos.map(photo => String(photo));
    }
    const response = await axiosInstance.put(`/reports/updatefoundperson/${id}`, report);
    return response.data;
  };
  
  export const updateFoundItemReport = async (id, report) => {
     // Ensure recentPhotos is an array of strings
     if (!Array.isArray(report.recentPhotos)) {
        report.recentPhotos = [];
    } else {
        // Ensure all items in recentPhotos are strings
        report.recentPhotos = report.recentPhotos.map(photo => String(photo));
    }
    const response = await axiosInstance.put(`/reports/updatefounditem/${id}`, report);
    return response.data;
  };
    
  export const archiveReport = async (id) => {
    const response = await axiosInstance.delete(`/reports/${id}`);
    return response.data;
  };

// Fetch comments for a report
export const fetchComments = async (reportId) => {
    try {
        const response = await axiosInstance.get(`reports/${reportId}/comments`);
        // Check if the response data is empty
        if (response.data && Array.isArray(response.data.$values)) {
            return response.data.$values;
        } else {
            // Return an empty array if no comments are found
            return [];
        }
    } catch (error) {
        // Log the error
        console.error('Error fetching comments:', error);
        // Return an empty array or handle as needed
        return [];
    }
};
  
// Add a new comment to a report
export const addComment = async (reportId, commentText) => {
    try {
        // Retrieve user details from local storage
        const userString = localStorage.getItem('user');
        if (!userString) {
            throw new Error('User not authenticated');
        }

        const user = JSON.parse(userString);

        // Prepare the payload with all required fields
        const comment = {
            userId: user.id, // User ID from local storage
            userName: user.name, // User Name from local storage
            userEmail: user.email, // User Email from local storage
            content: commentText, // Comment content
            reportId: reportId // ReportId
        };
        
        // Post request to add a new comment
        const response = await axiosInstance.post(`/reports/add/${reportId}/comments`, comment);

        // Handle successful creation
        if (response.status === 201) {
            return response.data;
        } else {
            throw new Error('Failed to add comment');
        }
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
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

export const uploadFiles = async (files) => {
    const formData = new FormData();
    files.forEach(file => {
        formData.append('files', file);
    });

    try {
        const response = await axiosInstance.post('/FileUpload/fileupload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        // Ensure the correct path to file URLs in the response
        const fileUrls = response.data.fileUrls?.$values || [];
        return fileUrls;
    } catch (error) {
        console.error('Error uploading files:', error);
        throw error;
    }
};
