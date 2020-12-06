<template>
  <div id="app">
    <el-container class="outerWrap">
      <!-- 头部 -->
      <el-header class="topNav">
        <vue-header></vue-header>
      </el-header>
      <!-- 路由切换 -->
      <el-main class="centerMain">
        <router-view v-if="isRouterAlive"></router-view>
      </el-main>
      <!-- 页尾 -->
      <el-footer class="bottomFooter">
        <vue-footer></vue-footer>
      </el-footer>
    </el-container>
    <vue-drawer></vue-drawer>
  </div>
</template>

<script>
import vueHeader from "@/components/vueHeader/vueHeader";
import vueFooter from "@/components/vueFooter/vueFooter";
import vueDrawer from "@/components/drawer/drawer";
import { LinkTo } from "@/assets/utils/baseUtil"
import { LGSC } from "@/store/mutations-types"
import { ITLG } from "@/store/actions-types"

export default {
  name: "",
  components: {
    vueHeader,
    vueFooter,
    vueDrawer
  },
  props: {},
  data() {
    return {
      isRouterAlive: true
    };
  },
  watch: {},
  computed: {},
  methods: {
    LinkTo,
    // 检查登录状态，包括检查浏览器中是否有cookies记录，有的话自动登录
    checkIsLogin() {
      if ($cookies.get("GdufeLoginId")) {
        // 如果cookie存在，则直接跳转到home页面
        const userid = this.$cookies.get("GdufeLoginId");
        // LGSC将store中的isLogin切换为true表示已登录
        // 延时跳转
        this.$store.commit(LGSC);
        this.$store.dispatch(ITLG, { userId: userid });
        // this.LinkTo("/home", "replace"); 暂时不用
      }
    },
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  },
  created() {
    // 检查之前是否登录过
    this.checkIsLogin();
  },
  mounted() {},
  provide(){
    return {
      reload: this.reload
    }
  },
};
</script>
<style scoped>
@import "./assets/css/base.css";
#app {
  height: 100%;
}
.outerWrap {
  min-height: 100%;
}
.topNav {
  /* position: fixed;
  left: 0;
  top: 0; */
  width: 100%;
  background-color: var(--main-color);
  background-image: linear-gradient(to right, #80d0c7 0%, #41B2D8 100%);
  z-index: 999;
}

.bottomFooter {
  background-color: var(--main-color);
  background-image: linear-gradient(to right, #80d0c7 0%, #41B2D8 100%);
}
</style>
