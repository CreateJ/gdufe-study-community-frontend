<template>
  <div id="home">
    <el-row class="helloBox">
      <el-col :span="16" :offset="4">
        <hello></hello>
      </el-col>
    </el-row>
    <el-row class="postBox">
      <el-col :span="3" :offset="4">这里是侧边栏</el-col>
      <el-col :span="13">
        <dropdown @changeOrderMode="changeOrderMode"></dropdown>
        <ul class="postList">
          <home-post
            :postItem="item"
            :key="index"
            v-for="(item, index) in postDatas"
          ></home-post>
        </ul>

        <el-button class="LoadMore" type="primary" @click="LoadMore"
          >加载更多</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getIndexData, getIndexDataNew } from "@/network/home";
import { LGSC } from "@/store/mutations-types"
import { ITLG } from "@/store/actions-types"
import Hello from "@/views/Home/Hello";
import Dropdown from "@/views/Home/Dropdown";
import HomePost from "@/views/Home/Post";

export default {
  name: "",
  components: {
    Hello,
    HomePost,
    Dropdown
  },
  props: {},
  data() {
    return {
      postDatas: [],
      currentPage: 0,
      NowOrderMode: 0 // 0代表最新 1代表最热
    };
  },
  watch: {},
  computed: {},
  methods: {
    changeOrderMode(page) {
      this.NowOrderMode = page;
      this.postDatas = [];
      this.currentPage = 0;
      getIndexDataNew(this.NowOrderMode, this.currentPage).then(res => {
        // console.log(res);
        res.discussPosts.forEach(item => {
          this.postDatas.push(item);
        });
      });
    },
    LoadMore() {
      this.currentPage++;
      getIndexDataNew(this.NowOrderMode, this.currentPage).then(res => {
        res.discussPosts.forEach(item => {
          this.postDatas.push(item);
        });
      });
    },
    
  },
  created() {
    // 获取首页文章列表
    getIndexData().then(res => {
      // console.log(res);
      this.postDatas = res.discussPosts;
    });

  },
  mounted() {}
};
</script>
<style scoped>
#home {
  width: 100%;
  min-height: 780px;
  /* padding: 0 20px */
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
</style>
