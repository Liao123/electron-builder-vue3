import { Vue } from 'vue-class-component'
import axios from 'axios'
import qs from 'qs'
// import store from '@/store'
// import state from '@/store/state'

axios.defaults.paramsSerializer = params => {
  return qs.stringify(params, { arrayFormat: 'repeat' })
}

axios.defaults.timeout = 60000

axios.defaults.adapter = require('axios/lib/adapters/http');


export default class ApiClient extends Vue {

  public static file(baseUrl: string) {
    return axios.create({
      baseURL: baseUrl
    })
  }

  public static server() {
    // 可以在这里拦截
    const baseUrl =  process.env.VUE_APP_BASEURL
    return ApiClient.create(baseUrl)
  }

  public static create(baseUrl: string) {
    const instance = axios.create({
      baseURL: baseUrl,
      withCredentials: true
    })

    // instance.interceptors.request.use(
    //   request => {
    //     if (store.state.user) {
    //       // Basic dW5pbmVyOnVuaW5lcg==  密码登录
    //       // Basic cGlnOnBpZw== 手机号登录
    //       request.headers.Authorization = store.state.loginType + store.state.user.access_token
    //     }
    //     if (store.state.orgid) {
    //       request.headers.orgid = store.state.orgid.org_id
    //     }
    //     return request
    //   },
    //   error => {
    //     return Promise.reject(error)
    //   }
    // )
    instance.interceptors.response.use(
      
      (response: any) => {
        // console.log(response)
        if (response.data instanceof ArrayBuffer) {
          return response
        }
        if (response.data.code === -1) {
          // if (response.data.message == '请登录后操作') {
          //   window.localStorage.clear()
          //   window.location.href = window.location.origin
          // }
          const error = new Error()
          if (response.data.msg) {
            error.message = response.data.msg
          } else {
            error.message = response.data.message
          }
          throw error
        } else if (response.data.code === 0) {
          return response
        } else if (response.data.code === 1) {
          const error = new Error()
          if (response.data.msg) {
            error.message = response.data.msg
          } else {
            error.message = response.data.message
          }
          let err = error as any
          err.response = response.data
          throw error
        } else if (response.data.code === 500) {
          const error = new Error()
          if (response.data.msg) {
            error.message = response.data.msg
          } else {
            error.message = response.data.message
          }
          let err = error as any
          err.response = response.data
          throw error
        } else {
          return response
        }
      },
      error => {
        // console.log(error.response)
        if (!error.response) {
          error.message = '请检查网络设置'
          // window.localStorage.clear()
          // window.location.href = window.location.origin
          return Promise.reject(error)
        }
        switch (error.response.status) {
          case 101:
            break
          case 401:
            error.message = error.response.data.msg
            break
          case 403:
            error.message = '禁止访问!'
            break
          case 404:
            error.message = '服务器找不到请求的网页!'
            break
          case 424:
            // store.commit('user', {});
            // window.location.href = window.location.origin
            error.message = '令牌过期'
            break
          case 503:
            error.message = '服务器升级中!'
            break
          case 500:
            error.message = error.response.data.msg || '服务内部异常!'
            break
          default:
            error.message = error.response.data.msg
        }
        return Promise.reject(error)
      }
    )
    return instance
  }
}
