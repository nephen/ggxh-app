<template>
  <div class="flex flex-col min-h-screen">
    <main class="flex-1 pb-16">
      <!-- 二维码弹窗 -->
      <div v-if="showQrModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg max-w-sm text-center">
          <h3 class="text-lg font-bold mb-4">请截图后在微信中扫码打开</h3>
          <img :src="qrCodeUrl" alt="网站二维码" class="mx-auto mb-4">
          <button 
            @click="showQrModal = false"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            我知道了
          </button>
        </div>
      </div>
      <div v-else-if="showWeChatHint" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg max-w-sm text-center">
          <h3 class="text-lg font-bold mb-4">温馨提示</h3>
          <p class="mb-4">找不到该平台时，百度搜索"关关相互"即可</p>
          <p class="mb-4 text-green-600">新用户体验即赠送20阅币</p>
          <button 
            @click="showWeChatHint = false"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            我知道了
          </button>
        </div>
      </div>
      <NuxtPage :keepalive="true" />
    </main>
    
    <!-- 底部导航 -->
    <nav class="fixed bottom-0 w-full bg-white border-t">
      <div class="grid grid-cols-4 gap-2 p-2">
        <NuxtLink 
          to="/" 
          class="flex flex-col items-center text-gray-600 hover:text-primary"
          active-class="text-primary">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          <span class="text-xs">首页</span>
        </NuxtLink>

        <NuxtLink 
          to="/articles" 
          class="flex flex-col items-center text-gray-600 hover:text-primary"
          active-class="text-primary">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
          </svg>
          <span class="text-xs">阅读</span>
        </NuxtLink>

        <NuxtLink 
          to="/users" 
          class="flex flex-col items-center text-gray-600 hover:text-primary"
          active-class="text-primary">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          <span class="text-xs">互助</span>
        </NuxtLink>

        <NuxtLink 
          to="/profile" 
          class="flex flex-col items-center text-gray-600 hover:text-primary"
          active-class="text-primary">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
          <span class="text-xs">我的</span>
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { isWeChatBrowser } from '../utils/envUtils'
import { generateUrlQrWithText } from '../utils/qrCodeUtils'

const showQrModal = ref(false)
const showWeChatHint = ref(false)
const qrCodeUrl = ref('')

onMounted(async () => {
  if (!isWeChatBrowser()) {
    qrCodeUrl.value = await generateUrlQrWithText(
      window.location.href,
      '关关相互 - 公众号互助平台',
    )
    showQrModal.value = true
  } else if (!localStorage.getItem('hasShownWeChatHint')) {
    showWeChatHint.value = true
    localStorage.setItem('hasShownWeChatHint', 'true')
  }
})
</script>

<style>
/* 确保页面内容不被底部导航遮挡 */
.pb-16 {
  padding-bottom: 4rem;
}
</style>
