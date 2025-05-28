<template>
  <header class="navbar">
    <div class="navbar-logo">
      <img src="https://wechatapppro-1252524126.file.myqcloud.com/appAKLWLitn7978/image/b_u_5b2225aa46488_oGKN7IvA/kxkdcblx0wlc.png"
           alt="logo" />
    </div>
    <nav class="navbar-menu">
      <a class="active">首页</a>
      <a>我的学习</a>
      <a>我的课程</a>
      <a>模考系统</a>
    </nav>
    <div class="navbar-right">
      <el-input placeholder="搜索"
                size="small"
                class="search-box" />
      <div class="user-menu">
        <span>学习记录</span>
        <span class="divider">|</span>
        <span>我的订阅</span>
      </div>
      <!-- 登录/用户名切换区 -->
      <template v-if="username">
        <el-dropdown>
          <span class="user-dropdown">
            {{ username }} <el-icon>
              <ArrowDown />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <el-button v-else
                 type="primary"
                 size="small"
                 @click="$emit('login')">登录</el-button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'

const username = ref('')

onMounted(() => {
  //username.value = localStorage.getItem('username') || ''
  username.value = sessionStorage.getItem('username') || ''
})

function logout() {
  sessionStorage.removeItem('username')
  location.reload()
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #f2f3f5;
  padding: 0 40px;
}
.navbar-logo img {
  width: 36px;
}
.navbar-menu {
  flex: 1;
  display: flex;
  gap: 32px;
  margin-left: 24px;
}
.navbar-menu a {
  color: #333;
  font-size: 16px;
  text-decoration: none;
  line-height: 60px;
}
.navbar-menu .active {
  color: #10b98a;
  font-weight: bold;
  border-bottom: 2px solid #10b98a;
}
.navbar-right {
  display: flex;
  align-items: center;
  gap: 20px;
}
.user-menu {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: normal;
  color: #333;
  gap: 8px;
}
.user-menu .divider {
  color: #333;
  font-size: 16px;
  margin: 0 4px;
}
.user-dropdown {
  font-size: 16px;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.search-box {
  width: 220px;
}
</style>