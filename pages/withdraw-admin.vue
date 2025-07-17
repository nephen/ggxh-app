<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white py-4 md:py-6">
    <div class="container mx-auto px-4 md:px-6 py-4 max-w-4xl">
      <div class="bg-white p-6 rounded-xl shadow-lg mb-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">提现申请处理</h2>
        
        <!-- 筛选区域 -->
        <div class="mb-6 flex flex-wrap gap-4">
          <div class="flex-1 min-w-[200px]">
            <label class="block text-sm font-medium text-gray-700 mb-1">状态筛选</label>
            <select v-model="filterStatus" class="w-full px-4 py-2 border border-gray-300 rounded-md">
              <option value="all">全部</option>
              <option value="pending">待处理</option>
              <option value="processing">处理中</option>
              <option value="completed">已完成</option>
              <option value="rejected">已拒绝</option>
            </select>
          </div>
          <div class="flex-1 min-w-[200px]">
            <label class="block text-sm font-medium text-gray-700 mb-1">日期范围</label>
            <input 
              v-model="filterDate" 
              type="date" 
              class="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
          </div>
        </div>

        <!-- 提现申请列表 -->
        <div v-if="withdrawals.length > 0" class="space-y-4">
          <div 
            v-for="(item, index) in filteredWithdrawals" 
            :key="index" 
            class="border border-gray-200 rounded-lg p-4"
          >
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p class="font-medium">用户ID: {{ item.userId }}</p>
                <p class="text-gray-600">申请金额: {{ item.amount }}元</p>
                <p class="text-sm text-gray-500">
                  申请时间: {{ new Date(item.createdAt).toLocaleString() }}
                </p>
              </div>
              
              <div class="flex flex-col items-end">
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
                
                <!-- 收款码展示 -->
                <div v-if="item.paymentQRCode" class="mt-2">
                  <img 
                    :src="item.paymentQRCode" 
                    class="w-24 h-24 object-cover rounded-md border border-gray-300 cursor-pointer"
                    @click="showQRCode(item.paymentQRCode)"
                  >
                </div>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div v-if="item.status === 'pending' || item.status === 'processing'" class="mt-4 flex flex-wrap gap-2">
              <button 
                @click="processWithdrawal(item._id, 'processing')"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                :disabled="item.status === 'processing'"
              >
                标记为处理中
              </button>
              <button 
                @click="showRejectDialog(item._id)"
                class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                拒绝申请
              </button>
              <button 
                @click="completeWithdrawal(item._id)"
                class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                标记为已完成
              </button>
            </div>

            <!-- 拒绝原因 -->
            <div v-if="item.rejectReason" class="mt-2 text-sm text-red-500">
              拒绝原因: {{ item.rejectReason }}
            </div>
          </div>
        </div>
        <div v-else class="text-center text-gray-500 py-8">
          暂无提现申请
        </div>
      </div>
    </div>

    <!-- 拒绝原因弹窗 -->
    <div 
      v-if="showRejectModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 class="text-lg font-bold mb-4">输入拒绝原因</h3>
        <textarea 
          v-model="rejectReason" 
          class="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          placeholder="请输入拒绝原因..."
          rows="3"
        ></textarea>
        <div class="flex justify-end gap-2">
          <button 
            @click="showRejectModal = false"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            取消
          </button>
          <button 
            @click="rejectWithdrawal"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            确认拒绝
          </button>
        </div>
      </div>
    </div>

    <!-- 收款码放大弹窗 -->
    <div 
      v-if="showQRCodeModal" 
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      @click="showQRCodeModal = false"
    >
      <div class="bg-white p-4 rounded-lg max-w-[90vw] max-h-[90vh]">
        <img :src="currentQRCode" class="max-w-full max-h-full">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { showToast } from '../utils/toast'
import { useUserStore } from '~/store/userStore'

const userStore = useUserStore()
const userInfo = ref(userStore.userInfo)
const withdrawals = ref([])
const filterStatus = ref('all')
const filterDate = ref('')
const showRejectModal = ref(false)
const rejectReason = ref('')
const currentWithdrawalId = ref(null)
const showQRCodeModal = ref(false)
const currentQRCode = ref('')

// 获取提现申请列表
const fetchWithdrawals = async () => {
  try {
    const response = await authNuxtFetch(`/api/withdrawals/admin?status=all&limit=100&adminId=${userInfo.value.id}`)
    if (response.status === 200) {
      withdrawals.value = response.data
    }
  } catch (error) {
    console.error('获取提现申请失败:', error)
    showToast('获取提现申请失败')
  }
}

// 过滤后的提现申请
const filteredWithdrawals = computed(() => {
  let result = withdrawals.value
  
  if (filterStatus.value !== 'all') {
    result = result.filter(item => item.status === filterStatus.value)
  }
  
  if (filterDate.value) {
    const filterDateObj = new Date(filterDate.value)
    result = result.filter(item => {
      const itemDate = new Date(item.createdAt)
      return itemDate.toDateString() === filterDateObj.toDateString()
    })
  }
  
  return result
})

// 处理提现申请
const processWithdrawal = async (id, status) => {
  try {
    const response = await authNuxtFetch(`/api/withdrawals/${id}/status`, {
      method: 'PATCH',
      body: { 
        status,
        adminId: userInfo.value.id 
      }
    })
    
    if (response.status === 200) {
      showToast('状态更新成功')
      await fetchWithdrawals()
    } else {
      showToast(response.message || '操作失败')
    }
  } catch (error) {
    console.error('更新状态失败:', error)
    showToast('操作失败')
  }
}

// 完成提现
const completeWithdrawal = async (id) => {
  try {
    const response = await authNuxtFetch(`/api/withdrawals/${id}/complete`, {
      method: 'PATCH',
      body: {
        adminId: userInfo.value.id
      }
    })
    
    if (response.status === 200) {
      showToast('提现已完成')
      await fetchWithdrawals()
    } else {
      showToast(response.message || '操作失败')
    }
  } catch (error) {
    console.error('完成提现失败:', error)
    showToast('操作失败')
  }
}

// 显示拒绝对话框
const showRejectDialog = (id) => {
  currentWithdrawalId.value = id
  rejectReason.value = ''
  showRejectModal.value = true
}

// 拒绝提现
const rejectWithdrawal = async () => {
  if (!rejectReason.value) {
    showToast('请输入拒绝原因')
    return
  }
  
  try {
    const response = await authNuxtFetch(`/api/withdrawals/${currentWithdrawalId.value}/reject`, {
      method: 'PATCH',
      body: { 
        rejectReason: rejectReason.value,
        adminId: userInfo.value.id
      }
    })
    
    if (response.status === 200) {
      showToast('提现已拒绝')
      showRejectModal.value = false
      await fetchWithdrawals()
    } else {
      showToast(response.message || '操作失败')
    }
  } catch (error) {
    console.error('拒绝提现失败:', error)
    showToast('操作失败')
  }
}

// 显示收款码大图
const showQRCode = (url) => {
  currentQRCode.value = url
  showQRCodeModal.value = true
}

onMounted(() => {
  fetchWithdrawals()
})
</script>