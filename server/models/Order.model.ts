import { Schema, model } from 'mongoose';

const OrderSchema = new Schema({
  userId: { type: Number, required: true },
  orderNo: { type: String, required: true, unique: true },
  amount: { type: Number, required: true }, // 金额(分)
  beans: { type: Number, required: true }, // 阅豆数量
  status: { 
    type: String, 
    enum: ['pending', 'OD', 'CD', 'RD', 'UD'], // OD:已支付, CD:已退款, RD:退款中, UD:退款失败
    default: 'pending' 
  },
  paymentMethod: String,
  paymentTime: Date,
  createTime: { type: Date, default: Date.now },
  transactionId: { type: String }, // 支付平台内部订单号
  openOrderId: { type: String } // 虎皮椒内部订单号
});

export const Order = model('Order', OrderSchema);