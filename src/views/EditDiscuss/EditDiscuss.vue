<template>
  <div id="editDiscuss">
    <el-row>
      <el-col :span="16" :offset="4">
        <div>
          <div class="Title">标题</div>
          <el-input
            v-model="title"
            placeholder="请输入文章标题"
            class="inputTitle"
          >
          </el-input>
        </div>
        <div>
          <div class="Title">内容</div>
          <el-input
            type="textarea"
            v-model="content"
            placeholder="请输入文章内容"
            rows="30"
            class="inputContent"
          >
          </el-input>
        </div>
        <div class="btnBox">
          <el-button type="primary" class="btn" @click="clickPublish">
            {{ editType === "publish" ? "发布" : "重新发布" }}
          </el-button>
          <el-button type="primary" class="btn" @click="clickCancle"
            >取消</el-button
          >
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { publishDiscuss, modifyDiscuss } from "@/network/editDiscuss";
import { getPostAllInfo } from "@/network/discuss";
import { LinkTo } from "@/assets/utils/baseUtil";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      editType: "",
      title: "",
      content: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    initPage() {
      this.editType = this.$store.state.editType;
      console.log(this.editType);
      if (this.editType === "reEdit") {
        // 发送修改文章请求
        const postId = this.$store.state.reEditPostId;
        getPostAllInfo(postId).then((res) => {
          this.title = res.post.title;
          this.content = res.post.content;
        });
      }
    },
    LinkTo,
    clickPublish() {
      if (this.editType === "publish") {
        publishDiscuss(this.title, this.content)
          .then(res => {
            this.$message({
              message: "发布成功，即将跳转到首页",
              type: "success",
            });
            this.LinkTo("/home");
          })
          .catch(err => {
            console.log(err);
            this.LinkTo("/home");
          });
      }else if(this.editType === "reEdit"){
        modifyDiscuss(this.$store.state.reEditPostId, this.title,this.content).then(res => {
          this.$message({
              message: "重新发布成功，即将跳转到首页",
              type: "success",
            });
          this.LinkTo("/home");
        })
      }
    },
    clickCancle(){
      this.LinkTo("/home");
    }
  },
  created() {
    this.initPage();
  },
  mounted() {}
};
</script>
<style scoped>
#editDiscuss {
  width: 100%;
}
.Title {
  margin: 20px 0;
  font-size: 30px;
}
.inputContent {
  resize: none;
}
.btnBox {
  margin: 20px 0;
}
.btn {
  margin: 0 20px;
  float: right;
}
</style>
