import venusRequest2 from '..'


interface InnerNavData{
    list:any,
    banners:any[]
}

venusRequest2.request<InnerNavData>({
    url:'/nav/multiple',
    interceptors:{
        requestSuccess:(config)=>{
            console.log('/nav/multiple请求成功')
            return config
        },
        responseSuccess:(res)=> {
            console.log('/nav/multiple响应成功拦截')
            return res
            
        },
    }
   
}).then(res=>{
    console.log(res.list,res.banners)
}).catch(err=>console.log(err))