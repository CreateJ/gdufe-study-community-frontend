<template>
  <div id="discuss">
    <el-row class="discussTitle">
      <el-col :span="16" :offset="4">
        <h2 class="title">{{ postTitle }}</h2>
        <!-- <h2>{{ postId }}</h2> -->
      </el-col>
    </el-row>
    <el-row class="mainBox">
      <el-col :span="16" :offset="4">
        <ul class="pd20 userInfo">
          <li class="userHeader"><img :src="userHeader" alt="" /></li>
          <li class="userName">{{ userName }}</li>
          <li class="createTime">{{ createTime }}编辑</li>
        </ul>
        <div class="pd20 discrib">详情描述:</div>
        <div class="pd20 content">{{ postContent }}</div>

        <ul class="replyBtnBox">
          <li>
            <a href="#" @click="clickLike">
              <img
                class="icon"
                :src="
                  likeStatus == 1
                    ? require('@/assets/images/icons/love_red.png')
                    : require('@/assets/images/icons/love_grey.png')
                "
                alt=""
              />
              <span class="likeCount">{{ likeCount }}</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              @click="
                clickReply(
                  targetId, //targetId
                  postId, //entityId
                  1 //entityType
                )
              "
            >
              <img class="icon" src="@/assets/images/icons/reply.png" alt="" />
              <span class="replyCount">{{replyCount }}</span>
            </a>
          </li>
        </ul>

        <!-- <ul class="pd20 replyList"></ul> -->
        <reply-list class="pd20" :replyListData="replyListData"></reply-list>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getPostAllInfo } from "@/network/discuss";
import replyList from "@/views/Discuss/replyList";
import { OPDE, CODE, URRI} from "@/store/mutations-types";
import { GRPI } from "@/store/actions-types";
export default {
  name: "",
  components: {
    replyList
  },
  props: {},
  data() {
    return {
      postId: "",
      postTitle: "",
      postContent: "",
      userHeader: "",
      userName: "",
      createTime: "",
      replyCount: "",
      replyListData: [],
      targetId: "",
      likeCount: 0,
      likeStatus: 1,
    };
  },
  watch: {},
  computed: {},
  methods: {
    initDiscuss() {
      this.postId = this.$route.params.postId;
      getPostAllInfo(this.postId).then(res => {
        this.postTitle = res.post.title;
        this.postContent = res.post.content;
        this.userHeader = res.user.headerUrl;
        this.userName = res.user.username;
        this.createTime = res.post.createTime;
        this.replyCount = res.post.commentCount;
        this.replyListData = res.comments;
        this.targetId = res.user.id;
        this.likeCount = res.likeCount;
        this.likeStatus = res.likeStatus
        // console.log(res)
      });
    },
    clickLike(){

    },
    clickReply(id, entityId, entityType) {
      this.$store.commit(OPDE);
      // 请求并更新，当前回复的用户信息，用于显示头像等
      let postId = this.$route.params.postId; // 获取当前文章id
      let payload = {
        userId: id,
      };
      let replyRequestInfo = {
        entityId: entityId,
        entityType: entityType,
        postId: postId,
        targetId: id,
      }
      this.$store.commit(URRI,replyRequestInfo)
      this.$store.dispatch(GRPI, payload);
    },
  },
  created() {
    this.initDiscuss();
  },
  mounted() {}
};
</script>
<style scoped>
#discuss {
  min-height: 800px;
  background: white;
  /* padding: 0 20px; */
}
.discussTitle {
  /* height: 80px; */
  background-color: var(--main-color);
  background-image: linear-gradient(to right, #80d0c7 0%, #0093e9 100%);
}
.title {
  color: white;
  padding: 0 20px;
}
.mainBox {
  background: white;
}
.pd20 {
  padding: 0 20px;
}
.content {
  margin: 5px 0;
  font-size: 20px;
}
.userInfo {
  list-style: none;
}
.userInfo li {
  display: inline-block;
  margin-right: 5px;
}
.userHeader {
  width: 25px;
  border-radius: 3px;
}
.userHeader img {
  width: 25px;
}
.userName {
  font-weight: bolder;
  font-size: 20px;
  line-height: 20px;
}
.createTime {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
}
.discrib {
  font-size: 26px;
  font-weight: bolder;
}
.replyBtnBox {
  /* display: relative; */
  widows: 100%;
  margin: 5px 20px 0 5px;
}
.replyBtnBox li {
  /* display: inline-block; */
  float: right;
}
a,
a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
  color: black;
  margin-right: 20px;
}
.icon {
  width: 20px;
  height: 20px;
}
.likeCount,
.replyCount {
  height: 14px;
  width: 20px;
  font-size: 16px;
  color: #777;
  vertical-align: top;
}
</style>
