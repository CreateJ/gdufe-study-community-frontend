<template>
  <div class="edit">
    <div class="editBody">
      <div class="editor">
        <img :src="userAvatar" alt="" />
        <div class="replyBtnBox">
          <button class="replyBtn" @click="clickReply">回复</button>
        </div>
      </div>
      <div class="editRegion">
        <slot name="editTheme"></slot>
        <div id="editToolbar" class="editToolbar"></div>
        <div class="editTextContainer">
          <div id="editText"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  name: "edit",
  data() {
    return {
      userAvatar: "",
      editor: null,
    };
  },
  props: {},
  methods: {
    clickReply() {
      if(typeof( this.$store.state.userInfo.user ) === "undefined") {
        alert("请先登录！");
        return;
      }
      let html = this.editor.txt.html();
      if(html === "") {
        alert("回复不能为空！");
        return;
      }
      console.log(html);
      //html = this.$xss.process(html);
      //console.log(html);
      this.$bus.$emit("clickReply", html);
    },
    createEditor() {
      this.editor = new E("#editToolbar", "#editText");
      this.editor.config.focus = true;
      this.editor.config.menus = [
        "head",
        "bold",
        "italic",
        "underline",
        "strikeThrough",
        "foreColor",
        "link",
        "list",
        "justify",
        "quote",
        "emoticon",
        "image",
        "video",
        "table",
        "code",
        "undo",
        "redo",
      ];
      this.editor.create();
    },
  },
  created() {
    if (this.$store.state.userInfo.user !== undefined) {
      this.userAvatar = this.$store.state.userInfo.user.headerUrl;
    }
  },
  mounted() {
    this.createEditor();
  },
};
</script>

<style scoped>
.edit {
  width: 60%;
  height: 100%;
  margin: auto;
  padding: 10px 10px 0 10px;
}
.editBody {
  display: flex;
  width: 100%;
  height: 100%;
}
.editor {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
.editor img {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.replyBtnBox {
  margin-top: 20px;
  text-align: center;
}
.replyBtn {
  color: #fff;
  padding: 5px 20px;
  background-color: var(--main-color);
  border: 1px solid var(--main-color);
  box-shadow: 0 0 8px 2px rgb(233, 233, 233);
  cursor: pointer;
}
.replyBtn:hover {
  opacity: .8;
}
.editRegion {
  width: 0;
  flex: 1;
  height: 95%;
  display: flex;
  flex-direction: column;
}
.editToolbar {
  font-size: 14px;
  border: 1px solid #ccc;
}
.editTextContainer {
  flex: 1;
  height: 0;
  border: 1px solid #ccc;
  margin-top: -1px;
}
.w-e-text-container {
  height: 100%;
  overflow: auto;
}
.editTextContainer /deep/ .w-e-text {
  min-height: 0!important;
}
</style>