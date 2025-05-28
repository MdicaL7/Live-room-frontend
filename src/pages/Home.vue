<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <Navbar @login="showLogin = true" />

    <!-- 主内容区域（左右结构） -->
    <div class="main-content">
      <main class="main-left">
        <LiveRoomCard :liveRoom="liveRoom"
                      @goto="gotoLiveRoom" />
        <el-tabs class="detail-tabs">
          <el-tab-pane label="详情">
            <div class="empty-box">
              <img src="https://assets.cdn.xiaoeknow.com/decorate/pc-client/1.82.101/img/img_empty.svg"
                   style="width:120px;" />
              <div>暂无简介</div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="课堂互动"></el-tab-pane>
        </el-tabs>
      </main>
      <aside class="main-right">
        <AnchorCard />
        <RecommendList :list="recommendList"
                       @select="handleRecommendSelect" />
      </aside>
    </div>

    <!-- 登录弹窗 -->
    <LoginDialog v-model="showLogin" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getLiveRoomDetail, getLiveRoomList } from '@/api/liveRoom'
import Navbar from '@/components/Navbar.vue'
import LiveRoomCard from '@/components/LiveRoomCard.vue'
import AnchorCard from '@/components/AnchorCard.vue'
import RecommendList from '@/components/RecommendList.vue'
import LoginDialog from '@/components/LoginDialog.vue'

const liveRoom = ref(null)
const showLogin = ref(false)
const router = useRouter()
const recommendList = ref([]) // 存储直播间列表

onMounted(async () => {
  const res = await getLiveRoomDetail(3)
  if (res.data.code === 200) {
    liveRoom.value = res.data.data
  }
  // 获取直播列表数据
  const listRes = await getLiveRoomList()
  if (listRes.data.code === 200) {
    recommendList.value = listRes.data.data.slice(0, 10) // 只显示前十个
  }
})
async function handleRecommendSelect(item) {
  const res = await getLiveRoomDetail(item.id)
  if (res.data.code === 200) {
    liveRoom.value = res.data.data
  }
}

function gotoLiveRoom() {
  router.push(`/liveRoom/${liveRoom.value.id}`)
}
</script>

<style>
.home {
  min-height: 100vh;
  background: #fafbfc;
}
.main-content {
  display: flex;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  gap: 24px;
}
.main-left {
  flex: 1 1 0;
  min-width: 0;
}
.main-right {
  width: 290px;
  flex-shrink: 0;
}
.detail-tabs {
  background: #fff;
  border-radius: 12px;
  margin-top: 24px;
  min-height: 350px;
  padding: 0 30px;
  box-shadow: 0 2px 8px 0 #e6e6e6;
}
.empty-box {
  padding: 60px 0 80px 0;
  text-align: center;
  color: #8b8b8b;
}
</style>