import { defineEventHandler } from 'h3';
import { sortArticles } from '../utils/articleSorter';

export default defineEventHandler(async (event): Promise<unknown> => {
  try {
    const sortedArticles = await sortArticles({ needAvatar: true });
    return sortedArticles;
  } catch (error) {
    return {
      status: 500,
      message: '获取文章数据时出现错误'
    };
  }
});