<template>
  <ul id="replyList">
    <li :key="index" class="replyItem" v-for="(item, index) in replyListData">
      <el-divider content-position="left">
        <ul class="replyUserInfo">
          <li>
            <div class="replyUserHeader">
              <img :src="item.user.headerUrl" :alt="item.user.username" />
            </div>
          </li>
          <li>
            <div class="replyUserNamett">{{ item.user.username }}</div>
          </li>
          <li>
            <div class="replyUserReplyTime">
              回复时间:{{ cutTime(item.comment.createTime) }}
            </div>
          </li>
        </ul>
      </el-divider>
      <div class="replyContent">{{ item.comment.content }}</div>
      <ul class="replyBtnBox">
        <li>
          <a href="#" @click="clickLike">
            <img
              class="icon"
              :src="
                item.likeCount > 0
                  ? require('@/assets/images/icons/love_red.png')
                  : require('@/assets/images/icons/love_grey.png')
              "
              alt=""
            />
            <span class="likeCount">{{ item.likeCount }}</span>
          </a>
        </li>
        <li>
          <a href="#" @click="clickReply(item.user.id,item.comment.id,2)"
            ><img class="icon" src="@/assets/images/icons/reply.png" alt="" />
            <span class="replyCount">{{ item.replyCount }}</span>
          </a>
        </li>
      </ul>

      <!-- 子评论 -->
      <ul class="replyReplys">
        <li
          class="replyItem"
          :key="reply.reply.id"
          v-for="reply in item.replys"
        >
          <el-divider content-position="left">
            <ul class="replyUserInfo">
              <li>
                <div class="replyUserHeader">
                  <img :src="reply.user.headerUrl" :alt="reply.user.username" />
                </div>
              </li>
              <li>
                <div class="replyUserNamett">{{ reply.user.username }}</div>
              </li>
              <li>
                <div class="replyUserReplyTime">
                  回复时间:{{ cutTime(reply.reply.createTime) }}
                </div>
              </li>
            </ul>
          </el-divider>
          <div class="replyContent">{{ reply.reply.content }}</div>
          <ul class="replyBtnBox">
            <li>
              <a href="#" @click="clickLike">
                <img
                  class="icon"
                  :src="
                    item.likeStatus == 1
                      ? require('@/assets/images/icons/love_red.png')
                      : require('@/assets/images/icons/love_grey.png')
                  "
                  alt=""
                />
                <span class="likeCount">{{ reply.likeCount }}</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                @click="
                  clickReply(
                    reply.user.id, //targetId
                    reply.reply.id, //entityId
                    2,//entityType
                  )
                "
              >
                <img
                  class="icon"
                  src="@/assets/images/icons/reply.png"
                  alt=""
                />
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { OPDE, CODE, URRI} from "@/store/mutations-types";
import { GRPI } from "@/store/actions-types";
export default {
  name: "",
  components: {},
  props: {
    replyListData: { type: Array, default: [] }
  },
  data() {
    return {
      hoverIndex: 0,
      hover: false,
      showReplyPanel: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    cutTime(timeString) {
      return (
        timeString.split("T")[0] + " " + timeString.split("T")[1].split(".")[0]
      );
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
    clickLike(id) {}
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.replyList li {
  display: relative;
}
.replyItem {
  margin: 50px 0;
}
.replyUserHeader,
.replyUserHeader img {
  width: 25px;
  height: 25px;
}
.replyUserInfo {
  /* border-top: 1px solid #eee; */
  padding: 10px 0;
}
.replyUserInfo li {
  display: inline-block;
  vertical-align: middle;
}
.replyUserName {
  height: 25px;
  line-height: 25px;
  font-size: 20px;
}
.replyUserReplyTime {
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
}
.replyContentTitle {
  font-size: 24px;
  font-weight: bolder;
  margin-bottom: 5px;
}
.replyContent {
  padding-left: 40px;
  font-size: 18px;
}

.replyBtnBox {
  /* display: relative; */
  widows: 100%;
  margin-top: 5px;
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
.replyReplys {
  padding: 5px 0 5px 40px;
}
</style>
