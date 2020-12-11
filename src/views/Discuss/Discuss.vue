<template>
  <div id="discuss">
    <el-container>
      <el-header>
        <el-row class="discussTitle">
          <el-col
            :xs="{ span: 22, offset: 1 }"
            :sm="{ span: 22, offset: 1 }"
            :md="{ span: 20, offset: 2 }"
          >
            <p class="title">{{ content.title }}</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row class="discussDetail">
          <el-col
            :xs="{ span: 19, offset: 1 }"
            :sm="{ span: 19, offset: 1 }"
            :md="{ span: 17, offset: 2 }"
          >
            <discuss-item
              :postman="postman"
              :content="content"
              :replies="replies"
              :replyCount="replyCount"
              :likeStatus="likeStatus"
              :likeCount="likeCount"
            ></discuss-item>

            <div
              class="replyRegion"
              v-show="$store.state.userInfo.user !== undefined"
            >
              <div class="saySomething">
                <img :src="userAvatar" alt="" />
                <span>说点什么吧...</span>
              </div>
            </div>
          </el-col>
          <el-col :span="3" class="mainBox_right">
            <button class="replyBtn_right">回复</button>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        <vue-drawer>
          <template v-slot>
            <edit>
              <template v-slot:editTheme>
                <div class="editTheme">
                  <img
                    class="icon"
                    src="@/assets/images/icons/reply.png"
                    alt="reply"
                  />
                  <span>{{ content.title }}</span>
                </div>
              </template>
            </edit>
          </template>
        </vue-drawer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { getPostAllInfo } from "@/network/discuss";
import { AddComment } from "@/network/reply";
import { LinkTo,refeshTo } from "@/assets/utils/baseUtil";
import { CODE } from "@/store/mutations-types";
import DiscussItem from "@/views/Discuss/DiscussItem";
import vueDrawer from "@/components/drawer/drawer";
import Edit from "@/components/drawer/edit";
export default {
  name: "",
  components: {
    DiscussItem,
    vueDrawer,
    Edit,
  },
  props: {},
  data() {
    return {
      postman: {},
      content: {},
      replies: [],
      replyCount: 0,
      likeCount: 0,
      likeStatus: 1,
    };
  },
  watch: {},
  computed: {
    userAvatar() {
      if (typeof( this.$store.state.userInfo.user ) != "undefined") {
        return this.$store.state.userInfo.user.headerUrl;
      }
    },
  },
  methods: {   
    AddComment,
    LinkTo,
    refeshTo,
    initDiscuss() {
      let postId = this.$route.params.postId;
      getPostAllInfo(postId).then((res) => {
        this.postman = res.user;
        this.content = res.post;
        this.replies = res.comments;
        this.replyCount = res.post.commentCount;
        this.likeCount = res.likeCount;
        this.likeStatus = res.likeStatus;
      });
    },
    sendReply(comment) {
      this.$confirm("确认发送评论？")
        .then(() => {
          // 发送请求
          // console.log(this.$store.state.replyRequestInfo);
          AddComment(this.$store.state.replyRequestInfo, comment)
            .then((res) => {
              console.log("添加成功");
              console.log(res);
            })
            .catch((err) => {
              console.log(err + "这个是err发的");
            })
            .finally(() => {
              this.$store.commit(CODE);
              this.refeshTo(
                "/discuss/" + this.$store.state.replyRequestInfo.postId,
                "replace"
              );
            });
        })
        .catch(() => {
          this.refeshTo(
            "/discuss/" + this.$store.state.replyRequestInfo.postId,
            "replace"
          );
        });
    },
  },
  created() {
    this.initDiscuss();
  },
  mounted() {
    this.$bus.$on("clickReply", res => {
      //console.log(res);
      this.sendReply(res);
    });
  },
  beforeDestory() {
    this.$bus.$off("clickReply");
  }
};
</script>
<style scoped>
#discuss {
  background: white;
}
#discuss .el-header,
#discuss .el-main {
  padding: 0;
}
.discussTitle {
  background-color: var(--main-color);
  background-image: linear-gradient(to right, #80d0c7 0%, #41b2d8 100%);
}
.title {
  color: white;
  font-size: 24px;
  font-weight: 500;
  padding: 10px 0;
}

.discussDetail {
  background: white;
}
.content {
  padding: 15px 0;
}

.mainBox_right {
  position: fixed;
  right: 100px;
  top: 200px;
  padding-left: 30px;
}
.replyBtn_right {
  color: #fff;
  letter-spacing: 0.2em;
  padding: 5px 20px;
  border: 1px solid var(--main-color);
  border-radius: 2px;
  box-shadow: 0 0 8px 2px rgb(233, 233, 233);
  background-color: var(--main-color);
}
.replyRegion {
  margin: 20px 0;
  padding: 20px 0;
  border: 2px dashed transparent;
  border-radius: 6px;
  cursor: text;
}
.replyRegion:hover {
  border: 2px dashed #ccc;
}
.saySomething {
  padding-bottom: 4px;
  border-bottom: 1px solid #ccc;
}
.saySomething img {
  width: 20px;
  height: 20px;
  border-radius: 3px;
  margin-right: 5px;
}
.saySomething span {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
  vertical-align: top;
}
.editTheme {
  padding: 5px 10px;
}
.editTheme .icon {
  width: 16px;
  vertical-align: top;
}
</style>
