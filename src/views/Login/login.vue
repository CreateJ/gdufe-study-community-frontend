<template>
  <div class="register">
    <div class="box">
      <div class="title">登&nbsp;&nbsp;录</div>
      <el-form
        :model="form"
        status-icon
        :rules="rules"
        ref="form"
        label-position="right"
        label-width="80px"
        class="inputList"
      >
        <el-form-item label="账号" prop="userID" class="listItem">
          <el-input
            size="large"
            v-model="form.userID"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPW" class="listItem">
          <el-input
            size="large"
            v-model="form.userPW"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="userCC" class="listItem">
          <div class="listItem_ccode">
            <el-input
              size="large"
              class="itemText_ccode"
              v-model="form.userCC"
              placeholder="请输入验证码"
            ></el-input>
            <div class="imageItem">
              <img :src="kaptcha + '1'" alt="" @click="refreshKaptcha" />
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="btnBox">
            <el-button class="btnItem" type="primary" @click="loginCLick"
              >立即登录</el-button
            >
            <el-button class="btnItem" type="primary" @click="forgetPWClick"
              >忘记密码</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { LinkTo } from "@/assets/utils/baseUtil";
import { getKaptcha, checkLoginData } from "@/network/login";
import { LGSC } from "@/store/mutations-types";
import { ITLG } from "@/store/actions-types";
import { setLoginCookie, clearLoingCookie } from "@/plugins/vue-cookies";
import axios from "axios";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    var validateID = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else if (String(value).trim() === "") {
        callback(new Error("请输入有效的账号"));
      } else {
        callback();
      }
    };
    var validatePW = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateCC = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      form: {
        userID: "",
        userPW: "",
        userCC: "", //check code 验证码
      },
      rules: {
        userID: [{ validator: validateID, trigger: "blur" }],
        userPW: [{ validator: validatePW, trigger: "blur" }],
        userCC: [{ validator: validateCC, trigger: "blur" }],
      },
      kaptcha: "",
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
      this.$refs.form.validate((valid) => {
        // 验证不通过，不向服务发送验证请求
        if (!valid) return false;
        
        let data = {
          username: this.form.userID,
          password: this.form.userPW,
          code: this.form.userCC,
        };
        checkLoginData(data).then((res) => {
          console.log(res);
          if (res.code == "200") {
            this.$message({
              message: "登录成功，即将跳转",
              type: "success",
            });
            setTimeout(() => {
              // LGSC将store中的isLogin切换为true表示已登录
              // 延时跳转
              this.$store.commit(LGSC);
              this.$store.dispatch(ITLG, { userId: res.msg });
              // 将登录id保存到cookie中，设置过期时间为1d，后续可以在plugin/vue-cookies中修改
              setLoginCookie(res.msg);
              this.LinkTo("/home", "replace");
            }, 2000);
          } else if (res.code == "2006") {
            // 刷新化验证码
            this.refreshKaptcha();
            this.$message({
              message: res.msg + " 请重新输入!",
              type: "error",
            });
          } else if (res.code == "2007") {
            // 刷新化验证码
            this.refreshKaptcha();
            this.$message({
              message: res.passwordMsg || res.usernameMsg,
              type: "error",
            });
          } else if(res.code == "500") {
            console.log("500");
            this.refreshKaptcha();
            this.$message({
              message: res.msg + " 服务器异常！请稍后再试！",
              type: "error",
            });
          }
        });
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
  mounted() {},
};
</script>
<style scoped>
.register {
  width: 100%;
}
.box {
  margin: 100px auto 0;
  display: flex;
  width: 400px;
  background: rgba(255, 255, 255, 0.8);
  list-style: none;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  box-shadow: 0 0 2px 6px rgba(240, 238, 238, 0.4);
}
.title {
  font-size: 30px;
  color: var(--main-color);
  margin: 20px;
}
.inputList {
  width: 350px;
  padding: 0;
}
.box /deep/ .el-input__inner:focus {
  border-color: var(--main-color);
}
.listItem {
  margin-bottom: 25px;
}
.listItem_ccode {
  display: flex;
}
.itemText_ccode {
  flex: 1;
}
.imageItem {
  flex: 1;
}
.imageItem img {
  float: right;
  cursor: pointer;
}
.btnBox {
  display: flex;
  justify-content: space-around;
  margin: 10px 0 20px -80px;
}

.btnBox .btnItem {
  background-color: var(--main-color);
  outline: none;
  border: none;
}
.btnBox .btnItem:hover {
  opacity: 0.8;
}
</style>
<style></style>
