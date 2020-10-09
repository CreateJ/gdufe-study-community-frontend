<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    active-text-color="#eeeeee"
    router
  >
    <ul class="menu_list float_left" @click="LinkTo('/home')">
      <li>
        <i class="el-icon-school site_icon"></i>
      </li>
      <li>
        GDUFE&nbsp;COMMUNITY&nbsp;
      </li>
    </ul>

    <ul class="menu_list float_right">
      <li>
        <el-input class="searchInput" placeholder="快来挖掘宝藏吧！"></el-input>
      </li>
      <li>
        <el-button class="searchBtn" type="primary" icon="el-icon-search" plain
          >搜索</el-button
        >
      </li>
      <li v-show="!$store.state.isLogin">
        <el-menu-item index="/login">登录</el-menu-item>
      </li>
      <li v-show="!$store.state.isLogin">
        <el-menu-item index="/register">注册</el-menu-item>
      </li>
      <li v-show="$store.state.isLogin">
        <el-menu-item index="/home">首页</el-menu-item>
      </li>
      <li v-show="$store.state.isLogin">
        <el-menu-item index="/discuss">消息</el-menu-item>
      </li>
      <li v-show="$store.state.isLogin">
        <el-submenu index="2">
          <template class="navUserName" slot="title">{{
            $store.state.userName
          }}</template>
          <el-menu-item index="/personal">个人空间</el-menu-item>
          <el-menu-item index="/info">修改信息</el-menu-item>
          <el-menu-item index="/logout">退出登录</el-menu-item>
        </el-submenu>
      </li>
    </ul>
  </el-menu>
</template>

<script>
import { LinkTo } from "@/assets/utils/baseUtil"
export default {
  name: "vueFooter",
  components: {},
  props: {},
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    LinkTo,
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.el-menu-demo {
  background-color: transparent;
  border: none;
  /* padding-left: 60px; */
}
.menu_list {
  list-style: none;
  padding-left: 0;
  outline: none;
  cursor: pointer;
}
.menu_list li {
  color: #eee;
  font-size: 18px;
  display: inline-block;
  height: 60px;
  line-height: 60px;
  position: relative;
  /* top: 1px; */
}

.site_icon {
  font-size: 30px;
  line-height: 50px;
  color: #eee;
  position: relative;
  top: 6px;
}
</style>

<style>
.el-submenu__title {
  color: #eee;
  font-size: 18px;
}
.el-submenu {
  position: relative;
  top: -1px;
}
.is-opened > .el-submenu__title {
  color: white;
  background: rgba(255, 255, 255, 0.2);
}
.el-menu-item:active,
.el-menu-item:focus,
.el-menu-item:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white !important;
}
.searchInput {
  border: 0;
}
.searchBtn {
  height: 32px;
}
.searchBtn:hover {
  outline: white 1px solid;
}
</style>
