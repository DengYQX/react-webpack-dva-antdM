
const GetWorkOrderManageList = ['api/WorkOrderManage/GetWorkOrderManageList', 'get'] //获得工单列表
const GetWorkOrderManageDetails = ['api/WorkOrderManage/GetWorkOrderManageDetails', 'get', {isParams: true, key: ['ID']}] //个人中心--工单管理--工单详情
const RepairManageFeedback = ['api/RepairManage/Feedback', 'post'] //个人中心--工单管理--报修反馈
const DecorationManageFeedback = ['api/DecorationManage/Feedback', 'post'] //个人中心--工单管理--装修反馈

export  {
  GetWorkOrderManageList,
  GetWorkOrderManageDetails,
  RepairManageFeedback,
  DecorationManageFeedback
}