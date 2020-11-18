<template>
  <div id="test">
    <el-row>
      <el-col :span="16" :offset="4">
        <h1>专门用于测试网络请求</h1>
      </el-col>
    </el-row>
    <el-row class="buttonBox">
      <el-col :span="16" :offset="4">
        <h3>讨论点击相关</h3>
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
        <h3>文章相关</h3>
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

          <li class="classBtnli"><el-button>修改</el-button></li>
          <li class="classBtnli"><el-button>查找</el-button></li>
        </ul>
        <h3>关注相关功能</h3>
        <ul class="class">
          <li class="classBtnli">
            <span>想要关注的用户Id：</span>
            <el-input class="normalInput" v-model="postId"></el-input>
            <el-button disabled @click="clickFollow">关注</el-button>
          </li>
          <li class="classBtnli">
            <span>想要取消关注的用户Id：</span>
            <el-input class="normalInput" v-model="postId"></el-input>
            <el-button disabled @click="clickNoFollow">取关</el-button>
          </li>
          <li class="classBtnli">
            <span>关注了别人的用户Id：</span>
            <el-input class="normalInput" v-model="postId"></el-input>
            <el-button @click="clickShowFollowee">查看某人关注的所有用户</el-button></li>
          <li class="classBtnli">
            <span>被别人关注了的用户Id：</span>
            <el-input class="normalInput" v-model="postId"></el-input>
            <el-button @click="clickShowFollower">查看关注某人的所有用户</el-button></li>
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
  setTop
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
      postId: ""
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
    clickFollow(){

    },
    // 取消关注
    clickNoFollow(){

    },
    // 查看某人关注的所有用户
    clickShowFollowee(){

    },
    // 查看某人的粉丝
    clickShowFollower(){

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
