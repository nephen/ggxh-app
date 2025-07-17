<template>
  <div 
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h3 class="text-xl font-bold mb-4">无敌置顶记录 - {{ title }}</h3>
      
      <div v-if="purchasedSlots.length === 0" class="text-gray-500 text-center py-4">
        暂无置顶记录
      </div>
      
      <div v-else class="space-y-3 max-h-96 overflow-y-auto">
        <div 
          v-for="purchase in purchasedSlots" 
          :key="purchase._id"
          class="border rounded p-3"
        >
          <div class="flex justify-between">
            <div class="font-medium">
              {{ formatDate(purchase.timeSlot.day) }} {{ purchase.timeSlot.time }}
            </div>
            <div class="text-red-500">
              -{{ purchase.cost }} 豆
            </div>
          </div>
          <div class="text-sm text-gray-500 mt-1">
            购买时间: {{ formatDateTime(purchase.createdAt) }}
          </div>
          <div class="text-sm text-gray-500">
            位置: 第{{ purchase.position }}位
          </div>
        </div>
      </div>
      
      <div class="flex justify-end mt-4">
        <button 
          @click="$emit('update:visible', false)" 
          class="px-4 py-2 bg-primary text-white rounded-md"
        >
          关闭
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDate, formatDateTime } from '../utils/dateUtils';

defineProps({
  visible: Boolean,
  title: String,
  purchasedSlots: {
    type: Array,
    default: () => []
  }
})

defineEmits(['update:visible'])
</script>