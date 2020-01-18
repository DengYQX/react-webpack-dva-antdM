
const AddJoinParkApply =  ['api/JoinParkApply/AddJoinParkApply', 'post']; 
const GetRegisterTypeList = ['api/JoinParkApply/GetRegisterTypeList', 'get'];
const GetFieldList = ['api/JoinParkApply/GetFieldList', 'get'];
const GetBusinessNatureList = ['api/JoinParkApply/GetBusinessNatureList', 'get'];

// 接口， 请求类型， 第三个对象为拼接对象， key 为拼接值 可以多个 例如 key: ['ID', 'KEY']， 里面的key值必须要与调用接口的参数名一致， isParams 为是否携带body 参数
export  {
    GetRegisterTypeList,
    AddJoinParkApply,
    GetFieldList,
    GetBusinessNatureList
}