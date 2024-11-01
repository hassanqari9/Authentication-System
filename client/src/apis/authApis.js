import axiosInstance from "./axios";

export async function loginUser(formData) {
    return await axiosInstance.post("/api/auth/login", formData);
}

export async function logoutUser() {
    return await axiosInstance.post('/api/auth/logout');
}

export async function tokenRefresh() {
    return await axiosInstance.post('/api/auth/refresh-token');
}