<template>
  <div class="container mx-auto p-4 max-w-4xl">
    <!-- 顶部提示信息区域 -->
    <div class="bg-indigo-900 text-white p-4 rounded-lg mb-4 text-center">
      找不到关关相互的时候，请打开百度搜索【关关相互】，
      找到关关相互的网址界面进主页即可。
    </div>

    <!-- 发布新文章按钮 -->
    <div class="mb-4">
      <button
        @click="showPublishModal = true"
        class="bg-white text-primary border border-primary w-full py-3 rounded-lg flex items-center justify-center hover:bg-gray-50"
      >
        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        发布新文章
      </button>
    </div>

    <!-- 文章排名弹窗 -->
    <div v-if="showRankingModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-xl font-bold mb-4">文章排名情况</h3>
        <p v-if="rankingInfo">{{ rankingInfo }}</p>
        <div class="flex justify-end space-x-3 mt-6">
          <button 
            @click="showRankingModal = false" 
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
          >
            关闭
          </button>
        </div>
      </div>
    </div>

    <!-- 广告横幅 -->
    <div 
      class="mb-4 relative bg-gradient-to-r from-red-500 to-red-700 h-20 rounded-lg overflow-hidden cursor-pointer"
      @click="showTopCardDetails = true"
    >
      <div class="absolute inset-0 flex items-center">
        <div class="text-white text-xl font-bold ml-6 flex items-center">
          <span>无敌置顶卡</span>
          <!-- 使用SVG替代手指点击图片 -->
          <svg class="w-6 h-6 ml-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2a1 1 0 00-1 1v10.586l-3.293-3.293a1 1 0 10-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L9 14.586V3a1 1 0 00-1-1z"></path>
          </svg>
        </div>
      </div>
      <!-- 添加灯笼装饰 -->
      <div class="absolute right-4 top-2">
        <svg class="w-8 h-8 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16z" clip-rule="evenodd"></path>
        </svg>
      </div>
      <div class="absolute right-16 top-3">
        <svg class="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16z" clip-rule="evenodd"></path>
        </svg>
      </div>
    </div>

    <!-- 文章列表 -->
    <div class="space-y-4">
      <div v-for="article in myArticles" :key="article._id" class="bg-white p-4 rounded-lg shadow-sm">
        <div class="flex justify-between items-start mb-2">
          <div class="text-gray-600 break-all whitespace-normal">
            {{ article.title }}
          </div>
          <div>
            <button 
              @click="confirmTopArticle(article)" 
              class="bg-red-500 text-white px-4 py-1 rounded-md text-sm hover:bg-red-600"
            >
              顶
            </button>
          </div>
        </div>
        
        <div class="text-gray-500 text-sm mb-2">
          {{ formatTime(article.publishTime) }}
        </div>
        
        <div class="flex justify-between items-center mb-2">
          <div class="text-gray-600">阅读 {{ article.readCount }} 次</div>
          <div class="flex space-x-2">
            <button
              @click="openArticleLink(article)"
              class="border border-blue-500 text-blue-500 px-3 py-1 rounded-md text-sm hover:bg-blue-50"
            >
              阅读文章
            </button>
            <button 
              @click="activateArticle(article)" 
              class="border border-blue-500 text-blue-500 px-3 py-1 rounded-md text-sm hover:bg-blue-50"
              :class="{'bg-blue-500 text-white': article.isActive}"
            >
              {{ article.isActive ? '下架' : '上架' }}
            </button>
            <button 
              @click="deleteArticle(article)" 
              class="border border-red-500 text-red-500 px-3 py-1 rounded-md text-sm hover:bg-red-50"
            >
              删除
            </button>
          </div>
        </div>

        <!-- 新增部分：将按钮放到文章循环内 -->
        <div class="grid grid-cols-3 gap-1 mt-4 mb-4">
          <button 
            @click="showArticleRanking(article)" 
            class="py-2 rounded-md text-center bg-purple-100 text-purple-800"
          >
            文章排名
          </button>
          <button 
            @click="$router.push({ name: 'reading-report', query: { articleId: article._id } })" 
            class="py-2 rounded-md text-center bg-purple-100 text-purple-800"
          >
            阅读报数
          </button>
          <button 
            @click="showArticleTopDetails(article)" 
            class="bg-purple-100 text-purple-800 py-2 rounded-md text-center hover:bg-purple-200"
          >
            无敌详情
          </button>
        </div>

        <!-- 无敌置顶按钮 -->
        <div 
          @click="openSuperTopModal(article)"
          class="bg-purple-800 text-white py-3 rounded-md text-center mb-4 flex items-center justify-center cursor-pointer hover:bg-purple-900"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          无敌置顶
        </div>
      </div>
    </div>
    
    <!-- 无敌置顶弹窗 -->
    <SuperTopModal
      v-model:visible="showSuperTopModal"
      :time-slots="timeSlots"
      :super-top-periods="currentArticleForDetails?.superTopPeriods || []"
      @submit="handlePurchase"
    />
    
    <!-- 无敌详情弹窗 -->
    <SuperTopDetailsModal
      v-model:visible="showTopDetails"
      :title="currentArticleForDetails?.title"
      :purchased-slots="purchasedSlots"
    />

    <!-- 无敌置顶卡详情弹窗 -->
    <div v-if="showTopCardDetails" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-xl font-bold mb-4">无敌置顶卡详情</h3>
        <div class="space-y-4 text-gray-700">
          <p>使用无敌置顶卡后的文章，将被展示到所有文章的最顶部，每个用户进来都可以优先看到你的文章。</p>
          
          <div class="bg-gray-50 p-3 rounded-md">
            <p class="font-medium">使用规则：</p>
            <ul class="list-decimal list-inside text-sm mt-2 space-y-2">
              <li>显示规则：
                <ul class="list-disc list-inside ml-4">
                  <li>仅在所选时间内展现</li>
                  <li>仅展现给未阅过的用户（自己点过就不重复展示）</li>
                  <li>阅豆小于-50不在无敌区域显示</li>
                  <li>文章或优号必须为上架状态</li>
                </ul>
              </li>
              <li>每小时前5个坑位价格最低，追加坑位仅5个</li>
              <li>仅开放当日及次日的坑位预定</li>
              <li>阅读无敌置顶区文章可获得2个阅币</li>
              <li>每日0点开放新坑位</li>
            </ul>
          </div>
        </div>
        <div class="flex justify-end space-x-3 mt-6">
          <button 
            @click="showTopCardDetails = false" 
            class="px-4 py-2 bg-primary text-white rounded-md"
          >
            我知道了
          </button>
        </div>
      </div>
    </div>

    <!-- 底部提示文本 -->
    <div class="text-center text-gray-500 my-4">
      ~~~我是有底线的~~~
    </div>

    <div class="text-gray-600 text-sm mt-4">
      若文章注重阅读来源，建议可发历史文章链接换页面并指定第几篇，注意：发历史文章链接后请打开预览。若打开异常请检查链接
    </div>

    <!-- 发布文章弹窗 -->
    <PublishArticleModal
      v-model:visible="showPublishModal"
      :article="newArticle"
      @submit="publishArticle"
      @cancel="showPublishModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useUserStore } from '../store/userStore.ts' // 引入 useUserStore
import { showToast } from '../utils/toast';
import { isWeChatBrowser } from '../utils/envUtils';
import SuperTopDetailsModal from '../components/SuperTopDetailsModal.vue'
import SuperTopModal from '../components/SuperTopModal.vue'
import PublishArticleModal from '../components/PublishArticleModal.vue'
import { authFetch, authNuxtFetch } from '../utils/fetchUtils';

const showPublishModal = ref(false)
const showTopCardDetails = ref(false)

// 我的文章数据
const myArticles = ref([])

const userStore = useUserStore() // 实例化用户存储

const newArticle = ref({
  link: '',
  title: '',
  userId: '', // 新增 userId 字段并初始化为空
  publishTime: '2025-03-02 09:15:00',
  readCount: 0,
  requiredReads: 10,
  requirement: '仅阅读',
  sources: ['朋友圈'], // 默认选中朋友圈
})

// 封装获取文章列表的函数
const fetchMyArticles = async () => {
  try {
    // 获取用户 ID
    const userId = userStore.userInfo?.id;

    // 将用户 ID 作为查询参数传递给接口
    if (!userId) {
      console.error('未获取到用户 ID');
      return;
    }

    newArticle.value.userId = userId; // 为 userId 赋值

    const response = await authFetch(`/api/articles/my-articles?userId=${userId}`);
    const data = await response.json();
    if (response.ok && response.status === 200) {
      myArticles.value = data;
    } else {
      console.error('获取文章数据失败');
    }
  } catch (error) {
    console.error('获取文章数据时出现网络错误:', error);
  }
}

onMounted(async () => {
  await fetchMyArticles();
})

const isFormValid = computed(() => {
  return newArticle.value.link && 
         newArticle.value.title && 
         newArticle.value.requiredReads > 0 &&
         newArticle.value.requirement &&
         newArticle.value.sources.length > 0
})

const formatTime = (timeStr) => {
  const date = new Date(timeStr)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`
}

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

    const data = await response.json();
    if (response.ok && response.status === 200) {
      showToast(data.message);

      // 发布文章成功后重新获取文章列表
      await fetchMyArticles();
    } else {
      showToast(data.message);
    }
  } catch (error) {
    console.error('发布文章时出错:', error);
    showToast('发布文章时出现网络错误，请稍后重试。');
  }

  // 重置表单
  newArticle.value = {
    link: '',
    title: '',
    requiredReads: 10,
    requirement: '仅阅读',
    sources: ['朋友圈']
  };

  // 关闭弹窗
  showPublishModal.value = false;
};

// 文章操作方法
const topArticle = async (article) => {
  try {
    console.log('topArticle 方法被调用');
    const response = await authFetch(`/api/articles/${article._id}/top`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userStore.userInfo?.id
      })
    });

    console.log('topArticle response:', response);

    const data = await response.json();
    if (response.ok && response.status === 200) {
      // 更新本地数据
      article.topCount = data.topCount;
      showToast('文章顶操作成功');

      // 文章置顶成功后重新获取文章列表
      await fetchMyArticles();
    } else {
      showToast(data.message);
    }
  } catch (error) {
    console.error('文章顶操作时出错:', error);
    showToast('文章顶操作时出现网络错误，请稍后重试。');
  }
};

const activateArticle = async (article) => {
  try {
    const response = await authFetch(`/api/articles/${article._id}/toggle-active`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isActive: !article.isActive })
    });

    const data = await response.json();
    if (response.ok && response.status === 200) {
      // 更新本地数据
      article.isActive = data.data.isActive;
    } else {
      showToast(data.message);
    }
  } catch (error) {
    console.error('更新文章激活状态时出错:', error);
    showToast('更新文章激活状态时出现网络错误，请稍后重试。');
  }
};

const deleteArticle = async (article) => {
  // 弹出确认对话框
  const isConfirmed = confirm('你确定要删除这篇文章吗？');
  if (isConfirmed) {
    try {
      const response = await authFetch(`/api/articles/${article._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (response.ok && response.status === 200) {
        showToast(data.message);
        const index = myArticles.value.findIndex(a => a._id === article._id);
        if (index !== -1) {
          myArticles.value.splice(index, 1);
        }
      } else {
        showToast(data.message);
      }
    } catch (error) {
      console.error('删除文章时出错:', error);
      showToast('删除文章时出现网络错误，请稍后重试。');
    }
  }
};

// 新增打开文章链接的函数
const openArticleLink = (article) => {
  if (article.link) {
    // 显示加载提示
    showToast('正在跳转中，请稍候...')
    const link = article.link.startsWith('http') ? article.link : `https://${article.link}`;
    if (isWeChatBrowser()) {
      window.location.href = link;
    } else {
      window.open(link, '_blank');
    }
  }
}

const showRankingModal = ref(false);
const rankingInfo = ref('');

const showArticleRanking = async (article) => {
  try {
    const response = await authFetch(`/api/articles/${article._id}/ranking`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if (response.ok && response.status === 200) {
      rankingInfo.value = data.message;
      showRankingModal.value = true;
    } else {
      showToast('获取文章排名信息失败，请稍后重试。');
    }
  } catch (error) {
    console.error('获取文章排名信息时出错:', error);
    showToast('获取文章排名信息时出现网络错误，请稍后重试。');
  }
};
const showSuperTopModal = ref(false);
const showTopDetails = ref(false);
const timeSlots = ref([]); // 初始化 timeSlots 为空数组

const fetchTimeSlots = async () => {
  try {
    const response = await authFetch('/api/time-slots');
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

onMounted(async () => {
  await fetchTimeSlots();
});

// 添加一个ref来存储当前选中的文章
const currentArticle = ref(null);

const handlePurchase = async ({ slots, totalCost }) => {
  if (!currentArticle.value) {
    showToast('请先选择文章');
    return;
  }

  try {
    const response = await authFetch('/api/time-slots/purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userStore.userInfo?.id,
        slots,
        totalCost,
        targetId: currentArticle.value._id
      })
    });

    const data = await response.json();
    if (response.ok && response.status === 200) {
      showToast('购买成功！');
      await fetchTimeSlots();
      await fetchMyArticles();
    } else {
      showToast(data.message || '购买失败');
    }
  } catch (error) {
    console.error('购买时出错:', error);
    showToast('购买时出现网络错误，请稍后重试。');
  } finally {
    showSuperTopModal.value = false;
  }
};

// 在打开弹窗时设置当前文章
const openSuperTopModal = (article) => {
  currentArticle.value = article;
  showSuperTopModal.value = true;
};

const purchasedSlots = ref([]);
const currentArticleForDetails = ref(null);

const showArticleTopDetails = async (article) => {
  currentArticleForDetails.value = article;
  try {
    const response = await authFetch(`/api/articles/${article._id}/purchased-slots`);
    const data = await response.json();
    if (response.ok && response.status === 200) {
      purchasedSlots.value = data.data || [];
    } else {
      console.error('获取置顶记录失败');
    }
  } catch (error) {
    console.error('获取置顶记录时出错:', error);
  }
  showTopDetails.value = true;
};

const confirmTopArticle = async (article) => {
  const isConfirmed = confirm(`确定要花费2阅币顶这篇文章吗？\n\n当前阅币余额: ${userStore.userInfo?.beanCount || 0}`);
  if (isConfirmed) {
    await topArticle(article);
  }
};
</script>

<style scoped>
/* 可以添加自定义样式 */
</style>
