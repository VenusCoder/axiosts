import VenusRequest from "./request/request";
import { BASE_URL,TIME_OUT } from "./config";

const venusRequest=new VenusRequest({
    baseURL:BASE_URL,
    timeout:TIME_OUT,
    interceptors:{
       requestSuccess:(config)=>{
        return config
       },
       requestFail:(err)=>{
        return err
       },
       responseSuccess:(res)=>{
        return res
       },
       responseFail:(err)=>{
        return err
       }
    }

})

export default venusRequest