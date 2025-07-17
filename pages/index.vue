<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white py-8">
    <!-- 头部 -->
    <header class="bg-blue-600 text-white py-4 text-center">
      <h1 class="text-2xl font-bold">关关相互 - 公众号互助平台</h1>
      <p class="mt-2 text-blue-100">真人互助 | 精准匹配 | 数据透明</p>
    </header>

    <div class="container mx-auto max-w-4xl mt-6 p-4 space-y-6">
      <!-- 平台优势 -->
      <div class="bg-white p-6 rounded-xl shadow-lg">
        <h2 class="text-xl font-semibold mb-4 text-center">平台优势</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="text-center p-4">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h3 class="font-medium mb-1">真实用户</h3>
            <p class="text-gray-600 text-sm">100%真实用户互动，拒绝机器刷量</p>
          </div>
          <div class="text-center p-4">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 class="font-medium mb-1">快速见效</h3>
            <p class="text-gray-600 text-sm">24小时内完成互助任务，效果立竿见影</p>
          </div>
          <div class="text-center p-4">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h3 class="font-medium mb-1">数据透明</h3>
            <p class="text-gray-600 text-sm">实时数据统计，效果一目了然</p>
          </div>
        </div>
      </div>

      <!-- 网站标识 -->
      <div class="text-center">
        <img 
          src="/logo.png" 
          alt="关关相互 - 公众号互助平台 - 真实用户互阅互关平台" 
          class="w-full h-auto mx-auto mb-4"
          title="关关相互 - 公众号互助平台 | 提升阅读量和粉丝量"
          loading="lazy">
      </div>

      <!-- 核心功能展示 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 文章阅读功能 -->
        <div class="bg-white p-6 rounded-xl shadow-lg">
          <div class="flex items-center mb-4">
            <svg class="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
            </svg>
            <h2 class="text-xl font-semibold">文章互阅</h2>
          </div>
          <ul class="space-y-3 text-gray-600">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              真人互助阅读，提升文章阅读量
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              精准匹配同领域读者
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              阅读数据实时统计
            </li>
          </ul>
          <NuxtLink 
            to="/articles" 
            class="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            立即体验
          </NuxtLink>
        </div>

        <!-- 公众号互关功能 -->
        <div class="bg-white p-6 rounded-xl shadow-lg">
          <div class="flex items-center mb-4">
            <svg class="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <h2 class="text-xl font-semibold">公众号互助</h2>
          </div>
          <ul class="space-y-3 text-gray-600">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              真实用户互助，提升公众号影响力
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              精准匹配同领域公众号
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              数据增长实时可见
            </li>
          </ul>
          <NuxtLink 
            to="/users" 
            class="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            立即体验
          </NuxtLink>
        </div>
      </div>

      <!-- 网站标识 -->
      <div class="text-center">
        <img 
          src="/logo2.png" 
          alt="关关相互 - 公众号互助平台 - 三步完成互助任务" 
          class="w-full h-auto mx-auto mb-4"
          title="关关相互 - 24小时内完成互助任务"
          loading="lazy">
      </div>

      <!-- 使用流程 -->
      <div class="bg-white p-6 rounded-xl shadow-lg">
        <h2 class="text-xl font-semibold mb-4 text-center">三步轻松使用</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="text-center p-4">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span class="text-blue-600 font-bold text-xl">1</span>
            </div>
            <h3 class="font-medium mb-1">发布任务</h3>
            <p class="text-gray-600 text-sm">简单填写文章链接或公众号信息</p>
          </div>
          <div class="text-center p-4">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span class="text-blue-600 font-bold text-xl">2</span>
            </div>
            <h3 class="font-medium mb-1">智能匹配</h3>
            <p class="text-gray-600 text-sm">系统自动匹配最适合的互助伙伴</p>
          </div>
          <div class="text-center p-4">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span class="text-blue-600 font-bold text-xl">3</span>
            </div>
            <h3 class="font-medium mb-1">完成任务</h3>
            <p class="text-gray-600 text-sm">互助完成后查看效果数据</p>
          </div>
        </div>
      </div>

      <!-- 用户评价 -->
      <div class="bg-white p-6 rounded-xl shadow-lg">
        <h2 class="text-xl font-semibold mb-4 text-center">用户评价</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="flex items-center mb-2">
              <img src="/avatar-placeholder.png" class="w-10 h-10 rounded-full mr-3">
              <div>
                <p class="font-medium">运营小张</p>
                <p class="text-sm text-gray-500">公众号运营</p>
              </div>
            </div>
            <p class="text-gray-600">"使用一周粉丝增长200+，效果远超预期！"</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="flex items-center mb-2">
              <img src="/avatar-placeholder.png" class="w-10 h-10 rounded-full mr-3">
              <div>
                <p class="font-medium">自媒体老王</p>
                <p class="text-sm text-gray-500">自媒体人</p>
              </div>
            </div>
            <p class="text-gray-600">"文章阅读量从100提升到800，终于突破流量瓶颈！"</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="flex items-center mb-2">
              <img src="/avatar-placeholder.png" class="w-10 h-10 rounded-full mr-3">
              <div>
                <p class="font-medium">电商李总</p>
                <p class="text-sm text-gray-500">电商创业者</p>
              </div>
            </div>
            <p class="text-gray-600">"精准匹配目标用户，转化率提升明显！"</p>
          </div>
        </div>
      </div>

      <!-- 网站标识 -->
      <div class="text-center">
        <img 
          src="/logo3.png" 
          alt="关关相互 - 公众号互助平台 - 10,000+公众号选择" 
          class="w-full h-auto mx-auto mb-4"
          title="关关相互 - 专业公众号互助解决方案"
          loading="lazy">
      </div>

      <!-- 常见问题 -->
      <div class="bg-white p-6 rounded-xl shadow-lg">
        <h2 class="text-xl font-semibold mb-4 text-center">常见问题</h2>
        <div class="space-y-4">
          <div class="border-b border-gray-200 pb-4">
            <h3 class="font-medium text-gray-800">如何保证互助质量？</h3>
            <p class="text-gray-600 text-sm mt-1">我们采用实名认证+行为分析双重机制，确保每个用户都是真实有效的。</p>
          </div>
          <div class="border-b border-gray-200 pb-4">
            <h3 class="font-medium text-gray-800">互助需要多长时间完成？</h3>
            <p class="text-gray-600 text-sm mt-1">通常在24小时内完成，高峰期可能需要48小时。</p>
          </div>
          <div class="border-b border-gray-200 pb-4">
            <h3 class="font-medium text-gray-800">如何避免违规风险？</h3>
            <p class="text-gray-600 text-sm mt-1">我们严格遵循平台规则，采用自然阅读行为模式，确保安全合规。</p>
          </div>
        </div>
      </div>

      <!-- 行动号召 -->
      <div class="bg-blue-600 text-white p-6 rounded-xl text-center">
        <h2 class="text-xl font-semibold mb-2">立即开始提升您的公众号影响力</h2>
        <p class="mb-6">已有超过10,000+公众号选择我们</p>
        <NuxtLink 
          to="/profile" 
          class="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
        >
          立即体验
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  meta: [
    { name: 'baidu-site-verification', content: 'codeva-kTz4lfNScG' }
  ]
})
</script>
