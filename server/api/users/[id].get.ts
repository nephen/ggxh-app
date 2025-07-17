import { defineEventHandler } from 'h3'
import { User } from '../../models/User.model'
import { generateToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const userId = parseInt(event.context.params.id)
  try {
    const user = await User.findOne({ id: userId })
    if (!user) {
      return { 
        status: 404,
        message: '用户不存在'
      }
    }
    
    // 生成JWT token
    const token = generateToken({
      userId: user.id,
      nickname: user.nickname,
      avatar: user.avatar
    })

    return {
      status: 200,
      data: {
        ...user.toObject(),
        token
      }
    }
  } catch (error) {
    console.error('获取用户信息时出错:', error)
    return {
      status: 500,
      message: '获取用户信息时出现错误'
    }
  }
})