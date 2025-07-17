import mongoose from 'mongoose';

// 定义时间段模型的 Schema
const timeSlotSchema = new mongoose.Schema({
  // 所属日期，'today'表示今天，'tomorrow'表示明天
  day: {
    type: String,
    enum: ['today', 'tomorrow'],
    required: true
  },
  // 时间段，例如 '00:00 - 07:00'
  time: {
    type: String,
    required: true
  },
  // 剩余空位数量
  remaining: {
    type: Number,
    required: true
  },
  // 价格
  price: {
    type: Number,
    required: true
  }
}, {
  timestamps: true // 自动添加 createdAt 和 updatedAt 字段
});

// 创建并导出 TimeSlot 模型
export const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);