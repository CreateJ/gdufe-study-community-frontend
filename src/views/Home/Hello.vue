<template>
  <div class="helloBox">
    <h2 class="title">欢迎来到广财学习交流社区</h2>
    <div class="helloText">本社区完全免费提供给广财学子使用</div>
    <div class="helloText">本社区完全由<span >Alan</span>以及<span>Jamie</span>维护</div>
    <div class="helloText">任何问题均可在<span>xxxx@163.com</span>中进行反馈</div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped>
.helloBox {
  /* height: 150px; */
  text-align: center;
  padding-bottom: 15px;
}
.title {
  margin-bottom: 5px
}
.helloText {
  margin: 8px;
  font-size: 15px;
}
.helloText span{
  color: var(--main-color);
}
</style>