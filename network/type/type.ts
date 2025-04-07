import type{ AxiosRequestConfig,AxiosResponse,InternalAxiosRequestConfig } from "axios"

export interface InnerInterceptors<T=AxiosResponse> {
    requestSuccess?:(config:InternalAxiosRequestConfig)=>InternalAxiosRequestConfig,
        requestFail?:(err:any)=>any,
        responseSuccess?:(res:T)=>T,
        responseFail?:(err:any)=>any

}

export interface VenusRequestConfig<T=AxiosResponse> extends AxiosRequestConfig {
    interceptors?:InnerInterceptors<T>
}
