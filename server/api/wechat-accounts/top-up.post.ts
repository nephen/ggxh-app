import { WechatAccount } from '../../models/WechatAccount.model';
import { User } from '../../models/User.model';
import { BeanTransaction } from '~/server/models/BeanTransaction.model'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  // 参数校验
  if (!body?.userId) {
    return createError({
      status: 400,
      message: '缺少必要参数userId'
    });
  }

  try {
    // 检查用户阅豆是否足够
    const user = await User.findOne({ id: body.userId });
    if (!user || user.beanCount < 2) {
      return createError({
        status: 400,
        message: '阅豆不足，无法顶一顶'
      });
    }

    // 查找账号并增加topCount
    const account = await WechatAccount.findOneAndUpdate(
      { userId: body.userId },
      { $inc: { topCount: 1 } },
      { new: true }
    );

    if (!account) {
      return createError({
        status: 404,
        message: '未找到对应公众号账号'
      });
    }

    // 扣除阅豆
    await User.updateOne(
      { id: body.userId },
      { $inc: { beanCount: -2 } }
    );

    // 添加交易记录
    const transaction = new BeanTransaction({
      userId: body.userId,
      type: 'expense',
      amount: 2,
      description: `公众号顶操作扣减阅豆`
    });
    await transaction.save();

    return {
      status: 200,
      data: {
        success: true,
        message: '顶一顶成功',
        beanCount: user.beanCount - 2 // 返回扣除后的阅豆数量
      }
    };
  } catch (err) {
    return createError({
      status: 500,
      message: '服务器内部错误'
    });
  }
});
