import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URI;

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});
