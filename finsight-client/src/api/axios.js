import axios from "axios";
import { Navigate } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:5233/api",
});



api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});

api.interceptors.response.use( (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }

    return Promise.reject(error)
  }
)

export default api;