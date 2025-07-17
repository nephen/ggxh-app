import { defineEventHandler, readBody } from 'h3';
import { ReportRecord } from '../models/ReportRecord';
import { User } from '../models/User.model';
import { BeanTransaction } from '~/server/models/BeanTransaction.model'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { 
    reportedReason,
    reportedActionTime,
    reporterNickname,
    reporterUserId,
    reportedUserId,
    articleId
  } = body;

  try {
    // 保存举报记录
    const reportRecord = new ReportRecord({
      reportedReason,
      reportedActionTime,
      reporterNickname,
      reporterUserId,
      reportedUserId,
      articleId
    });
    const savedReportRecord = await reportRecord.save();

    // 扣减被举报用户的阅豆
    await User.findOneAndUpdate(
      { id: reportedUserId },
      { $inc: { beanCount: -2 } }
    );
    
    // 添加被举报用户扣减阅豆的交易记录
    const reportedTransaction = new BeanTransaction({
      userId: reportedUserId,
      type: 'expense',
      amount: 2,
      description: `被举报扣减阅豆`
    });
    await reportedTransaction.save();
    
    // 增加举报用户的阅豆
    await User.findOneAndUpdate(
      { id: reporterUserId },
      { $inc: { beanCount: 2 } }
    );

    // 添加举报用户获得阅豆的交易记录
    const reporterTransaction = new BeanTransaction({
      userId: reporterUserId,
      type: 'income',
      amount: 2,
      description: `举报获得阅豆奖励`
    });
    await reporterTransaction.save();

    return {
      status: 200,
      message: '举报记录保存成功',
      data: savedReportRecord
    };
  } catch (error) {
    console.error('保存举报记录时出错:', error);
    return {
      status: 500,
      message: '保存举报记录时出现服务器错误'
    };
  }
});