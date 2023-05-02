import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

export default axios.create({
});

export const axiosProtected = axios.create({
  withCredentials: true,
});
