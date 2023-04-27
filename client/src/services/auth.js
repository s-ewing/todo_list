import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    const { accessToken } = res.data;
    return { accessToken: accessToken, message: "Login successful" };
  } catch (err) {
    if (err.response) {
      return { accessToken: null, message: err.response.data.message };
    } else {
      return { accessToken: null, message: "Something went wrong. Try again." };
    }
  }
};

export const register = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/auth/register`, {
      email,
      password,
    });
    const { message } = res.data;
    return { status: "success", message: message };
  } catch (err) {
    if (err.response) {
      return { status: "error", message: err.response.data.message };
    } else {
      return { status: "error", message: "Something went wrong.  Try again." };
    }
  }
};
