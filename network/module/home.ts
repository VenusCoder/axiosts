import venusRequest from ''


interface InnerDataFace{
    data:any,
    status:number
}

venusRequest.request<InnerDataFace>({
    url:'/home/multiple',
    timeOUT:10000
}).then(res=>{
    console.log(res.data)
}).catch(err=>console.log(err))