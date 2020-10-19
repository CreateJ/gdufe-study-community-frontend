import Vue from "vue";
import Vuex from "vuex";
import { LGSC, SUIF, LGOT, OPDE, CODE, UDRI, URRI } from "./mutations-types";
import { ITLG, GRPI } from "./actions-types";
import { getUserInfo } from "@/network/store.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 登录状态
    isLogin: false,
    userId: "",
    userName: "undefine",
    userInfo: {},
    baseURL: "http://localhost:8080/community",

    // drawer控制
    drawerVisible: false,
    replyInfo: {}, // 保存评论模块的详细信息
    replyRequestInfo: {}
  },
  mutations: {
    // 登录成功，将登录状态更改为true，方便vue响应式显示首页和消息、个人页面组件
    [LGSC](s) {
      s.isLogin = true;
    },
    // 退出登录，将store中有关信息清空
    [LGOT](s) {
      s.isLogin = false;
      s.userId = "";
      s.userName = "undefine";
      s.userInfo = {};
    },
    // 在store中保存userid和username
    [SUIF](s, payload) {
      // payload包含userid和username、userInfo三项，userid和name主要用于主页渲染，
      // 其他的信息用作后续个人页面渲染用
      s.userId = payload.userid;
      s.userName = payload.username;
      s.userInfo = payload.userinfo;
      // console.log(s.userInfo);
    },
    [OPDE](s) {
      s.drawerVisible = true;
    },
    [CODE](s) {
      s.drawerVisible = false;
    },
    [UDRI](s, payload) {
      s.replyInfo = payload.userInfo;
    },
    [URRI](s, payload) {
      s.replyRequestInfo.postId = payload.postId;
      s.replyRequestInfo.entityType = payload.entityType;
      s.replyRequestInfo.entityId = payload.entityId;
      s.replyRequestInfo.targetId = payload.targetId;
    }
  },
  getters: {},
  actions: {
    // 登录成功后，初始化登录状态，将userid和username保存到store中
    [ITLG](context, payload) {
      //payload包含userID，用于网络请求获取
      getUserInfo(payload.userId).then(res => {
        context.commit(SUIF, {
          userid: res.user.id,
          username: res.user.username,
          userinfo: res
        });
      });
    },
    // 获取评论面板的信息,包括文章id，目标用户id
    [GRPI](context, payload) {
      getUserInfo(payload.userId).then(res => {
        let userInfo = {};
        userInfo.userId = res.user.id;
        userInfo.userHeader = res.user.headerUrl;
        userInfo.userName = res.user.username;
        context.commit(UDRI, { userInfo });
      });
    }
  },
  modules: {}
});

export default store;
