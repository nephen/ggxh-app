import { defineEventHandler, readBody } from 'h3';
import { User } from '../../models/User.model';
import { BeanTransaction } from '~/server/models/BeanTransaction.model'
import { generateToken } from '../../utils/auth'

// 新增函数：处理推荐奖励
async function handleReferralReward(recommendSource: string, userId: string) {
  if (recommendSource && recommendSource !== userId) {
    const referrerUser = await User.findOne({ id: recommendSource });
    if (referrerUser) {
      referrerUser.referralCount = (referrerUser.referralCount || 0) + 1;
      referrerUser.beanCount = (referrerUser.beanCount || 0) + 4;
      await referrerUser.save();

      const reporterTransaction = new BeanTransaction({
        userId: recommendSource,
        type: 'income',
        amount: 4,
        description: `推荐${userId}获得阅豆奖励`
      });
      await reporterTransaction.save();
    }
  }
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { nickname, avatar, id, recommendSource } = body

  try {
    // 检查用户是否已存在
    const existingUser = await User.findOne({ id });
    if (existingUser) {
      // 检查是否需要更新用户信息
      let needUpdate = false;
      if (nickname && existingUser.nickname !== nickname) {
        existingUser.nickname = nickname;
        needUpdate = true;
      }
      if (avatar && existingUser.avatar !== avatar) {
        existingUser.avatar = avatar;
        needUpdate = true;
      }
      
      // 如果有更新则保存
      if (needUpdate) {
        await existingUser.save();
      }

      // 生成JWT token
      const token = generateToken({
        userId: existingUser.id,
        nickname: existingUser.nickname,
        avatar: existingUser.avatar
      })

      return {
        status: 200,
        message: needUpdate ? '用户信息已更新' : '用户已存在',
        data: {
          ...existingUser.toObject(),
          token
        }
      };
    }

    const newUser = new User({
      id,
      nickname,
      avatar,
      recommendSource,  // 保存推荐来源
    });

    newUser.beanCount = 20; // 新用户赠送阅豆数量

    const savedUser = await newUser.save();

    // 添加交易记录
    const transaction = new BeanTransaction({
      userId: id,
      type: 'income',
      amount: 20,
      description: `新用户注册赠送阅豆`
    });
    await transaction.save();

    if (recommendSource && recommendSource !== id) {
      await handleReferralReward(recommendSource, id);  // 调用推荐奖励函数
    }

    // 生成JWT token
    const token = generateToken({
      userId: id,
      nickname,
      avatar
    })

    return {
      status: 200,
      message: '注册成功',
      data: {
        ...savedUser.toObject(),
        token
      },
    }
  } catch (error) {
    console.error('注册失败:', error)
    return {
      status: 500,
      message: '注册失败，请稍后重试',
    }
  }
})