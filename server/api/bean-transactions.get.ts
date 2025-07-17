import { defineEventHandler } from 'h3';
import { BeanTransaction } from '~/server/models/BeanTransaction.model';

export default defineEventHandler(async (event) => {
  const { userId } = getQuery(event);
  
  if (!userId) {
    return {
      status: 400,
      message: '缺少用户ID参数'
    };
  }

  try {
    const transactions = await BeanTransaction.find({ userId })
      .sort({ createdAt: -1 })
      .limit(50);
    
    return {
      status: 200,
      data: transactions
    };
  } catch (error) {
    console.error('获取交易记录失败:', error);
    return {
      status: 500,
      message: '获取交易记录时出现错误'
    };
  }
});