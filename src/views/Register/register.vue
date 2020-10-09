<template>
  <div class="register">
    <div class="box">
      <div class="title">注册</div>
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
          <div class="itemTitle">确认密码:</div>
          <el-input
            class="itemText"
            v-model="userRW"
            placeholder="请再次输入密码确认"
            show-password
          ></el-input>
        </li>
        <li class="listItem">
          <div class="itemTitle">邮箱:</div>
          <el-input
            class="itemText"
            v-model="userEM"
            placeholder="请输入邮箱"
          ></el-input>
        </li>
      </ul>
      <div class="btnBox">
        <span></span>
        <el-button type="primary" @click="sendRegister">立即注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      userID: "",
      userPW: "",
      userRW: "",
      userEM: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    sendRegister(){
      console.log(this.userID);
      console.log(this.userPW);
      console.log(this.userRW);
      console.log(this.userEM);
    }
  },
  created() {},
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
.btnBox {
  display: flex;
}
.btnBox span {
  flex: 3;
}
.btnBox el-button {
  flex: 10;
}
</style>
