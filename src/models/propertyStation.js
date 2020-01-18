export default {
  namespace: "propertyStation",
  state: {
    data: null
  },
  reducers: {
    save(state, data) {
      return {
        ...state,
        data: data.data
      };
    }
  },
  effects: {
    * toSave({ payload }, { call, put }) {
      yield put({
        type: 'save',
        data: payload
      });
    }
  }
};
