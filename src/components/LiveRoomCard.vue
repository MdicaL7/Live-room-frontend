<template>
  <div class="liveRoom-card" v-if="liveRoom">
    <img class="liveRoom-cover" :src="liveRoom.cover" alt="cover" />
    <div class="liveRoom-info">
      <span class="live-tag">直播</span>
      <span class="liveRoom-title">{{ liveRoom.title }}</span>
      <span class="liveRoom-time">直播时间：{{ formatTime(liveRoom.created_at) }}</span>
      <el-button type="success" size="small" @click="$emit('goto')">
        进入回看
      </el-button>
      <span class="live-status">
        {{ liveRoom.status === 2 ? "直播已结束" : "直播中" }}
      </span>
    </div>
  </div>
</template>
<script setup>
defineProps({
  liveRoom: Object
})
const formatTime = (time) => {
  if (!time) return ''
  return time.replace('T', ' ').replace('+08:00', '')
}
</script>
<style scoped>
/* 复制 .liveRoom-card, .liveRoom-cover, .liveRoom-info, .live-tag, .liveRoom-title, .liveRoom-time, .live-status 样式 */
.liveRoom-card {
  display: flex;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px #f4f4f4;
  padding: 20px;
  margin-bottom: 20px;
  align-items: center;
  gap: 28px;
}
.liveRoom-cover {
  width: 180px;
  height: 120px;
  border-radius: 8px;
  background: #e6f6fb;
}
.liveRoom-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.live-tag {
  display: inline-block;
  background: #10b98a;
  color: #fff;
  font-size: 13px;
  border-radius: 4px;
  padding: 2px 8px;
  margin-bottom: 2px;
  width: 36px;
  text-align: center;
}
.liveRoom-title {
  font-size: 21px;
  font-weight: bold;
  margin-bottom: 6px;
}
.liveRoom-time {
  color: #666;
  font-size: 13px;
}
.live-status {
  color: #999;
  font-size: 13px;
}
</style>