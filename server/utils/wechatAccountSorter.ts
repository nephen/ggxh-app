import { WechatAccount } from '../models/WechatAccount';

export function sortWechatAccounts(accounts: WechatAccount[]) {
  const now = new Date();
  return accounts.sort((a, b) => {
    // 检查是否在超级置顶时间段内
    const isASuperTop = a.superTopPeriods.some(period => 
      now >= new Date(period.startTime) && now <= new Date(period.endTime)
    );
    const isBSuperTop = b.superTopPeriods.some(period => 
      now >= new Date(period.startTime) && now <= new Date(period.endTime)
    );

    if (isASuperTop && !isBSuperTop) {
      return -1;
    } else if (!isASuperTop && isBSuperTop) {
      return 1;
    }

    // 如果超级置顶状态相同，比较被顶的次数
    if (a.topCount !== b.topCount) {
      return b.topCount - a.topCount;
    }

    // 如果被顶的次数也相同，比较发布时间，最新的在前
    return new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime();
  });
}