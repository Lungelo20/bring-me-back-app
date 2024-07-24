import axios from 'axios';
import * as JWT from 'jwt-decode';


// Create Axios instance
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to check if the token is expired
const isTokenExpired = (token) => {
    if (!token) return true;
    try {
        const decodedToken = JWT(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        return decodedToken.exp < currentTime;
    } catch (error) {
        return true; // If token decoding fails, consider it expired
    }
};
// Axios request interceptor to attach token to headers and check for expiration
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken'); // Retrieve token from local storage
        if (token && !isTokenExpired(token)) {
            config.headers['Authorization'] = `Bearer ${token}`;
        } else {
             // Do not immediately remove token or redirect here
            // Allow the login request to proceed and handle it separately
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Axios response interceptor to handle token expiry
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expired or invalid, log out the user
            localStorage.removeItem('user');
            localStorage.removeItem('jwtToken');
            window.location.href = '/login'; // Redirect to login or handle as needed
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;

