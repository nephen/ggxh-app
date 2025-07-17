<template>
  <div class="h-screen bg-gradient-to-b from-gray-100 to-white">
    <div class="container mx-auto h-full px-6 py-8 max-w-4xl">
      <div class="bg-white rounded-xl shadow-lg flex flex-col h-full p-6 relative">
        <!-- 面板头部 -->
        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          在线客服
        </h2>

        <!-- 消息展示区域 -->
        <div 
          ref="messagesContainer"
          class="flex-1 overflow-y-auto space-y-4 pr-4 mb-4">
          <div 
            v-for="(msg, index) in messages"
            :key="index"
            :class="msg.isUser ? 'ml-auto bg-blue-100' : 'bg-gray-100'"
            class="max-w-md p-4 rounded-lg">
            <p class="text-sm text-gray-600 mb-1">{{ msg.isUser ? '我' : '客服' }}</p>
            <p class="text-gray-800">{{ msg.text }}</p>
            <p class="text-xs text-gray-400 mt-2 text-right">{{ msg.time }}</p>
          </div>
        </div>

        <!-- 消息输入区域（固定在底部） -->
        <div class="flex gap-4 p-6 bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-10">
          <input
            v-model="newMessage"
            @keyup.enter="sendMessage"
            placeholder="输入消息..."
            class="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            @click="sendMessage"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            发送
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'

const messagesContainer = ref(null)
const messages = ref([
  {
    text: '您好！有什么可以帮您？',
    isUser: false,
    time: '11:10'
  }
])

// 监听消息变化并滚动到底部
watch(messages, async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}, { deep: true })

const newMessage = ref('')

// 发送消息
const sendMessage = () => {
  if (!newMessage.value.trim()) return
  
  messages.value.push({
    text: newMessage.value,
    isUser: true,
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  })
  
  // 模拟客服回复
  setTimeout(() => {
    messages.value.push({
      text: '已收到您的消息，客服将尽快回复。',
      isUser: false,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    })
  }, 1000)

  newMessage.value = ''
}
</script>

<style scoped>
/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100 rounded;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded hover:bg-gray-400;
}
</style>
