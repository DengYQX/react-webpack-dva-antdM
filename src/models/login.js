import qs from "qs";
import interfaces from "../api";

export default {
  namespace: "login",
  state: {
    userMsg: {
      ID: null,
      Type: null,
      location: null
    },
    menuList: [],
    data: [],
    Type: localStorage.getItem('userType') || 1,
    token: localStorage.getItem('token') || null
  },
  effects: {
    *Login({ payload: { Mobile, LoginPwd, func } }, { call, put }) {
      const result = yield call(interfaces.login, { Mobile, LoginPwd });
      if (result) {
        let token = result[0].access_token;
        let userId = result[0].CurrentUserId;
        localStorage.setItem("token", token);
        const userInfo = yield call(interfaces.GetLoginUserInfo, {
          UserID: userId
        });
        if (userInfo) {
          let user = {
            id: userInfo[0].ID,
            type: userInfo[0].Type,
            name: userInfo[0].cName,
            phone: userInfo[0].cPhone,
            img: userInfo[0].PhotoPath
          };
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("userId", userId);
          localStorage.setItem("userType", user.type);
          yield put({
            type: "token",
            token
          });
          yield put({
            type: "userType",
            data: userInfo[0].Type
          });
          if (typeof func === "function") {
            yield func(userInfo[0].ID);
          }
        }
      }
    },
    *LoginByCode({ payload: { Mobile, ValidateCode, func } }, { call, put }) {
      const result = yield call(interfaces.loginByValidateCode, {
        Mobile,
        ValidateCode
      });
      if (result) {
        let token = result[0].access_token;
        let userId = result[0].CurrentUserId;
        localStorage.setItem("token", token);
        const userInfo = yield call(interfaces.GetLoginUserInfo, {
          UserID: userId
        });
        if (userInfo) {
          let user = {
            id: userInfo[0].ID,
            name: userInfo[0].cName,
            phone: userInfo[0].cPhone,
            type: userInfo[0].Type,
            img: userInfo[0].PhotoPath
          };
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("userId", userId);
          localStorage.setItem("userType", user.type);
          yield put({
            type: "token",
            token
          });
          yield put({
            type: "userType",
            data: userInfo[0].Type
          });
          if (typeof func === "function") {
            yield func();
          }
        }
      }
    },
    *saveUser({ payload: { id, user } }, { call, put }) {
      yield put({
        type: "user",
        payload: {
          id,
          user
        }
      });
    },
    *getMenuList({ payload: { uID } }, { call, put }) {
      const data = yield call(interfaces.GetMenuList, { uID });
      yield put({
        type: "MenuList",
        payload: {
          data
        }
      });
    },
    *signOut({ payload }, { call, put }) {
      yield put({
        type: "token",
        token: localStorage.getItem('token') || null
      });
    }
  },
  reducers: {
    token(state, payload) {
      return {
        ...state,
        token: payload.token
      };
    },
    MenuList(state, payload) {
      return {
        ...state,
        menuList: payload.data
      };
    },
    userType(state, payload) {
      return {
        ...state,
        Type: payload.data
      };
    },
    loginSuccess(state, { payload }) {
      return {
        ...state,
        data: {
          ...state.data,
          ...payload
        }
      };
    }
  }
};
