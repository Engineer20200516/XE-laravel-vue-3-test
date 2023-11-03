import axios from 'axios';

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  // baseURL: 'http://127.0.0.1:8000/',
  baseURL: `${import.meta.env.VITE_PUSHER_API_URL}/api`,
  headers: { 'Content-Type': 'application/json' }
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

export default axiosIns
