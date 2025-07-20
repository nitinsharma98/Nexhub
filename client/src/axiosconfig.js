import axios from "axios";

const BASE_URL = import.meta.env.MODE === "devlopment" ? "http://localhost:8080/api" : "/api";

const API = axios.create({
  baseURL: BASE_URL ,
  withCredentials: true, 
});

export default API;