import { defineEventHandler, getQuery } from 'h3';
import { sortArticles } from '../../utils/articleSorter';

export default defineEventHandler(async (event) => {
  try {
    // 从查询参数中获取用户 ID
    const { userId } = getQuery(event);
    const userIdNumber = Number(userId); // 将字符串转换为数字
    
    if (!userIdNumber) {
      return {
        status: 401,
        message: '用户未登录或用户 ID 缺失'
      };
    }

    const sortedArticles = await sortArticles({ userId: userIdNumber });
    return sortedArticles;
  } catch (error) {
    console.error('获取用户文章列表时出错:', error);
    return {
      status: 500,
      message: '获取用户文章列表时出现错误'
    };
  }
});