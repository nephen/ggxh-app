import Withdrawal from '~/server/models/Withdrawal.model';
import { User } from '~/server/models/User.model';

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');
    const { rejectReason, adminId } = await readBody(event);
    
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

    if (!rejectReason) {
      return createError({
        status: 400,
        message: '请输入拒绝原因'
      });
    }
    
    const updated = await Withdrawal.findByIdAndUpdate(
      id,
      { 
        status: 'rejected',
        rejectReason,
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
    
    return { 
      status: 200,
      message: '提现已拒绝'
    };
  } catch (error) {
    return createError({
      status: 500,
      message: '拒绝提现失败'
    });
  }
});