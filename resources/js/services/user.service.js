import axios from "axios";

const API_URL = `${import.meta.env.VITE_PUSHER_API_URL}/api`;

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all;");
  }
}

export default new UserService();
