<!-- RecommendList.vue -->
<template>
  <div class="recommend-list">
    <div class="recommend-title">相关推荐</div>
    <div class="recommend-item"
         v-for="item in list"
         :key="item.id"
         @click="handleClick(item)">
      <img class="recommend-cover"
           :src="item.cover" />
      <div class="recommend-info">
        <div class="recommend-name">{{ item.title }}</div>
        <div class="recommend-desc">{{ item.description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['select'])
defineProps({
  list: {
    type: Array,
    required: true,
  },
})
function handleClick(item) {
  emit('select', item)
}
</script>

<style scoped>
.recommend-list {
  background: #fff;
  border-radius: 10px;
  padding: 18px 14px;
}
.recommend-title {
  font-size: 16px;
  color: #222;
  font-weight: bold;
  margin-bottom: 12px;
}
.recommend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}
.recommend-item:last-child {
  border-bottom: none;
}
.recommend-cover {
  width: 42px;
  height: 42px;
  border-radius: 5px;
  background: #e6f6fb;
  object-fit: cover;
}
.recommend-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.recommend-name {
  font-size: 13px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
  font-weight: 600;
}
.recommend-desc {
  font-size: 12px;
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>