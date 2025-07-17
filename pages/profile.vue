<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white py-4 md:py-6">
    <div class="container mx-auto px-4 md:px-6 py-4 max-w-4xl">
      <!-- 用户信息 -->
      <div class="flex items-center mb-6 p-4 bg-white rounded-xl shadow-lg" v-if="userInfo">
        <img 
          :src="userInfo.avatar || '/avatar-placeholder.png'" 
          class="w-16 h-16 rounded-full border-2 border-blue-600"
          alt="用户头像">
        <div class="ml-4 flex-1">
          <h2 class="text-xl font-bold text-gray-800">{{ userInfo.nickname || '未授权用户' }}</h2>
          <p class="text-gray-600 text-sm">ID: {{ userInfo.id }}</p>
          <p v-if="!userStore.authorized" class="text-red-500 text-xs mt-1">
            请先授权登录以获取完整功能
          </p>
        </div>
        <button
          v-if="isWeChat"
          @click="handleAuth"
          class="self-center text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          {{ userStore.authorized ? '重新授权' : '授权登录' }}
        </button>
      </div>
      <div v-else-if="isWeChat" class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6" role="alert">
        <p class="font-bold">加载中</p>
        <p>正在获取您的用户信息...</p>
      </div>
      <div v-else class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
        <p class="font-bold">注意</p>
        <p>未找到您的用户信息，请先 <router-link to="/register" class="text-blue-600 hover:underline">注册</router-link>。</p>
      </div>

      <!-- 阅豆充值卡片 -->
      <div class="bg-white p-6 rounded-xl shadow-lg mb-6" v-if="userInfo">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-gray-600 text-sm">当前阅豆</p>
            <p class="text-2xl font-bold text-blue-600">{{ userInfo.beanCount }}</p>
          </div>
          <div class="flex gap-2">
            <NuxtLink 
              to="/bean-transactions"
              class="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              明细
            </NuxtLink>
            <NuxtLink 
              to="/recharge" 
              class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              充值
            </NuxtLink>
            <NuxtLink 
              to="/withdraw" 
              class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
              提现
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- 奖励计划入口 -->
      <div class="bg-white p-6 rounded-xl shadow-lg mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">每日奖励任务</h3>
            <p class="text-sm text-gray-600">完成日常任务获取更多阅豆</p>
          </div>
          <NuxtLink 
            to="/rewards"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            查看奖励计划
          </NuxtLink>
        </div>
      </div>

      <!-- 功能列表 -->
      <div class="space-y-4">
        <NuxtLink 
          to="/faq" 
          class="flex items-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 duration-200">
          <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          常见问题
        </NuxtLink>

        <NuxtLink 
          to="/contact" 
          class="flex items-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 duration-200">
          <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          联系我们（商务合作/平台咨询）
        </NuxtLink>

        <NuxtLink 
          to="/promotion" 
          class="flex items-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 duration-200">
          <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
          </svg>
          收藏推广
        </NuxtLink>

        <!-- 新增在线客服按钮 -->
        <NuxtLink
          to="/chat"
          class="flex items-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 duration-200">
          <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          在线客服
        </NuxtLink>

        <!-- 新增举报记录按钮 -->
        <NuxtLink
          to="/report-records"
          class="flex items-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 duration-200">
          <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 15h14m-1 0H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v7a2 2 0 01-2 2z"/>
          </svg>
          举报记录
        </NuxtLink>

        <!-- 新增我的好友按钮 -->
        <NuxtLink
          to="/my-friends"
          class="flex items-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 duration-200">
          <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          我的好友
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../store/userStore';
import { isWeChatBrowser } from '../utils/envUtils';
import { definePageMeta } from '#imports' // 添加这行导入

// 用户信息
const userInfo = ref(null);
const userStore = useUserStore();
const isWeChat = ref(true); // 新增变量
const route = useRoute();

onMounted(async () => {
  isWeChat.value = isWeChatBrowser(); // 在mounted中赋值
  
  // 假设用户 ID 可以从某个地方获取，这里简单模拟
  let userId = -1;
  const cachedUserInfo = userStore.userInfo;
  if (cachedUserInfo) {
    // 使用缓存的用户信息
    console.log('读取缓存的用户信息:', cachedUserInfo);
    userId = cachedUserInfo.id;
    userInfo.value = cachedUserInfo; // 更新 userInfo 的值
  }
  console.log('尝试获取用户信息，ID:', userId);
  if (userId !== -1) { // 确保 userId 是有效的
    try {
      const response = await $fetch(`/api/users/${userId}`);
      if (response.status === 200) {
        console.log('获取到的用户信息:', response.data);
        userStore.setUserInfo(response.data);
        userInfo.value = response.data;
      } else {
        console.error('获取用户信息失败:', response.message);
        userStore.clearUserInfo();
      }
    } catch (error) {
      console.error('获取用户信息失败:', error);
    }
  }
});

const handleAuth = () => {
  const stat = {
    path: route.path,
    host: window.location.host,
    userInfo: true
  };
  const statJsonString = JSON.stringify(stat);
  const statBase64String = btoa(statJsonString);
  const statUrlSafeBase64String = statBase64String
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdbfd2519073ed0db&redirect_uri=http%3A%2F%2Fmsg.nephen.cn/wxMessageBoard/h5login&response_type=code&scope=snsapi_userinfo&state=${statUrlSafeBase64String}#wechat_redirect`;
};

definePageMeta({
  requiresAuth: true
});
</script>
