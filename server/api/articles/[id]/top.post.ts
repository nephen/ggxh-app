import { defineEventHandler, readBody } from 'h3';
import { Article } from '../../../models/Article';
import { User } from '../../../models/User.model';
import { BeanTransaction } from '~/server/models/BeanTransaction.model'

export default defineEventHandler(async (event) => {
  const { userId } = await readBody(event);
  const articleId = event.context.params.id;
  
  if (!userId || !articleId) {
    return {
      status: 400,
      message: '缺少必要参数'
    };
  }

  try {
    // 1. 检查用户余额是否足够
    const user = await User.findOne({ id: userId });
    if (!user) {
      return {
        status: 404,
        message: '用户不存在'
      };
    }

    if (user.beanCount < 2) {
      return {
        status: 400,
        message: '阅豆余额不足'
      };
    }

    // 2. 执行顶文章操作
    const article = await Article.findByIdAndUpdate(
      articleId,
      { $inc: { topCount: 1 } },
      { new: true }
    );

    if (!article) {
      return {
        status: 404,
        message: '文章未找到'
      };
    }

    // 3. 扣减用户阅豆
    user.beanCount -= 2;
    await user.save();

    // 4. 添加交易记录
    const transaction = new BeanTransaction({
      userId: userId,
      type: 'expense',
      amount: 2,
      description: `文章顶操作扣减阅豆`
    });
    await transaction.save();

    return {
      status: 200,
      message: '文章顶操作成功',
      topCount: article.topCount,
      beanCount: user.beanCount
    };
  } catch (error) {
    console.error('文章顶操作时出错:', error);
    return {
      status: 500,
      message: '文章顶操作时出现服务器错误'
    };
  }
});