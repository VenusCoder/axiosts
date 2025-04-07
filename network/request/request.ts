import axios  from "axios";
import type{ AxiosInstance, AxiosResponse } from "axios";
import type { VenusRequestConfig } from "../type/type";



class  VenusRequest {
    instance:AxiosInstance

    constructor(config:VenusRequestConfig){
        this.instance=axios.create(config)

        //全局拦截
        this.instance.interceptors.request.use((config)=>{
            console.log('全局拦截成功的拦截器')
            return config

        },(err)=>console.log(err))


        this.instance.interceptors.response.use((res)=>{
            console.log('全局响应成功的拦截器')
            return res


        },err=>console.log(err))

        //局部拦截

        this.instance.interceptors?.request.use(config.interceptors.requestSuccess,
                config.interceptors.requestFail)

        this.instance.interceptors?.response.use(config.interceptors.responseSuccess,
                config.interceptors.responseFail)
            
        

    }
    //封装网络请求方法，返回值是一个promise
    request<T=any>(config:VenusRequestConfig){
        //单次请求的拦截处理，不是axios自动处理
        if(config.interceptors?.requestSuccess){
            config=config.interceptors?.requestSuccess(config)
        }
        //单次响应的拦截处理
        return new Promise<T>((resolve,reject)=>{
            this.instance.request<any,T>(config).then((res)=>{
                if(config.interceptors.responseSuccess){
                    res=config.interceptors?.responseSuccess(res)
                }
                resolve(res)

            }).catch(err=>{
                reject(err)
            })
           

        })

    }
    get(){

    }
    post(){

    }


}
export default VenusRequest


/**
 * @param
 * config: 这是一个对象，包含了 Axios 请求的配置信息，具体包括：
url: 请求的 URL 地址。
method: 请求的 HTTP 方法（如 ‘get’, ‘post’, ‘put’, ‘delete’ 等）。
data: 发送的数据，通常用于 ‘post’, ‘put’, ‘patch’ 等请求方法。
params: URL 参数对象，用于 get 或 delete 请求中拼接查询字符串。
headers: 请求头，可以在这里设置如 Content-Type, Authorization 等。
timeout: 请求超时时间，单位为毫秒。
withCredentials: 是否携带凭证（如 Cookies 或 Authorization headers），跨域请求时使用。


*@param
拦截器作用
修改或添加请求头，例如添加一个通用的认证令牌。
根据需要修改请求的 URL、方法或数据。
设置请求超时时间。
取消请求或在某些条件下不发送请求。


@param
响应拦截器通过 axios.interceptors.response.use 方法添加，它可以在处理响应之前对响应对象 response
进行处理。
response: 这是一个对象，包含了从服务器返回的响应信息，具体包括：
data: 服务器返回的数据。
status: HTTP 状态码。
statusText: HTTP 状态信息，例如 ‘OK’, ‘Not Found’ 等。
headers: 响应头。
config: 发起请求时的配置对象。

响应拦截器作用
对响应数据进行预处理或转换，比如将 JSON 字符串转换为 JavaScript 对象。
处理非 2xx 状态码的错误响应，例如重试请求或抛出错误。 记录日志、监控 API 性能。
 */