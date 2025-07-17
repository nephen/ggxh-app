<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white py-4 md:py-6">
    <div class="container mx-auto p-4 max-w-4xl">
      <h1 class="text-xl font-bold mb-6">粉友管理</h1>
      
      <!-- 标签页导航 -->
      <div class="flex border-b mb-4">
        <button 
          @click="activeTab = 'followers'" 
          :class="['px-4 py-2 transition-colors duration-200', activeTab === 'followers' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500 hover:text-blue-600']">
          粉我的
        </button>
        <button 
          @click="activeTab = 'following'" 
          :class="['px-4 py-2 transition-colors duration-200', activeTab === 'following' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500 hover:text-blue-600']">
          我粉的
        </button>
        <button 
          @click="activeTab = 'mutual'" 
          :class="['px-4 py-2 transition-colors duration-200', activeTab === 'mutual' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500 hover:text-blue-600']">
          互粉
        </button>
      </div>
      
      <!-- 粉我的 -->
      <div v-if="activeTab === 'followers'" class="space-y-4">
        <div class="bg-blue-50 p-4 rounded-xl text-sm text-blue-800 mb-4">
          <template v-if="activeTab === 'followers'">
            互助不易，请多多回关。如果发现对方虚官住或者取关，您可以在对方官住后7天内进行举报。
          </template>
          <template v-if="activeTab === 'following'">
            互助不易，请多多回关。如果发现对方虚假官住或取关您，您可以在对方官住后7天内进行举报。
          </template>
          <template v-if="activeTab === 'mutual'">
            已建立互助关系的用户列表，请保持长期互相官住。
          </template>
        </div>
        
        <div 
          v-for="user in followers" 
          :key="user.id" 
          class="bg-white p-6 rounded-xl shadow-lg flex items-center transition transform hover:-translate-y-1">
          <img :src="user.avatar || '/avatar-placeholder.png'" class="w-12 h-12 rounded-full border border-gray-200" alt="用户头像">
          <div class="ml-4 flex-1">
            <p class="font-medium text-gray-800">{{ user.publicName }}</p>
            <p class="text-sm text-gray-500">{{ user.nickname || `匿名用户 ${user.userId}` }}</p>
          </div>
          <div class="text-right">
            <p class="text-xs text-gray-500">{{ user.operationDate }}</p>
            <button 
              v-if="!user.isFollowing" 
              @click="handleFollowBack(user)"
              class="mt-1 text-xs bg-blue-600 text-white px-2 py-1 rounded transition hover:bg-blue-700">
              回关
            </button>
            <p v-else class="mt-1 text-xs text-green-600">已互粉</p>
          </div>
        </div>
        
        <div v-if="followers.length === 0" class="text-center py-8 text-gray-500">
          暂无粉丝
        </div>
      </div>

      <!-- 官住弹窗 -->
      <FollowModal
        v-model:visible="showFollowModal"
        :article-link="currentFollowUser?.articleLink || ''"
        @confirm="confirmFollow"
      />
      
      <!-- 我粉的 -->
      <div v-if="activeTab === 'following'" class="space-y-4">
        <div class="bg-blue-50 p-4 rounded-xl text-sm text-blue-800 mb-4">
          如果你粉了他人却被举报虚假官住，你可立即取关对方；若你主动取关他人，他人将举报并同时取关你。官住后请永不取关，互助不易，诚实待人也是诚实待自己。
        </div>
        
        <div 
          v-for="user in following" 
          :key="user.id" 
          class="bg-white p-6 rounded-xl shadow-lg flex items-center transition transform hover:-translate-y-1">
          <img :src="user.avatar || '/avatar-placeholder.png'" class="w-12 h-12 rounded-full border border-gray-200" alt="用户头像">
          <div class="ml-4 flex-1">
            <p class="font-medium text-gray-800">{{ user.publicName }}</p>
            <p class="text-sm text-gray-500">{{ user.nickname || `匿名用户 ${user.userId}` }}</p>
          </div>
          <div class="text-right">
            <p class="text-xs text-gray-500">{{ user.followTime }}</p>
            <p v-if="user.isFollowing" class="mt-1 text-xs text-green-600">已互粉</p>
          </div>
        </div>
        
        <div v-if="following.length === 0" class="text-center py-8 text-gray-500">
          您还没有官住任何人
        </div>
      </div>
      
      <!-- 互粉 -->
      <div v-if="activeTab === 'mutual'" class="space-y-4">
        <div 
          v-for="user in mutualFans" 
          :key="user.id" 
          class="bg-white p-6 rounded-xl shadow-lg flex items-center transition transform hover:-translate-y-1">
          <img :src="user.avatar || '/avatar-placeholder.png'" class="w-12 h-12 rounded-full border border-gray-200" alt="用户头像">
          <div class="ml-4 flex-1">
            <p class="font-medium text-gray-800">{{ user.publicName }}</p>
            <p class="text-sm text-gray-500">{{ user.nickname ||`匿名用户 ${user.userId}` }}</p>
          </div>
          <div class="text-right">
            <p class="text-xs text-gray-500">互粉于 {{ user.mutualTime }}</p>
          </div>
        </div>
        
        <div v-if="mutualFans.length === 0" class="text-center py-8 text-gray-500">
          暂无互粉用户
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../store/userStore';
import FollowModal from '../components/FollowModal.vue';
import { authFetch, authNuxtFetch } from '../utils/fetchUtils';

// 获取用户存储
const userStore = useUserStore();
const route = useRoute()
const initialTab = route.query.type || 'followers'
// 获取用户 ID
const userId = userStore.userInfo?.id;

// 官住弹窗相关
const showFollowModal = ref(false)
const currentFollowUser = ref(null)

// 处理回关点击
const handleFollowBack = async (user) => {
  try {
    // 使用现有的[userId].get.ts接口获取公众号信息
    const response = await authNuxtFetch(`/api/wechat-accounts/${user.userId}`);
    
    if (response?.status === 200) {
      currentFollowUser.value = {
        ...user,
        articleLink: response.data.articleLink
      };
      showFollowModal.value = true;
    } else {
      console.error('获取公众号信息失败:', response?.message);
      showToast(response?.message || '获取公众号信息失败');
    }
  } catch (error) {
    console.error('获取公众号信息失败:', error);
    showToast('网络错误，请稍后重试');
  }
};

// 确认官住
const confirmFollow = async (replyContent) => {
  try {
    const response = await authFetch('/api/follow-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userStore.userInfo?.id,
        targetUserId: currentFollowUser.value.userId,
        replyContent: replyContent
      })
    });

    const data = await response.json();
    if (response.ok && data.status === 200) {
      showToast('恭喜你，官住操作成功，获得 6 阅豆！');
      await loadFollowData(); // 重新加载数据
    } else {
      showToast(data.message || '回关失败');
    }
  } catch (error) {
    console.error('回关操作出错:', error);
    showToast('网络错误，请稍后重试');
  } finally {
    showFollowModal.value = false;
  }
};

const activeTab = ref(
  initialTab === 'help_me' ? 'followers' : 
  initialTab === 'helped' ? 'following' :
  initialTab === 'mutual' ? 'mutual' : 
  initialTab === 'followers' ? 'followers' : 'followers'
)

// 从API获取的数据
const followers = ref([])
const following = ref([])
const mutualFans = ref([])

// 加载数据
const loadFollowData = async () => {
  try {
    // 修改API调用，添加userId参数
    const { followingList, followersList, mutualList } = await authNuxtFetch('/api/users/follow-lists', {
      query: {
        userId: userId
      }
    })
    
    followers.value = followersList.map(item => ({
      userId: item.userId,
      avatar: item.avatar,
      publicName: item.publicName || item.name,
      nickname: item.name,
      followTime: formatDate(item.followTime),
      operationDate: formatDate(item.followTime),
      isFollowing: item.isMutual
    }))
    
    following.value = followingList.map(item => ({
      userId: item.userId,
      avatar: item.avatar,
      publicName: item.publicName || item.name,
      nickname: item.name,
      followTime: formatDate(item.followTime),
      isFollowing: item.isMutual
    }))
    
    mutualFans.value = mutualList.map(item => ({
      userId: item.userId,
      avatar: item.avatar,
      publicName: item.publicName || item.name,
      nickname: item.name,
      mutualTime: formatDate(item.mutualTime)
    }))
  } catch (error) {
    console.error('获取官住数据失败:', error)
  }
}

// 格式化日期
const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0]
}

// 页面加载时获取数据
onMounted(() => {
  loadFollowData()
})
</script>
