import { defineEventHandler } from 'h3';
import { Article } from '~/server/models/Article';
import { sortArticles } from '../../../utils/articleSorter';
import { User } from '~/server/models/User.model';

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const article = await Article.findById(id);

  if (!article) {
    return {
      status: 404,
      message: '未找到该文章'
    };
  }

  // 检查用户阅币余额
  const user = await User.findOne({ id: article.userId });
  if (!user || user.beanCount <= 10) {
    return {
      status: 200,
      message: '暂无排名，原因：阅币余额不足10。'
    };
  }

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const publishDate = new Date(article.publishTime);

  if (!article.isActive || publishDate < oneMonthAgo) {
    return {
      status: 200,
      message: '暂无排名，原因：文章已下架或发布超过一个月。'
    };
  }

  const sortedArticles = await sortArticles();

  // 找到当前文章的排名
  const ranking = sortedArticles.findIndex(a => a._id.toString() === id) + 1;

  // 计算排名百分比
  const rankingPercentage = ((ranking / sortedArticles.length) * 100).toFixed(2);

  return {
    status: 200,
    message: `该文章在系统中的排名为第 ${ranking} 名，处于前 ${rankingPercentage}%。`
  };
});