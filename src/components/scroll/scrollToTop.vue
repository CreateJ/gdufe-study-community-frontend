<template>
  <div class="scroll-btn" @click="toTop">
    <i class="el-icon-top" alt="返回顶部"></i>
  </div>
</template>

<script>
export default {
  name: "ScrollTop",
  methods: {
    toTop() {
      window.scrollTo(0, 0);
    }
  }
}
</script>

<style>
.scroll-btn {
  position: fixed;
  bottom: 100px;
  right: 40px;
  width: 40px;
  height: 40px;
  color: #FFF;
  line-height: 40px;
  text-align: center;
  background-color: var(--main-color);
  border-radius: 50%;
  cursor: pointer;
}
.scroll-btn:hover {
  opacity: .8;
}
</style>