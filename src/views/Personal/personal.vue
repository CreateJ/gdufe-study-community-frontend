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
          <div
            class="follow-btn"
            v-if="!isHimself && !hasFollowed"
            @click="clickFollow"
          >
            <i class="el-icon-plus"></i> 关注
          </div>
          <div
            class="follow-btn cancel-follow-btn"
            v-if="!isHimself && hasFollowed"
            @click="clickCancelFollow"
          >
            取消关注
          </div>
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
          <el-tab-pane :label="isHimself ? '我发布的帖子' : '他发布的帖子'">
            <p v-if="myPosts.length == 0">还没有发布过帖子哦~</p>
            <my-reply-post
              v-for="(item, index) in myPosts"
              :key="index"
              :post="item.post"
              :canDelete="isHimself ? true : false"
              @deletePost="listenDeletePost(item.post.id)"
            ></my-reply-post>
          </el-tab-pane>
          <el-tab-pane :label="isHimself ? '我回复的帖子' : '他回复的帖子'">
            <p v-if="replyPosts.length == 0">还没有回复过别人的帖子哦~</p>
            <my-reply-post
              v-for="(item, index) in replyPosts"
              :key="index"
              :post="item.post"
            ></my-reply-post>
          </el-tab-pane>
          <el-tab-pane :label="isHimself ? '我关注的人' : '他关注的人'">
            <p v-if="followee.length == 0">还没有关注的人哦~</p>
            <div v-else class="follow">
              <follow
                v-for="(item, index) in followee"
                :key="index"
                :info="item.user"
                class="follow-item"
                @click.native="toHisPage(item.user.id)"
              ></follow>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="isHimself ? '关注我的人' : '关注他的人'">
            <p v-if="follower.length == 0">还没有受到关注哦~</p>
            <div v-else class="follow">
              <follow
                v-for="(item, index) in follower"
                :key="index"
                :info="item.user"
                class="follow-item"
                @click.native="toHisPage(item.user.id)"
              ></follow>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  showFollowee,
  showFollower,
  getMyDiscussPost,
  getMyReplyPost,
  getProfile,
  followUser,
  unFollowUser,
  deleteDiscuss,
} from "@/network/personal";
import { LinkTo } from "@/assets/utils/baseUtil";
import Follow from "./follow";
import MyReplyPost from "./myReplyPost";
export default {
  name: "",
  components: {
    Follow,
    MyReplyPost,
  },
  props: {},
  data() {
    return {
      userHeaderUrl: "",
      userName: "",
      userCreateTime: "",
      hasFollowed: false,
      followee: [],
      follower: [],
      myPosts: [],
      replyPosts: [],
      isHimself: true,
    };
  },
  watch: {},
  computed: {},
  methods: {
    LinkTo,
    initUserInfo(id) {
      let _this = this;
      getProfile(id).then((res) => {
        _this.userId = res.user.id;
        _this.userName = res.user.username;
        _this.userHeaderUrl = res.user.headerUrl;
        _this.userCreateTime = res.user.createTime.split("T")[0];
        _this.hasFollowed = res.hasFollowed;
      });

      showFollowee(id).then((res) => {
        console.log(res);
        _this.followee = res.users;
      });
      showFollower(id).then((res) => {
        _this.follower = res.users;
      });
      getMyDiscussPost(id).then((res) => {
        _this.myPosts = res.discussPosts;
      });
      getMyReplyPost(id).then((res) => {
        _this.replyPosts = res.replyPosts;
      });
      if (
        typeof (_this.$store.state.userInfo.user) !== "undefined" &&
        _this.$store.state.userInfo.user.id == id
      ) {
        _this.isHimself = true;
      }else {
        _this.isHimself = false;
      }
    },
    clickFollow() {
      console.log(this);
      if (typeof this.$store.state.userInfo.user == "undefined") {
        this.$message.error("请先登录");
        this.LinkTo("/login");
      } else {
        followUser(3, this.$route.params.userId).then((res) => {
          if (res.code == "200") {
            this.$message.success("关注成功！");
            this.initUserInfo();
          } else {
            this.$message.error("出错啦！请稍后再试！");
          }
        });
      }
    },
    clickCancelFollow() {
      unFollowUser(3, this.$route.params.userId).then((res) => {
        if (res.code == "200") {
          this.$message.success("取关成功！");
          this.initUserInfo();
        } else {
          this.$message.error("出错啦！请稍后再试！");
        }
      });
    },
    toHisPage(id) {
      this.initUserInfo(id);
    },
    listenDeletePost(id) {
      let _this = this;
      this.$confirm("此操作将永久删除该贴子及相关评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteDiscuss(id).then((res) => {
            if (res.code == "200") {
              this.$message.success("删除成功！");
              this.initUserInfo(_this.$route.params.userId);
            } else {
              this.$message.error("出错啦！请稍后再试！");
            }
          });
        })
        .catch(() => {});
    },
  },
  created() {},
  mounted() {
    this.initUserInfo(this.$route.params.userId);
  },
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
.follow-btn {
  position: absolute;
  right: 140px;
  top: 30px;
  width: 80px;
  height: 28px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  line-height: 28px;
  background-color: var(--main-color);
  box-shadow: 0 0 10px 2px #fff;
  border-radius: 8px;
  cursor: pointer;
}
.cancel-follow-btn {
  background-color: rgb(194, 190, 190);
  box-shadow: none;
}
</style>
