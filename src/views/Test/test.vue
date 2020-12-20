<template>
  <div id="test">
    <el-row>
      <el-col :span="16" :offset="4">
        <h1>专门用于测试网络请求</h1>
      </el-col>
    </el-row>
    <el-row class="buttonBox">
      <el-col :span="16" :offset="4">
        <h3>讨论相关功能</h3>
        <ul class="class">
          <li class="classBtnli"><el-button>点赞</el-button></li>
          <li class="classBtnli">
            <span>想要加精的讨论编号：</span>
            <el-input class="normalInput" v-model="postId"></el-input>
            <el-button @click="clickSetWonderful">加精</el-button>
          </li>
          <li class="classBtnli">
            <span>想要置顶的讨论编号：</span>
            <el-input class="normalInput" v-model="postId"></el-input>
            <el-button @click="clickSetTop">置顶</el-button>
          </li>
        </ul>
        <h3>文章相关功能</h3>
        <ul class="class">
          <li class="classBtnli">
            <span>文章标题：</span>
            <el-input class="normalInput" v-model="postTitle"></el-input>
            <span>文章内容：</span
            ><el-input class="normalInput" v-model="postContent"></el-input>
            <el-button @click="clickPublishDiscuss">发布</el-button>
          </li>
          <li class="classBtnli">
            <span>想要删除的文章编号：</span>
            <el-input class="normalInput" v-model="postId"></el-input>
            <el-button @click="clickDeleteDiscuss">删除</el-button>
          </li>
          <li class="classBtnli">
            <span>想要搜索的关键字：</span>
            <el-input class="normalInput" v-model="keyWord"></el-input>
            <el-button @click="clickSearchPost">查找</el-button>
          </li>
          <li class="classBtnli"><el-button>修改</el-button></li>
        </ul>
        <h3>关注相关功能</h3>
        <ul class="class">
          <li class="classBtnli">
            <span>想要关注的用户Id：</span>
            <el-input class="normalInput" v-model="userId"></el-input>
            <el-button @click="clickFollow">关注</el-button>
          </li>
          <li class="classBtnli">
            <span>想要取消关注的用户Id：</span>
            <el-input class="normalInput" v-model="userId"></el-input>
            <el-button @click="clickUnFollow">取关</el-button>
          </li>
          <li class="classBtnli">
            <span>我的id：</span>
            <el-input class="normalInput" v-model="userId"></el-input>
            <el-button @click="clickShowFollowees">
              查看我关注的
            </el-button>
          </li>
          <li class="classBtnli">
            <span>我的id：</span>
            <el-input class="normalInput" v-model="userId"></el-input>
            <el-button @click="clickShowFollowers">
              查看我的粉丝
            </el-button>
          </li>
        </ul>
        <h3>个人主页相关功能</h3>
        <ul class="class">
          <li class="classBtnli">
            <span>查看某人发表的文章</span>
            <el-input class="normalInput" v-model="userId"></el-input>
            <el-button @click="clickShowMyDiscussPost">
              查看
            </el-button>
          </li>
          <li class="classBtnli">
            <span>查看某人评论过的文章</span>
            <el-input class="normalInput" v-model="userId"></el-input>
            <el-button @click="clickShowMyReplyPost">
              查看
            </el-button>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="dataDisplay" :span="16" :offset="4">
        <div class="res">
          {{ result }}
        </div>
        <div class="err">
          {{ error }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  publishDiscuss,
  deleteDiscuss,
  setWonderful,
  setTop,
  showFollowees,
  showFollowers,
  searchPost,
  getMyDiscussPost,
  getMyReplyPost,
  followUser,
  unFollowUser
} from "@/network/test";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      result: "",
      error: "",
      postTitle: "",
      postContent: "",
      postId: "",
      userId: "",
      keyWord: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 加精
    clickSetWonderful() {
      // 需要获取到文章的postId
      setWonderful(this.postId)
        .then(res => {
          this.result = res;
        })
        .catch(err => {
          this.error = err;
        });
    },
    // 置顶
    clickSetTop() {
      // 需要获取到文章的postId
      setTop(this.postId)
        .then(res => {
          this.result = res;
        })
        .catch(err => {
          this.error = err;
        });
    },
    // 发布文章
    clickPublishDiscuss() {
      // 文本内容判断是否合法
      // 需要绑定两个文本框，分别为postTitle,postContent
      publishDiscuss(this.postTitle, this.postContent)
        .then(res => {
          this.result = res;
        })
        .catch(err => {
          this.error = err;
        });
    },
    //删除文章
    clickDeleteDiscuss() {
      // 需要获取到文章的postId
      deleteDiscuss(this.postId)
        .then(res => {
          this.result = res;
        })
        .catch(err => {
          this.error = err;
        });
    },

    // 关注
    clickFollow() {
      followUser(3, this.userId).then(res => {
        this.result = res;
      });
    },

    // 取消关注
    clickUnFollow() {
      unFollowUser(3, this.userId).then(res => {
        this.result = res;
      });
    },

    // 查看某人关注的所有用户
    clickShowFollowees() {
      showFollowees(this.userId).then(res => {
        this.result = res;
      });
    },

    // 查看某人的粉丝
    clickShowFollowers() {
      showFollowers(this.userId).then(res => {
        this.result = res;
      });
    },
    // 查找文章
    clickSearchPost() {
      searchPost(this.keyWord).then(res => {
        this.result = res;
      });
    },
    clickShowMyDiscussPost() {
      getMyDiscussPost(this.userId).then(res => {
        this.result = res;
      });
    },
    clickShowMyReplyPost() {
      getMyReplyPost(this.userId).then(res => {
        this.result = res;
      });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
#test {
  width: 100%;
  min-height: 800px;
  /* padding: 0 20px */
}
.buttonBox {
  background: white;
}
.classBtnli {
  margin: 10px 20px;
  display: block;
}
.res {
  background: pink;
  height: 500px;
}
.err {
  background: lightblue;
  height: 100px;
}
.normalInput {
  width: 30%;
}
</style>
