import axios from 'axios'

// 创建axios实例
const service = axios.create({
  // baseURL: '/', // api的base_url
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
  // // 根据状态码来做验证 这里表示 大于等于 200 小于 500 都属于成功
  // validateStatus: function (status) {
  //   return status >= 200 && status < 500
  // }
})

// request拦截器
service.interceptors.request.use(request => {
  // if (store.getters.token) {
  //   request.headers['X-TOKEN'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  return request
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// 用来控制只出现一个MessageBox
// let unauthorized = false
// reponse拦截器
service.interceptors.response.use(response => {
  return response.data
}, error => {
  if (error.toString().includes('timeout')) {
    console.error('请求超时')
  } else {
    console.log('未知错误')
  }
  console.log('err: ' + error) // debug 用
  return Promise.reject(error)
})


class Http {
  get(url, { data, params }) {
    return this.sendRequest({ method: 'GET', url, data, params })
  }
  post(url, { data, params }) {
    return this.sendRequest({ method: 'POST', url, data, params })
  }
  put(url, { data, params }) {
    return this.sendRequest({ method: 'PUT', url, data, params })
  }
  patch(url, { data, params }) {
    return this.sendRequest({ method: 'PATCH', url, data, params })
  }
  delete(url, { data, params }) {
    return this.sendRequest({ method: 'DELETE', url, data, params })
  }
  sendRequest(options) {
    return service(options)
  }
}

export default new Http()