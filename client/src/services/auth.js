import axios from "axios";

const API_URL=import.meta.env.VITE_API_URL;

const login = async (email, password) => {
    try {
        const res = await axios.post(`${API_URL}/auth/login`, {email, password});
        const { accessToken } = res.data;
        return accessToken;
    } catch (err) {
        console.error(err);
    }
}

export default login;
