import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import { ResultEnum, ContentTypeEnum } from '@/enums/httpEnum'
import { checkStatus } from './helper/checkStatus'
import { ElMessage } from 'element-plus'
import {
  showFullScreenLoading,
  tryHideFullScreenLoading
} from '@/config/serviceLoading'
import router from '@/router'

const config: AxiosRequestConfig = {
  // 默认请求地址
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 设置超时时间
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true
}

class RequestHttp {
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config)
    this.service.defaults.headers.common['Content-Type'] = ContentTypeEnum.JSON
    // 请求拦截
    this.service.interceptors.request.use(
      (config: any) => {
        // * 如果当前请求不需要显示 loading,在 api 服务中通过指定的第三个参数: { headers: { noLoading: true } }来控制不显示loading，
        config.headers!.noLoading || showFullScreenLoading()
        // TODO 设置token处理
        // // 是否需要设置token
        // headers.common['noLoading'] || showFullScreenLoading()
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
    // 响应拦截
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response
        // * 在请求结束后，并关闭请求 loading
        tryHideFullScreenLoading()
        // TODO 登陆状态失效处理
        // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          ElMessage.error(data.msg)
          return Promise.reject(data)
        }
        // * 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
        return Promise.resolve(data.data)
      },
      async (error: AxiosError) => {
        const { response } = error
        tryHideFullScreenLoading()
        // 请求超时单独判断，因为请求超时没有 response
        if (error.message.indexOf('timeout') !== -1)
          ElMessage.error('请求超时！请您稍后重试')
        // 根据响应的错误状态码，做不同的处理
        if (response) checkStatus(response.status)
        // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
        if (!window.navigator.onLine) router.replace('/500')
        return Promise.reject(error)
      }
    )
  }
  // * 常用请求方法封装
  get<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.service.get(url, { params, ..._object })
  }
  post<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.service.post(url, params, _object)
  }
  put<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.service.put(url, params, _object)
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<T> {
    return this.service.delete(url, { params, ..._object })
  }
  download(url: string, params?: object, _object = {}): Promise<BlobPart> {
    return this.service.post(url, params, _object)
  }
}
export default new RequestHttp(config)
