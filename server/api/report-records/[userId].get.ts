import { defineEventHandler } from 'h3';
import { ReportRecord } from '../../models/ReportRecord';

export default defineEventHandler(async (event) => {
  const userId = event.context.params?.userId;
  if (!userId) {
    return {
      status: 400,
      message: '缺少用户 ID'
    };
  }
  try {
    // 按照 reportedTime 字段降序排序，并限制结果数量为 30
    const records = await ReportRecord.find({ reportedUserId: userId })
      .sort({ reportedTime: -1 })
      .limit(30);
    return records;
  } catch (error) {
    console.error('获取举报记录时出错:', error);
    return {
      status: 500,
      message: '服务器内部错误'
    };
  }
});