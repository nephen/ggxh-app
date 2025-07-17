<template>
    <div class="container mx-auto p-4 max-w-4xl">
      <!-- 提示信息 -->
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-yellow-700">
              如若举报，请确认。若核实后发现多次乱举报，关关将对其做封禁处理。
              <span class="block mt-2 text-yellow-700 font-medium">举报后对方将返还阅豆给举报者（无敌置顶文章仅扣除对方阅豆）</span>
            </p>
          </div>
        </div>
      </div>
  
      <!-- 时间范围提示 -->
      <div class="text-gray-500 text-sm mb-4">
        本页面仅展示24小时内的阅读记录（{{ formatted24HoursAgo }} 至 {{ formattedCurrentTime }}）
      </div>
  
      <!-- 阅读记录表格 -->
      <div class="bg-white rounded-lg shadow p-4">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">阅读报数</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">阅读时间</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">举报</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <!-- 无数据时的展示 -->
              <tr v-if="filteredRecords.length === 0">
                <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">
                  暂无阅读记录
                </td>
              </tr>
  
              <!-- 有数据时的展示 -->
              <tr 
                v-else 
                v-for="(record, index) in filteredRecords" 
                :key="index" 
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ record.reportedReadCount }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatTime(record.readTime) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ record.action }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    @click="showReportConfirm(record)"
                    class="text-red-600 hover:text-red-800"
                  >
                    举报
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- 举报确认弹窗 -->
      <div 
        v-if="showReportDialog" 
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
          <h3 class="text-lg font-medium mb-4">确认举报</h3>
          <!-- 显示用户昵称和头像 -->
          <p v-if="reportedUserInfo" class="text-gray-600 mb-4">
              举报用户：<img :src="reportedUserInfo.avatar || '/avatar-placeholder.png'" alt="Avatar" class="inline-block w-8 h-8 rounded-full mr-2"> {{ reportedUserInfo.nickname || '匿名用户' }}
          </p>
          <p class="text-gray-600 mb-4">您确定要举报该用户的异常阅读行为吗？</p>
          <div class="flex justify-end space-x-3">
            <button 
              @click="showReportDialog = false"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              取消
            </button>
            <button 
              @click="confirmReport"
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              确认举报
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useUserStore } from '../store/userStore';
  import { showToast } from '../utils/toast';
  import { authFetch, authNuxtFetch } from '../utils/fetchUtils';
  
  const route = useRoute();
  const articleId = ref(route.query.articleId);
  const records = ref([]);
  const showReportDialog = ref(false);
  const selectedRecord = ref(null);
  const reportedUserInfo = ref(null);
  const userStore = useUserStore();
  
  // 格式化时间
  const formatTime = (timeStr) => {
    console.log('formatTime:', timeStr);
    const date = new Date(timeStr);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };
  
  // 24小时前时间计算
  const currentTime = new Date();
  const twentyFourHoursAgo = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000);
  
  const formattedCurrentTime = computed(() => formatTime(currentTime));
  const formatted24HoursAgo = computed(() => formatTime(twentyFourHoursAgo));
  
  // 过滤24小时内数据
  const filteredRecords = computed(() => {
    return records.value.filter(record => {
      const recordTime = new Date(record.readTime).getTime();
      return recordTime > twentyFourHoursAgo.getTime() && recordTime <= currentTime.getTime();
    });
  });
  
  const fetchArticleReports = async () => {
    if (articleId.value) {
      try {
        const response = await authFetch(`/api/articles/reports?articleId=${articleId.value}`);
        const data = await response.json();
        if (response.ok && response.status === 200) {
          records.value = data.data;
        } else {
          console.error('Error fetching article reports:', data.message);
        }
      } catch (error) {
        console.error('Error fetching article reports:', error);
      }
    }
  };
  
  onMounted(() => {
    fetchArticleReports();
  });
  
  // 点击“举报”按钮，弹出确认框
  const showReportConfirm = async (record) => {
      // 从 record 中获取 userId
      const userId = record.userId; 
      // 检查是否已经举报过
      const checkResponse = await authFetch(`/api/report-records/check?reportedUserId=${userId}&articleId=${articleId.value}`);
      const checkResult = await checkResponse.json();
      if (checkResult.hasReported) {
          // 修改为弹窗提示
          showToast('你已经举报过该用户，请勿重复举报。');
          return;
      }
      selectedRecord.value = record;
      try {
          const response = await authFetch(`/api/users/${userId}`);
          const user = await response.json();
          console.log('获取的用户信息:', user.data); // 调试用，确保获取到了用户信息
          reportedUserInfo.value = user.data;
      } catch (error) {
          console.error('获取用户信息时出错:', error);
      }
      showReportDialog.value = true;
  }
  
  // 确认举报
  const confirmReport = async () => {
      console.log('举报记录：', selectedRecord.value);
      showReportDialog.value = false;
      const userId = selectedRecord.value.userId;
      try {
          // 创建举报记录
          const reportRecordData = {
              reportedReason: '异常阅读行为', // 可以根据实际情况修改
              reportedActionTime: new Date(selectedRecord.value.readTime),
              reporterNickname: userStore.userInfo.nickname,
              reporterUserId: userStore.userInfo.id,
              reportedUserId: userId,
              articleId: articleId.value
          };
          console.log('保存的举报记录数据:', reportRecordData); // 调试用，确保数据正确
          const reportRecordResponse = await authFetch('/api/report-records', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(reportRecordData)
          });
          const reportRecordResult = await reportRecordResponse.json();
          if (reportRecordResponse.ok && reportRecordResponse.status === 200) {
              showToast('举报成功！');
              console.log('举报记录保存成功');
          } else {
              showToast('举报失败，请稍后重试。');
              console.error('保存举报记录时出错:', reportRecordResult.message);
          }
      } catch (error) {
          console.error('处理举报时出错:', error);
      }
  }
  </script>
  
  <style scoped>
  /* 可在此处根据需求自定义更多样式 */
  </style>
  