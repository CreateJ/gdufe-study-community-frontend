<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <!-- <el-menu-item index="1">处理中心</el-menu-item> -->
    <el-menu-item index="1">
      <el-row>
        <el-col :span="1">
          <img src="~@/assets/images/header/site-icon.png" alt="" />
        </el-col>
        <el-col :span="2">
          <div >STUDY</div>
        </el-col>
      </el-row>
      
    </el-menu-item>

    <el-menu-item index="2">首页</el-menu-item>
    <el-menu-item index="3">消息</el-menu-item>
    <el-menu-item index="4">消息</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3" disabled>消息中心</el-menu-item>
    <el-menu-item index="4"
      ><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item
    >
  </el-menu>
</template>

<script>
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
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
el-menu {
  background: lightblue;
}
</style>
