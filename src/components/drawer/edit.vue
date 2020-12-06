<template>
  <div class="edit">
    <div class="editBody">
      <div class="editor">
        <img :src="userAvatar" alt="" />
      </div>
      <div class="editRegion">
        <div class="editTheme">
          <img class="icon" src="@/assets/images/icons/reply.png" alt="reply" />
          <span>这里是帖子主题</span>
        </div>
        <div id="editText"></div>
      </div>
    </div>
    <div id="editToolbar" class="editToolbar"></div>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  name: "edit",
  data() {
    return {
      userAvatar: "",
    };
  },
  props: {},
  created() {
    if (this.$store.state.userInfo.user !== undefined) {
      this.userAvatar = this.$store.state.userInfo.user.headerUrl;
    }
  },
  mounted() {
    const editor = new E("#editToolbar", "#editText");
    editor.config.focus = true;
    editor.config.menus = [
      "head",
      "bold",
      "italic",
      "underline",
      "strikeThrough",
      "indent",
      "foreColor",
      "backColor",
      "link",
      "list",
      "justify",
      "quote",
      "emoticon",
      "image",
      "video",
      "table",
      "code",
      "splitLine",
      "undo",
      "redo",
    ];
    console.log(editor);
    editor.create();
  },
};
</script>

<style scoped>
.edit {
  width: 60%;
  height: 300px;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding: 10px 10px 0 10px;
}
.editBody {
  flex: 1;
  display: flex;
}
.editor {
  width: 200px;
  text-align: center;
}
.editor img {
  width: 100px;
  height: 100px;
  border-radius: 4px;
}
.editRegion {
  flex: 1;
}
.editToolbar {
  border: 1px solid #ccc;
}
</style>