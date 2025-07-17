import { Schema, model } from 'mongoose';

const withdrawalSchema = new Schema({
  userId: { type: Number, required: true },
  amount: { type: Number, required: true }, // 提现金额(单位：元)
  beans: { type: Number, required: true }, // 消耗的阅豆数量
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'completed', 'rejected'],
    default: 'pending'
  },
  paymentQRCode: { type: String }, // 收款码URL
  createdAt: { type: Date, default: Date.now },
  processedAt: { type: Date },
  rejectReason: { type: String }
});

export default model('Withdrawal', withdrawalSchema);