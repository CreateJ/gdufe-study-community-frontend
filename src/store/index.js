import Vue from "vue";
import Vuex from "vuex";
import { LGSC, SUIF } from "./mutations-types";
import { ITLG } from "./actions-types"
import { getUserInfo } from "@/network/store.js"

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 登录状态
    isLogin: false,
    userId: "",
    userName: "undefine",
    baseURL: "http://localhost:8080/community"
  },
  mutations: {
    [LGSC](s) {
      s.isLogin = true;
    },
    [SUIF](s,payload) {
      // payload包含userid和username两项
      s.userId = payload.userid;
      s.userName = payload.username;
    }
  },
  getters: {},
  actions: {
    // 初始化登录状态
    [ITLG](context,payload){
      //payload包含userID，用于网络请求获取
      getUserInfo(payload.userId).then(res => {
        context.commit(SUIF,{
          userid: res.user.id,
          username: res.user.username
        })
        console.log(res);
      })
    }
  },
  modules: {}
});

export default store;
