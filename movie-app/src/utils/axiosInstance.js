import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    // 'Authorization': 'Bearer token'
  },
});

axiosInstance.interceptors.request.use(
  (request) => {
    console.log("Starting Request");
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response successful");
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
