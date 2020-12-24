<template>
  <div>
    <el-row>
      <el-col
        :xs="{ span: 22, offset: 1 }"
        :sm="{ span: 22, offset: 1 }"
        :md="{ span: 20, offset: 2 }"
      >
        <h1>修改头像</h1>
        <el-upload
          class="upload-demo"
          action="http://localhost:8080/community/user/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :http-request="uploadSectionFile"
          name="file"
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>

        <el-upload
          style="display:inline-block"
          :limit="5"
          class="upload-demo"
          ref="upload"
          action="http://localhost:8080/community/user/upload"
          :file-list="fileList"
          :http-request="uploadSectionFile"
          :auto-upload="true"
          :before-remove="handleRemove"
        >
          <el-button slot="trigger" size="small" type="primary" plain>
            选取文件
          </el-button>
        </el-upload>
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
    return {
      headerUrl: "",
      password: "",
      fileList: []
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
  mounted() {}
};
</script>
<style scoped></style>
