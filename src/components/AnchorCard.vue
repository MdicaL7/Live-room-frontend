<template>
  <div class="anchor-card">
    <img class="anchor-avatar"
         src="https://png.pngtree.com/element_our/20190603/ourmid/pngtree-user-flat-character-avatar-png-image_1442186.jpg" />
    <div class="anchor-name">网蓝悦1号</div>
    <el-button type="info"
               size="small">进店逛逛</el-button>
  </div>
</template>
<script setup></script>
<style scoped>
/* 复制 .anchor-card, .anchor-avatar, .anchor-name 样式 */
.anchor-card {
  background: #fff;
  border-radius: 10px;
  text-align: center;
  padding: 28px 0 16px 0;
  box-shadow: 0 2px 8px #f4f4f4;
  margin-bottom: 18px;
}
.anchor-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-bottom: 10px;
}
.anchor-name {
  font-size: 15px;
  color: #333;
  margin-bottom: 8px;
}
</style>