import { Router, Route, IndexRoute, IndexRedirect, Redirect } from 'dva/router';
import interfaces from '@/api/index'

import Login from '../login/';
import LoginByCode from '../Component/LoginByCode';
import NotFound from '../Component/notFound/';
import App from '../Component/';
import CertificationFailed from '../Component/certificationFailed';
import Register from '../Component/register';   //注册
import RegisterOk from '../Component/register/registerOk';  //注册成功/注册失败/报名成功/报名失败/反馈成功/反馈失败
import CampusActive from '../Component/campusActive';   //走进园区
import PovertyAlleviation from '../Component/povertyAlleviation/povertyAlleviation';   //精准扶贫
import ActiveInfo from '../Component/povertyAlleviation/activeInfo/activeInfo';   //精准扶贫--活动详情
import CampusInfor from '../Component/campusActive/campusAll/campusInfor';   //走进园区--园区活动详情  
import CampusReturn from '../Component/campusActive/campusAll/campusReturn';   //走进园区--反馈  
import CampusName from '../Component/campusActive/campusAll/campusName';   //走进园区--报名    elegantDisplay
import ElegantDisplay from '../Component/elegantDisplay';   //风采展示tab切换页
import ElegantInfor from '../Component/elegantDisplay/elegantInfor';   //风采展示tab切换页
import NewInfor from '../Component/newInfor';   //新闻资讯  
import ParkInformation from '../Component/parkInformation';   //园区概况  
import NoticeTemplate from '../Component/home/noticeTemplate/'; //园区通知详情/新闻资讯详情/企业详情/员工详情
import BusinessList from '../Component/home/businessList/'; //企业名录
import InvestmentPromotion from '../Component/home/investmentPromotion/investmentPromotion'; //招商入驻
import PromotionDetails from '../Component/home/investmentPromotion/promotionDetails/promotionDetails'; //招商入驻详情
import BookingRoom from '../Component/home/investmentPromotion/bookingRoom/bookingRoom'; //招商入驻详情
import ComingPark from '../Component/comingPark/comingPark'; //智慧创谷--入园流程
import Coming from '../Component/comingPark/coming'; //智慧创谷--入园流程--入园申请

// 个人中心
import MyCompany from '../Component/mine/myCompany/myCompany';  //个人中心-我的企业
import MyApply from '../Component/mine/myApply/myApply';  //个人中心-我的申请
import MyApplyGoods from '../Component/mine/myApply/myApplyGoods/myApplyGoods';  //个人中心-我的申请-物品放行申请
import GoodsDetails from '../Component/mine/myApply/goodsDetails/goodsDetails';  //个人中心-我的申请-物品放行申请详情
import RepairList from '../Component/mine/myApply/repairList/repairList';  //个人中心-我的申请--报修记录
import RepairInfor from '../Component/mine/myApply/repairInfor/repairInfor';  //个人中心-我的申请--报修记录
import PolicyApply from '../Component/mine/myApply/policyApply/policyApply';  //个人中心-我的申请--政策申请
import PolicyDetails from '../Component/mine/myApply/policyApply/policyDetails/policyDetails';  //个人中心-我的申请--政策申请详情
import MyApplyRenovation from '../Component/mine/myApply/myApplyRenovation/myApplyRenovation';  //个人中心-我的申请--装修申请
import GoNotice from '../Component/mine/myApply/myApplyRenovation/goNotice/goNotice';  //个人中心-我的申请--装修申请--提交资料
import MyApplyRecruit from '../Component/mine/myApply/myApplyRecruit/myApplyRecruit';  //个人中心-我的申请--招聘会申请
import RecruitDetails from '../Component/mine/myApply/myApplyRecruit/recruitDetails';  //个人中心-我的申请--招聘会申请详情
import Agent from '../Component/mine/myApply/Agent';  //个人中心-我的申请--代办服务申请
import PaidServicesq from '../Component/mine/myApply/paidServicesq'; //报修服务
import PaidServicesqDetail from '../Component/mine/myApply/paidServicesq/paidServicesqDetail'; //报修服务
import AgentDetail from '../Component/mine/myApply/Agent/agentDetail';  //个人中心-我的申请--代办服务申请详情

import MyReport from '../Component/mine/myReport/myReport';  //个人中心-投诉建议3
import MyInformation from '../Component/mine/myInformation/myInformation';  //个人中心-我的发布
import AddInfo from '../Component/mine/myInformation/addInfo/addInfo';  //个人中心-我的发布-新增
import InfoDetails from '../Component/mine/myInformation/infoDetails/infoDetails';  //个人中心-我的发布-详情
import CompanyReset from '../Component/mine/companyReset/companyReset';  //个人中心-我的设置
import UnCompanyReset from '../Component/mine/companyReset/unCompanyReset';  //个人中心-我的设置-暂未认证
import MySetting from '../Component/mine/mySetting';  //个人中心-我的设置
import SettingName from '../Component/mine/mySetting/settingList/settingName';  //个人中心-我的设置--修改姓名
import SettingPhone  from '../Component/mine/mySetting/settingList/settingPhone';  //个人中心-我的设置--修改电话
import SettingPassWord from '../Component/mine/mySetting/settingList/settingPassWord';  //个人中心-我的设置--修改密码
import SetPwd from '../Component/mine/mySetting/settingList/SetPwd';  //个人中心-我的设置--验证

import MyNews from '../Component/mine/myNews/myNews' //个人中心-我的消息
import MyNewsDetails from '../Component/mine/myNews/details/details'//个人中心-我的消息-消息详情
import StayDetalis from '../Component/mine/myNews/staydetalis/staydetalis'//个人中心-待办已办详情
import Fail from '../Component/mine/myNews/auditStatus/fail'//拒绝放行
import StatusPage from '../Component/statusPage/'; //通用状态链接显示页面

import MyWorkDesk from '../Component/mine/myWorkDesk/myWorkDesk';  //个人中心-物业工作台---只有物业人员有权限进入 
import ComingPeople from '../Component/mine/myWorkDesk/comingPeople/comingPeople';  //个人中心-物业工作台---访客登记--只有物业人员有权限进入 
import PassingThing from '../Component/mine/myWorkDesk/passingThing/passingThing';  //个人中心-物业工作台---物品放行--只有物业人员有权限进入 
import PassingInfor from '../Component/mine/myWorkDesk/passingInfor/passingInfor';  //个人中心-物业工作台---物品放行-详情--只有物业人员有权限进入 
import PropertyPost from '../Component/mine/myWorkDesk/propertyPost/propertyPost';  //个人中心-物业工作台---物业驿站
import PropertyPostInfor from '../Component/mine/myWorkDesk/propertyPost/propertyPostInfor/propertyPostInfor';  //个人中心-物业工作台---物业驿站详情
import GetPassing from '../Component/mine/myWorkDesk/getPassing/getPassing';  //个人中心-物业工作台---物品放行-同意放行--只有物业人员有权限进入   
import NoPassing from '../Component/mine/myWorkDesk/noPassing/noPassing';  //个人中心-物业工作台---物品放行-同意放行--只有物业人员有权限进入   
import OrderManage from '../Component/mine/myWorkDesk/orderManage/orderManage';  //个人中心-物业工作台---工单管理
import OrderManageInfor from '../Component/mine/myWorkDesk/orderManageInfor/orderManageInfor';  //个人中心-物业工作台---工单管理详情
import Feedback from '../Component/mine/myWorkDesk/feedback/feedback';  //个人中心-物业工作台---工单管理详情


// 智慧创谷--物业服务
import Newjianli from '../Component/wisdom/qiye/newjianli/' //新建简历
import Gonggao from '../Component/wisdom/propertyServices/gonggao/'; //楼宇公告
import MoveThing from '../Component/wisdom/propertyServices/moveThing'; //物业放行
import NotService from '../Component/wisdom/propertyServices/notService/'; //停车管理
import BusinessDetails from '../Component/home/businessList/details/'; //企业详情
import BianMin from '../Component/wisdom/propertyServices/bianmin/'; //便民服务
import BMapply from '../Component/wisdom/propertyServices/bianmin/apply/'; //便民服务申请
import MyBMapply from '../Component/mine/myBianmin/'; //我的便民服务申请
import Zhaopin from '../Component/wisdom/qiye/zhaopin/'; // 人才招聘
import Gongzuo from '../Component/wisdom/qiye/gongzuo/'; // 找工作
import JobDetail from '../Component/wisdom/qiye/gongzuo/jobDetail/'; // 找工作详情
import PaidService from '../Component/wisdom/propertyServices/paidService/paidService'; //有偿服务
import PaidDetails from '../Component/wisdom/propertyServices/paidService/paidDetails/paidDetails'; //有偿服务详情
import PaidApply from '../Component/wisdom/propertyServices/paidService/paidApply/paidApply'; //有偿服务申请
import DecorationApplication from '../Component/wisdom/propertyServices/decorationApplication/decorationApplication'; //装修申请
import ProcessingFlow from '../Component/wisdom/propertyServices/decorationApplication/processingFlow'; //装修申请--办理流程
import DecorationApply from '../Component/wisdom/propertyServices/decorationApplication/decorationApply'; //装修申请--在线申请
import PropertyBrief from '../Component/wisdom/propertyServices/propertyBrief/propertyBrief'; //物业简介

import RepairService from '../Component/wisdom/propertyServices/repairService/repairService'; //报修服务

// 智慧创谷--企业服务
import Zhanhui from '../Component/wisdom/companyList/zhanhui/zhanhui';  //智慧创谷--企业服务--展览展会
import IndustryDynamics from '../Component/wisdom/companyList/industryDynamics/industryDynamics';  //智慧创谷--企业服务--行业动态
import IndustryDynamicsDetails from '../Component/wisdom/companyList/industryDynamics/industryDynamicsDetails/industryDynamicsDetails';  //智慧创谷--企业服务--行业动态详情
import IndustryActivities from '../Component/wisdom/companyList/industryActivities/industryActivities';  //智慧创谷--企业服务--行业活动
import GetZhanhui from '../Component/wisdom/companyList/zhanhui/getZhanhui';  //智慧创谷--企业服务--展览展会-报名申请
import ZhanhuiInfor from '../Component/wisdom/companyList/zhanhui/zhanhuiInfor';  //智慧创谷--企业服务--展览展会-详情
import Changdi from '../Component/wisdom/companyList/changdi';  //智慧创谷--企业服务--场地服务
import Changdifuwu from '../Component/wisdom/companyList/changdi/details';  //智慧创谷--企业服务--场地服务详情
import Reservation from '../Component/wisdom/companyList/changdi/details/reservation';  //智慧创谷--企业服务--申请预定
import AdvertisingService from '../Component/wisdom/companyList/advertisingService/advertisingService';  //智慧创谷--企业服务--广告服务
import AdvertisingServiceInfo from '../Component/wisdom/companyList/advertisingService/advertisingServiceInfo/advertisingServiceInfo';  //智慧创谷--企业服务--广告服务详情
import AdvertisementApply from '../Component/wisdom/companyList/advertisingService/advertisementApply/advertisementApply';  //智慧创谷--企业服务--广告位申请
import TalentTraining from '../Component/wisdom/companyList/talentTraining/talentTraining';  //智慧创谷--企业服务--人才培训
import TalentTrainingInfo from '../Component/wisdom/companyList/talentTraining/talentTrainingInfo/talentTrainingInfo';  //智慧创谷--企业服务--人才培训详情
import GetPeople from '../Component/wisdom/companyList/getPeople/getPeople';  //智慧创谷--企业服务--人才招聘
import PeopleMeeting from '../Component/wisdom/companyList/getPeople/peopleMeeting';  //智慧创谷--企业服务--招聘会
import MeetingInfor from '../Component/wisdom/companyList/getPeople/meetingInfor';  //智慧创谷--企业服务--招聘会
import GetMeet from '../Component/wisdom/companyList/getPeople/getMeet';  //智慧创谷--企业服务--招聘会--报名申请-----未完成  需求变更
import MeetCompany from '../Component/wisdom/companyList/getPeople/meetCompany';  //智慧创谷--企业服务--人才招聘--线上招聘平台
import OnLine from '../Component/wisdom/companyList/getPeople/onLine';  //智慧创谷--企业服务--人才招聘--在线发布
import OnLineInfor from '../Component/wisdom/companyList/getPeople/onLineInfor';  //智慧创谷--企业服务--人才招聘--在线发布--详情
import AddOnline from '../Component/wisdom/companyList/getPeople/addOnline';  //智慧创谷--企业服务--人才招聘--在线发布--新增
import EditOnline from '../Component/wisdom/companyList/getPeople/editOnline';  //智慧创谷--企业服务--人才招聘--在线发布--编辑
import Housing from '../Component/wisdom/companyList/housing/';  //智慧创谷--企业服务--人才住房
import Introduction from '../Component/wisdom/companyList/housing/introduction/';  //智慧创谷--企业服务--人才住房--公租房介绍
import ApplyWord from '../Component/wisdom/companyList/housing/applyWord/applyWord';  //智慧创谷--企业服务--人才住房--公租房申请表
import Notice from '../Component/wisdom/companyList/housing/notice/notice';  //智慧创谷--企业服务--人才住房--公租房公告
import NoticeDetails from '../Component/wisdom/companyList/housing/noticeDetails/noticeDetails';  //智慧创谷--企业服务--人才住房--公租房详情
import OnlineApply from '../Component/wisdom/companyList/housing/onlineApply/onlineApply';  //智慧创谷--企业服务--人才住房--在线申请
import LegalTrivia from '../Component/wisdom/companyList/legalTrivia/legalTrivia';  //智慧创谷--企业服务--法律小知识
import SharingCenter from '../Component/wisdom/companyList/sharingCenter/sharingCenter';  //智慧创谷--企业服务--共享中心
import AddSharingInfo from '../Component/wisdom/companyList/sharingCenter/addSharingInfo/addSharingInfo';  //智慧创谷--企业服务--共享中心新增
import SharingInfor from '../Component/wisdom/companyList/sharingCenter/sharingInfor/sharingInfor';  //智慧创谷--企业服务--共享中心详情
import OnlineApplication from '../Component/wisdom/companyList/sharingCenter/onlineApplication/onlineApplication';  //智慧创谷--企业服务--共享中心--在线申请
import ResourceDocking from '../Component/wisdom/companyList/resourceDocking/resourceDocking';  //智慧创谷--企业服务--资源对接
import AddResource from '../Component/wisdom/companyList/resourceDocking/addResource/addResource';  //智慧创谷--企业服务--资源对接新增
import ResourceInfor from '../Component/wisdom/companyList/resourceDocking/resourceInfor/resourceInfor';  //智慧创谷--企业服务--资源对接详情
import LegalService from '../Component/wisdom/companyList/legalService/legalService';  //智慧创谷--企业服务--法律服务站
import ProcuratorialLiaison from '../Component/wisdom/companyList/procuratorialLiaison/procuratorialLiaison';  //智慧创谷--企业服务--检察联络室
import DisputeMediation from '../Component/wisdom/companyList/disputeMediation/disputeMediation';  //智慧创谷--企业服务--纠纷调解中心
import PretrialMediation from '../Component/wisdom/companyList/pretrialMediation/pretrialMediation';  //智慧创谷--企业服务--庭前调解室
import SellThing from '../Component/wisdom/companyList/newThing/sellThing/sellThing'; //智慧创谷--企业服务--待办事项-营销服务/办公采购/装修服务/家政服务/IT服务
import CompanyList from '../Component/wisdom/companyList/newThing/sellThing/companyList'; //智慧创谷--企业服务--待办事项-申请成功
import CompanySingle from '../Component/wisdom/companyList/newThing/sellThing/companySingle'; //智慧创谷--企业服务--待办事项-详情
import Moneyreplace from '../Component/wisdom/companyList/moneyreplace/moneyreplace'; //智慧创谷--企业服务--待办事项-财税代理 
import ShoppingRegin from '../Component/wisdom/companyList/shoppingRegin/shoppingRegin'; //智慧创谷--企业服务--待办事项-工商注册
import NowShopping from '../Component/wisdom/companyList/shoppingRegin/nowShopping'; //智慧创谷--企业服务--待办事项-工商注册--新注册板块
import Changsha from '../Component/wisdom/companyList/changsha/changsha'; //智慧创谷--企业服务--长沙风险补充基金
import InstallChangsha from '../Component/wisdom/companyList/changsha/InstallChangsha'; //智慧创谷--企业服务--长沙风险补充基金--新注册板块
import ReplaceChangsha from '../Component/wisdom/companyList/changsha/replaceChangsha'; //智慧创谷--企业服务--长沙风险补充基金--迁移变更板块
import Province from '../Component/wisdom/companyList/province/province'; //智慧创谷--企业服务--省市区政策  
import ProvinceInfor from '../Component/wisdom/companyList/province/provinceInfor'; //智慧创谷--企业服务--省市区政策---详情
import ProvinceOnline from '../Component/wisdom/companyList/province/provinceOnline'; //智慧创谷--企业服务--省市区政策---详情
import CopyrightService from '../Component/wisdom/companyList/copyrightService/copyrightService'; //智慧创谷--企业服务--版权服务

// 党群服务
import StudyLink from '../Component/wisdom/partyService/studyLink/studyLink'; //智慧创谷--党群服务--学习链接
import PartyDiscipline from '../Component/wisdom/partyService/partyDiscipline/partyDiscipline'; //智慧创谷--党群服务--党纪党规
import PartyDetails from '../Component/wisdom/partyService/partyDiscipline/partyDetails'; //智慧创谷--党群服务--党纪党规详情
import PartyAffairs from '../Component/wisdom/partyService/partyAffairs/partyAffairs'; //智慧创谷--党群服务--党务知识
import AffairsDetails from '../Component/wisdom/partyService/partyAffairs/affairsDetails'; //智慧创谷--党群服务--党务知识详情
import PartyActivities from '../Component/wisdom/partyService/partyActivities/partyActivities'; //智慧创谷--党群服务--党内活动
import ActiveInfor from '../Component/wisdom/partyService/partyActivities/activeInfor/activeInfor'; //智慧创谷--党群服务--党内活动详情
import ActiveCampusName from '../Component/wisdom/partyService/partyActivities/activeCampusName/activeCampusName'; //智慧创谷--党群服务--党内活动报名
import JoinParty from '../Component/wisdom/partyService/joinParty/joinParty'; //智慧创谷--党群服务--申请入党
import RelationalLink from '../Component/wisdom/partyService/relationalLink/relationalLink'; //智慧创谷--党群服务--党员组织关系链接
import EstablishApply from '../Component/wisdom/partyService/establishApply/establishApply'; //智慧创谷--党群服务--成立党组织申请
import FiveTransformations from '../Component/wisdom/partyService/fiveTransformations/fiveTransformations'; //智慧创谷--党群服务--五化支部建设
import BranchSetting from '../Component/wisdom/partyService/fiveTransformations/branchSetting/branchSetting'; //智慧创谷--党群服务--五化支部建设--支部设置标准化
import OrganizationLife from '../Component/wisdom/partyService/fiveTransformations/OrganizationLife/OrganizationLife'; //智慧创谷--党群服务--五化支部建设--组织生活
import GuanLi from '../Component/wisdom/partyService/fiveTransformations/guanli'; //智慧创谷--党群服务--五化支部建设--管理服务
import ZhiDu from '../Component/wisdom/partyService/fiveTransformations/zhidu'; //智慧创谷--党群服务--五化支部建设--工作制度
import ZhenDi from '../Component/wisdom/partyService/fiveTransformations/zhendi'; //智慧创谷--党群服务--五化支部建设--阵地建设

 
import Peripheral from '../Component/home/peripheral/';  //首页周边配置
import Chuxing from '../Component/home/peripheral/chuxing/';  //首页周边配置
import ServiceTep from '../Component/home/peripheral/serviceTep/';  //首页周边配置 服务模块 例如酒店  休闲 美食跳转页面
import PeripheralSearch from '../Component/home/peripheral/search/'; //首页周边配置 搜索
import Policy from '../Component/wisdom/qiye/policy/'; //智慧创谷--企业服务--园区政策
import PolicyDetail from '../Component/wisdom/qiye/policyDetail/';  //政策详情
import ApplyOnline from '../Component/wisdom/qiye/applyOnline/';  //政策详情——线上申请

import Trademark from '../Component/wisdom/qiye/trademark/';  //商标中心
import OnlineDeal from '../Component/wisdom/qiye/trademark/onlineDeal/'; //线上办理
import OfflineDeal from '../Component/wisdom/qiye/trademark/offlineDeal/'; //线下办理
import ForwardFiles from '../Component/wisdom/qiye/trademark/forwardFiles/'; //相关文件模板 转发
import PropertyStation from '../Component/wisdom/wuye/propertyStation/';  //物业驿站
import PropertyDetail from '../Component/wisdom/wuye/propertyStation/propertyDetail/';  //物业驿站 详情

import GardenMating from '../Component/home/gardenMating/';  // 园区配套
import WebViewPage from '../Component/webView';  // 园区配套

//智慧创谷--党群服务
import Dangqun from '../Component/wisdom/dangqun'
import dangQunMap from '../Component/wisdom/dangqun/dangQunMap'
import DisWork from '../Component/disWork/disWork';  //系统开发中页面


//圆圈
import eat from '../Component/Circle/parkCircle/eat';
import notFound from '../Component/Circle/parkCircle/notFound';
import run from '../Component/Circle/parkCircle/run';
import shop from '../Component/Circle/parkCircle/shop';
import UserAuthor from '../Component/mine/myNews/author'

const dataList = [
    
    // 首页
    {path: '/campusActive', component: CampusActive, name: '走进园区'},
    {path: '/disWork', component: DisWork, name: '系统开发中'},
    {path: '/povertyAlleviation', component: PovertyAlleviation, name: '精准扶贫'},
    {path: '/activeInfo', component: ActiveInfo, name: '精准扶贫--活动详情'},
    {path: '/campusInfor', component: CampusInfor, name: '走进园区--园区活动详情'},
    {path: '/campusReturn', component: CampusReturn, name: '走进园区--反馈'},
    {path: '/campusName', component: CampusName, name: '走进园区--报名'},
    {path: '/elegantDisplay', component: ElegantDisplay, name: '风采展示tab切换页'},
    {path: '/elegantInfor', component: ElegantInfor, name: '风采展示信息页'},
    {path: '/newInfor', component: NewInfor, name: '新闻咨询'},
    {path: '/parkInformation', component: ParkInformation, name: '园区概况'},
    {path: '/noticeTemplate', component: NoticeTemplate, name: '通知详情'},
    {path: '/businessList', component: BusinessList, name: '企业名录'},
    {path: '/investmentPromotion', component: InvestmentPromotion, name: '招商入驻'},
    {path: '/promotionDetails', component: PromotionDetails, name: '招商入驻-详情'},
    {path: '/bookingRoom', component: BookingRoom, name: '招商入驻-预定'},
    {path: '/comingPark', component: ComingPark, name: '智慧创谷--入园流程'},
    {path: '/coming', component: Coming, name: '智慧创谷--入园流程--入园申请'},
    {path: '/gardenMating', component: GardenMating, name: '走进园区-园区配偶'},
    // 党群服务
    {path: '/studyLink', component: StudyLink, name: '智慧创谷--党群服务--学习链接'},
    {path: '/partyDiscipline', component: PartyDiscipline, name: '智慧创谷--党群服务--党纪党规'},
    {path: '/partyDetails', component: PartyDetails, name: '智慧创谷--党群服务--党纪党规详情'},
    {path: '/partyAffairs', component: PartyAffairs, name: '智慧创谷--党群服务--党务知识'},
    {path: '/affairsDetails', component: AffairsDetails, name: '智慧创谷--党群服务--党务知识详情'},
    {path: '/partyActivities', component: PartyActivities, name: '智慧创谷--党群服务--党内活动'},
    {path: '/activeInfor', component: ActiveInfor, name: '智慧创谷--党群服务--党内活动详情'},
    {path: '/activeCampusName', component: ActiveCampusName, name: '智慧创谷--党群服务--党内活动详情'},
    {path: '/joinParty', component: JoinParty, name: '智慧创谷--党群服务--申请入党'},
    {path: '/relationalLink', component: RelationalLink, name: '智慧创谷--党群服务--党员组织关系链接'},
    {path: '/establishApply', component: EstablishApply, name: '智慧创谷--党群服务--成立党组织申请'},
    {path: '/fiveTransformations', component: FiveTransformations, name: '智慧创谷--党群服务--五化支部建设'},
    {path: '/branchSetting', component: BranchSetting, name: '智慧创谷--党群服务--五化支部建设--支部设置标准化'},
    {path: '/organizationLife', component: OrganizationLife, name: '智慧创谷--党群服务--五化支部建设--组织生活'},
    {path: '/guanli', component: GuanLi, name: '智慧创谷--党群服务--五化支部建设--管理服务'},
    {path: '/zhidu', component: ZhiDu, name: '智慧创谷--党群服务--五化支部建设--工作制度'},
    {path: '/zhendi', component: ZhenDi, name: '智慧创谷--党群服务--五化支部建设--阵地建设'},
    {path: '/branchSetting', component: BranchSetting, name: '智慧创谷--党群服务--五化支部建设--支部设置标准化'},
    {path: '/branchSetting', component: BranchSetting, name: '智慧创谷--党群服务--五化支部建设--支部设置标准化'},
    {path: '/branchSetting', component: BranchSetting, name: '智慧创谷--党群服务--五化支部建设--支部设置标准化'},

    // 个人中心
    {path: "/myCompany", component: MyCompany, name: '个人中心-我的企业'},
    {path: "/myApply", component: MyApply, name: '个人中心-我的申请'},
    {path: "/myApplyGoods", component: MyApplyGoods, name: '个人中心-我的申请-物品放行申请'},
    {path: "/goodsDetails", component: GoodsDetails, name: '个人中心-我的申请-物品放行申请详情'},
    {path: "/repairList", component: RepairList, name: '个人中心-我的申请--报修记录'},
    {path: "/repairInfor", component: RepairInfor, name: '个人中心-我的申请--报修记录详情'},
    {path: "/policyApply", component: PolicyApply, name: '个人中心-我的申请--政策申请'},
    {path: "/policyDetails", component: PolicyDetails, name: '个人中心-我的申请--政策申请详情'},
    {path: "/myApplyRenovation", component: MyApplyRenovation, name: '个人中心-我的申请--装修申请'},
    {path: "/goNotice", component: GoNotice, name: '个人中心-我的申请--装修申请--提交资料'},
    {path: "/myApplyRecruit", component: MyApplyRecruit, name: '个人中心-我的申请--招聘会申请'},
    {path: "/recruitDetails", component: RecruitDetails, name: '个人中心-我的申请--招聘会申请详情'},
    {path: "/agent", component: Agent, name: '个人中心-我的申请--待办服务申请'},
    {path: "/paidServicesq", component: PaidServicesq, name: '个人中心-我的申请--有偿服务申请'},
    {path: "/paidServicesqDetail", component: PaidServicesqDetail, name: '个人中心-我的申请--有偿服务申请'},
    {path: "/agentDetail", component: AgentDetail, name: '个人中心-我的申请--待办服务申请详情'},
    {path: "/myReport", component: MyReport, name: '个人中心-投诉建议'},
    {path: "/myInformation", component: MyInformation, name: '个人中心-我的发布'},
    {path: "/addInfo", component: AddInfo, name: '个人中心-我的发布-新增'},
    {path: "/infoDetails", component: InfoDetails, name: '个人中心-我的发布-详情'},
    {path: "/companyReset", component: CompanyReset, name: '个人中心-我的认证'},
    {path: "/unCompanyReset", component: UnCompanyReset, name: '个人中心-暂未认证'},
    {path: "/mySetting", component: MySetting, name: '个人中心-我的设置'},
    {path: "/settingName", component: SettingName, name: '个人中心-我的设置--修改姓名'},
    {path: "/settingPhone", component: SettingPhone, name: '个人中心-我的设置--修改电话'},
    {path: "/settingPassWord", component: SettingPassWord, name: '个人中心-我的设置--修改密码'},
    {path: "/SetPwd", component: SetPwd, name: '个人中心-我的设置--验证'},
    {path: "/myMessage", component: MyNews, name: '个人中心-我的消息'},
    {path: "/myMessage/details", component: MyNewsDetails, name: '个人中心-我的消息-消息详情'},
    {path: "/myMessage/staydetalis", component: StayDetalis, name: '个人中心-待办详情'},
    {path: "/myMessage/fail", component: Fail, name: '拒绝放行'},
    {path: "/statusPage", component: StatusPage, name: '通用状态链接显示页面'},
    {path: "/myWorkDesk", component: MyWorkDesk, name: '个人中心-物业工作台---只有物业人员有权限进入'},
    {path: "/comingPeople", component: ComingPeople, name: '个人中心-物业工作台---访客登记--只有物业人员有权限进入'},
    {path: "/passingThing", component: PassingThing, name: '个人中心-物业工作台---物品放行--只有物业人员有权限进入'},
    {path: "/passingInfor", component: PassingInfor, name: '个人中心-物业工作台---物品放行-详情--只有物业人员有权限进入'},
    {path: "/propertyPost", component: PropertyPost, name: '个人中心-物业工作台---物业驿站'},
    {path: "/propertyPostInfor", component: PropertyPostInfor, name: '个人中心-物业工作台---物业驿站详情'},
    {path: "/getPassing", component: GetPassing, name: '个人中心-物业工作台---物品放行-同意放行--只有物业人员有权限进入'},
    {path: "/noPassing", component: NoPassing, name: '个人中心-物业工作台---物品放行-拒绝放行--只有物业人员有权限进入'},
    {path: "/orderManage", component: OrderManage, name: '个人中心-物业工作台---工单管理'},
    {path: "/orderManageInfor", component: OrderManageInfor, name: '个人中心-物业工作台---工单管理详情'},
    {path: "/feedback", component: Feedback, name: '个人中心-物业工作台---反馈'},

    
    // 智慧创谷--物业服务
    {path: '/newjianli', component:Newjianli, name: '新建简历'},
    {path: '/gonggao', component:Gonggao, name: '楼宇公告'},
    {path: '/moveThing', component:MoveThing, name: '物业放行'},
    {path: '/notService', component:NotService, name: '停车管理'},
    {path: '/businessList/details', component:BusinessDetails, name: '企业详情'},
    {path: '/bianmin', component:BianMin, name: '便民服务'},
    {path: '/bianmin/apply', component:BMapply, name: '便民服务申请'},
    {path: '/myApply/MyBMapply', component:MyBMapply, name: '我的便民服务申请'},
    {path: '/zhaopin', component:Zhaopin, name: '人才招聘'},
    {path: '/gongzuo', component:Gongzuo, name: '找工作'},
    {path: '/jobDetail', component:JobDetail, name: '找工作详情'},
    {path: '/paidService', component:PaidService, name: '有偿服务'},
    {path: '/paidDetails', component:PaidDetails, name: '有偿服务详情'},
    {path: '/paidApply', component:PaidApply, name: '有偿服务申请'},
    {path: '/decorationApplication', component:DecorationApplication, name: '装修申请'},
    {path: '/processingFlow', component:ProcessingFlow, name: '装修申请--办理流程'},
    {path: '/decorationApply', component:DecorationApply, name: '装修申请--在线申请'},
    {path: '/propertyBrief', component:PropertyBrief, name: '物业简介'},

    // 智慧创谷--企业服务
    {path: '/zhanhui', component:Zhanhui, name: '智慧创谷--企业服务--展览展会'},
    {path: '/industryDynamics', component:IndustryDynamics, name: '智慧创谷--企业服务--行业动态'},
    {path: '/industryDynamicsDetails', component:IndustryDynamicsDetails, name: '智慧创谷--企业服务--行业动态详情'},
    {path: '/industryActivities', component:IndustryActivities, name: '智慧创谷--企业服务--行业活动'},
    {path: '/getZhanhui', component:GetZhanhui, name: '智慧创谷--企业服务--展览展会-报名申请'},
    {path: '/zhanhuiInfor', component:ZhanhuiInfor, name: '智慧创谷--企业服务--展览展会-详情'},
    {path: '/changdi', component:Changdi, name: '智慧创谷--企业服务--场地服务'},
    {path: '/changdifuwu', component:Changdifuwu, name: '智慧创谷--企业服务--场地服务详情'},
    {path: '/reservation', component:Reservation, name: '智慧创谷--企业服务--申请预定'},
    {path: '/advertisingService', component:AdvertisingService, name: '智慧创谷--企业服务--广告服务'},
    {path: '/advertisingServiceInfo', component:AdvertisingServiceInfo, name: '智慧创谷--企业服务--广告服务详情'},
    {path: '/advertisementApply', component:AdvertisementApply, name: '智慧创谷--企业服务--广告位申请'},
    {path: '/talentTraining', component:TalentTraining, name: '智慧创谷--企业服务--人才培训'},
    {path: '/talentTrainingInfo', component:TalentTrainingInfo, name: '智慧创谷--企业服务--人才培训详情'},
    {path: '/getPeople', component:GetPeople, name: '智慧创谷--企业服务--人才招聘'},
    {path: '/peopleMeeting', component:PeopleMeeting, name: '智慧创谷--企业服务--招聘会'},
    {path: '/meetingInfor', component:MeetingInfor, name: '智慧创谷--企业服务--招聘会'},
    {path: '/getMeet', component:GetMeet, name: '智慧创谷--企业服务--招聘会--报名申请-----未完成  需求变更'},
    {path: '/meetCompany', component:MeetCompany, name: '智慧创谷--企业服务--人才招聘--线上招聘平台'},
    {path: '/onLine', component:OnLine, name: '智慧创谷--企业服务--人才招聘--在线发布'},
    {path: '/onLineInfor', component:OnLineInfor, name: '智慧创谷--企业服务--人才招聘--在线发布--详情'},
    {path: '/addOnline', component:AddOnline, name: '智慧创谷--企业服务--人才招聘--在线发布--新增'},
    {path: '/editOnline', component:EditOnline, name: '智慧创谷--企业服务--人才招聘--在线发布--编辑'},
    {path: '/housing', component:Housing, name: '智慧创谷--企业服务--人才住房'},
    {path: '/introduction', component:Introduction, name: '智慧创谷--企业服务--人才住房--公租房介绍'},
    {path: '/applyWord', component:ApplyWord, name: '智慧创谷--企业服务--人才住房--公租房申请表'},
    {path: '/notice', component:Notice, name: '智慧创谷--企业服务--人才住房--公租房公告'},
    {path: '/noticeDetails', component:NoticeDetails, name: '智慧创谷--企业服务--人才住房--公租房详情'},
    {path: '/onlineApply', component:OnlineApply, name: '智慧创谷--企业服务--人才住房--在线申请'},
    {path: '/legalTrivia', component:LegalTrivia, name: '智慧创谷--企业服务--法律小知识'},
    {path: '/sharingCenter', component:SharingCenter, name: '智慧创谷--企业服务--共享中心'},
    {path: '/addSharingInfo', component:AddSharingInfo, name: '智慧创谷--企业服务--共享中心新增'},
    {path: '/sharingInfor', component:SharingInfor, name: '智慧创谷--企业服务--共享中心详情'},
    {path: '/onlineApplication', component:OnlineApplication, name: '智慧创谷--企业服务--共享中心--在线申请'},
    {path: '/resourceDocking', component:ResourceDocking, name: '智慧创谷--企业服务--资源对接'},
    {path: '/addResource', component:AddResource, name: '智慧创谷--企业服务--资源对接新增'},
    {path: '/resourceInfor', component:ResourceInfor, name: '智慧创谷--企业服务--资源对接详情'},
    {path: '/legalService', component:LegalService, name: '智慧创谷--企业服务--法律服务站'},
    {path: '/procuratorialLiaison', component:ProcuratorialLiaison, name: '智慧创谷--企业服务--检察联络室'},
    {path: '/disputeMediation', component:DisputeMediation, name: '智慧创谷--企业服务--纠纷调解中心'},
    {path: '/pretrialMediation', component:PretrialMediation, name: '智慧创谷--企业服务--庭前调解室'},
    {path: '/sellThing', component:SellThing, name: '智慧创谷--企业服务--待办事项-营销服务/办公采购/装修服务/家政服务/IT服务'},
    {path: '/companyList', component:CompanyList, name: '智慧创谷--企业服务--待办事项-申请成功'},
    {path: '/companySingle', component:CompanySingle, name: '智慧创谷--企业服务--待办事项-详情'},
    {path: '/moneyreplace', component:Moneyreplace, name: '智慧创谷--企业服务--待办事项-财税代理'},
    {path: '/shoppingRegin', component:ShoppingRegin, name: '智慧创谷--企业服务--待办事项-工商注册'},
    {path: '/nowShopping', component:NowShopping, name: '智慧创谷--企业服务--待办事项-工商注册--新注册板块'},
    {path: '/changsha', component:Changsha, name: '智慧创谷--企业服务--长沙风险补充基金'},
    {path: '/installChangsha', component:InstallChangsha, name: '智慧创谷--企业服务--长沙风险补充基金--新注册板块'},
    {path: '/replaceChangsha', component:ReplaceChangsha, name: '智慧创谷--企业服务--长沙风险补充基金--迁移变更板块'},
    {path: '/province', component:Province, name: '智慧创谷--企业服务--省市区政策 '},
    {path: '/provinceInfor', component:ProvinceInfor, name: '智慧创谷--企业服务--省市区政策---详情'},
    {path: '/provinceOnline', component:ProvinceOnline, name: '智慧创谷--企业服务--省市区政策---详情'},
    {path: '/copyrightService', component:CopyrightService, name: '智慧创谷--企业服务--版权服务'},

    {path: '/peripheral', component:Peripheral, name: '首页周边配置'},
    {path: '/peripheral/chuxing', component:Chuxing, name: '首页周边配置'},
    {path: '/serviceTep', component:ServiceTep, name: '首页周边配置 服务模块 例如酒店  休闲 美食跳转页面'},
    {path: '/peripheral/search', component:PeripheralSearch, name: '首页周边配置 搜索'},
    {path: '/wisdom/qiye/policy', component:Policy, name: '智慧创谷--企业服务--园区政策'},
    {path: '/wisdom/qiye/policy/policyDetail', component:PolicyDetail, name: '政策详情'},
    {path: '/wisdom/qiye/policy/applyOnline', component:ApplyOnline, name: '政策详情——线上申请'},

    {path: '/wisdom/qiye/trademark', component:Trademark, name: '商标中心'},
    {path: '/wisdom/qiye/trademark/onlineDeal', component:OnlineDeal, name: '线上办理'},
    {path: '/wisdom/qiye/trademark/offlineDeal', component:OfflineDeal, name: '线下办理'},
    {path: '/wisdom/qiye/trademark/forwardFiles', component:ForwardFiles, name: '相关文件模板 转发'},
    {path: '/wisdom/wuye/propertyStation', component:PropertyStation, name: '物业驿站'},
    {path: '/wisdom/wuye/propertyStation/propertyDetail', component:PropertyDetail, name: '物业驿站 详情'},

    {path: '/Dangqun', component:Dangqun, name: '智慧创谷--党群服务'},
    {path: '/dangQunMap', component:dangQunMap, name: '智慧创谷--党群服务'},
    
    {path: '/eat', component:eat, name: '圆圈--吃货搜街'},
    {path: '/notFound', component:notFound, name: '圆圈--失物招领'},
    {path: '/run', component:run, name: '圆圈--单身邂逅'},
    {path: '/shop', component:shop, name: '圆圈--跳蚤市场'},
    {path: '/userAuthor', component:UserAuthor, name: '授权认证'},
]

const routerList = [
    {path: '/', component: App, name: '首页'},
    {path: '/login', component: Login, name: '登录'},
    {path: '/webView', component: WebViewPage, name: '链接网页'},
    {path: '/loginByCode', component: LoginByCode, name: '验证码登录'},
    {path: '/register', component: Register, name: '注册'},
    {path: '/registerOk', component: RegisterOk, name: '注册完成'},
    {path: '/certificationFailed', component: CertificationFailed, name: '认证未通过'},
    {path: '/repairService', component: RepairService, name: '保修服务'},
    ...dataList,

    {path: '*', component: NotFound, name: '无页面'},
     
]

export default function({ history, app}) {
    if (localStorage.getItem('token')) {
        interfaces.GetLoginUserInfo({
            UserID: localStorage.getItem('userId')
        }).then(res=>{
            let user = {
                id: res[0].ID,
                name: res[0].cName,
                type: res[0].Type,
                phone: res[0].cPhone,
                img: res[0].PhotoPath
            };
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("userId", user.id);
            localStorage.setItem("userType", user.type);
        })
    }
    const routerNameList = [];
    const requireAuth = (nextState, replace) => {
        const regLink = /.\/app\/$/;
        routerNameList.push(JSON.stringify(nextState.location))
        if (nextState.routes[0].path === '*' && regLink.test(nextState.location.pathname)) {    //劫持 /:id/app/ (原来路径跳首页的重定向到现在的首页)
           replace({ pathname: '/' })
        }
        if (nextState.location.pathname === "/register") {
            localStorage.setItem('router_location', routerNameList.join())
        }
    }
   return (
   <Router history={history}>
        {routerList.map(item => (<Route path={item.path} onEnter={requireAuth} component={item.component} />))}
   </Router>) 
};