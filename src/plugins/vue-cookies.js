// vue-cookies 插件
import vueCookies from "vue-cookies";
import Vue from "vue";

Vue.use(vueCookies);
//this.$cookies.config(expireTimes[,path])  // default: expireTimes = 1d , path=/

export function setLoginCookie(userId){
  // 默认的cookie过期时间是1d,后面参数可以设置时间
  $cookies.set("GdufeLoginId",userId);
}

export function clearLoingCookie(){
  $cookies.remove("GdufeLoginId");
}
