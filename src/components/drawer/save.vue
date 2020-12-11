<div class="drawerBox">
      <el-row>
        <el-col :span="16" :offset="4">
          <div class="tipsBox">
            <div class="tips">点击空白处可关闭面板</div>
          </div>
        </el-col>
        <!-- 蒙版上的文字提示 -->
      </el-row>
      <el-row>
        <el-col :span="2" :offset="4">
          <img
            class="replyHeader"
            :src="$store.state.replyInfo.userHeader"
            alt=""
          />
        </el-col>
        <el-col :span="14">
          <div class="replyTo">
            发送给{{ $store.state.replyInfo.userName }}:
          </div>
          <el-input
            class="drawerTextarea"
            type="textarea"
            :rows="8"
            resize="none"
            placeholder="请输入内容"
            v-model="replyTextArea"
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="16">
          <div>
            <el-button class="sendReplyBtn" @click="handleClose">
              取消
            </el-button>
            <el-button
              class="sendReplyBtn"
              type="primary"
              @click="clickSendReply"
            >
              确认发送
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    