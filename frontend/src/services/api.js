import axios from "axios";

const api = axios.create({
  baseURL: "https://pathuplus.onrender.com/api",
});

export default api;