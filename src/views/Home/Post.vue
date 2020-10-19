<template>
  <li class="postItemzBox">
    <router-link :to="'/discuss/'+postItem.post.id" tag="div" push class="postItem">
      <div class="avatar"><img :src="postItem.user.headerUrl" /></div>
      <div class="postInfo">
        <div class="postInfoTitle">
          {{ title }}
        </div>
        <div class="status">
          <span class="Topping" v-show="postItem.post.type"><i class="el-icon-s-flag"></i>置顶</span>
          <span class="Boutique" v-show="postItem.post.status"><i class="el-icon-star-on"></i>精华</span>
        </div>
        <div class="postInfoContent"><span>{{postItem.post.content}}</span></div>
        <ul></ul>
      </div>
      <div class="commentBrowse">
        <ul>
          <li class="comment">
            <span><i class="el-icon-s-comment"></i></span>
            <span>{{ postItem.post.commentCount }}</span>
          </li>
          <li class="browse">
            <span><i class="el-icon-view"></i></span>
            <span>{{ score }}</span>
          </li>
        </ul>
      </div>
    </router-link>
  </li>
</template>

<script>
import {HTMLEncode,HTMLDecode} from "@/assets/utils/EncodeUtil"
export default {
  name: "",
  components: {},
  props: {
    postItem: {
      type: Object,
      Default: {}
    }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {
    score() {
      return Math.round(this.postItem.post.score);
    },
    title(){
      return HTMLDecode(this.postItem.post.title);
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped>
.postItemBox {
  width: 100%;
  border-radius: 20px;
}
.postItem {
  display: flex;
  margin-top: 10px;
  padding: 12px;
  border-radius: 10px;
}
.postItem:hover {
  background: var(--backgound-color-grey);
  cursor: pointer;
}
.avatar {
  flex: 1.5;
  vertical-align: top;
  display: inline-block;
  /* height: 40px;
  width: 40px; */
  padding-right: 10px;
}
.avatar img {
  margin-top: 5px;
  width: 80%;
  border-radius: 5px;
}
.postInfo {
  flex: 20;
  width: 100%;
  vertical-align: top;
  display: inline-block;
}
.postInfoTitle {
  font-weight: bolder;
  font-size: 16px;
  color: #111;
}
.status span {
  padding: 0 5px;
  font-size: 14px;
  border-radius: 4px;
  color: white;
}
.Topping {
  background-color: rgb(75, 147, 209);
}
.Boutique {
  background-color: rgb(243, 118, 63);
}
.postInfoContent {
  width: 500px;
  font-size: 14px;
  white-space: nowrap; 
  color: rgb(141, 141, 141);
  overflow: hidden;
  text-overflow:ellipsis;
}
.commentBrowse {
  flex: 3;
}
.browse {
  color: rgb(179, 179, 179);
}
.commentBrowse span {
  font-size: 14px;
}
</style>
