<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white py-4 md:py-6">
    <div class="w-full md:w-auto text-center text-sm text-blue-600">
      找不到该平台时，百度搜索"关关相互"即可
    </div>
    <div class="container mx-auto p-4 max-w-4xl">
      <!-- 文章标题 & 功能按钮 -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
        <div class="flex w-full md:w-auto gap-3">
          <NuxtLink 
            to="/my-articles"
            class="flex-1 px-4 py-3 text-base font-medium rounded-lg bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 transition whitespace-nowrap text-center"
          >
            我的文章
          </NuxtLink>
          <NuxtLink 
            to="/being-read"
            class="flex-1 px-4 py-3 text-base font-medium rounded-lg bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 transition whitespace-nowrap text-center"
          >
            近一月阅读
          </NuxtLink>
        </div>
        <div class="flex w-full md:w-auto gap-3">
          <NuxtLink
            to="/tutorial"
            class="w-full md:w-auto px-4 py-3 text-base font-medium bg-green-600 text-white rounded-lg border border-green-700 flex items-center justify-center hover:bg-green-700 transition whitespace-nowrap"
          >
            <svg class="w-5 h-5 md:w-5 md:h-5 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
            新手教程
          </NuxtLink>
          <button
            @click="showPublishModal = true"
            class="w-full md:w-auto px-4 py-3 text-base font-medium bg-blue-600 text-white rounded-lg border border-blue-700 flex items-center justify-center hover:bg-blue-700 transition whitespace-nowrap"
          >
            <svg class="w-5 h-5 md:w-5 md:h-5 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            发布文章
          </button>
        </div>
      </div>

      <!-- 文章列表 -->
      <div class="space-y-6">
        <template v-if="articles.length > 0">
        <div 
          v-for="article in articles" 
          :key="article._id" 
          class="bg-white p-6 rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition duration-200"
          :class="{
            'border-2 border-blue-500': article.userId === userId
          }"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img :src="article.authorAvatar" class="w-12 h-12 rounded-full border-2 border-blue-600 mr-4 relative" alt="用户头像">
              <span v-if="article.userId === userId" class="absolute -top-1 -right-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">我的</span>
              <div>
                <h3 class="font-semibold text-gray-800 text-lg break-all whitespace-normal">
                  {{ article.title }}
                </h3>
                <p class="text-sm text-gray-500 mt-1">{{ formatTime(article.publishTime) }}</p>
              </div>
            </div>
            <div class="items-center flex flex-col flex-shrink-0">
              <button 
                @click="handleRead(article)"
                class="bg-red-500 text-white px-4 py-2 rounded-lg border text-sm font-medium border-red-600 hover:bg-red-600 transition flex items-center"
              >
                阅Ta
              </button>
              <!-- 无敌置顶标识 -->
              <p 
                class="text-sm mt-1 px-2 py-1 rounded"
                :class="{
                  'text-red-500 font-bold': isSuperTopActive(article),
                  'text-gray-600': !isSuperTopActive(article)
                }"
              >
                {{ isSuperTopActive(article) ? '无敌置顶' : `阅Ta ${article.readCount} 次` }}
              </p>
            </div>
          </div>
        </div>
      </template>
        <div v-else class="bg-white p-8 rounded-xl shadow text-center">
          <svg class="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900">暂无文章</h3>
          <p class="mt-2 text-gray-500">当前没有可阅读的文章，快去发布或等待新文章吧</p>
          <button
            @click="showPublishModal = true"
            class="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            发布文章
          </button>
        </div>
      </div>
    </div>

    <!-- 发布文章弹窗 -->
    <PublishArticleModal
      v-model:visible="showPublishModal"
      :article="newArticle"
      @submit="publishArticle"
      @cancel="showPublishModal = false"
    />

    <div 
      v-if="showReadsExample" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 class="text-lg font-bold mb-4">如何查看阅读数</h3>
        <p class="text-gray-600 mb-2">打开公众号文章，拉到文章末尾，在左下角位置可以看到阅读数，如下图片所示：</p>
        <img 
          src="/yueduliang.png" 
          alt="阅读数查看示例" 
          class="w-full h-auto mb-4 rounded border border-gray-200"
        >
        <button 
          @click="showReadsExample = false; showValidationModal = true"
          class="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          我知道了
        </button>
      </div>
    </div>

    <!-- 阅读报数弹窗 -->
    <div 
      v-if="showValidationModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
    >
      <div class="bg-white rounded-xl p-8 w-full max-w-md shadow-lg">
        <h3 class="text-2xl font-bold mb-6 text-gray-800">阅读报数</h3>
        <div class="space-y-4">
          <div>
            <div class="flex items-center mb-1">
              <label class="block text-sm font-medium text-gray-700">
                请输入文章当前阅读数
                <span class="text-red-500">*</span>
              </label>
              <button 
                @click="showReadsExample = true; showValidationModal = false"
                class="ml-2 text-blue-600 hover:text-blue-800 text-sm flex items-center"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                如何查看？
              </button>
            </div>
            <input
              v-model="userInputReads"
              type="number"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入最新阅读数"
              @keyup.enter="submitReads"
            >
          </div>
          <div class="p-3 bg-yellow-50 rounded-md text-sm text-yellow-700">
            <p>⚠️ 请确保输入真实的阅读数：</p>
            <ul class="list-disc pl-5 mt-1">
              <li>为提高阅读质量，请在微信个人资料里设置微信信息：性别/年龄/地址</li>
              <li>文章异常时（比如被封禁）请填0，乱报数和滥用填0，很快就会被封禁</li>
              <li>没有阅读数的文章，请不要报数</li>
              <li>阅读数过大的，如：显示1.7万，请填17000</li>
            </ul>
          </div>
        </div>
        <div class="flex justify-end space-x-4 mt-6">
          <button 
            @click="showValidationModal = false" 
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
          >
            取消
          </button>
          <button 
            @click="submitReads" 
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { definePageMeta } from '#imports' // 添加这行导入
import { useUserStore } from '../store/userStore';
import { showToast } from '../utils/toast';
import { isWeChatBrowser } from '../utils/envUtils';
import PublishArticleModal from '../components/PublishArticleModal.vue';
import { authFetch, authNuxtFetch } from '../utils/fetchUtils';

const showPublishModal = ref(false)
const isReading = ref(false)
const articles = ref([]) // 初始化空数组
const showReadsExample = ref(false)

// 获取用户存储
const userStore = useUserStore();
// 获取用户 ID
const userId = userStore.userInfo?.id;

const newArticle = ref({
  link: '',
  title: '',
  publishTime: '2025-03-02 09:15:00',
  readCount: 0,
  requiredReads: 10,
  requirement: '仅阅读',
  sources: ['朋友圈'], // 默认选中朋友圈
  // 新增 reportedReadCount 字段
  reportedReadCount: 0,
  // 新增 userId 字段并初始化为 userStore 中的用户 ID
  userId: userId 
})

// 新增获取文章列表的函数
const fetchArticles = async () => {
  try {
    const response = await authFetch('/api/articles');
    const data = await response.json();
    if (response.ok && response.status === 200) {
      // 先筛选出符合条件的文章
      const filteredArticles = data.filter(article => 
        article.userId == userId || 
        !article.readByUsers?.includes(userId)
      );
      
      // 将自己的文章排在最前面
      articles.value = filteredArticles.sort((a, b) => {
        if (a.userId === userId && b.userId !== userId) return -1;
        if (a.userId !== userId && b.userId === userId) return 1;
        return 0;
      });
    } else {
      console.error('获取文章数据失败');
    }
  } catch (error) {
    console.error('获取文章数据时出现网络错误:', error);
    showToast('获取文章数据时出现网络错误，请稍后重试。');
  }
};

// 在onMounted中调用
onMounted(async () => {
  await fetchArticles();

  const userStore = useUserStore();
  console.log('userStore.readingState:', userStore.readingState)
  if (userStore.readingState.currentArticle && userStore.readingState.readStartTime) {
    isReading.value = true;
    currentArticle.value = userStore.readingState.currentArticle;
    readStartTime.value = userStore.readingState.readStartTime;
    console.log('恢复阅读状态:', currentArticle.value, readStartTime.value)
    handleReturnFromReading();
  }
});

// 在publishArticle中调用
const publishArticle = async () => {
  if (!isFormValid.value) return;
  try {
    const response = await authFetch('/api/articles/publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newArticle.value)
    });
    if (response.ok) {
      showToast('文章发布成功！');
      await fetchArticles(); // 使用新函数
    } else {
      showToast('文章发布失败，请稍后重试。');
    }
  } catch (error) {
    console.error('发布文章时出错:', error);
    showToast('发布文章时出现网络错误，请稍后重试。');
  }
  showPublishModal.value = false;
};

const isFormValid = computed(() => {
  return newArticle.value.link && 
         newArticle.value.title && 
         newArticle.value.requiredReads > 0 &&
         newArticle.value.requirement &&
         newArticle.value.sources.length > 0
})

const formatTime = (timeStr) => {
  // 将日期字符串中的空格替换为T，兼容iOS
  const isoTimeStr = timeStr.replace(' ', 'T');
  return new Date(isoTimeStr).toLocaleDateString();
}

const readStartTime = ref(0)
const showValidationModal = ref(false)
const currentArticle = ref(null)
const userInputReads = ref('')

const handleRead = (article) => {
  isReading.value = true
  currentArticle.value = article
  readStartTime.value = Date.now()

  // 显示加载提示
  showToast('正在跳转中，请稍候...')

  // 保存阅读状态到store
  const userStore = useUserStore();
  userStore.saveReadingState(article, readStartTime.value);

  // 确保链接有协议前缀
  const link = article.link.startsWith('http') ? article.link : `https://${article.link}`;
  console.log('开始阅读:', link)

  if (isWeChatBrowser()) {
    // 微信环境，使用微信内置浏览器打开
    window.location.href = link;
  } else {
    const newWindow = window.open(link, '_blank');
    
    // 监听窗口关闭/切换
    let checkInterval = setInterval(() => {
      if (newWindow.closed) {
        clearInterval(checkInterval)
        handleReturnFromReading()
      }
    }, 1000)

    // 添加页面可见性监听
    document.addEventListener('visibilitychange', handleVisibilityChange)
  }
}

const handleVisibilityChange = () => {
  if (document.visibilityState === 'visible') {
    handleReturnFromReading()
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  }
}

const handleReturnFromReading = () => {
  console.log('返回阅读页面')
  if (!isReading.value) return
  isReading.value = false
  const readDuration = (Date.now() - readStartTime.value) / 1000
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  console.log('阅读结束，时长:', readDuration)
  
  if (readDuration >= 10) {
    showValidationModal.value = true
  } else {
    showToast('阅读太快了！需要超过10秒才能送阅豆，请认真阅读后再提交')
  }
  userStore.clearReadingState();
}

// 提交时直接更新阅读数，不做校验
const submitReads = async () => {
  try {
    const userStore = useUserStore();
    const userId = userStore.userInfo?.id; // 从 store 中获取用户 ID
    if (!userId) {
      showToast('未获取到用户 ID，请重新登录');
      return;
    }

    console.log('提交阅读数:', currentArticle.value);

    // 提交阅读数到文章模型
    const response = await authFetch(`/api/articles/${currentArticle.value._id}/report-reads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        userId: userId,
        targetUserId: currentArticle.value.userId,
        articleId: currentArticle.value._id,
        reportedReadCount: parseInt(userInputReads.value)
      }) 
    });
    const data = await response.json();
    if (response.ok && data.status === 200) {
      userInputReads.value = '';
      showToast('恭喜你，成功提交阅读数，获得 2 阅豆！');
    } else {
      showToast(data.message || '更新阅读次数失败，请稍后重试。');
    }
  } catch (error) {
    console.error('更新阅读次数时出现网络错误:', error);
    showToast('更新阅读次数时出现网络错误，请稍后重试。');
  } finally {
    await fetchArticles(); // 刷新文章列表
    showValidationModal.value = false; 
  }
};

// 添加判断是否在置顶时间段的函数
const isSuperTopActive = (article) => {
  if (!article.superTopPeriods || article.superTopPeriods.length === 0) {
    return false;
  }
  
  const now = new Date();
  return article.superTopPeriods.some(period => {
    return now >= new Date(period.startTime) && now <= new Date(period.endTime);
  });
};

definePageMeta({
  requiresAuth: true
});
</script>
