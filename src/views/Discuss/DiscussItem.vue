<template>
  <div class="discussItem">
    <ul class="userInfo">
      <li class="userHeader"><img :src="postman.headerUrl" alt="" /></li>
      <li class="userName">{{ postman.username }}</li>
      <li class="createTime">{{ content.createTime | cutTime }}</li>
      <li class="timeDescribe"><slot name="timeDescribe">编辑</slot></li>
    </ul>
    <div class="content">
      <slot name="contentHead"></slot>
      <div class="detail" v-html="content.content"></div>
    </div>
    <ul class="replyBtnBox clearfix">
      <li title="点赞">
        <a href="#" @click="clickLike">
          <img
            class="icon"
            :src="
              likeStatus == 1
                ? require('@/assets/images/icons/love_red.png')
                : require('@/assets/images/icons/love_grey.png')
            "
            alt="heart"
            @click="clickLike(type, content.id, content.userId, postId)"
          />
          <span class="likeCount" v-show="likeCount != 0">{{ likeCount }}</span>
        </a>
      </li>
      <li title="回复">
        <a
          href="#"
          @click="
            clickReply(
              postman.id, //targetId
              content.id, //entityId
              type //entityType
            )
          "
        >
          <img class="icon" src="@/assets/images/icons/reply.png" alt="reply" />
          <span class="replyCount" v-show="replyCount != 0">{{
            replyCount
          }}</span>
        </a>
      </li>
    </ul>
    <div v-for="(item, index) in replies" :key="index">
      <discuss-item
        :postman="item.user"
        :content="item.comment"
        :replies="item.replies"
        :replyCount="item.replyCount"
        :likeStatus="item.likeStatus"
        :likeCount="item.likeCount"
        :type="2"
        :postId="postId"
      >
        <template v-slot:timeDescribe>回复</template>
        <template v-slot:contentHead>
          <el-tooltip
            class="target"
            effect="light"
            :content="content.content | replyTips"
            placement="top-start"
          >
            <div>
              <img
                class="icon"
                src="@/assets/images/icons/reply.png"
                alt="reply"
              />
              <span>{{ postman.username }}</span>
            </div>
          </el-tooltip>
        </template>
      </discuss-item>
    </div>
  </div>
</template>

<script>
import { sendLike } from "@/network/discuss";
import { LinkTo,refeshTo } from "@/assets/utils/baseUtil";
import { OPDE, CODE, URRI } from "@/store/mutations-types";
import { GRPI } from "@/store/actions-types";
export default {
  name: "DiscussItem",
  props: {
    postman: {
      type: Object,
      default() {
        return {};
      },
    },
    content: {
      type: Object,
      default() {
        return {};
      },
    },
    replies: {
      type: Array,
      default() {
        return [];
      },
    },
    type: {
      type: Number,
      default: 1,
    },
    replyCount: 0,
    likeStatus: 0,
    likeCount: 0,
    postId: "",
  },
  filters: {
    replyTips(value) {
      return "原文：" + value;
    },
    cutTime(value) {
      if (value !== undefined) {
        if (value.indexOf("T") != -1) {
          return value.split("T")[0] + " " + value.split("T")[1].split(".")[0];
        }
      }
      return value;
    },
  },
  methods: {
    LinkTo,
    refeshTo,
    clickLike(entityType, entityId, entityUserId, postId) {
      if (typeof this.$store.state.userInfo.user === "undefined") {
        alert("请先登录！");
        return;
      }
      let _this = this;
      // 传入参数 entityType:实体类型;entityId:实体id;entityUserId:实体对应的用户id;postId:文章对应id;
      sendLike(entityType, entityId, entityUserId, postId)
        .then((res) => {
          _this.$bus.$emit("refreshData");
          console.log("点赞成功！");
          // _this.refeshTo(
          //   "/discuss/" + _this.$store.state.replyRequestInfo.postId,
          //   "replace"
          // );
        })
        .catch((err) => {
          console.log("点赞出错了！");
          console.log(err);
        });
    },
    clickReply(id, entityId, entityType) {
      if (typeof this.$store.state.userInfo.user === "undefined") {
        alert("请先登录！");
        return;
      }
      this.$store.commit(OPDE);
      // 请求并更新，当前回复的用户信息，用于显示头像等
      let postId = this.$route.params.postId; // 获取当前文章id
      console.log(postId);
      let payload = {
        userId: id,
      };
      let replyRequestInfo = {
        entityId,
        entityType,
        postId,
        targetId: id,
      };
      this.$store.commit(URRI, replyRequestInfo);
      this.$store.dispatch(GRPI, payload);
    },
  },
};
</script>

<style scoped>
.discussItem {
  margin-top: 10px;
}
.userInfo {
  display: flex;
  align-items: center;
  padding-bottom: 4px;
  border-bottom: 1px solid #ccc;
}
.userInfo li {
  margin-right: 8px;
}
.userHeader {
  width: 20px;
  height: 20px;
}
.userHeader img {
  width: 20px;
  height: 20px;
  border-radius: 3px;
}
.userName {
  font-weight: bolder;
  font-size: 16px;
}
.createTime,
.timeDescribe {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
}
.content {
  font-size: 16px;
  padding: 10px 0;
}
.replyBtnBox li {
  float: right;
  margin-left: 15px;
}
.icon {
  width: 18px;
  height: 18px;
}
.likeCount,
.replyCount {
  font-size: 14px;
  color: #777;
  vertical-align: top;
}
.target {
  display: inline-block;
  background-color: rgb(213, 236, 233);
  border-radius: 6px;
  padding: 2px 4px;
  font-size: 14px;
}
.target span {
  color: #777;
  vertical-align: top;
}
</style>