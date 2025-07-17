<template>
  <div class="container mx-auto p-0 max-w-4xl">
    <!-- 顶部统计栏 -->
    <div class="bg-purple-800 text-white p-4 flex justify-between">
      <div class="flex-1 text-center">
        <div class="text-center">阅我</div>
        <div class="border-b border-white/30 mx-auto w-24 my-1"></div>
        <div class="flex justify-center space-x-8">
          <div>
            <div>今日: {{ stats.readMe.today }}</div>
          </div>
          <div>
            <div>近一月: {{ stats.readMe.month }}</div>
          </div>
        </div>
      </div>
      <div class="flex-1 text-center">
        <div class="text-center">阅Ta</div>
        <div class="border-b border-white/30 mx-auto w-24 my-1"></div>
        <div class="flex justify-center space-x-8">
          <div>
            <div>今日: {{ stats.readTa.today }}</div>
          </div>
          <div>
            <div>近一月: {{ stats.readTa.month }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 标签页切换 -->
    <div class="flex border-b">
      <button 
        @click="activeTab = 'readMe'" 
        class="flex-1 py-4 text-center font-medium"
        :class="activeTab === 'readMe' ? 'text-purple-800 border-b-2 border-purple-800' : 'text-gray-500'"
      >
        阅我
      </button>
      <button 
        @click="activeTab = 'readTa'" 
        class="flex-1 py-4 text-center font-medium"
        :class="activeTab === 'readTa' ? 'text-purple-800 border-b-2 border-purple-800' : 'text-gray-500'"
      >
        阅Ta
      </button>
    </div>

    <!-- 阅读说明 -->
    <!-- <div class="p-4 text-sm text-gray-500 bg-gray-50">
        阅读报数、点广、在看等记录已移步至我的文章--阅读报数
    </div> -->

    <!-- 阅读列表 -->
    <div v-if="activeTab === 'readMe'">
      <div v-for="(item, index) in readMeList" :key="index" class="flex items-center p-4 border-b">
        <img :src="item.avatar || '/avatar-placeholder.png'" class="w-12 h-12 rounded-full mr-4" alt="用户头像">
        <div class="flex-1">
          <div class="font-medium">{{ item.name || `匿名用户 ${item.userId}` }}</div>
        </div>
        <div class="text-gray-500">
          阅我 <span class="text-purple-800 font-medium">{{ item.readCount }}</span> 次
        </div>
      </div>
    </div>

    <div v-if="activeTab === 'readTa'">
      <div v-for="(item, index) in readTaList" :key="index" class="flex items-center p-4 border-b">
        <img :src="item.avatar || '/avatar-placeholder.png'" class="w-12 h-12 rounded-full mr-4" alt="用户头像">
        <div class="flex-1">
          <div class="font-medium">{{ item.name || `匿名用户 ${item.userId}` }}</div>
        </div>
        <div class="text-gray-500">
          阅我 <span class="text-purple-800 font-medium">{{ item.readMeCount }}</span> 次
          阅Ta <span class="text-purple-800 font-medium">{{ item.readTaCount }}</span> 次
        </div>
      </div>
    </div>

    <!-- 底部提示 -->
    <div class="text-center text-gray-400 py-6">
      ~~~我是有底线的~~~
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../store/userStore';
import { authFetch, authNuxtFetch } from '../utils/fetchUtils';

// 获取用户存储
const userStore = useUserStore();
// 获取用户 ID
const userId = userStore.userInfo?.id;


// 活动标签页
const activeTab = ref('readMe');

// 统计数据
const stats = ref({
  readMe: {
    today: 0,
    month: 0
  },
  readTa: {
    today: 0,
    month: 0
  }
});

// 阅我列表数据
const readMeList = ref([]);

// 阅Ta列表数据
const readTaList = ref([]);

onMounted(async () => {
  try {
    // 获取阅读列表数据
    const listResponse = await authFetch(`/api/users/read-lists?userId=${userId}`);
    const listData = await listResponse.json();
    readMeList.value = listData.readMeList;
    readTaList.value = listData.readTaList;

    // 获取统计数据
    const statsResponse = await authFetch(`/api/users/read-stats?userId=${userId}`);
    const statsData = await statsResponse.json();
    
    // 确保返回数据包含必要的字段才赋值
    if (statsData?.readMe?.today !== undefined && statsData?.readMe?.month !== undefined &&
        statsData?.readTa?.today !== undefined && statsData?.readTa?.month !== undefined) {
      stats.value = statsData;
    }
  } catch (error) {
    console.error('获取数据时出错:', error);
  }
});
</script>
