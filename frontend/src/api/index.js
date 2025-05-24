export const trackShipment = async (shipmentId) => {
    const { data } = await axios.get(`/api/v1/shiprocket/track/${shipmentId}`);
    return data;
  };
  
import axios from "axios";
import { useNavigate } from "react-router-dom";

// create Axios instance if needed
const instance = axios.create({ baseURL: "http://localhost:3000" });

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem("userToken");
      window.location.href = "/login"; // or use navigate if inside component
    }
    return Promise.reject(error);
  }
);

export default instance;
