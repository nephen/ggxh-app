import { defineEventHandler, readBody } from 'h3';
import { ArticleReport } from '../models/ArticleReport';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log('接收到的报数信息:', body);

  try {
    const report = new ArticleReport(body);
    const savedReport = await report.save();

    return {
      status: 200,
      message: '报数信息保存成功',
      data: savedReport
    };
  } catch (error) {
    console.error('保存报数信息时出错:', error);
    return {
      status: 500,
      message: '保存报数信息时出现服务器错误'
    };
  }
});