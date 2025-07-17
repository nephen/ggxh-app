import { defineEventHandler, readBody } from 'h3';
import { Article } from '../../models/Article';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // 这里可以添加数据验证逻辑
  if (!body.link || !body.title || !body.requiredReads || !body.userId) {
    return {
      status: 400,
      message: '缺少必要的文章信息'
    };
  }
  try {
    // 创建新的文章实例
    const article = new Article({
      link: body.link,
      title: body.title,
      requiredReads: body.requiredReads,
      // 修改为当前时间
      publishTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
      readCount: 0,
      requirement: body.requirement || '仅阅读',
      sources: body.sources || ['朋友圈'],
      userId: body.userId // 添加userId字段
    });
    // 保存文章到数据库
    await article.save();
    return {
      status: 200,
      message: '文章发布成功'
    };
  } catch (error) {
    console.error('保存文章到数据库时出错:', error);
    return {
      status: 500,
      message: '保存文章到数据库时出错，请稍后重试'
    };
  }
});