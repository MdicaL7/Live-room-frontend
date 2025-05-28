<template>
  <div>
    <div class="live-room-wrap"
         v-if="liveRoom">
      <!-- 左侧视频播放区 -->
      <div class="video-area">
        <div ref="dplayerContainer"
             style="width: 100%; height: 100%;"></div>
      </div>

      <!-- 右侧互动区 -->
      <div class="side-panel">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="讲解"
                       name="explain">
            <div class="system-tip">
              系统提示：直播内容及互动评论严禁传播违法或不实信息，如有违规，均将依法采取封禁措施。严禁未成年人直播打赏。请谨慎判断，注意财产安全，以防人身或财产损失。
            </div>
            <div class="user-row">
              <img class="avatar"
                   src="https://png.pngtree.com/element_our/20190603/ourmid/pngtree-user-flat-character-avatar-png-image_1442186.jpg" />
              <span class="username">直播助手</span>
            </div>
            <el-card class="welcome-box">
              <div style="color:#3698f7;">欢迎进入直播间：</div>
              <div style="font-size:14px;">
                1. 请自行调节手机音量至合适的状态。<br />
                2. 直播界面显示讲师发布的内容，听众可在讨论区进行交流或弹幕形式查看。<br />
                3. 直播结束后，你可以随时回看全部内容。
              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="讨论"
                       name="discuss">
            <div class="chat-list">
              <div class="chat-msg"
                   v-for="(msg, idx) in messages"
                   :key="idx"
                   :class="{ 'my-msg': msg.user === username }">
                <span class="msg-user">{{ msg.user }}</span>
                <span class="msg-content">{{ msg.content }}</span>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="文件"
                       name="files">
            <div style="color:#888;">暂无文件</div>
          </el-tab-pane>
        </el-tabs>

        <!-- 聊天输入区 -->
        <div class="chat-input-area">
          <el-input v-model="inputMsg"
                    placeholder="请输入您的讨论内容"
                    size="small"
                    @keyup.enter="sendMsg"></el-input>
          <el-button type="success"
                     size="small"
                     style="margin-left: 8px"
                     @click="sendMsg">发送</el-button>
        </div>
      </div>
    </div>
    <div v-else
         class="loading-wrap">加载中...</div>
    <!-- 登录弹窗在最外层 -->
    <LoginDialog v-model="showLogin"
                 @login-success="handleLoginSuccess" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { getLiveRoomDetail } from '@/api/liveRoom'
import LoginDialog from '@/components/LoginDialog.vue'
import DPlayer from 'dplayer'

const route = useRoute()
const liveRoom = ref(null)
const activeTab = ref('explain')
const messages = ref([{ user: '直播助手', content: '欢迎大家进入直播间！' }])
const inputMsg = ref('')
const showLogin = ref(false)
const username = ref(sessionStorage.getItem('username') || '')

let socket = null
const dplayerContainer = ref(null)
let dp = null

onMounted(async () => {
  const res = await getLiveRoomDetail(route.params.id)
  if (res.data.code === 200) {
    liveRoom.value = res.data.data
    sessionStorage.setItem('roomID', liveRoom.value.id)

    // 等 DOM 真正挂载
    await nextTick()

    if (dp) dp.destroy() // 热重载或多次进入同页面时，先销毁老实例

    let realVideoUrl =
      liveRoom.value.replay_url || 'https://www.w3schools.com/html/mov_bbb.mp4'

    dp = new DPlayer({
      container: dplayerContainer.value,
      autoplay: false,
      video: {
        url: realVideoUrl,
        pic: liveRoom.value.cover,
        type: 'auto',
      },
    })

    // WebSocket连接
    const backendHost = window.location.hostname // 自动适配当前访问的 IP
    const wsUrl = `ws://${backendHost}:8080/v1/api/ws/${liveRoom.value.id}`
    socket = new WebSocket(wsUrl)
    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data)
      messages.value.push(msg)
    }
    socket.onerror = (err) => {
      console.error('WebSocket error:', err)
    }
  }
})

function sendMsg() {
  if (!username.value) {
    showLogin.value = true
    return
  }
  if (!inputMsg.value.trim()) return
  if (!socket || socket.readyState !== 1) {
    alert('WebSocket 正在连接，请稍后再试')
    return
  }
  socket.send(
    JSON.stringify({
      user: username.value,
      content: inputMsg.value,
    })
  )
  inputMsg.value = ''
}

function handleLoginSuccess(newUsername) {
  username.value = newUsername
  sessionStorage.setItem('username', newUsername)
  showLogin.value = false
}

onBeforeUnmount(() => {
  if (socket) socket.close()
  if (dp) dp.destroy()
})
</script>

<style scoped>
.live-room-wrap {
  display: flex;
  height: 100vh;
  background: #f8f9fb;
}
.video-area {
  flex: 1 1 0;
  display: flex;
  background: #222;
  position: relative;
  height: 100vh;
  min-width: 0;
  min-height: 0;
}
.side-panel {
  width: 400px;
  min-width: 340px;
  background: #fff;
  box-shadow: -2px 0 16px #ececec;
  display: flex;
  flex-direction: column;
  padding: 24px 16px 8px 16px;
}
.system-tip {
  color: #888;
  background: #f6f6f8;
  font-size: 13px;
  padding: 8px 12px;
  margin-bottom: 10px;
  border-radius: 5px;
}
.user-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
  background: #e6f0f9;
}
.username {
  font-weight: bold;
  font-size: 15px;
  color: #333;
}
.welcome-box {
  margin: 8px 0 16px 0;
}
.chat-list {
  min-height: 140px;
  max-height: 220px;
  overflow-y: auto;
  margin-bottom: 12px;
}
.chat-msg {
  margin-bottom: 7px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.my-msg {
  justify-content: flex-end;
}
.msg-user {
  color: #1989fa;
  font-weight: bold;
  margin-right: 8px;
  height: 32px;
  display: flex;
  align-items: center;
}
.my-msg .msg-user {
  color: #00b578;
}
.msg-content {
  background: #f6f6f8;
  border-radius: 16px;
  padding: 6px 14px;
  display: flex;
  align-items: center;
  font-size: 16px;
  min-height: 32px;
}
.my-msg .msg-content {
  background: #e8f8f2;
  color: #333;
}
.chat-input-area {
  display: flex;
  align-items: center;
  margin-top: 12px;
  background: #f6f6f8;
  padding: 8px 12px;
  border-radius: 8px;
}
.loading-wrap {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 18px;
}
</style>