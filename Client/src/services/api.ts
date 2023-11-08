import axios from "axios";

const api = axios.create({
  baseURL: "https://api.wvwcoin.com",
});

export default api;
