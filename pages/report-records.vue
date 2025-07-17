<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white py-4 md:py-6">
    <div class="container mx-auto px-4 md:px-6 py-4 max-w-4xl">
      <h1 class="text-xl font-bold mb-6">举报记录</h1>
      <!-- 添加提示信息 -->
      <p class="text-gray-600 mb-3">以下是最新的 30 条举报记录。</p>
      <div v-if="reportRecords.length > 0" class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                时间
              </th>
              <th scope="col" class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                原因
              </th>
              <th scope="col" class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                操作时间
              </th>
              <th scope="col" class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                举报人
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="record in reportRecords" :key="record._id">
              <td class="px-6 py-4 whitespace-nowrap">
                <!-- 修改为格式化后的时间 -->
                {{ formatTime(record.reportedTime) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ record.reportedReason }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <!-- 修改为格式化后的时间 -->
                {{ formatTime(record.reportedActionTime) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ record.reporterNickname }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p class="text-gray-600">暂无举报记录。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../store/userStore';
import { authFetch, authNuxtFetch } from '../utils/fetchUtils';
// 引入 dayjs
import dayjs from 'dayjs';

const reportRecords = ref([]);
const userStore = useUserStore();

// 定义格式化时间的函数
const formatTime = (time) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
}

onMounted(async () => {
  const userId = userStore.userInfo?.id;
  if (userId) {
    try {
      reportRecords.value = await authNuxtFetch(`/api/report-records/${userId}`);
    } catch (error) {
      console.error('获取举报记录失败:', error);
    }
  }
});
</script>