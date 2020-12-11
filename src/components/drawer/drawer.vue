<template>
  <el-drawer
    id="vueDrawer"
    title="我是标题"
    :with-header="false"
    :visible.sync="$store.state.drawerVisible"
    direction="btt"
    size="300px"
    :show-close=true
    custom-class="drawer"
    :before-close="handleClose"
  >
    <slot></slot>
  </el-drawer>
</template>

<script>
import { OPDE, CODE } from "@/store/mutations-types";
import { GRPL } from "@/store/actions-types";
import { refeshTo } from "@/assets/utils/baseUtil";

export default {
  name: "",
  components: {
    
  },
  props: {

  },
  data() {
    return {

    };
  },
  watch: {},
  computed: {},
  methods: {
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
    
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.drawer {
  width: 800px;
}
</style>
<style>
:focus {
  outline: none;
}
</style>
