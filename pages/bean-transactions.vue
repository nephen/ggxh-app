<template>
  <div class="container mx-auto p-4 max-w-4xl">
    <!-- 用户阅豆信息 -->
    <div class="bg-white p-6 rounded-xl shadow-lg mb-6">
      <h2 class="text-xl font-bold mb-4">我的阅豆</h2>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-2xl font-bold text-blue-600">{{ userStore.userInfo?.beanCount || 0 }}</p>
          <p class="text-sm text-gray-500">当前阅豆余额</p>
        </div>
        <NuxtLink 
          to="/recharge" 
          class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          充值阅豆
        </NuxtLink>
      </div>
    </div>

    <!-- 交易记录筛选 -->
    <div class="bg-white p-4 rounded-xl shadow-sm mb-6">
      <div class="flex space-x-2 overflow-x-auto pb-2">
        <button 
          v-for="tab in tabs" 
          :key="tab.value"
          @click="activeTab = tab.value"
          :class="['px-4 py-2 rounded-lg text-sm font-medium', 
            activeTab === tab.value ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100']">
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- 交易记录列表 -->
    <div class="space-y-3">
      <div class="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 mb-2">
        仅展示最近的50条交易记录
      </div>
      <div 
        v-if="filteredTransactions.length > 0"
        v-for="transaction in filteredTransactions" 
        :key="transaction._id"
        class="bg-white p-4 rounded-xl shadow-sm">
        <div class="flex justify-between items-start">
          <div>
            <p class="font-medium">{{ transaction.description }}</p>
            <p class="text-sm text-gray-500">{{ formatDate(transaction.createdAt) }}</p>
          </div>
          <p :class="['font-bold', transaction.type === 'income' ? 'text-green-500' : 'text-red-500']">
            {{ transaction.type === 'income' ? '+' : '-' }}{{ transaction.amount }}
          </p>
        </div>
      </div>
      <div v-else class="bg-white p-8 rounded-xl shadow-sm text-center text-gray-500">
        暂无交易记录
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '../store/userStore';
import { authFetch, authNuxtFetch } from '../utils/fetchUtils';

const userStore = useUserStore();
const activeTab = ref('all');
const transactions = ref([]);

const tabs = [
  { label: '全部记录', value: 'all' },
  { label: '收入记录', value: 'income' },
  { label: '支出记录', value: 'expense' }
];

const filteredTransactions = computed(() => {
  if (activeTab.value === 'all') return transactions.value;
  return transactions.value.filter(t => t.type === activeTab.value);
});

const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

// 获取交易记录
const fetchTransactions = async () => {
  try {
    const { data } = await authNuxtFetch(`/api/bean-transactions?userId=${userStore.userInfo?.id}`);
    transactions.value = data;
  } catch (error) {
    console.error('获取交易记录失败:', error);
  }
};

onMounted(() => {
  fetchTransactions();
});
</script>