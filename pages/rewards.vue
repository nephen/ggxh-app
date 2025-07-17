<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white py-4 md:py-6">
    <div class="container mx-auto px-4 md:px-6 py-4 max-w-4xl">
      <!-- 签到奖励 -->
      <div class="bg-white p-4 md:p-6 rounded-xl shadow-lg mb-4 md:mb-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-3">签到奖励</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 class="font-medium text-gray-700">连续签到7日</h3>
              <p class="text-sm text-gray-500">额外获赠70阅豆</p>
            </div>
            <div class="flex items-center">
              <span class="text-sm text-gray-500 mr-2">3/7天</span>
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 class="font-medium text-gray-700">连续一个月签到</h3>
              <p class="text-sm text-gray-500">额外获赠300阅豆</p>
            </div>
            <div class="flex items-center">
              <span class="text-sm text-gray-500 mr-2">15/30天</span>
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 助阅任务 -->
      <div class="bg-white p-6 rounded-xl shadow-lg mb-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">助阅任务</h2>
        <div class="bg-blue-50 p-3 rounded-lg mb-4 flex items-center">
          <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p class="text-sm font-medium text-blue-800">每助阅1篇文章可获得2阅豆</p>
        </div>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 class="font-medium text-gray-700">当日助阅50篇</h3>
              <p class="text-sm text-gray-500">额外获赠50阅豆</p>
            </div>
            <span class="text-sm text-gray-500">已完成：32篇</span>
          </div>

          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 class="font-medium text-gray-700">当日助阅80篇</h3>
              <p class="text-sm text-gray-500">额外获赠80阅豆</p>
            </div>
            <span class="text-sm text-gray-500">已完成：32篇</span>
          </div>

          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 class="font-medium text-gray-700">当日助阅100篇</h3>
              <p class="text-sm text-gray-500">额外获赠100阅豆</p>
            </div>
            <span class="text-sm text-gray-500">已完成：32篇</span>
          </div>
        </div>
        <NuxtLink 
          to="/articles" 
          class="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
          去助阅
        </NuxtLink>
      </div>

      <!-- 助关任务 -->
      <div class="bg-white p-6 rounded-xl shadow-lg">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">助关任务</h2>
        <div class="bg-blue-50 p-3 rounded-lg mb-4 flex items-center">
          <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p class="text-sm font-medium text-blue-800">每助关1个用户可获得6阅豆</p>
        </div>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 class="font-medium text-gray-700">当日助关30用户</h3>
              <p class="text-sm text-gray-500">额外获赠60阅豆</p>
            </div>
            <span class="text-sm text-gray-500">已完成：12人</span>
          </div>

          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 class="font-medium text-gray-700">当日助关50用户</h3>
              <p class="text-sm text-gray-500">额外获赠100阅豆</p>
            </div>
            <span class="text-sm text-gray-500">已完成：12人</span>
          </div>
        </div>
        <NuxtLink 
          to="/users" 
          class="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
          去助关
        </NuxtLink>
      </div>

      <!-- 推荐奖励 -->
      <div class="bg-white p-6 rounded-xl shadow-lg mb-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">推荐奖励</h2>
        <div class="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg mb-4 border border-blue-200">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div>
              <p class="text-sm font-medium text-blue-800 leading-6">每推荐1个用户可获得<span class="font-bold text-blue-900">4阅豆</span></p>
            </div>
          </div>
        </div>
        <div class="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg mb-4 border border-blue-200">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div>
              <p class="text-sm font-medium text-blue-800 leading-6 mt-1">推荐的用户每赚<span class="font-bold text-blue-900">10阅豆</span>，你可获得<span class="font-bold text-blue-900">1阅豆</span>奖励</p>
            </div>
          </div>
        </div>
        <NuxtLink 
          to="/promotion" 
          class="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
          去推广
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// 可以在此处添加状态管理逻辑
const progressDays = ref(3)
const totalDays = ref(7)
const articlesRead = ref(32)
const usersFollowed = ref(12)
</script>
