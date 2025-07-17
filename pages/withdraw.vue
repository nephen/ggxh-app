<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white py-4 md:py-6">
        <div class="container mx-auto px-4 md:px-6 py-4 max-w-4xl">
            <div class="bg-white p-6 rounded-xl shadow-lg mb-6">
                <h2 class="text-xl font-bold text-gray-800 mb-4">阅豆提现</h2>

                <div class="mb-6">
                    <p class="text-gray-600 mb-2">当前阅豆余额: <span class="font-bold text-blue-600">{{ userInfo.beanCount }}</span></p>
                    <p v-if="userInfo.beanCount >= withdrawConfig.minBeans" class="text-green-600">
                        可提现金额: {{ maxYuanAmount }} 元
                    </p>
                    <p v-else class="text-red-600">
                        提现需至少{{ withdrawConfig.minBeans }}阅豆 (当前不足)
                    </p>
                </div>

                <div v-if="userInfo.beanCount >= withdrawConfig.minBeans" class="space-y-4">
                    <!-- 新增收款码上传区域 -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">收款码</label>
                        <div class="flex items-center space-x-4">
                            <input 
                                type="file" 
                                accept="image/*"
                                @change="handleQRCodeUpload"
                                class="hidden"
                                ref="qrCodeInput"
                            >
                            <button 
                                @click="$refs.qrCodeInput.click()"
                                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                                {{ paymentQRCode ? '更新收款码' : '上传收款码' }}
                            </button>
                            <div v-if="paymentQRCode" class="flex items-center">
                                <img :src="paymentQRCode" class="w-16 h-16 object-cover rounded-md border border-gray-300">
                                <button 
                                    @click="paymentQRCode = null"
                                    class="ml-2 text-red-500 hover:text-red-700"
                                >
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">提现金额</label>
                        <input v-model.number="amount" type="number"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            :max="maxYuanAmount" min="1" @input="validateAmount">
                    </div>

                    <button @click="handleWithdraw"
                        class="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                        :disabled="!amount || amount <= 0">
                        确认提现
                    </button>
                </div>
            </div>
            <!-- 新增提现记录区域 -->
            <div class="bg-white p-6 rounded-xl shadow-lg mb-6">
                <h2 class="text-xl font-bold text-gray-800 mb-4">提现记录</h2>
                <div v-if="withdrawals.length > 0" class="space-y-3">
                    <div v-for="(item, index) in withdrawals" :key="index" 
                         class="border-b border-gray-100 pb-3 last:border-0">
                        <div class="flex justify-between items-center">
                            <span class="font-medium">{{ item.amount }}元</span>
                            <span :class="{
                                'text-yellow-500': item.status === 'pending',
                                'text-blue-500': item.status === 'processing',
                                'text-green-500': item.status === 'completed',
                                'text-red-500': item.status === 'rejected'
                            }">
                                {{ 
                                    item.status === 'pending' ? '待处理' : 
                                    item.status === 'processing' ? '处理中' :
                                    item.status === 'completed' ? '已完成' : '已拒绝'
                                }}
                            </span>
                        </div>
                        <div class="text-sm text-gray-500 mt-1">
                            申请时间: {{ new Date(item.createdAt).toLocaleString() }}
                        </div>
                        <div v-if="item.processedAt" class="text-sm text-gray-500 mt-1">
                            处理时间: {{ new Date(item.processedAt).toLocaleString() }}
                        </div>
                        <div v-if="item.rejectReason" class="text-sm text-red-500 mt-1">
                            拒绝原因: {{ item.rejectReason }}
                        </div>
                    </div>
                </div>
                <div v-else class="text-center text-gray-500 py-4">
                    暂无提现记录
                </div>
            </div>

            <!-- 客服二维码区域 -->
            <div class="bg-white p-6 rounded-xl shadow-lg">
                <h2 class="text-xl font-bold text-gray-800 mb-4">提现/兼职咨询</h2>
                <div class="text-center">
                    <p class="text-gray-600 mb-4">如有提现或兼职赚钱相关问题，请扫码添加客服</p>
                    <div class="flex justify-center mb-4">
                        <img src="/kefu.png" alt="客服二维码" class="w-48 h-48">
                    </div>
                    <p class="text-sm text-gray-500">扫码后请备注"阅读"，客服将拉您进群沟通</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '~/store/userStore'
import { showToast } from '../utils/toast';

const userStore = useUserStore()
const userInfo = ref(userStore.userInfo)
const amount = ref(null)
const paymentQRCode = ref(null)
const qrCodeInput = ref(null)

// 新增配置变量
const withdrawConfig = {
    minBeans: 50, // 最小提现阅豆数
    beanToYuanRatio: 50 // 阅豆兑换比例 (50豆=1元)
}

// 新增onMounted钩子
const fetchPaymentQRCode = async () => {
    try {
        const response = await authNuxtFetch(`/api/users/${userInfo.value.id}`);
        if (response.status === 200 && response.data.paymentQRCode) {
            paymentQRCode.value = response.data.paymentQRCode;
        }
    } catch (error) {
        console.error('获取收款码失败:', error);
    }
}

// 修改onMounted中的调用
onMounted(async () => {
    await fetchPaymentQRCode();
    await fetchWithdrawals();
});

// 新增计算属性
const maxYuanAmount = computed(() => {
    return Math.floor(userInfo.value.beanCount / withdrawConfig.beanToYuanRatio)
})

const handleQRCodeUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return
    
    try {
        const formData = new FormData()
        formData.append('file', file)
        
        const response = await authNuxtFetch('/api/upload', {
            method: 'POST',
            body: formData
        })
        
        if (response.success) {
            paymentQRCode.value = response.data.url
            // 新增：调用API更新用户收款码
            const updateResponse = await authNuxtFetch('/api/users/update-payment-qrcode', {
                method: 'POST',
                body: {
                    userId: userInfo.value.id,
                    paymentQRCode: response.data.url
                }
            })
            if (updateResponse.status === 200) {
                showToast('收款码更新成功')
            } else {
                showToast(updateResponse.message || '收款码更新失败')
            }
        } else {
            showToast(response.message || '上传失败')
        }
    } catch (error) {
        console.error('上传收款码失败:', error)
        showToast('上传失败，请稍后再试')
    }
}

const handleWithdraw = async () => {
    if (!amount.value || amount.value <= 0) {
        showToast('请输入有效的提现金额')
        return
    }

    if (!paymentQRCode.value) {
        showToast('请上传收款码')
        return
    }

    try {
        const response = await authNuxtFetch('/api/withdrawals/create', {
            method: 'POST',
            body: {
                userId: userInfo.value.id,
                amount: amount.value,
                paymentQRCode: paymentQRCode.value
            }
        })

        if (response.success) {
            showToast('提现申请已提交，请等待处理');
            amount.value = null;
            // 更新提现记录
            await fetchWithdrawals();
        } else {
            showToast(response.message);
        }
    } catch (error) {
        console.error('提现失败:', error);
        showToast('提现失败，请稍后再试');
    }
}

const validateAmount = () => {
    if (amount.value !== null && amount.value !== '' && !isNaN(amount.value)) {
        if (amount.value > maxYuanAmount.value) {
            amount.value = maxYuanAmount.value
        } else if (amount.value < 1) {
            amount.value = 1
        }
    }
}

const withdrawals = ref([])

// 新增获取提现记录的方法
const fetchWithdrawals = async () => {
  try {
    const response = await authNuxtFetch(`/api/withdrawals/get?userId=${userInfo.value.id}&limit=50`)
    if (response.status === 200) {
      withdrawals.value = response.data
    }
  } catch (error) {
    console.error('获取提现记录失败:', error)
  }
}
</script>