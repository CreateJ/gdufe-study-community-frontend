<template>
  <div>
    <el-row>
      <el-col
        :xs="{ span: 22, offset: 1 }"
        :sm="{ span: 22, offset: 1 }"
        :md="{ span: 20, offset: 2 }"
      >
        <div class="message">{{ "激活成功，" + num + "秒内将跳转到登录页面" }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { registerConfirm } from "@/network/register";
import { LinkTo } from "@/assets/utils/baseUtil";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      num: 10
    };
  },
  watch: {},
  computed: {},
  methods: {
    LinkTo
  },
  created() {},
  mounted() {
    const { userId, code } = this.$route.params;
    // console.log(userId, code);
    registerConfirm(userId, code)
      .then(res => {
        console.log("向服务端发送确认信息！");
        console.log(res);
        const interval = setInterval(() => {
          if (this.num >= 1) {
            this.num -= 1;
          }
        }, 1000);
        const t = setTimeout(()=>{
          window.clearInterval(interval);
          this.LinkTo("/login");
        },11000)

      })
      .catch(err => {
        console.log(err);
      });

      

  }
};
</script>
<style scoped>
.message {
  width: 100%;
  text-align: center;
  font-size: 30px;
  margin: 100px auto;
  font-weight: bolder;
}
</style>
