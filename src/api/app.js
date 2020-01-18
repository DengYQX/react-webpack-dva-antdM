const GetMenuList = ['api/User/GetMenuListByUID', 'get']
const GetCompanyList = ['api/Company/GetCompanyList', 'get']
const GetIsSubmitCertifi = ['api/MyCertification/GetIsSubmitCertifi', 'get']
const GetMyCertiyByUserID = ['api/MyCertification/GetMyCertiyByUserID', 'get']
const GetFinancialServiceRiskInfo = ['api/EnterpriseService/GetFinancialServiceRiskInfo', 'get']
const GetMyJoinParkApplyDetails = ['api/JoinParkApply/GetMyJoinParkApplyDetails', 'get']
const GetParkMatchingFile = ['api/PeripheralMatching/GetParkMatchingFile', 'get']
const IsApplyed = ['api/Home/IsApplyed', 'get']
const AddLikeCircle = ['api/Circle/AddLikeCircle', 'post']
const AddCircleComments = ['api/Circle/AddCircleComments', 'post']
const GetUserInfoByMasterId = ['api/MyMessage/GetUserInfoByMasterId', 'get']
const GetLegalKnowledgeAndComment = ['api/LegalKnowledge/GetLegalKnowledgeAndCommentAndLikeList', 'get']
const CheckCertification = ['api/MyCertification/CheckCertification', 'get', {isParams: true, key: ['ID']}]

//IsApplyed typeiD 1:招商入驻、2:找工作(投简历)、3:广告服务申请、4:入园申请(不需要业务ID)、5:省市区政策申请、6:园区政策申请、7:招聘会申请、8:公租房申请(人才住房申请，不需要业务ID)
// ['api/EnterpriseList/GetEnterpriseListDetails', 'get', {isParams: false, key: ['ID']}]; 
// 接口， 请求类型， 第三个对象为拼接对象， key 为拼接值 可以多个 例如 key: ['ID', 'KEY']， 里面的key值必须要与调用接口的参数名一致， isParams 为是否携带body 参数
export  { 
    GetMenuList,
    AddLikeCircle,
    GetCompanyList,
    GetIsSubmitCertifi,
    GetMyCertiyByUserID,
    GetFinancialServiceRiskInfo,
    GetMyJoinParkApplyDetails,
    GetParkMatchingFile,
    GetLegalKnowledgeAndComment,
    IsApplyed,
    GetUserInfoByMasterId,
    CheckCertification,
    AddCircleComments
}