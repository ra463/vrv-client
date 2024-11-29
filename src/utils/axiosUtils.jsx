import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:4000",
  baseURL: "https://vrv-backend-eys6.onrender.com",
});

export default axiosInstance;
