<template>
  <div class="register">
    <div class="box">
      <div class="title">登录</div>

      <ul class="inputList">
        <li class="listItem">
          <div class="itemTitle">账号:</div>
          <el-input
            class="itemText"
            v-model="userID"
            placeholder="请输入账号"
          ></el-input>
        </li>
        <li class="listItem">
          <div class="itemTitle">密码:</div>
          <el-input
            class="itemText"
            v-model="userPW"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </li>
        <li class="listItem">
          <div class="itemTitle">验证码:</div>
          <el-input
            class="itemText"
            v-model="userCC"
            placeholder="请输入验证码"
          ></el-input>
        </li>
        <li class="imageItem">
          <img :src="kaptcha + '1'" alt="" @click="refreshKaptcha" />
        </li>
      </ul>
      <div class="btnBox">
        <el-button class="loginButton" type="primary" @click="loginCLick"
          >立即登录</el-button
        >
        <el-button class="forgetButton" type="primary" @click="forgetPWClick"
          >忘记密码</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { LinkTo } from "@/assets/utils/baseUtil"
import { getKaptcha, checkLoginData } from "@/network/login";
import { LGSC } from "@/store/mutations-types"
import { ITLG } from "@/store/actions-types"
import { setLoginCookie, clearLoingCookie } from "@/plugins/vue-cookies"
import axios from "axios";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      userID: "wcj",
      userPW: "123",
      userCC: "", //check code 验证码
      kaptcha: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    forgetPWClick() {
      console.log(this.userID + " " + this.userPW);
    },
    // 点击立即登录，会开启验证，
    // 根据服务器返回的信息进行相应的提示以及初始化登录状态操作，
    // 包括向服务器请求该账号对应的id相关的信息
    loginCLick() {
      let data = {
        username: this.userID,
        password: this.userPW,
        code: this.userCC
      };
      checkLoginData(data).then(res => {
        console.log(res);
        if (res.code == "200") {
          this.$message({
            message: "登录成功，即将跳转",
            type: "success"
          });
          setTimeout(()=>{
            // LGSC将store中的isLogin切换为true表示已登录
            // 延时跳转
            this.$store.commit(LGSC);
            this.$store.dispatch(ITLG,{userId:res.msg});
            // 将登录id保存到cookie中，设置过期时间为1d，后续可以在plugin/vue-cookies中修改
            setLoginCookie(res.msg);
            this.LinkTo('/home','replace')
          },2000)
        } else if (res.code == "2006") {
          // 刷新化验证码
          this.refreshKaptcha();
          this.$message({
            message: res.msg + " 请重新输入!",
            type: "error"
          });
        } else if (res.code == "2007") {
          // 刷新化验证码
          this.refreshKaptcha();
          this.$message({
            message: res.passwordMsg + " 请重新输入!",
            type: "error"
          });
        }
      });
    },
    // 公共跳转方法
    LinkTo,
    // 刷新验证码
    refreshKaptcha() {
      this.kaptcha = this.$store.state.baseURL + "/kaptcha?p=" + Math.random();
    },
    // 设置登录cookie，方便后续检测登录状态
    setLoginCookie,
  },
  created() {
    // 初始化验证码
    this.refreshKaptcha();
  },
  mounted() {}
};
</script>
<style scoped>
.register {
  min-height: 780px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  display: flex;
  width: 700px;
  height: 400px;
  background: white;
  list-style: none;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
}
.title {
  font-size: 30px;
  color: var(--main-color);
  margin: 20px;
}
.inputList {
  width: 600px;
  height: 200px;
  /* background: pink; */
  padding: 0;
  list-style: none;
}
.listItem {
  display: flex;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}
.itemTitle {
  flex: 3;
  text-align: right;
  padding-right: 20px;
  font-size: 16px;
  line-height: 32px;
}
.itemText {
  flex: 10;
}
.imageItem {
  float: right;
}
.btnBox {
  display: flex;
  justify-content: space-around;
}
.btnBox span {
  flex: 3;
}
.btnBox el-button {
  flex: 10;
}
.btnBox .loginButton {
  flex: 10;
  margin-right: 50px;
}
.btnBox .forgetButton {
  flex: 10;
  /* margin-right: 20px; */
}
</style>
<style></style>
