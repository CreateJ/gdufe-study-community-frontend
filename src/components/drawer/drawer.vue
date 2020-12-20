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
    :wrapperClosable=false
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
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.drawer {
  position: relative;
  width: 800px;
}
</style>
<style>
:focus {
  outline: none;
}
</style>
