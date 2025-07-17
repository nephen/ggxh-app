import { Article } from '~/server/models/Article';
import { User } from '~/server/models/User.model';

export const sortArticles = async (options?: { needAvatar?: boolean, userId?: number }) => {
  // 提取排序逻辑为单独函数
  const compareArticles = (a: any, b: any) => {
    const now = new Date();
    const isASuperTop = a.superTopPeriods.some(period => now >= new Date(period.startTime) && now <= new Date(period.endTime));
    const isBSuperTop = b.superTopPeriods.some(period => now >= new Date(period.startTime) && now <= new Date(period.endTime));
  
    if (isASuperTop && !isBSuperTop) return -1;
    if (!isASuperTop && isBSuperTop) return 1;
    if (a.topCount !== b.topCount) return b.topCount - a.topCount;
    return new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime();
  };


  if (options?.userId) {
    const articles = await Article.find({ userId: options?.userId });
    return articles.sort((a, b) => compareArticles(a, b));
  } else {
    // 获取阅币余额大于10的用户ID
    const richUsers = await User.find({ beanCount: { $gt: 10 } }).select('id');
    const richUserIds = richUsers.map(user => user.id);

    // 计算一个月前的日期
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // 获取所有活跃且发布时间在一个月内的文章
    const articles = await Article.find({
      isActive: true,
      publishTime: { $gte: oneMonthAgo.toISOString() },
      userId: { $in: richUserIds }
    }).limit(100); // 添加limit限制返回数量

    if (options?.needAvatar) {
      // 获取所有文章作者的用户信息
      const userIds = [...new Set(articles.map(article => article.userId))];
      const users = await User.find({ id: { $in: userIds } });
      const userMap = new Map(users.map(user => [user.id, user]));
      
      // 将用户头像信息合并到文章数据中
      const articlesWithAvatars = articles.map(article => {
        const user = userMap.get(article.userId);
        return {
          ...article.toObject(),
          authorAvatar: user?.avatar || '/avatar-placeholder.png',
        };
      });
      return articlesWithAvatars.sort((a, b) => compareArticles(a, b));
    } else {
      return articles.sort((a, b) => compareArticles(a, b));
    }
  }
};