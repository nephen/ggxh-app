import { defineEventHandler } from 'h3';
import { WechatAccountTimeSlotPurchase } from '../../../models/WechatAccountTimeSlotPurchase.model';

export default defineEventHandler(async (event) => {
  const accountId = event.context.params.id;
  console.log('accountId:', accountId);
  
  try {
    const purchases = await WechatAccountTimeSlotPurchase.find({ accountId })
      .sort({ createdAt: -1 }) // 按购买时间降序排列
      .exec();
      
    return {
      status: 200,
      data: purchases
    };
  } catch (error) {
    console.error('获取公众号置顶记录时出错:', error);
    return {
      status: 500,
      message: '获取公众号置顶记录时出错'
    };
  }
});