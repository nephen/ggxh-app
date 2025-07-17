import { defineEventHandler, readBody } from 'h3';
import { Article } from '../../../models/Article';

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const { isActive } = await readBody(event);

  try {
    const article = await Article.findByIdAndUpdate(
      id,
      { isActive: isActive },
      { new: true }
    );

    if (!article) {
      return {
        status: 404,
        message: '文章未找到'
      };
    }

    return {
      status: 200,
      message: isActive ? '文章已上架' : '文章已下架',
      data: article
    };
  } catch (error) {
    console.error('更新文章激活状态时出错:', error);
    return {
      status: 500,
      message: '更新文章激活状态时出现服务器错误'
    };
  }
});