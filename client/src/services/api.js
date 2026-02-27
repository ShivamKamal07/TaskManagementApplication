import axios from "axios";

const API = axios.create({
  baseURL: "https://taskmanagementapplication-ecox.onrender.com/api",
  withCredentials: true
});

export default API;