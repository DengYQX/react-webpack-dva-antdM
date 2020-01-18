export default {
  namespace: 'services',
  state: {
    hasAdvSrvSub: {
      id: false,
      time: '',
      status: false
    }
  },
  reducers: {
    currentAdv(state, { payload }) {
      return {
        ...state,
        list: {
          ...state.list,
          ...payload
        }
      };
    }
  },
  effects: {
    * SavecurrentAdv(params, { call, put }) {
      yield put({
        type: 'currentAdv',
        payload: {
         ...params
        }
      });
    }
  }
};
