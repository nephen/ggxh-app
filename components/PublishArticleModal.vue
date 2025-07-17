<template>
  <div 
    v-if="visible" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
  >
    <div class="bg-white rounded-xl p-8 w-full max-w-md shadow-lg">
      <h3 class="text-2xl font-bold mb-6 text-gray-800">发布文章</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">文章链接</label>
          <input 
            v-model="article.link" 
            type="text" 
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入文章链接"
            @blur="encodeLink"
          >
        </div>
        <div>
          <div class="flex items-center justify-between mb-1">
            <label class="block text-sm font-medium text-gray-700">文章标题</label>
            <button 
              @click="fetchTitle"
              type="button"
              class="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              :disabled="!article.link || isFetching"
            >
              <span v-if="isFetching">获取中...</span>
              <span v-else>自动获取</span>
              <svg v-if="isFetching" class="animate-spin ml-1 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </button>
          </div>
          <input 
            v-model="article.title" 
            type="text" 
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入文章标题"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">需要阅读次数</label>
          <input 
            v-model.number="article.requiredReads" 
            type="number" 
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入需要阅读的次数"
            min="1"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">阅读需求</label>
          <div class="flex space-x-6">
            <label class="inline-flex items-center">
              <input type="radio" v-model="article.requirement" value="仅阅读" class="form-radio text-blue-600">
              <span class="ml-2 text-gray-700">仅阅读</span>
            </label>
            <label class="inline-flex items-center">
              <input type="radio" v-model="article.requirement" value="点在看" class="form-radio text-blue-600">
              <span class="ml-2 text-gray-700">点在看</span>
            </label>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">阅读来源（可多选）</label>
          <div class="grid grid-cols-2 gap-3">
            <label class="inline-flex items-center">
              <input type="checkbox" v-model="article.sources" value="会话" class="form-checkbox text-blue-600">
              <span class="ml-2 text-gray-700">会话</span>
            </label>
            <label class="inline-flex items-center">
              <input type="checkbox" v-model="article.sources" value="好友转发" class="form-checkbox text-blue-600">
              <span class="ml-2 text-gray-700">好友转发</span>
            </label>
            <label class="inline-flex items-center">
              <input type="checkbox" v-model="article.sources" value="朋友圈" class="form-checkbox text-blue-600">
              <span class="ml-2 text-gray-700">朋友圈</span>
            </label>
            <label class="inline-flex items-center">
              <input type="checkbox" v-model="article.sources" value="历史图文" class="form-checkbox text-blue-600">
              <span class="ml-2 text-gray-700">历史图文</span>
            </label>
            <label class="inline-flex items-center">
              <input type="checkbox" v-model="article.sources" value="微信搜索" class="form-checkbox text-blue-600">
              <span class="ml-2 text-gray-700">微信搜索</span>
            </label>
            <label class="inline-flex items-center">
              <input type="checkbox" v-model="article.sources" value="菜单" class="form-checkbox text-blue-600">
              <span class="ml-2 text-gray-700">菜单</span>
            </label>
          </div>
        </div>
        <div class="mt-4 p-4 bg-gray-50 rounded-md text-sm text-gray-600">
          提示：阅豆小于10后文章将不展示，如需【超级置顶】或顶文章，请移步至我的文章
        </div>
      </div>
      <div class="flex justify-end space-x-4 mt-6">
        <button 
          @click="$emit('cancel')" 
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
        >
          取消
        </button>
        <button 
          @click="$emit('submit', article)" 
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          :disabled="!isFormValid"
          :class="{'opacity-50 cursor-not-allowed': !isFormValid}"
        >
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { authFetch, authNuxtFetch } from '../utils/fetchUtils';

const props = defineProps({
  visible: Boolean,
  article: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['cancel', 'submit']);

const isFormValid = computed(() => {
  return props.article.link && 
         props.article.title && 
         props.article.requiredReads > 0 &&
         props.article.requirement &&
         props.article.sources.length > 0
});

const isFetching = ref(false);

async function fetchTitle() {
  if (!props.article.link || isFetching.value) return;
  
  isFetching.value = true;
  try {
    const response = await authNuxtFetch('/api/fetch-title', {
      method: 'POST',
      body: { url: props.article.link }
    })
    
    if (response.status === 200) {
      props.article.title = response.title
    } else if (response.status === 404) {
      console.warn('未找到标题:', response.message)
      alert('未找到文章标题，请手动输入')
    } else {
      console.error('获取标题失败:', response.message)
      alert('自动获取标题失败，请手动输入')
    }
  } catch (error) {
    console.error('请求失败:', error)
    alert('请求失败，请手动输入标题')
  } finally {
    isFetching.value = false;
  }
}

const encodeLink = () => {
  if (props.article.link) {
    try {
      // 确保链接有协议前缀
      let url = props.article.link.trim();
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      
      // 编码URL
      const encodedUrl = encodeURI(url);
      props.article.link = encodedUrl;
    } catch (error) {
      console.error('URL编码失败:', error);
    }
  }
}
</script>