<template>
  <div id="app">
    <!-- 头部 -->
    <el-row class="topNav">
      <el-col :span="16" :offset="4">
        <el-container>
          <el-header>
            <vue-header></vue-header>
          </el-header>
        </el-container>
      </el-col>
    </el-row>

    <!-- 路由切换 -->
    <el-row>
      <!-- <el-col :span="16" :offset="4">
        <el-container>
          <router-view></router-view>
        </el-container>
      </el-col> -->
      <router-view></router-view>
    </el-row>

    <!-- 页尾 -->
    <el-row class="bottomFooter">
      <el-col :span="16" :offset="4">
        <el-container>
          <el-footer>
            <vue-footer></vue-footer>
          </el-footer>
        </el-container>
      </el-col>
    </el-row>
  </div>
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
.topNav {
  background-color: var(--main-color);
  background-image: linear-gradient(45deg, #80D0C7 0%, #0093E9 100%);
}
.bottomFooter {
  padding:15px 0;
  background-color: var(--main-color);
  background-image: linear-gradient(45deg, #80D0C7 0%, #0093E9 100%);
}
</style>
