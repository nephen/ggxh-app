import mongoose from 'mongoose';

const timeSlotPurchaseSchema = new mongoose.Schema({
  // 关联的用户ID
  userId: {
    type: Number,
    required: true
  },
  // 关联的文章ID
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true
  },
  // 购买的具体日期
  purchaseDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  // 购买的时间段
  timeSlot: {
    day: Date, // 改为Date类型
    time: String, // 如 '08:00 - 09:00'
    price: Number
  },
  // 购买的位置
  position: {
    type: Number,
    required: true
  },
  // 花费的阅豆数量
  cost: {
    type: Number,
    required: true
  },
  // 购买时间
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const TimeSlotPurchase = mongoose.model('TimeSlotPurchase', timeSlotPurchaseSchema);