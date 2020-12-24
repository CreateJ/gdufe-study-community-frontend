<template>
  <el-row>
    <el-col
      :xs="{ span: 6, offset: 1 }"
      :sm="{ span: 6, offset: 1 }"
      :md="{ span: 6, offset: 2 }"
    >
      <ul class="logo_list" @click="LinkTo('/home')">
        <li>
          <i class="el-icon-school site_icon"></i>
        </li>
        <li>GDUFE&nbsp;COMMUNITY&nbsp;</li>
      </ul>
    </el-col>
    <el-col :xs="16" :sm="16" :md="14" class="menu_list">
      <el-input
        placeholder="快来挖掘宝藏吧！"
        v-model="searchInput"
        class="input"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchClick"
          class="search_btn"
        ></el-button>
      </el-input>

      <el-menu
        :default-active="activeIndex"
        text-color="#fff"
        active-text-color="#eee"
        background-color="#4CB7D5"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        router
      >
        <el-menu-item index="/login" v-show="!$store.state.isLogin"
          >登录</el-menu-item
        >
        <el-menu-item index="/register" v-show="!$store.state.isLogin"
          >注册</el-menu-item
        >
        <el-menu-item index="/test" v-show="$store.state.isLogin"
          >测试</el-menu-item
        >
        <el-menu-item index="/home" v-show="$store.state.isLogin"
          >首页</el-menu-item
        >
        <el-menu-item index="/message" v-show="$store.state.isLogin"
          >消息</el-menu-item
        >
        <el-submenu index="2" v-show="$store.state.isLogin">
          <template slot="title">{{ $store.state.userName }}</template>
          <el-menu-item :index="'/personal/' + $store.state.userId"
            ><i class="el-icon-user icon_profile"></i>个人空间</el-menu-item
          >
          <el-menu-item index="/info"
            ><i class="el-icon-edit icon_profile"></i>修改信息</el-menu-item
          >
          <!-- 点击退出登录将直接跳转到home，恢复至未登录状态 -->
          <el-menu-item index="/home" @click="logout">
            <i class="el-icon-switch-button icon_profile"></i
            >退出登录</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import { LinkTo, refeshTo } from "@/assets/utils/baseUtil";
import { clearLoingCookie } from "@/plugins/vue-cookies.js";
import { LGOT } from "@/store/mutations-types";
export default {
  name: "vueHeader",
  components: {},
  props: {},
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      searchInput: "",
      userId: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    LinkTo,
    refeshTo,
    logout() {
      clearLoingCookie();
      this.$store.commit(LGOT);
    },
    searchClick() {
      console.log("正在进行搜索");
      this.$bus.$emit("showSearchRes", this.searchInput);
    },
  },
  created() {
    if (typeof this.$store.state.userInfo.user != "undefined") {
      this.userId = this.$store.state.userId;
    }
  },
  mounted() {},
};
</script>
<style scoped>
.el-menu-demo {
  border: none;
}
.logo_list,
.menu_list {
  display: flex;
  align-items: center;
  height: 60px;
}
.logo_list li,
.menu_list li {
  color: #fff;
  cursor: pointer;
}
.logo_list li {
  font-size: 20px;
}
.menu_list {
  justify-content: flex-end;
}
.menu_list li {
  font-size: 16px;
}
.input {
  width: 250px;
  margin-right: 20px;
}
.search_btn:hover {
  color: #ccc;
}
.site_icon {
  font-size: 26px;
  color: #eee;
  padding-right: 10px;
}
.icon_profile {
  font-size: 16px;
  color: #fff;
  vertical-align: middle;
}
.el-menu-demo /deep/ .el-submenu__icon-arrow {
  color: #fff;
}
</style>

<style>
.el-input__inner:focus {
  border: 1px solid var(--main-color);
}
.el-submenu__title {
  font-size: 16px;
  border: none !important;
}
.el-submenu {
  position: relative;
  top: -1px;
}
.el-submenu__title:hover {
  color: #eee !important;
  background-color: transparent !important;
}
.el-menu-item {
  /* width: 10px; */
  border: none !important;
}
.el-menu-item:hover,
.el-menu-item:active,
.el-menu-item:focus {
  color: #eee !important;
  background-color: transparent !important;
  border: none !important;
}
</style>
