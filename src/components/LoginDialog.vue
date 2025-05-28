<template>
  <el-dialog v-model="dialogVisible"
             title="用户登录"
             width="340px"
             :close-on-click-modal="false"
             @close="resetLoginForm">
    <el-form :model="loginForm"
             ref="loginFormRef"
             label-width="70px">
      <el-form-item label="用户名"
                    prop="username">
        <el-input v-model="loginForm.username"
                  autocomplete="username"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input v-model="loginForm.password"
                  type="password"
                  autocomplete="current-password"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary"
                 @click="handleLogin"
                 :loading="loginLoading">登录</el-button>
    </template>
    <div v-if="loginMsg"
         style="color:red;text-align:center;margin-top:10px;">{{ loginMsg }}</div>
  </el-dialog>
</template>
<script setup>
import { ref, watch, computed } from 'vue'
import axios from '@/api/axios'
import qs from 'qs'

const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue', 'login-success']) // 新增login-success
const loginForm = ref({ username: '', password: '' })
const loginFormRef = ref(null)
const loginLoading = ref(false)
const loginMsg = ref('')

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

async function handleLogin() {
  loginMsg.value = ''
  if (!loginForm.value.username || !loginForm.value.password) {
    loginMsg.value = '请输入用户名和密码'
    return
  }
  loginLoading.value = true
  try {
    const res = await axios.post(
      '/v1/api/login',
      qs.stringify({
        username: loginForm.value.username,
        password: loginForm.value.password,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    )
    if (res.data.code === 200) {
      // 存储用户名
      sessionStorage.setItem('username', res.data.data.username)
      // emit 通知父组件
      emit('login-success', res.data.data.username)
      emit('update:modelValue', false)
      resetLoginForm()
      // 不再刷新页面
      // window.location.reload()
    } else {
      loginMsg.value = res.data.msg || '登录失败'
    }
  } catch (e) {
    loginMsg.value = e?.response?.data?.msg || '登录请求异常'
  }
  loginLoading.value = false
}

function close() {
  emit('update:modelValue', false)
  resetLoginForm()
}
function resetLoginForm() {
  loginForm.value.username = ''
  loginForm.value.password = ''
  loginMsg.value = ''
  loginLoading.value = false
}
watch(
  () => props.modelValue,
  (val) => {
    if (!val) resetLoginForm()
  }
)
</script>