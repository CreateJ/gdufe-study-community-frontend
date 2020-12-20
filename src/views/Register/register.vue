<template>
  <div class="register">
    <div class="box">
      <div class="title">注&nbsp;&nbsp;册</div>
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
        <el-form-item label="确认密码" prop="userRW" class="listItem">
          <el-input
            size="large"
            v-model="form.userRW"
            placeholder="请确认密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="userEM" class="listItem">
          <el-input
            size="large"
            v-model="form.userEM"
            type="email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="btnBox">
            <el-button class="btnItem" type="primary" @click="registerCLick"
              >立即注册</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { LinkTo } from "@/assets/utils/baseUtil";
import { Register } from "@/network/register";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    var validateID = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
        // } else if (
        //   String(value).trim() === "" ||
        //   value.length < 6 ||
        //   value.length > 18
        // ) {
        //   callback(new Error("请输入有效的账号"));
      } else {
        callback();
      }
    };
    var validatePW = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.userRW !== "") {
          this.$refs.form.validateField("userRW");
        }
        callback();
      }
    };
    var validateRW = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次确认密码"));
      } else if (value !== this.form.userPW) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    var validateEM = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (String(value).indexOf("@") === -1) {
        callback(new Error("请确保邮箱格式正确"));
      } else {
        callback();
      }
    };
    return {
      form: {
        userID: "",
        userPW: "",
        userRW: "",
        userEM: "",
      },
      rules: {
        userID: [{ validator: validateID, trigger: "blur" }],
        userPW: [{ validator: validatePW, trigger: "blur" }],
        userRW: [{ validator: validateRW, trigger: "blur" }],
        userEM: [{ validator: validateEM, trigger: "blur" }],
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    LinkTo,
    registerCLick() {
      var _this = this;
      _this.$refs.form.validate((valid) => {
        if (!valid) return false;
        let data = {
          username: this.form.userID,
          password: this.form.userPW,
          email: this.form.userEM,
        };
        Register(data).then((res) => {
          console.log(res);
          if(res.code == "200") {
            _this.$message({
              message: res.msg,
              type: "success",
            });
            // setTimeout(() => {
            //   _this.LinkTo("/login", "replace");
            // }, 2000);
          }else {
            _this.$message({
              message: res.usernameMsg || res.passwordMsg || res.emailMsg,
              type: "error"
            })
          }
        });
      });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
.register {
  width: 100%;
}
.box {
  margin: 100px auto;
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
