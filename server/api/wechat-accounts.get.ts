import { defineEventHandler } from 'h3';
import { WechatAccount } from '../models/WechatAccount.model';
import { User } from '../models/User.model';
import { sortWechatAccounts } from '../utils/wechatAccountSorter';

export default defineEventHandler(async (event): Promise<unknown> => {
  try {
    // 查找阅币余额大于10的用户ID
    const richUsers = await User.find({ beanCount: { $gt: 10 } }).select('id');
    const richUserIds = richUsers.map(user => user.id);

    const accounts = await WechatAccount.find({ 
      isActive: true,
      userId: { $in: richUserIds }
    }).limit(100);  // 添加limit限制返回数量
    const sortedAccounts = sortWechatAccounts(accounts);
    return sortedAccounts;
  } catch (error) {
    return {
      status: 500,
      message: '获取公众号数据时出现错误'
    };
  }
});