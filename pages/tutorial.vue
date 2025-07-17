<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white py-4 md:py-6">
    <div class="container mx-auto p-4 max-w-4xl">
      <h1 class="text-xl font-bold mb-6">新手教程</h1>
      
      <!-- 发布文章教程 -->
      <div class="bg-white p-6 rounded-xl shadow-lg mb-6">
        <h2 class="text-xl font-semibold mb-4 flex items-center">
          <svg class="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          如何发布文章
        </h2>
        <div class="space-y-4">
          <div class="flex items-start">
            <div class="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</div>
            <p>点击顶部导航栏的"发布文章"按钮</p>
          </div>
          <div class="flex items-start">
            <div class="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</div>
            <p>填写文章链接、标题和期望阅读量</p>
          </div>
          <div class="flex items-start">
            <div class="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</div>
            <p>设置阅读要求和阅读来源</p>
          </div>
          <div class="flex items-start">
            <div class="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">4</div>
            <p>点击"确定"按钮完成</p>
          </div>
        </div>
      </div>

      <!-- 阅读他人文章教程 -->
      <div class="bg-white p-6 rounded-xl shadow-lg mb-6">
        <h2 class="text-xl font-semibold mb-4 flex items-center">
          <svg class="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
          如何阅读他人文章
        </h2>
        <div class="space-y-4">
          <div class="flex items-start">
            <div class="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</div>
            <p>在文章列表中找到感兴趣的文章</p>
          </div>
          <div class="flex items-start">
            <div class="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</div>
            <p>点击"阅Ta"按钮跳转到文章页面</p>
          </div>
          <div class="flex items-start">
            <div class="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</div>
            <p>认真阅读至少10秒以上</p>
          </div>
          <div class="flex items-start">
            <div class="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">4</div>
            <p>返回平台填写真实阅读数</p>
          </div>
        </div>
      </div>

      <!-- 阅豆奖励教程 -->
      <div class="bg-white p-6 rounded-xl shadow-lg">
        <h2 class="text-xl font-semibold mb-4 flex items-center">
          <svg class="w-6 h-6 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          如何获得阅豆奖励
        </h2>
        <div class="space-y-4">
          <div class="flex items-start">
            <div class="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</div>
            <p>阅读完文章并正确报数可获得2阅豆</p>
          </div>
          <div class="flex items-start">
            <div class="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</div>
            <p>邀请好友使用可获得4阅豆/人</p>
          </div>
          <div class="flex items-start">
            <div class="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">4</div>
            <p>完成每日任务可获得额外阅豆</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 页面元信息
definePageMeta({
  title: '新手教程',
  description: '了解如何使用关关相互平台发布文章、阅读他人文章和获取阅豆奖励'
})
</script>