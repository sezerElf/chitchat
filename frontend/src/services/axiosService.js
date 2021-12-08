import axios from "axios";

const axiosService = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export default axiosService;
