<template>
  <el-dropdown
    class="HotAndNew"
    type="primary"
    placement="bottom-start"
    @command="changeOrderMode"
  >
    <span class="el-dropdown-link">
      {{ NowOrderModeText }}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item icon="el-icon-plus" command="0">
        最新讨论
      </el-dropdown-item>
      <el-dropdown-item icon="el-icon-circle-plus" command="1">
        热门讨论
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      NowOrderModeText: "热门讨论",
    };
  },
  watch: {},
  computed: {},
  methods: {
    changeOrderMode(command) {
      if (command == 0) {
        this.NowOrderModeText = "最新讨论";
      } else {
        this.NowOrderModeText = "最热讨论";
      }
      this.$emit("changeOrderMode",command)
    },
  },
  created() {},
  mounted() {}
};
</script>
<style scoped></style>
