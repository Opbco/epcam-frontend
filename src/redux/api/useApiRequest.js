import PublicRequest from "../api/RequestApi";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { logoutUser } from "./../actions/UserActions";
import { useNavigate } from "react-router-dom";

const useApiRequest = () => {
  const user = useSelector((state) => state);
  let navigate = useNavigate();

  useEffect(() => {
    const requestIntercept = PublicRequest.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${user?.access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = PublicRequest.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error?.response?.status === 401) {
          logoutUser(navigate);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      PublicRequest.interceptors.request.eject(requestIntercept);
      PublicRequest.interceptors.response.eject(responseIntercept);
    };
  }, [user.authenticated, user.access_token]);

  return PublicRequest;
};

export default useApiRequest;
