import Withdrawal from '~/server/models/Withdrawal.model';
import { User } from '~/server/models/User.model';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const userId = body.userId;
  const amount = body.amount;
  
  // 检查用户是否有未完成的提现
  const pendingWithdrawal = await Withdrawal.findOne({ 
    userId,
    status: { $in: ['pending', 'processing'] }
  });
  
  if (pendingWithdrawal) {
    return { 
      success: false,
      message: '您已有提现申请在处理中，请等待完成后再申请'
    };
  }
  
  // 检查用户是否有收款码
  const user = await User.findOne({ id: userId });
  if (!user) {
    return {
      success: false,
      message: '用户不存在'
    };
  }

  if (!user.paymentQRCode) {
    return {
      success: false,
      message: '请先上传收款码再申请提现'
    };
  }
  
  // 创建提现记录
  const withdrawal = new Withdrawal({
    userId,
    amount,
    beans: amount * 50, // 假设50阅豆=1元
    paymentQRCode: user.paymentQRCode
  });
  
  await withdrawal.save();
  
  return {
    success: true,
    data: withdrawal
  };
});