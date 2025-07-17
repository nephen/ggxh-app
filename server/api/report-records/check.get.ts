import { defineEventHandler, getQuery } from 'h3';
import { ReportRecord } from '../../models/ReportRecord';

export default defineEventHandler(async (event) => {
  const { reportedUserId, articleId } = getQuery(event);

  if (!reportedUserId || !articleId) {
    return {
      status: 400,
      message: '缺少必要参数 reportedUserId 或 articleId'
    };
  }

  try {
    const existingRecord = await ReportRecord.findOne({
      reportedUserId,
      articleId
    });

    const hasReported = !!existingRecord;

    return {
      status: 200,
      hasReported
    };
  } catch (error) {
    console.error('检查举报记录时出错:', error);
    return {
      status: 500,
      message: '检查举报记录时出现服务器错误'
    };
  }
});