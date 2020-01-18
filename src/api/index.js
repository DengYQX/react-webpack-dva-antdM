import request from "@/util/request";
import qs from "qs";
import {back as env} from './config'

const context = require.context("./", false, /\.js$/);
const keys = context.keys().filter(item => item !== "./index.js");

const models = keys.reduce((memo, key) => {
  memo[key.match(/([^/]+)\.js$/)[1]] = context(key);
  return memo;
}, {});

const baseURL = process.env.NODE_ENV === "dev" ? env.dev : env.pro;

const module = {};

for (let key in models) {
  for (let ns in models[key]) {
    module[ns] = models[key][ns];
  }
}

const interfaces = {
  ...module,
  login: ["/api/User/Login", "post"], //登录
  loginByValidateCode: ["/api/User/LoginByValidateCode", "postGet"], //验证码登录
  FindPwd: ["api/User/FindPwd", "postGet"], //找回密码
  register: ["/api/User/Regist", "postGet"], //用户注册
  sendSMS: ["/api/User/SendSMS", "post"], //短信发送
  checkMessageCode: ["api/User/checkMessageCode", "get"], //短信验证
  GetLoginUserInfo: ["/api/User/GetLoginUserInfo", "get"], //获取当前登录用户详情接口
  GetHomeBannerList: ["api/Home/GetHomeBannerList", "get"],
  GetParkNoticeList: ["/api/ParkNotice/GetParkNoticeList", "get"],
  GetTopParkNoticeList: ["api/ParkNotice/GetTopParkNoticeList", "get"],
  GetParkNoticeInfo: ["api/ParkNotice/GetParkNoticeInfo", "get"],
  GetTopStyleShowList: ["api/ParkNotice/GetTopStyleShowList", "get"],
  GetParkOverview: ["api/ParkOverview/GetParkOverview", "get"],
  GetStyleShowInfo: ["api/ParkNotice/GetStyleShowInfo", "get"],
  AddMyPublish: ["/api/MyPublish/AddMyPublish", "post"], //新增我的发布
  GetShopAreaList: ["/api/ShopManage/GetShopAreaList", "get"], //获得商铺面积下拉列表
  GetBuildList: ["/api/ShopManage/GetBuildList", "get"], //获得楼栋下拉列表
  GetFllorByBuildIDList: ["/api/ShopManage/GetFllorByBuildIDList", "get"], //根据楼栋ID获得楼层
  GetShopDecorationList: ["/api/ShopManage/GetShopDecorationList", "get"], //获得商铺装修情况下拉列表
  GetShopManageList: ["/api/ShopManage/GetShopManageList", "get"], //获得商铺列表
  GetShopManageDetails: ["/api/ShopManage/GetShopManageDetails", "get"], //获得商铺详情
  AddEntering: ["/api/Entering/AddEntering", "post"], //新增商铺入驻
  GetExhibitionList: ["/api/EnterpriseService/GetExhibitionList", "get"], //分页获取展览展会列表
  GetMaterialInfo: ["/api/EnterpriseService/GetMaterialInfo", "get"], //根据展览展会ID获取展览展会详情
  AddExhibitionSign: ["/api/EnterpriseService/AddExhibitionSign", "post"], //展览展会申请
  GetPeripheryShopList: ["/api/PeripheralMatching/GetPeripheryShopList", "get"], //分页获取周边配套店铺列表
  GetPeripheryTripList: ["/api/PeripheralMatching/GetPeripheryTripList", "get"], //分页获取周边配套周边交通列表
  GetPeripheryTripFile: ["/api/PeripheralMatching/GetPeripheryTripFile", "get"], //获取周边配套出行时刻表
  GetInsteadServicesApplyList: ["/api/EnterpriseService/GetInsteadServicesApplyList", "get"], //获取周边配套出行时刻表 
  GetMyCertiyByUserID: ["api/MyCertification/GetMyCertiyByUserID", "get"], //返回当前登录用户的认证状态(1:未认证，2:已通过，3:已拒绝)
  GetPeripheralMatchingFile: [
    "/api/PeripheralMatching/GetPeripheralMatchingFile",
    "get"
  ], //获取周边配套地图
  GetPeripheryList: ["/api/PeripheralMatching/GetPeripheryList", "get"], //获取周边配套搜索结果页
  GetProvinceCityPolicyList: [
    "api/ProvinceCityPolicy/GetProvinceCityPolicyList",
    "get"
  ], //获得省市区政策列表

  GetMyPublishList: ["api/MyPublish/GetMyPublishList", "postGet"], //获得我的发布列表
  GetMyPublishDetails: ["api/MyPublish/GetMyPublishDetails", "get"], //我的发布详情
  DelMyPublish: ["api/MyPublish/DelMyPublish", "postGet"], //我的发布详情
  GetLegalServiceStationDetails: [
    "api/LegalServiceStation/GetLegalServiceStationDetails",
    "get"
  ], //法律服务站

  GetFinancingType: ["api/EnterpriseService/GetFinancingType", "get"], //获取融资下拉

  GetParkActivitiesList: ["api/ParkActivities/GetParkActivitiesList", "get"], //精准扶贫--列表查看
  GetParkActivitiesDetails: [
    "api/ParkActivities/GetParkActivitiesDetails",
    "get"
  ], //精准扶贫--详情
  AddParkActivitiesApply: [
    "api/ParkActivitiesApply/AddParkActivitiesApply",
    "post"
  ], //精准扶贫--报名
  SendFeedback: ["api/ParkActivitiesApply/SendFeedback", "postGet"], //提交反馈

  GetStyleShowList: ["api/ParkNotice/GetStyleShowList", "get"], //风采展示
  ModifyMyEnterprise: ["api/EnterpriseList/ModifyMyEnterprise", "get"], //个人中心--修改我的企业

  GetRecruitmentList: ["api/Recruitment/GetRecruitmentList", "get"], //招聘会列表
  GetRecruitmentDetails: ["api/Recruitment/GetRecruitmentDetails", "get"], //招聘会详情
  RecruitmentTypeList: ["api/Recruitment/RecruitmentTypeList", "get"], //招聘类型列表
  AddRecruitment: ["api/Recruitment/AddRecruitment", "post"], //新增招聘会
  AddRecruitmentApply: ["api/RecruitmentApply/AddRecruitmentApply", "post"], //新增招聘会申请
  GetMyEnterpriseInfo: ["api/RecruitmentApply/GetMyEnterpriseInfo", "get"], //当前登录的用户企业名称和ID
  GetAllJobInfoList: ["api/JobInfo/GetAllJobInfoList", "get"], //所有职位列表
  AddJobInfo: ["api/JobInfo/AddJobInfo", "post"], //新增职位
  DelJobInfo: ["api/JobInfo/DelJobInfo", "postGet"], //删除职位
  AddOnlineRecruitment: ["api/OnlineRecruitment/AddOnlineRecruitment", "post"], //新增线上招聘申请
  GetBusinessScaleList: ["api/OnlineRecruitment/GetBusinessScaleList", "get"], //公司规模列表
  GetExperiRequiList: ["api/OnlinePublishJob/GetExperiRequiList", "get"], //经验要求列表
  GetEducationList: ["api/OnlinePublishJob/GetEducationList", "get"], //学历列表
  GetSalaryRangeList: ["api/OnlinePublishJob/GetSalaryRangeList", "get"], //薪资范围列表
  AddOnlinetPublishJob: ["api/OnlinePublishJob/AddOnlinePublishJob", "post"], //新增在线发布职位
  GetMyPaidSerivcesApplyList: ["api/PropertyServices/GetMyPaidSerivcesApplyList", "get"], //分页获取我的有偿服务申请列表
  GetPCPaidSerivcesInfo: ["api/PropertyServices/GetPCPaidSerivcesInfo", "get"], //分页获取我的有偿服务详情
  GetOnlinePublishJobList: [
    "api/OnlinePublishJob/GetOnlinePublishJobList",
    "get"
  ], //在线发布岗位列表
  GetOnlinePublishJobDetails: [
    "api/OnlinePublishJob/GetOnlinePublishJobDetails",
    "get"
  ], //发布岗位详情
  DelOnlinePublishJob: ["api/OnlinePublishJob/DelOnlinePublishJob", "postGet"], //删除在线发布职位
  ModifyOnlinePublishJob: [
    "api/OnlinePublishJob/ModifyOnlinePublishJob",
    "post"
  ], //修改在线发布职位
  GetIndustryNewsList: ["api/IndustryNews/GetIndustryNewsList", "postGet"], //行业动态列表
  GetIndustryNewsDetails: ["api/IndustryNews/GetIndustryNewsDetails", "get"], //行业动态详情
  GetPartyDisciRulesList: [
    "api/PartyMassesService/GetPartyDisciRulesList",
    "get"
  ], //党纪党规列表
  GetPartyActivitiesList: [
    "api/PartyMassesService/GetPartyActivitiesList",
    "get"
  ], //党内活动列表
  GetPartyActivitiesInfo: [
    "api/PartyMassesService/GetPartyActivitiesInfo",
    "get"
  ], //党内活动详情
  AddPartyActivitiesApply: [
    "api/PartyMassesService/AddPartyActivitiesApply",
    "post"
  ], //党内活动--报名
  GetPartyAffairsKnowledgeList: [
    "api/PartyMassesService/GetPartyAffairsKnowledgeList",
    "get"
  ], //党务知识列表
  GetOrganizationApplyDetails: [
    "api/PartyMassesService/GetOrganizationApplyDetails",
    "get"
  ], //成立党组织申请
  GetBranchConstructionList: [
    "api/PartyMassesService/GetBranchConstructionList",
    "get"
  ], //五化支部建设信息
  GetDisputeMediationCenterDetails: [
    "api/DisputeMediationCenter/GetDisputeMediationCenterDetails",
    "get"
  ], //纷调解中心详情
  GetPreTrialMediaDetails: ["api/PreTrialMedia/GetPreTrialMediaDetails", "get"], //庭前调解室详情
  GetMaterialList: ["api/PropertyServices/GetMaterialList", "get"], //便民服务列表
  AddMaterialApplication: [
    "api/PropertyServices/AddMaterialApplication",
    "post"
  ], //便民服务申请
  GetResourceDockingList: [
    "api/EnterpriseService/GetResourceDockingList",
    "get"
  ], //资源对接列表
  AddResourceDocking: ["api/EnterpriseService/AddResourceDocking", "post"], //新增资源对接
  GetTrademarkCenterList: [
    "api/EnterpriseService/GetTrademarkCenterList",
    "get"
  ], //商标中心列表
  GetTraCenterOnlineList: [
    "api/EnterpriseService/GetTraCenterOnlineList",
    "get"
  ], //线上办理列表
  GetTraCenterUnderlineInfo: [
    "api/EnterpriseService/GetTraCenterUnderlineInfo",
    "get"
  ], //线下办理详情
  GetTemplateFileList: ["api/EnterpriseService/GetTemplateFileList", "get"], //相关文件模板列表
  GetCopyrightServiceList: [
    "api/EnterpriseService/GetCopyrightServiceList",
    "get"
  ], //版权服务列表
  GetPCBusinessRegisterInfo: [
    "api/EnterpriseService/GetPCBusinessRegisterInfo",
    "get"
  ], //工商注册详情
  GetIdentityList: ["api/MyCertification/GetIdentityList", "get"], //我的认证--身份列表
  AddMyCertification: ["api/MyCertification/AddMyCertification", "post"], //我的认证申请
  GetMyArticlesReleaseList: [
    "api/PropertyServices/GetMyArticlesReleaseList",
    "get"
  ], //我的物品放行申请
  AddVisitorReg: ["api/PropertyServices/AddVisitorReg", "post"], //访客登记
  AddJobResume: ["api/JobResume/AddJobResume", "post"], //投递简历
  AddResume: ["api/Resume/AddResume", "post"], //新增简历

  AddFinancialServiceRisk: [
    "api/EnterpriseService/AddFinancialServiceRisk",
    "post"
  ], //长沙风险基金申请

  AddProvinceCityPolicyApply: [
    "api/ProvinceCityPolicyApply/AddProvinceCityPolicyApply",
    "post"
  ], //省市区政策--申请

  GetLegalKnowledgeAndCommentAndLikeList: [
    "api/Circle/GetCircleAndCommentAndLikeList",
    "get"
  ], //法律小知识列表
  LikeLegalKnowledge: ["api/LegalKnowledge/LikeLegalKnowledge", "postGet"], //法律小知识--点赞
  Comments: ["api/LegalKnowledge/Comments", "postGet"], //法律小知识--评价

  GetAdvertisingServicesList: [
    "api/AdvertisingServices/GetAdvertisingServicesList",
    "get"
  ], //广告服务列表
  GetAdvertisingServicesDetails: [
    "api/AdvertisingServices/GetAdvertisingServicesDetails",
    "get"
  ], //广告详情
  AddAdvertisingServicesApply: [
    "api/AdvertisingServicesApply/AddAdvertisingServicesApply",
    "post"
  ], //申请广告服务

  GetFiscalAgent: ["api/EnterpriseService/GetFiscalAgent", "get"], //获取财税
  GetProsecutionLiaisonDetails: [
    "api/ProsecutionLiaison/GetProsecutionLiaisonDetails",
    "get"
  ], //检察联络室

  GetSharingCenterList: ["api/EnterpriseService/GetSharingCenterList", "get"], //共享中心--分页列表
  GetSharingCenterInfo: ["api/EnterpriseService/GetSharingCenterInfo", "get"], //共享中心--详情
  AddSharingApplication: [
    "api/EnterpriseService/AddSharingApplication",
    "post"
  ], //共享中心--共享申请
  AddSharingCenter: ["api/EnterpriseService/AddSharingCenter", "post"], //共享中心--新增

  GetParkPolicyList: ["api/ParkPolicy/GetParkPolicyList", "postGet"], //企业服务-园区政策-列表
  GetParkPolicyDetails: ["api/ParkPolicy/GetParkPolicyDetails", "get"], //企业服务-园区政策-详情
  AddParkPolicyApply: ["api/ParkPolicyApply/AddParkPolicyApply", "post"], //企业服务-园区政策-线上申请

  GetSiteServiceList: ["api/EnterpriseService/GetSiteServiceList", "get"], //场地服务--列表
  GetSiteServiceInfo: ["api/EnterpriseService/GetSiteServiceInfo", "get"], //场地服务--详情
  AddSiteApplication: ["api/EnterpriseService/AddSiteApplication", "post"], //场地服务-申请

  GetEnterpriseList: ["api/EnterpriseList/GetEnterpriseList", "get"], //获取企业名录列表
  GetIndustryList: ["api/EnterpriseList/GetIndustryList", "get"], //获取企业名录中所属行业

  AddInsteadServicesApply: [
    "api/EnterpriseService/AddInsteadServicesApply",
    "post"
  ], //代办服务-申请（1.办公采购、2.装修服务、3.营销服务、4.家政服务、5.IT服务）
  GetInsteadServicesList: [
    "api/EnterpriseService/GetInsteadServicesList",
    "get"
  ], //代办服务-申请成功--显示相关服务公司
  GetInsteadServicesInfo: [
    "api/EnterpriseService/GetInsteadServicesInfo",
    "get"
  ], //代办服务-获取代办机构详情

  GetRepairManageList: ["api/RepairManage/GetRepairManageList", "get"], //我的申请-报修记录-列表
  GetRepairManageDetails: ["api/RepairManage/GetRepairManageDetails", "get"], //我的申请-报修记录-详情
  GetMyDecoration: ["api/DecorationManage/GetMyDecoration", "get"], //我的申请-装修申请
  SubmitAcceptApply: ["api/DecorationManage/SubmitAcceptApply", "post"], //我的申请-装修申请--预约验收申请

  GetComplaintType: ["api/User/GetComplaintType", "get"], //我的申请-投诉建议-投诉分类下拉
  AddComplaintSuggestion: ["api/User/AddComplaintSuggestion", "post"], //我的申请-投诉建议-投诉分类下拉

  GetProvinceCityPolicyApplyList: [
    "api/ProvinceCityPolicyApply/GetProvinceCityPolicyApplyList",
    "get"
  ], //我的申请-省市区政策申请列表
  GetParkPolicyApplyDetails: [
    "api/ParkPolicyApply/GetParkPolicyApplyDetails",
    "get"
  ], //我的申请-园区政策详情
  GetParkPolicyApplyList: ["api/ParkPolicyApply/GetParkPolicyApplyList", "get"], //我的申请-园区政策申请列表
  GetProvinceCityPolicyApplyDetails: [
    "api/ProvinceCityPolicyApply/GetProvinceCityPolicyApplyDetails",
    "get"
  ], //我的申请-省市区政策详情\
  GetProvinceCityPolicyDetails: [
    "api/ProvinceCityPolicy/GetProvinceCityPolicyDetails",
    "get"
  ], //企业服务-政策服务-省市区政策详情

  GetMaterialApplicationList: [
    "api/PropertyServices/GetMaterialApplicationList",
    "get"
  ], //我的申请-便民服务-列表

  GetMyRecruitmentApplyList: [
    "api/RecruitmentApply/GetMyRecruitmentApplyList",
    "get"
  ], //我的申请--招聘申请
  GetMyRecruitmentApplyDetails: [
    "api/RecruitmentApply/GetMyRecruitmentApplyDetails",
    "get"
  ], //我的申请--招聘申请--详情
  IsHasApply: ["api/ParkActivitiesApply/IsHasApply", "get"], //判断是否已经参加此次活动
  GetMyOnlinePublishJobList: [
    "api/OnlinePublishJob/GetMyOnlinePublishJobList",
    "get"
  ], //个人中心--我的发布--只能看到本人所在公司的招聘信息

  UploadBase64Img: ["api/File/UploadBase64Img", "post"], //图片上传
  UploadImages: ["api/File/UploadImages", "post", { uploadFileImg: true }], //图片以文件方式上传
  GetBuildToCbx: ["api/Company/GetBuildToCbx", "get"], //楼栋/楼宇下拉
  GetAllEnterpriseList: ["api/EnterpriseList/GetAllEnterpriseList", "get"], //企业列表
  GetStudyLink: ["api/PartyMassesService/GetStudyLink", "get"], //党群服务-获取学习链接
  GetPartyOrganization: ["api/PartyMassesService/GetPartyOrganization", "get"], //党群服务-获取党员组织关系转接
  AddPartyApplication: ["api/PartyMassesService/AddPartyApplication", "post"], //党群服务-新增申请入党
  GetPartyApplicationList: ["api/PartyMassesService/GetPartyApplicationList", "get"], //党群服务-获取申请入党列表
  GetResumeDetailsByUserID: ["api/Resume/GetResumeDetailsByUserID", "get"], //获得简历详情
  ModifyResume: ["api/Resume/ModifyResume", "post"], //修改简历详情
  IsHasDelivery: ["api/JobResume/IsHasDelivery", "get"], //修改简历详情
};

const getLink = (params, obj) => {
  let link = []; 
  if (params && typeof params === "object") {
    for (let i = 0; i < obj.key.length; i++) {
      link.push(`/${params[obj.key[i]]}`);
    }
  }
  return link.join("");
};

const filterKeyByParams = (params, keys) => {
  keys.forEach(key => {
    delete params[key];
  });
  return params;
};

const getApi = () => {
  let _api = {};
  Object.keys(interfaces).forEach(key => {
    let value = interfaces[key];
    let name = value[0];
    let methods = value[1];
    const obj = value[2];
    if (obj && obj.key) {
      _api[key] = async params =>
        request[methods](
          `${name}${getLink(params, obj)}`,
          obj.isParams ? filterKeyByParams(params, obj.key) : null,
          { baseURL }
        );
    } else if (obj && obj.uploadFileImg) {
      _api[key] = async params => request.post(name, params);
    } else {
      _api[key] = async params =>
        request[methods === "postGet" ? "post" : methods](
          methods === "get" || methods === "postGet"
            ? params && Object.keys(params).length !== 0
              ? `${name}?${qs.stringify(params)}`
              : name
            : name,
          methods === "get" || methods === "postGet" ? null : params,
          { baseURL }
        );
    }
  });

  return _api;
};

const api = getApi();

export default api;
