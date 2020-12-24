<template>
  <div class="replyPost" @click="toDetail(post.id)">
    <div class="title">{{post.title}}</div>
    <div class="content">{{post.content}}</div>
    <div class="delete-btn" @click="deletePost" v-if="canDelete"><i class="el-icon-delete"></i></div>
  </div>
</template>

<script>
import { LinkTo } from "@/assets/utils/baseUtil";
export default {
  name: "MyReplyPost",
  props: {
    canDelete: false,
    post: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    LinkTo,
    deletePost() {
      this.$emit("deletePost");
    },
    toDetail(id) {
      this.LinkTo("/discuss/" + id);
    }
  }
}
</script>

<style scoped>
  .replyPost {
    position: relative;
    padding: 16px;
    border: 1px solid #eee;
    border-radius: 8px;
    margin-bottom: 18px;
    cursor: pointer;
  }
  .replyPost:hover {
    box-shadow: 0 0 4px 4px rgb(240, 255, 250);
  }
  .title{
    font-size: 18px;
    font-weight: bold;
    color: rgb(76, 183, 213);
    margin-bottom: 10px;
  }
  .content {
    color: #666;
  }
  .delete-btn {
    position: absolute;
    right: 20px;
    bottom: 10px;
  }
  .delete-btn:hover {
    color: var(--main-color);
  }
</style>