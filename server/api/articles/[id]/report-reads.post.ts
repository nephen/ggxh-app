import { defineEventHandler, readBody } from 'h3';
import { Article } from '../../../models/Article';
import { User } from '../../../models/User.model';
import { ArticleReport } from '../../../models/ArticleReport';
import { BeanTransaction } from '~/server/models/BeanTransaction.model'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const { userId, targetUserId, articleId, reportedReadCount } = await readBody(event);

  if (!userId || !targetUserId || !articleId) {
    return {
      status: 400,
      message: '缺少用户ID参数'
    };
  }

  if (userId === targetUserId) {
    return {
      status: 400,
      message: '无法阅读自己的文章'
    };
  }

  try {
    // 先检查文章是否存在
    let article = await Article.findById(id);
    if (!article) {
      return {
        status: 404,
        message: '文章未找到'
      };
    }

    // 检查是否已经阅读过
    if (article.readByUsers?.includes(userId)) {
      return {
        status: 400,
        message: '用户已阅读过该文章',
        data: article
      };
    }

    // 更新文章阅读次数和阅读用户
    await Article.findByIdAndUpdate(
      id,
      { 
        $inc: { readCount: 1 },
        $addToSet: { readByUsers: userId }
      },
      { new: true }
    );

    // 更新用户阅读关系
    await User.findOneAndUpdate(
      { id: userId },
      {
        $addToSet: {
          readWhom: {
            userId: targetUserId,
            readTime: new Date()
          }
        }
      }
    );

    await User.findOneAndUpdate(
      { id: targetUserId },
      {
        $addToSet: {
          readByUsers: {
            userId: userId,
            readTime: new Date()
          }
        }
      }
    );

    // 创建报数记录
    await ArticleReport.create({
      articleId: articleId,
      reportedReadCount: parseInt(reportedReadCount) || 0,
      readTime: new Date(),
      action: '阅读',
      userId: userId
    });

    // 更新用户阅豆数量
    await User.findOneAndUpdate(
      { id: userId },
      { $inc: { beanCount: 2 } }
    );
    
    // 添加用户获得阅豆的交易记录
    const userTransaction = new BeanTransaction({
      userId: userId,
      type: 'income',
      amount: 2,
      description: `阅读文章获得阅豆奖励`
    });
    await userTransaction.save();
    
    // 扣除被阅读用户的阅豆
    await User.findOneAndUpdate(
      { id: targetUserId },
      { $inc: { beanCount: -2 } }
    );

    // 添加被阅读用户扣减阅豆的交易记录
    const targetTransaction = new BeanTransaction({
      userId: targetUserId,
      type: 'expense',
      amount: 2,
      description: `文章被阅读消耗阅豆`
    });
    await targetTransaction.save();

    return {
      status: 200,
      message: '阅读次数更新成功',
    };
  } catch (error) {
    console.error('更新阅读次数时出错:', error);
    return {
      status: 500,
      message: '更新阅读次数时出现服务器错误'
    };
  }
});