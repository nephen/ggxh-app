import { defineEventHandler } from 'h3';
import { Article } from '../../models/Article';

export default defineEventHandler(async (event) => {
  const articleId = event.context.params.id;
  try {
    const deletedArticle = await Article.findByIdAndDelete(articleId);
    if (deletedArticle) {
      return {
        status: 200,
        message: '文章删除成功'
      };
    } else {
      return {
        status: 404,
        message: '未找到要删除的文章'
      };
    }
  } catch (error) {
    console.error('删除文章时出错:', error);
    return {
      status: 500,
      message: '删除文章时出现服务器错误'
    };
  }
});