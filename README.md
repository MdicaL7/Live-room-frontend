# Live Room Frontend

## 项目概述
基于 Vue 3 和 Vite 构建的直播房间管理系统，包含用户登录、直播间展示、讨论区聊天、推荐列表等核心功能模块。

---

## 技术栈
- Vue 3 
- Vite 构建工具
- Axios 网络请求库
- Vue Router 路由管理
- CSS Modules 样式隔离

---

## 项目结构
```
src/
├── pages/                # 页面组件
│   ├── Home.vue            # 首页
│   └── LiveRoom.vue      # 直播间页面
├── components/           # 可复用组件
│   ├── AnchorCard.vue    # 主播卡片
│   ├── LiveRoomCard.vue  # 直播间卡片
│   ├── LoginDialog.vue   # 登录弹窗
│   ├── Navbar.vue        # 导航栏
│   └── RecommendList.vue # 推荐列表
├── api/                  # 网络请求模块
│   ├── axios.js          # Axios 实例配置
│   ├── liveRoom.js       # 直播间相关接口
│   └── user.js           # 用户相关接口
├── assets/               # 静态资源
├── router/               # 路由配置
└── main.js               # 入口文件
```

---

## 启动

### 安装依赖
```bash
npm install
```

### 开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```
---

## 功能说明
1. **用户系统**：通过 LoginDialog 实现登录功能，使用 user.js API 接口
2. **直播间管理**：LiveRoomCard 展示直播间信息，通过 liveRoom.js 进行数据交互
3. **推荐系统**：RecommendList 组件实现推荐主播列表展示
4. **路由导航**：Vue Router 管理 Home 和 LiveRoom 页面切换

---

## 功能测试路径
1. **查看回放**
进入主页 --> 点击查看回放 --> 跳转LiveRoom --> 点击播放（可测试暂停、倍速、后退）
2. **登录功能**
点击导航栏的登录按钮 --> 填写信息 --> 登录成功
测试帐号：
- bob 123123
- mike 123123
- alice 123123
- eva 123123
3. **聊天功能**
跳转LiveRoom --> 点击进入讨论区 --> 发送信息即可
可通过四个网页登录四个帐号，在推荐栏中选择两个不同的直播间，分别进入LiveRoom的讨论区来测试直播间隔离聊天

---