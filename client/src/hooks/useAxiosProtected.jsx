import { axiosProtected } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosProtected = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  //add interceptors to refresh access token if needed
  useEffect(() => {
    const requestIntercept = axiosProtected.interceptors.request.use(
        config => {
            if (!config.headers["Authorization"]) {
                config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
            }
            return config;
        }, err => Promise.reject(err)
    )

    const responseIntercept = axiosProtected.interceptors.response.use(
      //response is ok
      (response) => response,
      //need to refresh access token
      async (err) => {
        const prevRequest = err?.config;
        //sent property used to only retry once
        if (err?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosProtected(prevRequest);
        }
        return Promise.reject(err)
      }
    );

    //remove interceptors
    return () => {
        axiosProtected.interceptors.request.eject(requestIntercept);
        axiosProtected.interceptors.response.eject(responseIntercept);
    }
  }, [auth, refresh]);

  return axiosProtected;
};

export default useAxiosProtected;
