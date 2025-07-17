<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white py-4 md:py-6">
    <!-- 添加提示信息 -->
    <div class="w-full text-center text-sm text-blue-600">
      找不到该平台时，百度搜索"关关相互"即可
    </div>
    <div class="container mx-auto px-4 md:px-6 py-4 max-w-4xl">
      <!-- 顶部互助统计 -->
      <!-- 外层容器：可自行加上背景图/渐变 -->
      <div
        class="relative p-4 md:p-6 rounded-xl shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
      >
        <!-- 按钮区域：使用 flex + 竖线分割 -->
        <div class="relative flex items-center justify-center space-x-4 z-10">
          <!-- 助我 -->
          <button
            class="flex flex-col items-center px-4 py-2 transition focus:outline-none"
            @click="$router.push('/fans?type=help_me')"
          >
            <!-- 大数字 + 下划线 -->
            <span class="text-2xl font-bold border-b border-current mb-1">
              {{ helpMeCount }}
            </span>
            <!-- 小字 -->
            <span class="text-sm text-gray-100">
              助我
            </span>
          </button>

          <!-- 分隔线 -->
          <div class="h-8 w-px bg-white/40"></div>

          <!-- 已助 -->
          <button
            class="flex flex-col items-center px-4 py-2 transition focus:outline-none"
            @click="$router.push('/fans?type=helped')"
          >
            <span class="text-2xl font-bold border-b border-current mb-1">
              {{ helpedCount }}
            </span>
            <span class="text-sm text-gray-100">
              已助
            </span>
          </button>

          <!-- 分隔线 -->
          <div class="h-8 w-px bg-white/40"></div>

          <!-- 互助 -->
          <button
            class="flex flex-col items-center px-4 py-2 transition focus:outline-none"
            @click="$router.push('/fans?type=mutual')"
          >
            <span class="text-2xl font-bold border-b border-current mb-1">
              {{ mutualHelpCount }}
            </span>
            <span class="text-sm text-gray-100">
              互助
            </span>
          </button>
        </div>
      </div>

      <!-- 置顶用户卡片 -->
      <div class="bg-white p-6 rounded-xl shadow-lg mt-6 flex items-center justify-between border border-gray-100">
        <div class="flex items-center">
          <p class="font-medium text-gray-800">
            {{ mainUser?.name || '未设置公众号' }}
          </p>
        </div>
        <div class="flex gap-3">
          <template v-if="mainUser">
            <!-- 已有用户时的按钮 -->
            <button 
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md shadow-md flex items-center transition"
              @click="showTopUpModal = true"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7 7 7M12 3v18"/>
              </svg>
              顶一顶
            </button>
            <button 
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md shadow-md flex items-center transition"
              @click="showEditConfirm = true"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
              </svg>
              修改
            </button>
            <button 
              :class="mainUser.isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'"
              class="text-white px-4 py-1.5 rounded-md shadow-md flex items-center transition"
              @click="showToggleActiveModal = true"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              {{ mainUser.isActive ? '下架' : '上架' }}
            </button>
          </template>
          <template v-else>
            <!-- 没有用户时的创建按钮 -->
            <button 
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md shadow-md flex items-center transition"
              @click="showEditForm = true; restoreDraft();"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              创建公众号
            </button>
          </template>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="flex justify-between mt-6" v-if="mainUser">
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow-sm flex items-center transition"
          @click="showSuperTopModal=true"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          无敌置顶
        </button>
        <button
          class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm flex items-center transition"
          @click="fetchPurchasedSlots"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          明细
        </button>
      </div>

      <!-- 购买明细弹窗 -->
      <SuperTopDetailsModal
        v-model:visible="showDetailModal"
        :title="mainUser?.name"
        :purchased-slots="purchasedSlots"
      />

      <!-- 无敌置顶弹窗 -->
      <SuperTopModal
        v-model:visible="showSuperTopModal"
        :time-slots="timeSlots"
        :super-top-periods="mainUser?.superTopPeriods || []"
        @submit="handlePurchase"
      />

      <!-- 用户列表 -->
      <ul class="mt-6 space-y-4">
        <template v-if="users.length > 0">
        <li
          v-for="user in users"
          :key="user._id"
          class="bg-white p-6 rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition duration-200 border flex justify-between items-center relative"
          :class="{
            'border-2 border-blue-500': user.userId === userId
          }"
        >
          <div class="break-all whitespace-normal">
            <p class="text-lg font-semibold text-gray-800">{{ user.name }}</p>
            <p class="text-gray-600 mt-1">{{ user.description }}</p>
          </div>
          <span v-if="user.userId === userId" class="absolute -top-1 -right-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">我的</span>
          <div class="flex flex-col items-center flex-shrink-0">
            <button
              class="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-lg font-medium text-sm shadow-md flex items-center justify-center transition"
              @click="handleFollowClick(user)"
            >
              粉Ta
            </button>
            <!-- 无敌置顶标识 -->
            <p 
              class="text-sm mt-1 px-2 py-1 rounded"
              :class="{
                'text-red-500 font-bold': isSuperTopActive(user),
                'text-gray-600': !isSuperTopActive(user)
              }"
            >
              {{ isSuperTopActive(user) ? '无敌置顶' : `粉Ta ${user.followCount} 人` }}
            </p>
          </div>
        </li>
      </template>
        <li v-else class="bg-white p-8 rounded-xl shadow text-center">
          <svg class="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 15a4 4 0 014-4h4a4 4 0 014 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2z"/>
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900">暂无互助用户</h3>
          <p class="mt-2 text-gray-500">当前没有可互助的公众号，请稍后再来查看</p>
        </li>
      </ul>

      <!-- 添加官住弹窗 -->
      <FollowModal
        v-model:visible="showFollowModal"
        :article-link="currentUser?.articleLink || ''"
        @confirm="handleFollowConfirm"
        @cancel="handleFollowCancel"
      />

      <!-- 顶一顶确认弹窗 -->
      <div
        v-if="showTopUpModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-xl p-6 w-full max-w-md">
          <h3 class="text-xl font-bold mb-4">确认置顶</h3>
          <p class="text-gray-600 mb-6">
            消耗2阅豆将您的公众号排名提升，是否继续？
          </p>
          <div class="flex justify-end space-x-3">
            <button
              @click="showTopUpModal = false"
              class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              取消
            </button>
            <button
              @click="handleConfirmTopUp"
              class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              确认消耗
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 上下架确认弹窗 -->
    <div
      v-if="showToggleActiveModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 class="text-xl font-bold mb-4">{{ mainUser.isActive ? '确认下架' : '确认上架' }}</h3>
        <p class="text-gray-600 mb-6">
          {{ mainUser.isActive ? '下架后将暂停所有互助服务，确定要下架吗？' : '上架后您的公众号将恢复正常使用，确定要上架吗？' }}
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showToggleActiveModal = false"
            class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            取消
          </button>
          <button
            @click="handleToggleActive"
            :class="mainUser.isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'"
            class="px-4 py-2 text-white rounded transition"
          >
            {{ mainUser.isActive ? '立即下架' : '立即上架' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 修改确认弹窗 -->
    <div
      v-if="showEditConfirm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl w-full max-w-md p-6">
        <h3 class="text-lg font-bold mb-4">修改确认</h3>
        <p class="text-gray-600 mb-6">
          可修改原公号信息或更换新公号，新号仅推送给从未官住过的人，请知悉。是否确认修改？
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showEditConfirm = false"
            class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            取消
          </button>
          <button
            @click="showEditForm = true; showEditConfirm = false; restoreDraft();"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            确定
          </button>
        </div>
      </div>
    </div>

    <!-- 公众号信息表单弹窗 -->
    <div
      v-if="showEditForm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl w-full max-w-md p-6">
        <h3 class="text-lg font-bold mb-6">公众号信息设置</h3>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">文章链接</label>
            <input
              v-model="formData.articleLink"
              @input="autoSaveForm"
              type="url"
              class="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="粘贴任意文章链接"
            />
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-medium text-gray-700">公众号名称</label>
              <button 
                @click="fetchAccountName"
                type="button"
                class="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                :disabled="!formData.articleLink || isFetchingAccount"
              >
                <span v-if="isFetchingAccount">获取中...</span>
                <span v-else>自动获取</span>
                <svg v-if="isFetchingAccount" class="animate-spin ml-1 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </button>
            </div>
            <input
              v-model="formData.accountName"
              type="text"
              class="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="请输入公众号名称"
            />
          </div>
          
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-medium text-gray-700">公众号描述</label>
              <button 
                @click="fetchDescription"
                @input="autoSaveForm"
                type="button"
                class="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                :disabled="!formData.articleLink || isFetching"
              >
                <span v-if="isFetching">获取中...</span>
                <span v-else>自动获取</span>
                <svg v-if="isFetching" class="animate-spin ml-1 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </button>
            </div>
            <textarea
              v-model="formData.description"
              @input="autoSaveForm"
              class="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 h-20"
              placeholder="请输入公众号描述信息"
            ></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">目标粉丝量</label>
            <input
              v-model.number="formData.requiredFollows"
              @input="autoSaveForm"
              type="number"
              min="0"
              class="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="请输入需要增加的粉丝数量，0代表不限制"
            />
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
              <p class="text-sm text-gray-600 mb-4">2. 取消关注，再关注公众号后，点击发送消息</p>
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

          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-medium text-gray-700">官住后自动回复</label>
              <button 
                @click="showReplyExample = true"
                class="text-blue-600 hover:text-blue-800 text-sm flex items-center"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                如何获取？
              </button>
            </div>
            <textarea
              v-model="formData.autoReply"
              @input="autoSaveForm"
              class="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 h-20"
              placeholder="请输入官住后自动回复的内容"
            ></textarea>
          </div>
        </div>
        
        <p class="text-red-500 text-sm mt-4 mb-6">
          注意：设置错误的信息将会导致账号被自动下架
        </p>
        <p class="text-blue-500 text-sm mb-6">
          提示：表单信息已自动保存，您可以退出后回来继续填写
        </p>
        
        <div class="flex justify-end space-x-3">
          <button
            @click="showEditForm = false"
            class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            取消
          </button>
          <button
            @click="submitForm"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            发布
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { definePageMeta } from '#imports' // 添加这行导入
import { useUserStore } from '../store/userStore';
import { showToast } from '../utils/toast';
import SuperTopDetailsModal from '../components/SuperTopDetailsModal.vue'
import SuperTopModal from '../components/SuperTopModal.vue'
import FollowModal from '../components/FollowModal.vue';
import { authFetch, authNuxtFetch } from '../utils/fetchUtils';

// 获取用户存储
const userStore = useUserStore();

// 获取用户 ID
const userId = userStore.userInfo?.id;

// 互助统计
const helpMeCount = ref(0)
const helpedCount = ref(0)
const mutualHelpCount = ref(0)

// 是否显示弹窗
const showSuperTopModal = ref(false)
const showDetailModal = ref(false)
const showTopUpModal = ref(false)
const showEditConfirm = ref(false)
const showEditForm = ref(false)
const showReplyExample = ref(false)

const timeSlots = ref([]); // 初始化 timeSlots 为空数组

const fetchTimeSlots = async () => {
  try {
    const response = await authFetch('/api/wechat-account-time-slots');
    const data = await response.json();
    if (response.ok && response.status === 200) {
      timeSlots.value = data;
    } else {
      console.error('获取时间段数据失败');
    }
  } catch (error) {
    console.error('获取时间段数据时出现网络错误:', error);
  }
};

// 自动保存方法
const autoSaveForm = () => {
  localStorage.setItem('wechatAccountFormDraft', JSON.stringify(formData))
  showToast('草稿已保存')
}

// 恢复草稿
const restoreDraft = () => {
  const draft = localStorage.getItem('wechatAccountFormDraft')
  if (draft) {
    Object.assign(formData, JSON.parse(draft))
    showToast('草稿已恢复')
  }
}

// 表单数据
const formData = reactive({
  accountName: '',
  articleLink: '',
  autoReply: '',
  description: '', // 新增描述字段
  requiredFollows: null,
})

// 表单提交
const submitForm = async () => {
  if (!formData.accountName) {
    showToast('请输入公众号名称');
    return;
  }
  if (!formData.description) {
    showToast('请输入公众号描述');
    return;
  }

  localStorage.removeItem('wechatAccountFormDraft')
  
  try {
    const response = await authFetch('/api/wechat-accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        name: formData.accountName,
        articleLink: formData.articleLink,
        autoReply: formData.autoReply,
        description: formData.description,
        requiredFollows: formData.requiredFollows ?? 0
      })
    });
    
    const data = await response.json();
    if (response.ok && data?.status === 200) {
      showToast('公众号信息更新成功');
      mainUser.value = data.data;
      showEditForm.value = false;
      await fetchWechatAccounts();
    } else {
      showToast(data?.message || '更新失败');
    }
  } catch (error) {
    console.error('更新公众号信息失败:', error);
    showToast('更新公众号信息失败，请稍后重试');
  }
};

// 用户状态
const showToggleActiveModal = ref(false)

// 处理上下架操作
const handleToggleActive = async () => {
  try {
    const data = await authNuxtFetch('/api/wechat-accounts/toggle-active', {
      method: 'POST',
      body: {
        userId: userId,
      }
    })

    if (data?.status === 200) {
      // 直接使用接口返回的完整账号数据
      mainUser.value = data.data
      await fetchWechatAccounts();
      showToast(mainUser.value.isActive ? '已成功上架' : '已成功下架')
    } else {
      showToast(data?.message || '操作失败，请稍后重试')
    }
  } catch (err) {
    console.error('状态切换失败:', err)
    showToast(err.message || '网络连接异常')
  } finally {
    showToggleActiveModal.value = false
  }
}

// 处理顶一顶确认
const handleConfirmTopUp = async () => {
  try {
    const response = await authFetch('/api/wechat-accounts/top-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId
      })
    });
    
    const data = await response.json();
    if (response.ok && data?.status === 200) {
      await fetchWechatAccounts();
      showToast("顶一顶成功！");
    } else {
      showToast(data?.message || '操作失败，请稍后重试');
    }
  } catch (err) {
    console.error('顶一顶失败:', err);
    showToast('网络请求异常，请检查连接');
  } finally {
    showTopUpModal.value = false;
  }
}

// 主用户信息
// 替换原有的mainUser定义
const mainUser = ref(null);

// 获取公众号信息
const fetchWechatAccount = async () => {
  try {
    const response = await authFetch(`/api/wechat-accounts/${userId}`);
    const data = await response.json();
    if (response.ok && data.status === 200) {
      mainUser.value = data.data;
      // 同时更新formData
      formData.accountName = data.data.name || '';
      formData.articleLink = data.data.articleLink || '';
      formData.autoReply = data.data.autoReply || '';
      formData.description = data.data.description || '';
      formData.requiredFollows = data.data.requiredFollows || 0;
    }
  } catch (error) {
    console.error('获取公众号信息失败:', error);
  }
};

// 替换原有的静态用户列表
const users = ref([])

// 新增获取公众号列表的函数
const fetchWechatAccounts = async () => {
  try {
    const response = await authFetch('/api/wechat-accounts');
    const data = await response.json();
    if (response.ok && response.status === 200) {
      const filteredUsers = data.filter(account =>
        account.userId == userId ||
        !account.followedByUsers?.includes(userId)
      );

      // 将自己的公众号排在最前面
      users.value = filteredUsers.sort((a, b) => {
        if (a.userId === userId && b.userId !== userId) return -1;
        if (a.userId !== userId && b.userId === userId) return 1;
        return 0;
      });
    } else {
      console.error('获取公众号数据失败');
    }
  } catch (error) {
    console.error('获取公众号数据时出现网络错误:', error);
  }
};

// 在onMounted中调用
onMounted(async () => {
  await fetchWechatAccount();
  await fetchTimeSlots();
  await fetchWechatAccounts(); // 新增调用
  await fetchFollowStats(); // 新增调用

  // 检查是否有未完成的官住操作
  if (userStore.followState.currentUser && userStore.followState.showFollowModal) {
    currentUser.value = userStore.followState.currentUser;
    showFollowModal.value = true;
  }
});

const handlePurchase = async ({ slots, totalCost }) => {
  try {
    const response = await authFetch('/api/time-slots/wechat-top-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userStore.userInfo?.id,
        slots,
        totalCost,
        targetId: mainUser.value?._id, // 确保accountId正确传递
      })
    })

    const data = await response.json()
    if (response.ok && response.status === 200) {
      showToast('购买成功！')
      await fetchTimeSlots();
      await fetchWechatAccount();
    } else {
      showToast(data.message || '购买失败')
    }
  } catch (error) {
    console.error('购买时出错:', error)
    showToast('购买时出现网络错误，请稍后重试。')
  } finally {
    showSuperTopModal.value = false 
  }
}

const purchasedSlots = ref([]);
const fetchPurchasedSlots = async () => {
  if (!mainUser.value?._id) {
    console.error('未找到有效的公众号ID');
    return; 
  }
  try {
    const response = await authFetch(`/api/wechat-accounts/${mainUser.value?._id}/purchased-slots`);
    const data = await response.json();
    if (response.ok && response.status === 200) {
      purchasedSlots.value = data.data || [];
    } else {
      console.error('获取置顶记录失败');
    }
  } catch (error) {
    console.error('获取置顶记录时出错:', error);
  }
  showDetailModal.value = true;
};
// 在 script setup 部分添加判断函数
const isSuperTopActive = (user) => {
  if (!user.superTopPeriods || user.superTopPeriods.length === 0) {
    return false;
  }
  
  const now = new Date();
  return user.superTopPeriods.some(period => {
    return now >= new Date(period.startTime) && now <= new Date(period.endTime);
  });
};

const showFollowModal = ref(false)
const currentUser = ref(null)

const handleFollowClick = (user) => {
  currentUser.value = user
  // 保存官住状态到store
  userStore.saveFollowState(user);
  showFollowModal.value = true
}

// 新增获取官住统计数据的函数
const fetchFollowStats = async () => {
  try {
    const response = await authFetch(`/api/users/follow-stats?userId=${userId}`);
    const data = await response.json();
    if (response.ok && data) {
      helpMeCount.value = data.followersCount || 0;
      helpedCount.value = data.followingCount || 0;
      mutualHelpCount.value = data.mutualCount || 0;
    }
  } catch (error) {
    console.error('获取官住统计数据失败:', error);
  }
};

const confirmFollow = async (replyContent) => {
  try {
    const response = await authFetch('/api/follow-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userStore.userInfo?.id,
        targetUserId: currentUser.value.userId,
        replyContent: replyContent
      })
    })

    const data = await response.json()
    if (response.ok && data.status === 200) {
      showToast('恭喜你，官住操作成功，获得 6 阅豆！');
      // 刷新用户列表
      await fetchWechatAccounts();
      // 官住成功后重新获取统计数据
      await fetchFollowStats();
    } else {
      showToast(data.message)
    }
  } catch (error) {
    console.error('官住操作出错:', error)
    showToast('网络错误，请稍后重试')
  } finally {
    showFollowModal.value = false
  }
}

const handleFollowConfirm = (replyContent) => {
  confirmFollow(replyContent);
  // 清除store中的官住状态
  userStore.clearFollowState();
};

const handleFollowCancel = () => {
  // 可以添加取消时的逻辑
  console.log('官住操作已取消');
  // 清除store中的官住状态
  userStore.clearFollowState();
  showFollowModal.value = false;
};

const isFetching = ref(false);

async function fetchDescription() {
  if (!formData.articleLink || isFetching.value) return;
  
  isFetching.value = true;
  try {
    const response = await authNuxtFetch('/api/fetch-description', {
      method: 'POST',
      body: { url: formData.articleLink }
    })
    
    if (response.status === 200) {
      formData.description = response.description
    } else if (response.status === 404) {
      console.warn('未找到描述:', response.message)
      alert('未找到公众号描述，请手动输入')
    } else {
      console.error('获取描述失败:', response.message)
      alert('自动获取描述失败，请手动输入')
    }
  } catch (error) {
    console.error('请求失败:', error)
    alert('请求失败，请手动输入描述')
  } finally {
    isFetching.value = false;
  }
}

const isFetchingAccount = ref(false);
const fetchAccountName = async () => {
  isFetchingAccount.value = true;
  try {
    const { title } = await authNuxtFetch('/api/fetch-account', {
      method: 'POST',
      body: { url: formData.articleLink }
    });
    if (title) {
      formData.accountName = title;
    }
  } catch (error) {
    console.error('获取公众号名称失败:', error);
  } finally {
    isFetchingAccount.value = false;
  }
};

definePageMeta({
  requiresAuth: true
});
</script>

<style scoped>
/* 在此处添加你的自定义样式 */
</style>
