const GetCommodityList = ['/api/Commodity/GetCommodityList', 'get'] //分页获得物业驿站商品列表
const GetCommodityDetails = ['/api/Commodity/GetCommodityDetails', 'get', {isParams: false, key: ['ID']}] //分页获得物业驿站商品列表
const BuyCommodity = ['/api/Commodity/BuyCommodity', 'post'] //购买物业驿站商品

const GetPaidSerivcesList = ['/api/PropertyServices/GetPaidSerivcesList', 'get'] //分页获取有偿服务列表
const GetPaidSerivcesInfo = ['/api/PropertyServices/GetPaidSerivcesInfo', 'get'] //根据有偿服务ID获取商品详情
const AddPaidSerivcesApply = ['/api/PropertyServices/AddPaidSerivcesApply', 'post'] //有偿服务申请

const AddDecorationManage = ['/api/DecorationManage/AddDecorationManage', 'post'] //新增装修

const GetPropertyBrief = ['/api/PropertyServices/GetPropertyBrief', 'get'] //分页获取有偿服务列表

export {
  GetCommodityList,
  GetCommodityDetails,
  BuyCommodity,
  GetPaidSerivcesList,
  GetPaidSerivcesInfo,
  AddPaidSerivcesApply,
  AddDecorationManage,
  GetPropertyBrief
}