<template>
  <div id="personal">
    <el-row class="personalBox">
      <el-col :span="16" :offset="4">
        <div class="simpleInfo pd20">
          <img class="userHeader" :src="userHeaderUrl" alt="" />
          <ul class="namelist">
            <li class="userName">{{ userName }}</li>
            <li class="userCreateTime">注册于{{ userCreateTime }}</li>
            <li class="userIntroduction">这个人很懒，什么都没有写！</li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16" :offset="4">
        <el-tabs type="border-card">
          <el-tab-pane label="我发布的帖子">我发布的帖子</el-tab-pane>
          <el-tab-pane label="我回复的帖子">我回复的帖子</el-tab-pane>
          <el-tab-pane label="我关注的人">我关注的人</el-tab-pane>
          <el-tab-pane label="关注我的人">关注我的人</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      userHeaderUrl: "",
      userName: "",
      userCreateTime: ""
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {
    this.userHeaderUrl = this.$store.state.userInfo.user.headerUrl;
    this.userName = this.$store.state.userInfo.user.username;
    this.userCreateTime = this.$store.state.userInfo.user.createTime.split(
      "T"
    )[0];
  },
  mounted() {}
};
</script>
<style scoped>
.pd20 {
  padding: 0 20px；;
}
#personal {
  width: 100%;
  min-height: 800px;
  /* padding: 0 20px */
}
.personalBox {
  height: 135px;
  background-color: var(--main-color);
  background-image: linear-gradient(to right, #80d0c7 0%, #0093e9 100%);
}
.userHeader {
  display: inline-block;
  width: 90px;
  margin-top: 20px;
  border: 5px solid white;
  background: white;
  border-radius: 20px;
}
.namelist {
  display: inline-block;
  margin-left: 20px;
  vertical-align: top;
  color: #fff;
}
.userName {
  font-size: 30px;
}
.userCreateTime,
.userIntroduction {
  margin-top: 5px;
  font-size: 12px;
}
.userIntroduction {
  color: rgba(255, 255, 255, 0.8);
}
</style>
