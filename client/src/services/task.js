import { axiosProtected } from "../api/axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getTasks = async (accessToken) => {
    try {
        const res = await axiosProtected.get("/tasks", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const tasks = res.data;
        return tasks;
    } catch(err) {
        console.error(err);
    }
}