<template>
  <div>
    <el-row>
      <el-col :span="16" :offset="4">
        <el-form
          ref="form"
          :model="form"
          label-width="160px"
          status-icon
          :rules="rules"
          class="pswForm"
        >
          <el-form-item label="旧密码" prop="oldPW" class="listItem">
            <el-input
              size="large"
              v-model="form.oldPW"
              placeholder="请输入旧密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPW" class="listItem">
            <el-input
              size="large"
              v-model="form.newPW"
              placeholder="请输入新密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="surePW" class="listItem">
            <el-input
              size="large"
              v-model="form.sureRW"
              placeholder="请确认新密码"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
// import "vue-axios";
import { getUserInfo, upLoadHeader } from "@/network/info";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    var validateOPW = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入旧密码"));
      } else {
        if (this.form.oldPW !== "") {
          this.$refs.form.validateField("oldPW");
        }
        callback();
      }
    };
    var validateNPW = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.form.newPW !== "") {
          this.$refs.form.validateField("newPW");
        }
        callback();
      }
    };
    var validateSPW = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次确认密码"));
      } else if (value !== this.form.surePW) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      form: {
        oldPW: "",
        newPW: "",
        surePW: "",
      },
      rules: {
        oldPW: [{ validator: validateOPW, trigger: "blur" }],
        newPW: [{ validator: validateNPW, trigger: "blur" }],
        surePW: [{ validator: validateSPW, trigger: "blur" }],
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    initPage() {
      getUserInfo(this.$store.state.userId)
        .then(res => {
          console.log(res);
          this.headerUrl = res.user.headerUrl;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleRemove(file, fileList) {
        var data = {
            attacMentCode: this.attachMentCode
        };
        deleteAttachment(data).then(res => {
            alert(res);
        });
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    uploadSectionFile(param) {
      var fileObj = param.file;
      // FormData 对象
      var form = new FormData();
      // 文件对象
      form.append("file", fileObj);
      // axios({
      //   method: "post",
      //   url: "http://localhost:8080/community/user/upload",
      //   headers: {
      //     "Content-Type": "multipart/form-data"
      //   },
      //   data: form
      // })
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     alert(err);
      //   });
      upLoadHeader(fileObj).then(res=>{
        console.log(res)
      })
    }
  },
  created() {},
  mounted() {},
};
</script>
<<<<<<< Updated upstream
<style scoped></style>
=======
<style scoped>
.pswForm {
  padding: 20px 0;
}
</style>
>>>>>>> Stashed changes
