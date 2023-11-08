import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `${import.meta.env.VITE_PUSHER_API_URL}/api/employees`;

class EmployeeService {
  getEmployees({ pageNumber }) {
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

  addEmployee(formData) {
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

  updateEmployee(formData) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/${selectedEmployee.value.id}?_method=PUT`, formData)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  removeEmployee(id) {
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

export default new EmployeeService();
