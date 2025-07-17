import mongoose from 'mongoose';

const wechatAccountTimeSlotPurchaseSchema = new mongoose.Schema({
  // 关联的用户ID
  userId: {
    type: Number,
    required: true
  },
  // 关联的公众号账号ID
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WechatAccount',
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
    day: Date,
    time: String,
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

export const WechatAccountTimeSlotPurchase = mongoose.model('WechatAccountTimeSlotPurchase', wechatAccountTimeSlotPurchaseSchema);