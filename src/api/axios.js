import axios from 'axios'

// 这样可以用 .env 文件设置开发/生产环境的API地址
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || ''

export default axios