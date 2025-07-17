import Withdrawal from '~/server/models/Withdrawal.model';
import { User } from '~/server/models/User.model';

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');
    const { status, adminId } = await readBody(event);
    
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

    const updated = await Withdrawal.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (!updated) {
      return createError({
        status: 404,
        message: '提现申请不存在'
      });
    }
    
    return { 
      status: 200,
      message: '状态更新成功'
    };
  } catch (error) {
    return createError({
      status: 500,
      message: '更新状态失败'
    });
  }
});