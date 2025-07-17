import { WechatAccount } from '../../models/WechatAccount.model';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.userId) {
    return {
      status: 400,
      message: '缺少必要参数userId'
    };
  }

  try {
    // 先查找账号获取当前状态
    const account = await WechatAccount.findOne({ userId: body.userId });
    if (!account) {
      return {
        status: 404,
        message: '未找到对应公众号账号'
      };
    }

    // 如果要激活账号且matchErrorCount>0，需要检查autoReply是否已更新
    if (!account.isActive && account.matchErrorCount > 0 && !account.autoReply) {
      return {
        status: 400,
        message: '账号有匹配错误，请先更新自动回复内容才能重新上架'
      };
    }

    // 查找账号并切换激活状态
    const updatedAccount = await WechatAccount.findOneAndUpdate(
      { userId: body.userId },
      [ { $set: { isActive: { $not: "$isActive" } } } ], // 使用聚合管道直接取反当前值
      { new: true }
    );

    return {
      status: 200,
      message: updatedAccount.isActive ? '账号已上架' : '账号已下架',
      data: updatedAccount
    };
  } catch (error) {
    console.error('切换账号状态失败:', error);
    return {
      status: 500,
      message: '服务器内部错误'
    };
  }
});
