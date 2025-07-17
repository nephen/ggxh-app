import { defineEventHandler } from 'h3';
import { TimeSlotPurchase } from '../../../models/TimeSlotPurchase.model';

export default defineEventHandler(async (event) => {
  const articleId = event.context.params.id;
  
  try {
    const purchases = await TimeSlotPurchase.find({ articleId })
      .sort({ createdAt: -1 }) // 按购买时间降序排列
      .exec();
      
    return {
      status: 200,
      data: purchases
    };
  } catch (error) {
    console.error('获取文章置顶记录时出错:', error);
    return {
      status: 500,
      message: '获取文章置顶记录时出错'
    };
  }
});