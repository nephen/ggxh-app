import { defineEventHandler, getQuery } from 'h3';
import { ArticleReport } from '../../models/ArticleReport';

export default defineEventHandler(async (event) => {
  const { articleId } = getQuery(event);

  if (!articleId) {
    return {
      status: 400,
      message: '缺少必要参数 articleId'
    };
  }

  try {
    const reports = await ArticleReport.find({ articleId });
    return {
      status: 200,
      data: reports
    };
  } catch (error) {
    console.error('Error fetching article reports:', error);
    return {
      status: 500,
      message: '获取文章阅读报告时出现服务器错误'
    };
  }
});