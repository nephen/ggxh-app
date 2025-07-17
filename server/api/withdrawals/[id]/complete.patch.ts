import Withdrawal from '~/server/models/Withdrawal.model';
import { User } from '~/server/models/User.model';
import { BeanTransaction } from '~/server/models/BeanTransaction.model';

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');
    const { adminId } = await readBody(event);
    
    // 验证管理员权限
    if (!adminId) {
      return createError({
        status: 401,
        message: '缺少管理员ID'
      });
    }
    
    const adminUser = await User.findOne({ id: Number(adminId) });
    if (!adminUser || !adminUser.isAdmin) {
      return createError({
        status: 403,
        message: '无权限访问'
      });
    }

    // 1. 获取并更新提现状态
    const updated = await Withdrawal.findByIdAndUpdate(
      id,
      { 
        status: 'completed',
        processedAt: new Date() 
      },
      { new: true }
    );
    
    if (!updated) {
      return createError({
        status: 404,
        message: '提现申请不存在'
      });
    }

    // 2. 更新用户beanCount
    const user = await User.findOneAndUpdate(
      { id: updated.userId },
      { $inc: { beanCount: -updated.beans } },
      { new: true }
    );

    if (!user) {
      return createError({
        status: 404,
        message: '用户不存在'
      });
    }

    // 3. 添加交易记录
    const transaction = new BeanTransaction({
      userId: updated.userId,
      type: 'expense',
      amount: updated.beans,
      description: `提现操作扣减阅豆`
    });
    await transaction.save();
    
    return { 
      status: 200,
      message: '提现已完成',
      data: {
        beanCount: user.beanCount
      }
    };
  } catch (error) {
    console.error('完成提现失败:', error);
    return createError({
      status: 500,
      message: '完成提现失败'
    });
  }
});