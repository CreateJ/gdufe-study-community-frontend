<template>
  <div id="home">
    <el-row class="helloBox">
      <el-col>
        <hello></hello>
      </el-col>
    </el-row>
    <el-row class="postBox">
      <el-col :span="3" :offset="4">
        <img
          :src="userHeaderUrl"
          alt=""
          class="tabHeaderUrl"
          v-if="$store.state.isLogin"
        />
        <div class="tabHeaderUrl" v-else @click="LinkTo('/login')">请登录</div>
        <div class="tabUserName">{{ userName }}</div>
        <el-button type="primary" class="tabBotton" @click="clickPublish"
          >发起讨论</el-button
        >
        <el-button type="primary" class="tabBotton">回到顶部</el-button>
      </el-col>
      <el-col :span="13">
        <dropdown @changeOrderMode="changeOrderMode"></dropdown>
        <ul class="postList">
          <home-post
            :postItem="item"
            :key="index"
            v-for="(item, index) in postDatas"
          ></home-post>
        </ul>

        <el-button
          class="LoadMore"
          type="primary"
          @click="LoadMore"
          v-if="this.postDatas.length == 10"
          >加载更多</el-button
        >
        <p class="no-more-data" v-else>到底啦~</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getIndexData, getIndexDataNew } from "@/network/home";
import { LGSC, CETP } from "@/store/mutations-types";
import { ITLG } from "@/store/actions-types";
import { LinkTo, refeshTo } from "@/assets/utils/baseUtil";
import { searchPost } from "@/network/searchPost";
import Hello from "@/views/Home/Hello";
import Dropdown from "@/views/Home/Dropdown";
import HomePost from "@/views/Home/Post";
import ScrollTop from "@/components/scroll/scrollToTop";

export default {
  name: "",
  components: {
    Hello,
    HomePost,
    Dropdown,
    ScrollTop,
  },
  props: {},
  data() {
    return {
      postDatas: [],
      currentPage: 0,
      NowOrderMode: 0, // 0代表最新 1代表最热
      userHeaderUrl: "",
      userName: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    changeOrderMode(page) {
      this.NowOrderMode = page;
      this.postDatas = [];
      this.currentPage = 0;
      getIndexDataNew(this.NowOrderMode, this.currentPage).then((res) => {
        // console.log(res);
        res.discussPosts.forEach((item) => {
          this.postDatas.push(item);
        });
      });
    },
    LoadMore() {
      this.currentPage++;
      getIndexDataNew(this.NowOrderMode, this.currentPage).then((res) => {
        res.discussPosts.forEach((item) => {
          this.postDatas.push(item);
        });
      });
    },
    LinkTo,
    refeshTo,
    clickPublish() {
      this.$store.commit(CETP);
      this.LinkTo("/editDiscuss");
    },
  },
  created() {
    // 清除可能存在的，注册留下的interval
    
    // 获取首页文章列表
    getIndexData().then((res) => {
      this.postDatas = res.discussPosts;
    });
    if (typeof (this.$store.state.userInfo.user) != "undefined") {
      this.userHeaderUrl = this.$store.state.userInfo.user.headerUrl;
      this.userName = this.$store.state.userInfo.user.username;
    }
  },
  mounted() {
    this.$bus.$on("showSearchRes", (inputString) => {
      // console.log(inputString)
      searchPost(inputString).then((res) => {
        this.postDatas = res.discussPosts;
        console.log(res);
      });
    });
  },
  beforeDestroy() {
    this.$bus.$off("searchPost");
  },
};
</script>
<style scoped>
#home {
  width: 100%;
}
.postBox {
  background: #f6f6f6;
}
.HotAndNew {
  width: 100px;
  height: 30px;
  line-height: 30px;
  color: white;
  border-radius: 5px;
  text-align: center;
  margin-top: 20px;
  background: var(--main-color);
}
.LoadMore {
  width: 100px;
  margin: 20px 0 20px 200px;
}

.no-more-data {
  padding: 20px 0;
  color: #777;
  text-align: center;
}

.el-button--primary {
  background-color: var(--main-color);
  border: 1px solid var(--main-color);
}

.tabBotton {
  display: block;
  width: 80%;
  margin: 20px;
}

.tabHeaderUrl {
  width: 80%;
  margin: 20px;
  border-radius: 20px;
  font-size: 30px;
  font-weight: bolder;
  text-align: center;
  color: #777;
  cursor: pointer;
}

.tabUserName {
  width: 80%;
  margin: 0 20px;
  text-align: center;
  font-size: 18px;
  font-weight: bolder;
}
</style>
