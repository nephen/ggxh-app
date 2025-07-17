import { defineEventHandler, readBody } from 'h3'
import { WechatAccount } from '../models/WechatAccount.model'
import { BeanTransaction } from '~/server/models/BeanTransaction.model'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { userId, targetUserId, replyContent } = body

  if (!userId || !targetUserId) {
    return {
      status: 400,
      message: '缺少必要参数'
    }
  }

  if (userId === targetUserId) {
    return {
      status: 400,
      message: '不能官住自己的公众号'
    }
  }

  try {
    // 查找目标公众号
    const account = await WechatAccount.findOne( { userId: targetUserId } )
    if (!account) {
      return {
        status: 404,
        message: '公众号不存在'
      }
    }

    // 检查回复内容是否匹配
    if (account.autoReply) {
      const similarity = calculateSimilarity(account.autoReply.trim(), replyContent.trim())
      console.log('相似度:', similarity)
      if (similarity < 0.6) {
        // 匹配失败时下架公众号
        if (replyContent) {
          account.isActive = false
          account.matchErrorCount = (account.matchErrorCount || 0) + 1
          await account.save()
        }
        return {
          status: 400,
          message: '回复内容匹配度不足，公众号已下架'
        }
      }
    }

    // 检查是否已官住过
    const alreadyFollowed = account.followedByUsers.includes(userId)
    if (alreadyFollowed) {
      return {
        status: 400,
        message: '您已官住过该公众号'
      }
    }

    // 更新公众号信息
    await WechatAccount.findByIdAndUpdate(
      account._id,
      {
        $addToSet: { followedByUsers: userId }, // 使用$addToSet确保不重复
        $inc: { followCount: 1 } // 增加官住计数
      },
      { new: true }
    )

    // 更新用户官住关系
    await User.findOneAndUpdate(
      { id: userId },
      {
        $addToSet: { 
          following: { 
            userId: targetUserId,
            followTime: new Date()
          }
        }
      }
    )
    
    await User.findOneAndUpdate(
      { id: targetUserId },
      {
        $addToSet: { 
          followers: { 
            userId: userId,
            followTime: new Date()
          }
        }
      }
    )

    // 更新用户阅豆数量
    await User.findOneAndUpdate(
      { id: userId },
      { $inc: { beanCount: 6 } }
    );

    // 添加交易记录
    const transaction = new BeanTransaction({
      userId: userId,
      type: 'income',
      amount: 6,
      description: `官住获得阅豆奖励`
    });
    await transaction.save();
    
    // 扣除被官住用户的阅豆
    await User.findOneAndUpdate(
      { id: targetUserId },
      { $inc: { beanCount: -6 } }
    );

    // 添加被官住用户消耗阅豆的交易记录
    const targetTransaction = new BeanTransaction({
      userId: targetUserId,
      type: 'expense',
      amount: 6,
      description: `被官住消耗阅豆`
    });
    await targetTransaction.save();
    
    return {
      status: 200,
      message: '官住成功'
    }
  } catch (error) {
    console.error('官住公众号时出错:', error)
    return {
      status: 500,
      message: '服务器内部错误'
    }
  }
})


// 添加相似度计算函数
function calculateSimilarity(str1: string, str2: string): number {
  const set1 = new Set(str1.split(''))
  const set2 = new Set(str2.split(''))
  const intersection = new Set([...set1].filter(x => set2.has(x)))
  return intersection.size / Math.max(set1.size, 1)
}