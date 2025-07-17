import { defineEventHandler, readBody } from 'h3';
import { Order } from '~/server/models/Order.model';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  // 验证参数
  if (!body.userId || !body.amount || !body.beans) {
    throw createError({
      status: 400,
      message: '缺少必要参数'
    });
  }

  // 生成订单号
  const orderNo = `O${Date.now()}${Math.floor(Math.random() * 1000)}`;
  
  // 创建订单
  const order = await Order.create({
    userId: body.userId,
    orderNo,
    amount: body.amount,
    beans: body.beans,
    status: 'pending'
  });

  return {
    status: 200,
    data: order
  };
});