import axiosInstance from "./axios";

export async function createUser(formData) {
    return await axiosInstance.post("/api/user/register", formData);
}

export async function getUser() {
    return await axiosInstance.get("/api/user/me");
}