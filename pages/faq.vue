<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
    <div class="container mx-auto px-4">
      <h1 class="text-xl font-bold mb-6">常见问题解答</h1>
      <div class="space-y-8">
        <!-- 问题 1 -->
        <div class="bg-white rounded-xl shadow-lg p-6 transition transform hover:shadow-2xl hover:-translate-y-1">
          <details class="group" :open="activeQuestion === 1" @toggle="toggleQuestion(1, $event.target.open)">
            <summary class="flex justify-between items-center cursor-pointer select-none">
              <h3 class="text-base font-semibold text-blue-600 group-hover:text-blue-700">1、我可以在电脑上使用关关吗，不想用手机</h3>
              <svg class="w-6 h-6 text-gray-500 transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </summary>
            <p class="mt-4 text-gray-600">
              可以的。电脑里安装了微信的话，电脑登录微信后打开关关链接(建议收藏)即可，其他操作和手机一模一样。
            </p>
          </details>
        </div>
        
        <!-- 问题 2 -->
        <div class="bg-white rounded-xl shadow-lg p-6 transition transform hover:shadow-2xl hover:-translate-y-1">
          <details class="group" :open="activeQuestion === 2" @toggle="toggleQuestion(2, $event.target.open)">
            <summary class="flex justify-between items-center cursor-pointer select-none">
              <h3 class="text-base font-semibold text-blue-600 group-hover:text-blue-700">2、我的文章怎么没人阅读？</h3>
              <svg class="w-6 h-6 text-gray-500 transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </summary>
            <div class="mt-4 text-gray-600">
              <p>
                大厅文章排名因素很多，综合来看则是：1、无敌置顶 2、帮助他人的权重 3、文章发布时间 4、顶；3、如果你上一天帮助他人次数很多，那么第二天你的排名会有大幅提高。
              </p>
            </div>
          </details>
        </div>
        
        <!-- 问题 3 -->
        <div class="bg-white rounded-xl shadow-lg p-6 transition transform hover:shadow-2xl hover:-translate-y-1">
          <details class="group" :open="activeQuestion === 3" @toggle="toggleQuestion(3, $event.target.open)">
            <summary class="flex justify-between items-center cursor-pointer select-none">
              <h3 class="text-base font-semibold text-blue-600 group-hover:text-blue-700">3、文章是否已下架或删除？</h3>
              <svg class="w-6 h-6 text-gray-500 transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </summary>
            <div class="mt-4 text-gray-600">
              <p>
                请注意：发布时间超过一个月的文章，请手工置顶一次，否则该文章将不在大厅显示了。<br>
                小招：如果你主动阅了别人，别人可以在“阅我”菜单下看到你，从而进行回阅。助人越多，你的排名越靠前！
              </p>
            </div>
          </details>
        </div>
        
        <!-- 问题 4 -->
        <div class="bg-white rounded-xl shadow-lg p-6 transition transform hover:shadow-2xl hover:-translate-y-1">
          <details class="group" :open="activeQuestion === 4" @toggle="toggleQuestion(4, $event.target.open)">
            <summary class="flex justify-between items-center cursor-pointer select-none">
              <h3 class="text-base font-semibold text-blue-600 group-hover:text-blue-700">4、为什么阅读数和微信后台阅读数不一致？</h3>
              <svg class="w-6 h-6 text-gray-500 transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </summary>
            <p class="mt-4 text-gray-600">
              关关用户全部是真人，无机器人干扰。真人互助时会存在无效阅读现象，关关通过报数让大家看到真实情况。这是微信机制所致，【点广】和【在看】也可能出现不增长的情况。
            </p>
          </details>
        </div>
        
        <!-- 问题 5 -->
        <div class="bg-white rounded-xl shadow-lg p-6 transition transform hover:shadow-2xl hover:-translate-y-1">
          <details class="group" :open="activeQuestion === 5" @toggle="toggleQuestion(5, $event.target.open)">
            <summary class="flex justify-between items-center cursor-pointer select-none">
              <h3 class="text-base font-semibold text-blue-600 group-hover:text-blue-700">5、为什么我的文章/优号不展示？</h3>
              <svg class="w-6 h-6 text-gray-500 transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </summary>
            <div class="mt-4 text-gray-600">
              <p>
                1. 文章/优号下架（仅上架状态可见）<br>
                2. 自动回复设置错误，导致匹配失败，被系统下架<br>
                3. 阅豆不足<br>
                4. 排名靠后<br>
                5. 信用过低
              </p>
            </div>
          </details>
        </div>
        
        <!-- 问题 6 -->
        <div class="bg-white rounded-xl shadow-lg p-6 transition transform hover:shadow-2xl hover:-translate-y-1">
          <details class="group" :open="activeQuestion === 6" @toggle="toggleQuestion(6, $event.target.open)">
            <summary class="flex justify-between items-center cursor-pointer select-none">
              <h3 class="text-base font-semibold text-blue-600 group-hover:text-blue-700">6、我用了无敌置顶，但是为什么没显示？</h3>
              <svg class="w-6 h-6 text-gray-500 transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </summary>
            <div class="mt-4 text-gray-600">
              <p>
                显示规则：<br>
                1. 仅在所选时间内展现，且只展现给未阅/未粉用户（避免重复影响阅读/粉）；<br>
                2. 阅豆低于 -50 的不显示；<br>
                3. 文章/优号必须上架状态。
              </p>
            </div>
          </details>
        </div>
        
        <!-- 问题 7 -->
        <div class="bg-white rounded-xl shadow-lg p-6 transition transform hover:shadow-2xl hover:-translate-y-1">
          <details class="group" :open="activeQuestion === 7" @toggle="toggleQuestion(7, $event.target.open)">
            <summary class="flex justify-between items-center cursor-pointer select-none">
              <h3 class="text-base font-semibold text-blue-600 group-hover:text-blue-700">7、我粉了别人却被举报怎么办</h3>
              <svg class="w-6 h-6 text-gray-500 transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </summary>
            <div class="mt-4 text-gray-600">
              <p>
                请先检查粉对方时微信昵称和头像是否与关关一致；如不一致，对方可能无法匹配而举报。若一致但遭恶意举报，请进入“我的”-“举报记录”，点击“联系对方”获取对方二维码后直接取关即可。
              </p>
            </div>
          </details>
        </div>
        
        <!-- 问题 8 -->
        <div class="bg-white rounded-xl shadow-lg p-6 transition transform hover:shadow-2xl hover:-translate-y-1">
          <details class="group" :open="activeQuestion === 8" @toggle="toggleQuestion(8, $event.target.open)">
            <summary class="flex justify-between items-center cursor-pointer select-none">
              <h3 class="text-base font-semibold text-blue-600 group-hover:text-blue-700">8、如何举报和查看别人对自己的举报？</h3>
              <svg class="w-6 h-6 text-gray-500 transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </summary>
            <p class="mt-4 text-gray-600">
              关关支持对无效阅读、乱报数、点广、在看及粉友进行举报。举报后，可在“我的”-“举报记录”中查看处理情况。
            </p>
          </details>
        </div>
        
        <!-- 问题 9 -->
        <div class="bg-white rounded-xl shadow-lg p-6 transition transform hover:shadow-2xl hover:-translate-y-1">
          <details class="group" :open="activeQuestion === 9" @toggle="toggleQuestion(9, $event.target.open)">
            <summary class="flex justify-between items-center cursor-pointer select-none">
              <h3 class="text-base font-semibold text-blue-600 group-hover:text-blue-700">9、关关的头像、昵称和我微信的不一致怎么办</h3>
              <svg class="w-6 h-6 text-gray-500 transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </summary>
            <p class="mt-4 text-gray-600">
              请点击“我的”页面顶部的“刷新同步”按钮。若你刚修改微信信息，请等待几天再试，期间建议暂停粉人。
            </p>
          </details>
        </div>
        
        <!-- 问题 10 -->
        <div class="bg-white rounded-xl shadow-lg p-6 transition transform hover:shadow-2xl hover:-translate-y-1">
          <details class="group" :open="activeQuestion === 10" @toggle="toggleQuestion(10, $event.target.open)">
            <summary class="flex justify-between items-center cursor-pointer select-none">
              <h3 class="text-base font-semibold text-blue-600 group-hover:text-blue-700">10、我的文章链接还能不能修改？</h3>
              <svg class="w-6 h-6 text-gray-500 transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </summary>
            <p class="mt-4 text-gray-600">
              发布时会有红色提示“文章仅可被修改一次”，即每篇文章仅有两次修改机会；若已修改两次，则无法再更改。
            </p>
          </details>
        </div>
        
        <!-- 问题 11 -->
        <div class="bg-white rounded-xl shadow-lg p-6 transition transform hover:shadow-2xl hover:-translate-y-1">
          <details class="group" :open="activeQuestion === 11" @toggle="toggleQuestion(11, $event.target.open)">
            <summary class="flex justify-between items-center cursor-pointer select-none">
              <h3 class="text-base font-semibold text-blue-600 group-hover:text-blue-700">11、无敌置顶坑位到底要怎么才能抢的到？</h3>
              <svg class="w-6 h-6 text-gray-500 transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </summary>
            <div class="mt-4 text-gray-600">
              <p>
                1. 无敌置顶坑位每天0点放量；<br>
                2. 若使用无敌置顶，可先发个临时链接占坑，待发文时利用“文章仅可被修改一次”修改为最新链接。
              </p>
            </div>
          </details>
        </div>
        
        <!-- 问题 12 -->
        <div class="bg-white rounded-xl shadow-lg p-6 transition transform hover:shadow-2xl hover:-translate-y-1">
          <details class="group" :open="activeQuestion === 12" @toggle="toggleQuestion(12, $event.target.open)">
            <summary class="flex justify-between items-center cursor-pointer select-none">
              <h3 class="text-base font-semibold text-blue-600 group-hover:text-blue-700">12、提示我微信质量过低不能继续使用了怎么办？</h3>
              <svg class="w-6 h-6 text-gray-500 transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </summary>
            <p class="mt-4 text-gray-600">
              表示你的wx账号质量较低（可能是新号或阅读过多），建议百度“wx养号”，一个月后再联系客服。出现提示后，暂时无法继续阅读，但其他功能不受影响。
            </p>
          </details>
        </div>
        
        <!-- 问题 13 -->
        <div class="bg-white rounded-xl shadow-lg p-6 transition transform hover:shadow-2xl hover:-translate-y-1">
          <details class="group" :open="activeQuestion === 13" @toggle="toggleQuestion(13, $event.target.open)">
            <summary class="flex justify-between items-center cursor-pointer select-none">
              <h3 class="text-base font-semibold text-blue-600 group-hover:text-blue-700">13、粉优号时，点灌注被wx提示操作频繁，请稍后再试？</h3>
              <svg class="w-6 h-6 text-gray-500 transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </summary>
            <p class="mt-4 text-gray-600">
              此提示由wx平台发出。遇此情况，请休息几天再操作，并建议每天粉人数量控制在50人以内。
            </p>
          </details>
        </div>
        
        <!-- 问题 14 -->
        <div class="bg-white rounded-xl shadow-lg p-6 transition transform hover:shadow-2xl hover:-translate-y-1">
          <details class="group" :open="activeQuestion === 14" @toggle="toggleQuestion(14, $event.target.open)">
            <summary class="flex justify-between items-center cursor-pointer select-none">
              <h3 class="text-base font-semibold text-blue-600 group-hover:text-blue-700">14、为什么每天的官住还有数量限制？</h3>
              <svg class="w-6 h-6 text-gray-500 transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </summary>
            <p class="mt-4 text-gray-600">
              官住操作过多会触发wx“操作频繁”提示，导致多日无法使用官住功能。关关为保护账号做了限制，建议按提示操作。
            </p>
          </details>
        </div>
        
        <!-- 问题 15 -->
        <div class="bg-white rounded-xl shadow-lg p-6 transition transform hover:shadow-2xl hover:-translate-y-1">
          <details class="group" :open="activeQuestion === 15" @toggle="toggleQuestion(15, $event.target.open)">
            <summary class="flex justify-between items-center cursor-pointer select-none">
              <h3 class="text-base font-semibold text-blue-600 group-hover:text-blue-700">15、官住我的人太多，我来不及回粉怎么办？</h3>
              <svg class="w-6 h-6 text-gray-500 transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </summary>
            <p class="mt-4 text-gray-600">
              当官住操作过多触发wx限制（提示“操作频繁”）时，你可以每天适量回粉，或暂时下架优号以控制被粉速度。
            </p>
          </details>
        </div>
        
        <!-- 问题 16 -->
        <div class="bg-white rounded-xl shadow-lg p-6 transition transform hover:shadow-2xl hover:-translate-y-1">
          <details class="group" :open="activeQuestion === 16" @toggle="toggleQuestion(16, $event.target.open)">
            <summary class="flex justify-between items-center cursor-pointer select-none">
              <h3 class="text-base font-semibold text-blue-600 group-hover:text-blue-700">16、我必须回粉吗？</h3>
              <svg class="w-6 h-6 text-gray-500 transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </summary>
            <p class="mt-4 text-gray-600">
              回粉不强制，但关关鼓励大家积极互助。长时间不回粉可能导致对方取消官住，同时回粉还能获得阅豆和提升排名。
            </p>
          </details>
        </div>
        
        <!-- 问题 17 -->
        <div class="bg-white rounded-xl shadow-lg p-6 transition transform hover:shadow-2xl hover:-translate-y-1">
          <details class="group" :open="activeQuestion === 17" @toggle="toggleQuestion(17, $event.target.open)">
            <summary class="flex justify-between items-center cursor-pointer select-none">
              <h3 class="text-base font-semibold text-blue-600 group-hover:text-blue-700">17、如何设置被官住自动回复？</h3>
              <svg class="w-6 h-6 text-gray-500 transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </summary>
            <div class="mt-4 text-gray-600">
              <p>
                1. 若已设置自动回复，直接复制（可通过重新官住自己的优号查看回复内容），再到“优号”菜单下修改公众号并重新发布；<br>
                2. 若未设置，请到wx公众后台设置“被官住自动回复内容”，再按上述步骤操作。<br>
                * 仅支持文本回复，若有多条请选择第一条。
              </p>
            </div>
          </details>
        </div>
        
        <!-- 问题 18 -->
        <div class="bg-white rounded-xl shadow-lg p-6 transition transform hover:shadow-2xl hover:-translate-y-1">
          <details class="group" :open="activeQuestion === 18" @toggle="toggleQuestion(18, $event.target.open)">
            <summary class="flex justify-between items-center cursor-pointer select-none">
              <h3 class="text-base font-semibold text-blue-600 group-hover:text-blue-700">18、关关安全吗？我会被封吗？</h3>
              <svg class="w-6 h-6 text-gray-500 transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </summary>
            <p class="mt-4 text-gray-600">
              关关至今未接到用户投诉被封，所有用户均为真人，系统不存在机器人操作。
            </p>
          </details>
        </div>
        
        <!-- 问题 19 -->
        <div class="bg-white rounded-xl shadow-lg p-6 transition transform hover:shadow-2xl hover:-translate-y-1">
          <details class="group" :open="activeQuestion === 19" @toggle="toggleQuestion(19, $event.target.open)">
            <summary class="flex justify-between items-center cursor-pointer select-none">
              <h3 class="text-base font-semibold text-blue-600 group-hover:text-blue-700">19、为什么别人粉不了我的优号？为什么总是自动下架？</h3>
              <svg class="w-6 h-6 text-gray-500 transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </summary>
            <p class="mt-4 text-gray-600">
              你的优号自动回复设置错误，导致别人无法正确官住。请参考上述常见问题调整自动回复设置。
            </p>
          </details>
        </div>
        
        <!-- 问题 20 -->
        <div class="bg-white rounded-xl shadow-lg p-6 transition transform hover:shadow-2xl hover:-translate-y-1">
          <details class="group" :open="activeQuestion === 20" @toggle="toggleQuestion(20, $event.target.open)">
            <summary class="flex justify-between items-center cursor-pointer select-none">
              <h3 class="text-base font-semibold text-blue-600 group-hover:text-blue-700">20、我视频号任务提示操作频繁</h3>
              <svg class="w-6 h-6 text-gray-500 transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </summary>
            <p class="mt-4 text-gray-600">
              视频号任务要求每个视频至少观看10秒，操作间隔10秒，建议保持20秒以上间隔以避免频繁提示。
            </p>
          </details>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 用于跟踪当前激活的问题
const activeQuestion = ref(null);

// 切换问题展开状态的函数
const toggleQuestion = (questionNumber, isExpanding) => {
  if (isExpanding) {
    console.log(`Expanding question ${questionNumber}`); // 仅在展开时输出调试信息
    if (activeQuestion.value!== questionNumber) {
      activeQuestion.value = questionNumber;
    }
  } else {
    if (activeQuestion.value === questionNumber) {
      activeQuestion.value = null;
    }
  }
};
</script>

<style scoped>
/* 隐藏 details 默认的标记 */
details summary::-webkit-details-marker {
  display: none;
}
</style>