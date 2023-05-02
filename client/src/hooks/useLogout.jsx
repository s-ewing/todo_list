import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({}); //delete access token
    try {
      const res = await axios.get("/api/logout", { withCredentials: true });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
