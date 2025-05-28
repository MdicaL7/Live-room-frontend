import axios from './axios'

// 登录
export function login(data) {
  return axios.post('/v1/api/login', data)
}
