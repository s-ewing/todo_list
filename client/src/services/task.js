import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getTasks = async (user) => {
    try {
        const res = await axios.get(`${API_URL}/tasks`, {
            headers: {
                Authorization: `Bearer ${user}`
            }
        });
        const tasks = res.data;
        return tasks;
    } catch(err) {
        console.error(err);
    }
}