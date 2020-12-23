<template>
  <div id="personal">
    <el-row class="personalBox">
      <el-col
        :xs="{ span: 22, offset: 1 }"
        :sm="{ span: 22, offset: 1 }"
        :md="{ span: 20, offset: 2 }"
      >
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
      <el-col
        :xs="{ span: 22, offset: 1 }"
        :sm="{ span: 22, offset: 1 }"
        :md="{ span: 20, offset: 2 }"
      >
        <el-tabs type="border-card">
          <el-tab-pane label="我发布的帖子">我发布的帖子</el-tab-pane>
          <el-tab-pane label="我回复的帖子">我回复的帖子</el-tab-pane>
          <el-tab-pane label="我关注的人">
            <p v-if="!hasFollowee">你还没有关注的人哦~</p>
            <div v-else class="follow">
              <follow
                v-for="(item, index) in followee"
                :key="index"
                :info="item"
                class="follow-item"
              ></follow>
            </div>
          </el-tab-pane>
          <el-tab-pane label="关注我的人">
            <p v-if="!hasFollower">还没有人关注你哦~</p>
            <div v-else class="follow">
              <follow
                v-for="(item, index) in follower"
                :key="index"
                :info="item"
                class="follow-item"
              ></follow>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { showFollowee, showFollower } from "@/network/personal";
// import Follow from "./follow";
export default {
  name: "",
  components: {
    Follow,
  },
  props: {},
  data() {
    return {
      userHeaderUrl: "",
      userName: "",
      userCreateTime: "",
      followee: [],
      follower: [],
      hasFollowee: false,
      hasFollower: false,
    };
  },
  watch: {},
  computed: {},
  methods: {
    initUserInfo() {
      this.userHeaderUrl = this.$store.state.userInfo.user.headerUrl;
      this.userName = this.$store.state.userInfo.user.username;
      this.userCreateTime = this.$store.state.userInfo.user.createTime.split(
        "T"
      )[0];
      showFollowee(this.$store.state.userInfo.user.id).then(res => {
        this.followee = res.users;
        this.hasFollowee = this.followee.length != 0;
      });
      showFollower(this.$store.state.userInfo.user.id).then(res => {
        this.follower = res.users; 
        this.hasFollower = this.follower.length != 0;   
      });
    },
  },
  created() {
    this.initUserInfo();
  },
  mounted() {},
};
</script>
<style scoped>
.pd20 {
  padding: 0 20px;
}
#personal {
  width: 100%;
  min-height: 800px;
  /* padding: 0 20px */
}
.personalBox {
  height: 135px;
  background-color: var(--main-color);
  background-image: linear-gradient(to right, #80d0c7 0%, #41b2d8 100%);
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
.follow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.follow-item {
  padding: 10px;
}
</style>
