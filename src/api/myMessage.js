const GetMessageNoticeList = ['/api/MyMessage/GetMessageNoticeList', 'get'] //分页获取消息通知列表
const EditMessageNotice = ['/api/MyMessage/EditMessageNotice', 'post'] //分页获取消息通知列表
const GetMessageNeedList = ['/api/MyMessage/GetMessageNeedList', 'get'] //分页获取待办已办列表
const GetMessageNeedInfo = ['/api/MyMessage/GetMessageNeedInfo', 'get'] //获取待办已办详情
const ExMessageApply = ['/api/MyMessage/ExMessageApply', 'post'] //待办审核（企业管理员）

export {
  GetMessageNoticeList,
  EditMessageNotice,
  GetMessageNeedList,
  GetMessageNeedInfo,
  ExMessageApply
}