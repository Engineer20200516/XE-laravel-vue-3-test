import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `${import.meta.env.VITE_PUSHER_API_URL}/api/companies`;

class CompanyService {
  getCompanies({ pageNumber }) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`${API_URL}?page=${pageNumber}`, { headers: authHeader() })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      return axios
        .get(`${API_URL}/all`, { headers: authHeader() })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  addCompany(formData) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`${API_URL}`, formData)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  updateCompany(id, formData) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/${id}?_method=PUT`, formData)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  removeCompany(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${API_URL}/${id}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default new CompanyService();
