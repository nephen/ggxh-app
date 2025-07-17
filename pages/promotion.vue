<template>
  <div class="container mx-auto p-4 max-w-4xl">
    <h2 class="text-xl font-bold mb-6">收藏推广</h2>
    
    <!-- 提示信息 -->
    <div class="bg-blue-50 p-4 rounded-lg mb-6 text-center">
      <!-- 提示信息 -->
      <div class="bg-blue-50 p-4 rounded-lg mb-2 text-center">
        <p class="text-blue-800">专属推广海报已生成！</p>
        <p class="text-blue-800 mt-2">长按保存海报，分享给更多好友</p>
      </div>
    </div>
    
    <!-- 推广海报（响应式正方形） -->
    <div class="bg-white p-4 rounded-lg shadow-sm mb-6 w-full max-w-[600px] aspect-square mx-auto">
      <template v-if="isGenerating">
        <div class="h-full flex items-center justify-center">
          <p class="text-gray-500">海报生成中...</p>
        </div>
      </template>
      <template v-else-if="posterUrl">
        <img 
          :src="posterUrl"
          class="w-full h-full object-cover"
          alt="推广海报"
          @error="handleImageError">
      </template>
      <template v-else>
        <div class="h-full flex items-center justify-center">
          <p class="text-gray-500">海报加载中...</p>
        </div>
      </template>
      
      <!-- 保存提示 -->
      <p v-if="isWeChat" class="text-center text-gray-500 text-sm mt-4">长按图片保存到相册</p>
    </div>

    <!-- 操作按钮区域 -->
    <div class="flex flex-col gap-4 mb-6">
      <button 
        @click="generateApiPoster"
        class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
      >
        生成API推广海报
      </button>
    </div>

    <!-- 推广链接复制区域 -->
    <div class="bg-white p-4 rounded-lg shadow-sm mb-6">
      <h3 class="text-lg font-semibold mb-3">推广链接</h3>
      <div class="flex items-center gap-2">
        <input 
          :value="recommendUrl" 
          readonly 
          class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        <button 
          @click="copyLink"
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          复制
        </button>
      </div>
      <p class="text-sm text-gray-500 mt-2">复制此链接分享给好友</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../store/userStore';
import { isWeChatBrowser } from '../utils/envUtils';
import { generatePromotionPoster } from '../utils/posterUtils';
import { showToast } from '../utils/toast';

// 检测微信环境
const isWeChat = ref(false)
const userId = ref('')
const posterUrl = ref('')
const isGenerating = ref(false)

// 提取推广链接生成函数
const generateRecommendUrl = (baseUrl) => {
  const randomToken = Math.random().toString(36).substring(2, 8) // 生成6位随机字符串
  return `${baseUrl}/${baseUrl.includes('?') ? '&' : '?'}recommend=${userId.value}&token=${randomToken}`
}

const getRecommendUrl = () => {
  return generateRecommendUrl(window.location.origin)
}

const recommendUrl = ref('')

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(recommendUrl.value)
    alert('链接已复制到剪贴板')
  } catch (err) {
    console.error('复制失败:', err)
  }
}

onMounted(async () => {
  // 获取用户存储
  const userStore = useUserStore();
  userId.value = userStore.userInfo?.id || ''
  isWeChat.value = isWeChatBrowser()
  
  // 生成推广链接
  recommendUrl.value = getRecommendUrl()
  
  // 页面加载时自动生成海报
  await generatePoster()
})

async function generatePoster() {
  try {
    isGenerating.value = true
    const homePageUrl = window.location.origin
    const recommendUrl = generateRecommendUrl(homePageUrl)

    posterUrl.value = await generatePromotionPoster(recommendUrl)
    showToast('默认推广海报已生成')
  } catch (error) {
    console.error('生成海报失败:', error)
  } finally {
    isGenerating.value = false
  }
}

const generateApiPoster = async () => {
  try {
    isGenerating.value = true
    const apiUrl = "https://www.ggxh168.xyz/api"
    const recommendUrl = generateRecommendUrl(apiUrl)

    posterUrl.value = await generatePromotionPoster(recommendUrl)
    showToast('API推广海报已生成')
  } catch (error) {
    console.error('生成API海报失败:', error)
  } finally {
    isGenerating.value = false
  }
}

const handleImageError = () => {
  console.error('海报加载失败')
  posterUrl.value = ''
}
</script>
