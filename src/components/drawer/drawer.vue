<template>
  <el-drawer
    id="vueDrawer"
    title="我是标题"
    :with-header="false"
    :visible.sync="$store.state.drawerVisible"
    direction="btt"
    size="300px"
    :before-close="handleClose"
  >
    <edit></edit>
  </el-drawer>
</template>

<script>
import { OPDE, CODE } from "@/store/mutations-types";
import { GRPL } from "@/store/actions-types";
import { AddComment } from "@/network/reply";
import { LinkTo,refeshTo } from "@/assets/utils/baseUtil";
import Edit from "./edit";

export default {
  name: "",
  components: {
    Edit
  },
  props: {

  },
  data() {
    return {
      replyTextArea: "",
      userId: "a"
    };
  },
  watch: {},
  computed: {},
  methods: {
    AddComment,
    LinkTo,
    refeshTo,
    handleClose() {
      this.$confirm("确认关闭？")
        .then(() => {
          this.$store.commit(CODE);
          this.refeshTo("/discuss/"+this.$store.state.replyRequestInfo.postId,"replace")
          // this.$router.replace("/discuss/"+this.$store.state.replyRequestInfo.postId)
        })
        .catch(_ => {
          this.refeshTo("/discuss/"+this.$store.state.replyRequestInfo.postId,"replace")
        });
    },
    clickSendReply() {
      this.$confirm("确认发送评论？")
        .then(() => {
          // 发送请求
          // console.log(this.$store.state.replyRequestInfo);
          AddComment(this.$store.state.replyRequestInfo, this.replyTextArea)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err + "这个是err发的");
            });
          this.$store.commit(CODE);
          this.refeshTo("/discuss/"+this.$store.state.replyRequestInfo.postId,"replace")
        })
        .catch(() => {
          this.refeshTo("/discuss/"+this.$store.state.replyRequestInfo.postId,"replace")
        });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.tipsBox {
  display: relative;
  width: 0;
  height: 0;
}
.tips {
  display: absolute;
  top: -200;
  font-size: 40px;
  font-weight: bolder;
  color: white;
}
.replyHeader {
  width: 100px;
  height: 100px;
  background: pink;
  margin: 10px;
  font-size: 90px;
  line-height: 90px;
  text-align: center;
  color: white;
}
.replyTo {
  border: none;
  margin: 10px 0;
  color: #777;
}
.sendReplyBtn {
  width: 45%;
  margin-top: 10px;
}
</style>
<style>
:focus {
  outline: none;
}
</style>
