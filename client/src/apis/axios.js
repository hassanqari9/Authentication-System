import axios from 'axios';
import { tokenRefresh } from './authApis';

const axiosInstance = axios.create({
    baseURL: 'https://authentication-system-qew1.onrender.com',
    // baseURL: 'http://localhost:4000',  
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

axiosInstance.interceptors.request.use(    
    (config) => {
        console.log("Requesting...")
        const accessToken = localStorage.getItem('accessToken');
        // console.log(accessToken);
        
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        console.log("Responsing...");
        return response;
    },
    async (error) => {
        // console.log("Responsing with error...");
        
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                console.log("Refreshing token...");
                
                const { data } = await tokenRefresh()
                const newAccessToken = data.accessToken;

                localStorage.setItem('accessToken', newAccessToken);

                // Retry the original request with the new token
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token failed:', refreshError);
                localStorage.removeItem('accessToken');
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;