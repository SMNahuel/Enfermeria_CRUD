import axios from "axios";
const API_URL = "https://localhost:3000/";


let token = localStorage.getItem("auth")

let AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: { Authorization: "Bearer " + token }, // on the first go token is null
});

export default AxiosInstance;


