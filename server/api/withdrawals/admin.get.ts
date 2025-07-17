import Withdrawal from '~/server/models/Withdrawal.model';
import { User } from '~/server/models/User.model';

export default defineEventHandler(async (event) => {
  try {
    const { status, limit, adminId } = getQuery(event);
    
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

    const query: any = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    const withdrawals = await Withdrawal.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit) || 100);
      
    return { 
      status: 200,
      data: withdrawals 
    };
  } catch (error) {
    return createError({
      status: 500,
      message: '获取提现申请失败'
    });
  }
});