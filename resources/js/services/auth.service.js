import router from "@/router";
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `${import.meta.env.VITE_PUSHER_API_URL}/api/auth/`;

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "login", {
        email: user.email,
        password: user.password,
      })
      .then((r) => {
        const { accessToken } = r.data;
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          router.replace(router.query?.to ? String(router.query.to) : "/");
        }

        return r.data;
      });
  }

  logout() {
    return axios
      .get(`${API_URL}logout`, { headers: authHeader() })
      .then((r) => {
        localStorage.removeItem("accessToken");
      });
  }

  register(user) {
    return axios
      .post(API_URL + "register", {
        username: user.username,
        email: user.email,
        password: user.password,
        c_password: user.password,
      })
      .then((r) => {
        const { accessToken } = r.data;

        if (accessToken) {
          localStorage.setItem("accessToken", JSON.stringify(accessToken));
          router.replace(router.query?.to ? String(router.query.to) : "/");
        }
      });
  }
}

export default new AuthService();
