<template>
  <div 
    v-if="visible" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-xl p-8 w-full max-w-md">
      <h3 class="text-xl font-bold mb-4">官注公众号</h3>
      
      <div class="space-y-4">
        <div class="p-4 bg-gray-50 rounded-lg">
          <p class="mb-2">1. 进入下方文章(不用阅读)，官住公众号</p>
          <a 
            :href="processedArticleLink" 
            target="_blank"
            class="text-blue-600 hover:underline flex items-center"
            @click="showLoadingToast"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
            点此进入该公众号文章
          </a>
        </div>

        <!-- 回复内容示例弹窗 -->
        <div 
          v-if="showReplyExample" 
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div class="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 class="text-lg font-bold mb-4">如何获取对方回复内容</h3>
            <p class="text-sm text-gray-600 mb-4">1. 进入公众号文章，点击公众号名称</p>
            <img 
              src="/guanzhu1.png" 
              alt="回复内容获取示例1" 
              class="w-full h-auto mb-2 rounded border border-gray-200"
            >
            <p class="text-sm text-gray-600 mb-4">2. 关注公众号后，点击发送消息</p>
            <img 
              src="/guanzhu2.png" 
              alt="回复内容获取示例2" 
              class="w-full h-auto mb-2 rounded border border-gray-200"
            >
            <p class="text-sm text-gray-600 mb-4">3. 进到公众号后台，复制关注公众号后自动回复的内容</p>
            <img 
              src="/guanzhu3.png" 
              alt="回复内容获取示例3" 
              class="w-full h-auto mb-2 rounded border border-gray-200"
            >
            <button 
              @click="showReplyExample = false"
              class="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              我知道了
            </button>
          </div>
        </div>
        
        <div class="p-4 bg-gray-50 rounded-lg">
          <p class="mb-2">2. 粘贴【对方回复内容】，若对方无回复内容可不官住他</p>
          <button 
            @click="showReplyExample = true"
            class="ml-2 text-blue-600 hover:text-blue-800 text-sm flex items-center mb-2"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            如何获取？
          </button>
          <textarea
            v-model="replyContent"
            class="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="请粘贴对方回复的内容，若对方无回复内容可取关他"
            rows="3"
          ></textarea>
        </div>
      </div>
      
      <div class="flex justify-end space-x-3 mt-6">
        <button
          @click="cancel"
          class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
        >
          取消
        </button>
        <button
          @click="confirm"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          确认官住
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { showToast } from '../utils/toast';

const showReplyExample = ref(false)
const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  articleLink: {
    type: String,
    required: true
  }
});

const processedArticleLink = computed(() => {
  return props.articleLink.startsWith('http') ? props.articleLink : `https://${props.articleLink}`;
});

const emit = defineEmits(['update:visible', 'confirm', 'cancel']);

const replyContent = ref('');

const confirm = () => {
  emit('confirm', replyContent.value);
  emit('update:visible', false);
  replyContent.value = '';
};

const cancel = () => {
  emit('cancel');
  emit('update:visible', false);
  replyContent.value = '';
};

const showLoadingToast = () => {
  showToast('正在跳转中，请稍候...');
};
</script>