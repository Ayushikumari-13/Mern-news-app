import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-news-app-ab69.onrender.com/api",
});

export default API;