<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded-xl w-full max-w-2xl flex flex-col"
      style="max-height: 80vh;"
    >
      <!-- 头部：标题、Tab 切换等 -->
      <div class="p-4 border-b">
        <h3 class="text-xl font-bold">无敌置顶卡</h3>
      </div>
      <div class="p-4 border-b">
        <div class="flex space-x-6">
          <button
            :class="[
              'pb-2',
              currentTab === 'today' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600'
            ]"
            @click="currentTab = 'today'"
          >
            今天
          </button>
          <button
            :class="[
              'pb-2',
              currentTab === 'tomorrow' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600'
            ]"
            @click="currentTab = 'tomorrow'"
          >
            明天
          </button>
        </div>
      </div>

      <!-- 中间可滚动区域：时间段选择列表 -->
      <div class="overflow-y-auto flex-1 p-4">
        <p class="text-gray-600 mb-4">剩余空位数量会实时更新，越早购买的在超级置顶里排名越靠前。</p>
        <div 
          v-for="slot in filteredSlots" 
          :key="slot.time" 
          class="border rounded-lg p-4 mb-2"
          :class="{'opacity-50 cursor-not-allowed': slot.remaining <= 0 || isSlotExpired(slot) || isSlotPurchased(slot)}"
        >
          <label class="flex items-center justify-between">
            <div>
              <div class="font-medium">
                {{ slot.time }}
              </div>
              <div class="text-sm text-gray-500">
                {{ slot.remaining }} 个剩余 / {{ slot.price }} 豆
                <span v-if="isSlotExpired(slot)" class="text-red-500 ml-2">(已过期)</span>
                <span v-if="isSlotPurchased(slot)" class="text-red-500 ml-2">(已购买)</span>
              </div>
            </div>
            <input
              type="checkbox"
              v-model="selectedSlots"
              :value="slot"
              :disabled="slot.remaining <= 0 || isSlotExpired(slot) || isSlotPurchased(slot)"
              class="h-5 w-5 text-blue-600 rounded border-gray-300"
            />
          </label>
        </div>
      </div>

      <!-- 底部固定：提示信息 + 按钮操作 -->
      <div class="border-t p-4">
        <div class="text-sm text-red-500 mb-2">
          * 阅豆小于 -50 将不显示无敌优号 | 购买后不支持退款
        </div>
        <div class="flex justify-between items-center">
          <div class="font-medium">
            预计消耗：<span class="text-blue-600">{{ totalCost }}</span> 豆
          </div>
          <div class="space-x-3">
            <button
              @click="handleCancel"
              class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              取消
            </button>
            <button
              @click="handleSubmit"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              立即购买
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  visible: Boolean,
  timeSlots: Array,
  superTopPeriods: Array  // 改为直接接收superTopPeriods
})

const emit = defineEmits(['update:visible', 'submit'])

const currentTab = ref('today')
const selectedSlots = ref([])

const filteredSlots = computed(() => {
  return props.timeSlots.filter(s => s.day === currentTab.value)
})

const totalCost = computed(() => {
  return selectedSlots.value.reduce((sum, slot) => sum + slot.price, 0)
})

const isSlotExpired = (slot) => {
  if (slot.day !== 'today') return false
  const [startTime] = slot.time.split(' - ')
  const [hours] = startTime.split(':')
  const now = new Date()
  return parseInt(hours) < now.getHours()
}

const isSlotPurchased = (slot) => {
  if (!props.superTopPeriods) return false;
  
  // 获取当前日期
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  // 根据slot.day确定日期
  const slotDate = new Date(today);
  if (slot.day === 'tomorrow') {
    slotDate.setDate(slotDate.getDate() + 1);
  }
  
  // 解析时间段，假设格式为"HH:00 - HH:00"
  const [startTimeStr, endTimeStr] = slot.time.split(' - ');
  const [startHour] = startTimeStr.split(':');
  const [endHour] = endTimeStr.split(':');
  
  // 创建完整的开始和结束时间
  const slotStartTime = new Date(slotDate);
  slotStartTime.setHours(parseInt(startHour), 0, 0, 0);
  
  const slotEndTime = new Date(slotDate);
  slotEndTime.setHours(parseInt(endHour), 0, 0, 0);

  // 检查是否已经购买了该时间段
  return props.superTopPeriods.some(period => {
    const periodStart = new Date(period.startTime);
    const periodEnd = new Date(period.endTime);

    // 检查日期和时间是否重叠
    return (
      (slotStartTime >= periodStart && slotStartTime < periodEnd) ||
      (slotEndTime > periodStart && slotEndTime <= periodEnd) ||
      (slotStartTime <= periodStart && slotEndTime >= periodEnd)
    );
  });
};

const handleCancel = () => {
  selectedSlots.value = []
  emit('update:visible', false)
}

const handleSubmit = () => {
  emit('submit', {
    slots: selectedSlots.value,
    totalCost: totalCost.value
  })
  selectedSlots.value = []
}
</script>