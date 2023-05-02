import axios from "../api/axios";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {
  try {
    const res = await axios.post("/api/auth/login", { email, password }, { withCredentials: true });
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
    const res = await axios.post("/api/auth/register", {
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
