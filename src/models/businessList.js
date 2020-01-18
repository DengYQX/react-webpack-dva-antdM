import interfaces from '../api';

export default {
  namespace: 'businessList',
  state: {
    summaryData: [],
  },
  reducers: {
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
  },
  effects: {
    * GetTopStyleShowList({ payload: { params } }, { call, put }) {
      const data = yield call(interfaces.GetTopStyleShowList, { ...params });
      yield put({
        type: 'fengCaiData',
        data
      });
    }
  }
};
