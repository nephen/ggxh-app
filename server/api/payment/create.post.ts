import { defineEventHandler, readBody } from 'h3'
import { getHash } from '../../utils/hash'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { params } = body
  
  const appSecret = process.env.HPJ_SECRET || ''
  if (!appSecret) {
    console.error('未配置appSecret')
    throw new Error('未配置appSecret')
  }

  try {
    // 计算hash
    const hash = getHash(params, appSecret)
    
    // 调用支付接口
    console.log('请求参数:', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: {
        ...params,
        hash
      }
    })
    const paymentRes = await $fetch('https://api.dpweixin.com/payment/do.html', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: {
        ...params,
        hash
      }
    })
    console.log('支付接口响应:', paymentRes)

    return {
      status: 200,
      data: paymentRes
    }
  } catch (error) {
    return {
      status: 500,
      message: error instanceof Error ? error.message : '支付请求失败'
    }
  }
})