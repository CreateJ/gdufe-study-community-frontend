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
      <router-view v-if="isRouterAlive"></router-view>
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
  min-height: max-content;
}
.topNav {
  background-color: var(--main-color);
  background-image: linear-gradient(to right, #80d0c7 0%, #0093e9 100%);
}
.bottomFooter {
  padding: 15px 0;
  background-color: var(--main-color);
  background-image: linear-gradient(to right, #80d0c7 0%, #0093e9 100%);
}
</style>
