<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white py-4 md:py-6">
      <div class="container mx-auto px-4 md:px-6 py-4 max-w-4xl">
        <!-- 好友统计 -->
        <div class="bg-white p-6 rounded-xl shadow-lg mb-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4">我的好友</h2>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm">总好友数</p>
              <p class="text-2xl font-bold text-blue-600">{{ totalFriends }}</p>
            </div>
          </div>
        </div>
  
        <!-- 好友列表 -->
        <div class="bg-white p-6 rounded-xl shadow-lg">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">最近好友</h3>
          <div v-if="friends.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="friend in friends" :key="friend.id" class="bg-gray-50 p-4 rounded-lg text-center">
              <img :src="friend.avatar || '/avatar-placeholder.png'" class="w-16 h-16 rounded-full mx-auto mb-2" alt="好友头像">
              <p class="font-medium text-gray-800 truncate">{{ friend.nickname || '匿名用户' }}</p>
              <p class="text-xs text-gray-500">ID: {{ friend.id }}</p>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            暂无好友
          </div>
        </div>

        <!-- 推广好友栏目 -->
        <div class="bg-white p-6 rounded-xl shadow-lg mt-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">邀请更多好友</h3>
          <p class="text-gray-600 mb-4">邀请好友加入可获得更多阅豆奖励</p>
          <NuxtLink 
            to="/promotion" 
            class="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition flex items-center justify-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
            </svg>
            生成推广链接
          </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '../store/userStore';
  import { authFetch, authNuxtFetch } from '../utils/fetchUtils';
  
  const userStore = useUserStore();
  const totalFriends = ref(0);
  const friends = ref([]);
  
  onMounted(async () => {
    try {
      const response = await authNuxtFetch('/api/friends', {
        query: {
          userId: userStore.userInfo?.id
        }
      });

      totalFriends.value = response?.total || 0;
      friends.value = response?.friends || [];
    } catch (error) {
      console.error('获取好友数据失败:', error);
    }
  });
  </script>