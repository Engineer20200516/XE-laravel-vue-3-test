import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `${import.meta.env.VITE_PUSHER_API_URL}/api/auth`;

class UserService {
  getCurrentUser() {
    return axios.get(`${API_URL}/user`, { headers: authHeader() });
  }
  getPublicContent() {
    return axios.get(API_URL + "all;");
  }
}

export default new UserService();
