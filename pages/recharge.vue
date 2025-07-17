<template>
  <div class="container mx-auto p-4 max-w-4xl">
    <h2 class="text-xl font-bold mb-6">阅豆充值</h2>
    
    <!-- 充值选项 -->
    <div class="bg-white p-6 rounded-lg shadow-sm mb-6">
      <div class="mb-4">
        <p class="text-lg font-medium mb-2">选择充值金额</p>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div 
            v-for="(option, index) in rechargeOptions" 
            :key="index"
            @click="selectedOption = option"
            :class="['border rounded-lg p-4 text-center cursor-pointer transition-colors', 
              selectedOption === option ? 'border-primary bg-primary bg-opacity-10' : 'border-gray-200 hover:border-primary']">
            <p class="font-bold text-lg">{{ option.beans }} 阅豆</p>
            <p class="text-primary font-medium">¥{{ option.price }}</p>
          </div>
        </div>
      </div>
      
      <!-- 已选择的充值信息 -->
      <div v-if="selectedOption" class="border-t border-gray-100 pt-4 mt-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-gray-600">充值数量</span>
          <span class="font-medium">{{ selectedOption.beans }} 阅豆</span>
        </div>
        <div class="flex justify-between items-center mb-4">
          <span class="text-gray-600">支付金额</span>
          <span class="font-medium text-primary">¥{{ selectedOption.price }}</span>
        </div>
      </div>
    </div>
    
    <!-- 提示信息 -->
    <div class="bg-blue-50 p-4 rounded-lg mb-6">
      <p class="text-sm text-blue-800">充值金额概不退款，充值有问题，请联系客服。</p>
      <NuxtLink 
        to="/chat"
        class="text-primary text-sm font-medium mt-2 flex items-center"
      >
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
        </svg>
        点此联系客服
      </NuxtLink>
    </div>
    
    <!-- 充值按钮 -->
    <button 
      @click="handleRecharge"
      :disabled="!selectedOption"
      :class="['w-full py-3 rounded-lg font-medium text-white transition-colors', 
        selectedOption ? 'bg-primary hover:bg-primary-dark' : 'bg-gray-300 cursor-not-allowed']">
      立即充值
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { definePageMeta } from '#imports' // 添加这行导入
import { useUserStore } from '../store/userStore';
import { showToast } from '../utils/toast';
import { authFetch, authNuxtFetch } from '../utils/fetchUtils';
// 获取用户存储
const userStore = useUserStore();
const selectedOption = ref(null);

const rechargeOptions = [
  { beans: 4, price: 0.1 },
  { beans: 40, price: 1 },
  { beans: 200, price: 5 },
  { beans: 400, price: 10 },
  { beans: 850, price: 20 },
  { beans: 1300, price: 30 },
  { beans: 2600, price: 60 },
  { beans: 4400, price: 100 }
];

const handleRecharge = async () => {
  if (!selectedOption.value) return;

  try {
    // 1. 创建订单
    const createOrderRes = await authNuxtFetch('/api/orders/create', {
      method: 'POST',
      body: {
        userId: userStore.userInfo?.id,
        amount: selectedOption.value.price,
        beans: selectedOption.value.beans
      }
    });

    // 2. 调用后端支付接口
    const config = useRuntimeConfig()
    const params = {
      version: '1.1',
      appid: config.public.HPJ_APPID,
      trade_order_id: createOrderRes.data.orderNo,
      total_fee: createOrderRes.data.amount,
      title: `充值${selectedOption.value.beans}阅豆`,
      notify_url: `${config.public.BASE_URL}/api/payment/wxnotify`,
      return_url: `${window.location.origin}/profile`,
      time: Math.floor(Date.now() / 1000),
      nonce_str: Math.random().toString(36).substring(2),
    }
    console.log('支付参数:', params);
    const paymentRes = await authNuxtFetch('/api/payment/create', {
      method: 'POST',
      body: {
        params
      }
    });
    console.log('支付接口返回:', paymentRes);

    // 3. 跳转支付页面
    if (paymentRes.data?.url) {
      window.location.href = paymentRes.data.url;
    } else {
      showToast('支付链接获取失败');
    }
  } catch (error) {
    console.error('充值失败:', error);
    showToast('充值失败，请稍后重试');
  }
};

definePageMeta({
  requiresAuth: true
});
</script>
