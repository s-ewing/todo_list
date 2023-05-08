import axios from "axios";
const BASE_URL = `https://todo-app-ztr6.onrender.com/`;

export default axios.create({
  baseURL: BASE_URL
});

export const axiosProtected = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
