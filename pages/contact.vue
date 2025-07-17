<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white py-4 md:py-6">
    <div class="container mx-auto px-4 md:px-6 py-4 max-w-4xl">
      <h1 class="text-xl font-bold mb-6">联系我们</h1>
      
      <div class="space-y-4">
        <!-- 商务合作 -->
        <div class="bg-white p-6 rounded-xl shadow-lg">
          <h2 class="text-xl font-semibold text-blue-600 mb-4">商务合作</h2>
          <p class="text-gray-600 mb-4">
            承接各类编程开发需求，包括：
          </p>
          <ul class="list-disc list-inside text-gray-600 mb-4 space-y-2">
            <li>小程序开发</li>
            <li>微信公众号开发</li>
            <li>网站开发</li>
            <li>管理系统开发</li>
          </ul>
          <div class="mt-4">
            <span class="font-medium">联系邮箱：</span>
            <a 
              href="mailto:18682441907@163.com" 
              class="text-blue-600 hover:text-blue-800 break-all">
              18682441907@163.com
            </a>
          </div>
        </div>

        <!-- 平台咨询 -->
        <div class="bg-white p-6 rounded-xl shadow-lg">
          <h2 class="text-xl font-semibold text-blue-600 mb-4">平台相关问题咨询</h2>
          <p class="text-gray-600">
            请到 <span class="font-medium">个人中心 → 菜单栏第一个 → 在线客服</span> 进行咨询
          </p>
        </div>

        <NuxtLink 
          to="/profile" 
          class="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          返回个人中心
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
}
</style>
