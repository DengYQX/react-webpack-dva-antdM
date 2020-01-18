import interfaces from '../api';

export default {
  namespace: 'home',
  state: {
    currentTab: 'a1',
    currentWisdomTab: 0,
    currentActiveTab: 0,
    currentShareTab: 0,
    currentWisdomScroll: 0,
    scrollTop: 0,
    data: [],
    gardenData: [],
    newsData: [],
    fengCaiData: [],
    BannerList: [],
    summaryData: [],
  },
  reducers: {
    queryListSuccess(state, {
      payload
    }) {
      return {
        ...state,
        data: {
          ...state.data,
          ...payload
        }
      };
    },
    scrollTop(state, data) {
      return {
        ...state,
        scrollTop: data.scroll.payload
      };
    },
    wisdomScroll(state, data) {
      return {
        ...state,
        currentWisdomScroll: data.scroll.payload
      };
    },
    tabStatus(state, {
      currentTab
    }) {
      return {
        ...state,
        currentTab: currentTab.payload
      };
    },
    activeTabs(state, {
      currentActiveTab
    }) {
      return {
        ...state,
        currentActiveTab: currentActiveTab.payload
      };
    },
    shareTabs(state, {
      currentShareTab
    }) {
      return {
        ...state,
        currentShareTab: currentShareTab.payload
      };
    },
    tabWisdomStatus(state, {
      currentWisdomTab
    }) {
      return {
        ...state,
        currentWisdomTab: currentWisdomTab.payload
      };
    },
    gardenData(state, payload) {
    //  console.log(payload.data)
      return {
        ...state,
        gardenData: payload.data
      };
    },
    newsData(state, payload) {
      return {
        ...state,
        newsData: payload.data
      };
    },
    BannerList(state, payload) {
      return {
        ...state,
        BannerList: payload.data
      };
    },
    fengCaiData(state, payload) {
      return {
        ...state,
        fengCaiData: payload.data
      };
    },
    summaryData(state, payload) {
      return {
        ...state,
        summaryData: payload.data
      };
    },
    clear(state, payload) {
      payload.func.payload();
      return {
        ...state,
        summaryData: [],
        gardenData: [],
        newsData: [],
        fengCaiData: [],
        currentWisdomTab: 0,
        currentWisdomScroll: 0,
        currentActiveTab: 0,
        currentShareTab: 0,
        scrollTop: 0,
        BannerList: [],
        scrollTop: 0
      };
    }
  },
  effects: {
    * GetParkActivitiesList({ payload: { params } }, { call, put }) {
      //console.log(home.query(), "asdasd");
      const { jsonResult } = yield call(interfaces.GetParkActivitiesList, { ...params });
    //  const { jsonResult } = yield call(get('/km-service/testEchartsObject.json'));
      yield put({
        type: 'queryListSuccess',
        payload: {
          data: jsonResult.data,
          message: jsonResult.message,
          title: jsonResult.title
        }
      });
    },
    * changeScroll(scroll, { put, select }) {
      yield put({
        type: 'scrollTop',
        scroll
      });
    },
    * changeWisdomScroll(scroll, { put, select }) {
      yield put({
        type: 'wisdomScroll',
        scroll
      });
    },
    * GetParkNoticeList({ payload: { params, func } }, { call, put }) {
      const data = yield call(interfaces.GetParkNoticeList, { ...params });
      func(data)
    },
    * GetParkNoticeInfo({ payload: { params, func } }, { call, put }) {
      const data = yield call(interfaces.GetParkNoticeInfo, { ...params });
      func(data)
    },
    * GetTopParkNoticeList({ payload: { params } }, { call, put }) {
      const data = yield call(interfaces.GetTopParkNoticeList, { ...params });
      if (params.Type === '1') {
        yield put({
          type: 'gardenData',
          data
        });
      }else {
        yield put({
          type: 'newsData',
          data
        });
      }
    },
    * GetParkOverview({ payload: { params } }, { call, put }) {
      const data = yield call(interfaces.GetParkOverview, { ...params });
      yield put({
        type: 'summaryData',
        data
      });
    },
    * GetHomeBannerList({ payload: { params } }, { call, put }) {
      const data = yield call(interfaces.GetHomeBannerList, { ...params });
      yield put({
        type: 'BannerList',
        data
      });
    },
    * GetTopStyleShowList({ payload: { params } }, { call, put }) {
      const data = yield call(interfaces.GetTopStyleShowList, { ...params });
      yield put({
        type: 'fengCaiData',
        data
      });
    },
    * GetStyleShowInfo({ payload: { params, func } }, { call, put }) {
      const data = yield call(interfaces.GetStyleShowInfo, { ...params });
      func(data)
    },
    * changeTabs(types, { put, select }) {
      yield put({
        type: 'tabStatus',
        currentTab: types,
      });
    },
    * changeShareTabs(types, { put, select }) {
      yield put({
        type: 'shareTabs',
        currentShareTab: types,
      });
    },
    * changeActiveTabs(types, { put, select }) {
      yield put({
        type: 'activeTabs',
        currentActiveTab: types,
      });
    },
    * changeWisdomTabs(types, { put, select }) {
      yield put({
        type: 'tabWisdomStatus',
        currentWisdomTab: types
      });
    },
    * clearData(func, { put, select }) {
      yield put({
        type: 'clear',
        func
      });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/home') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    }
  }
};
