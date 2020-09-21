<template>
  <el-container id="app">
    <el-header>
      <vue-header></vue-header>
    </el-header>
    <router-view></router-view>
    <el-footer>
      <vue-footer></vue-footer>
    </el-footer>
  </el-container>
</template>

<script>
import vueHeader from "@/components/vueHeader/vueHeader";
import vueFooter from "@/components/vueFooter/vueFooter";

export default {
  name: "",
  components: {
    vueHeader,
    vueFooter
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped>
@import "./assets/css/base.css";
#app {
  min-height: max-content;
}
</style>
