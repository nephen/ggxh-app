import { defineEventHandler, readBody } from 'h3'
import { User } from '../../models/User.model'
import { Order } from '../../models/Order.model'
import { getHash } from '../../utils/hash'
import { BeanTransaction } from '../../models/BeanTransaction.model'

// 支付回调处理函数
export default defineEventHandler(async (event) => {
  try {
    // 获取请求体数据
    const body = await readBody(event)
    const appSecret = process.env.HPJ_SECRET || '' // 从环境变量中获取appSecret
    if (!appSecret) {
      throw new Error('未配置appSecret')
    }
    
    console.log('支付回调数据:', body)
    
    // 验签逻辑
    if (body.hash !== getHash(body, appSecret)) {
      console.log('验签失败')
      return 'success' // 返回success防止支付平台重复通知
    }
    
    console.log('支付成功，订单号:', body.trade_order_id)
    
    // 根据订单号查询数据库
    const order = await Order.findOne({ orderNo: body.trade_order_id })
    if (!order) {
      console.log('未找到对应订单')
      return 'success'
    }

    order.status = body.status // 更新订单状态

    // 处理支付成功逻辑
    if (body.status === 'OD') {
      // 更新订单状态
      order.paymentTime = new Date()
      order.transactionId = body.transaction_id
      order.openOrderId = body.open_order_id

      // 更新用户余额
      const user = await User.findOneAndUpdate(
        { id: order.userId },
        { $inc: { beanCount: order.beans } },
        { new: true }
      )
      
      if (!user) {
        console.log('未找到对应订单的用户')
      }

      // 添加交易记录
      const transaction = new BeanTransaction({
        userId: order.userId,
        type: 'income',
        amount: order.beans,
        description: `充值获得阅豆`
      });
      await transaction.save();
    } else {
      console.log('支付未成功，状态:', body.status)
    }

    await order.save(); // 保存订单
    console.log('订单状态更新成功')
    
    return 'success'
  } catch (error) {
    console.error('支付回调处理错误:', error)
    return 'success' // 仍然返回success防止重复通知
  }
})