import { defineEventHandler, readBody } from 'h3';
import { WechatAccount } from '../models/WechatAccount.model';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  console.log('Received request body:', body);
  
  if (!body.userId || !body.name || !body.articleLink || !body.description) {
    return {
      status: 400,
      message: '缺少必要参数'
    };
  }

  try {
    // 查找或创建公众号信息
    const existingAccount = await WechatAccount.findOne({ userId: body.userId });
    if (existingAccount && existingAccount.autoReply && body.autoReply && existingAccount.autoReply !== body.autoReply) {
      existingAccount.matchErrorCount = 0;
      await existingAccount.save();
    }
    
    const account = await WechatAccount.findOneAndUpdate(
      { userId: body.userId },
      {
        name: body.name,
        articleLink: body.articleLink,
        autoReply: body.autoReply || '',
        isActive: true,
        // 新增字段
        requiredFollows: body.requiredFollows || 0,
        description: body.description,
        publishTime: body.publishTime || new Date().toISOString(),
      },
      {
        new: true,
        upsert: true
      }
    );

    return {
      status: 200,
      message: '公众号信息保存成功',
      data: account
    };
  } catch (error) {
    console.error('保存公众号信息时出错:', error);
    return {
      status: 500,
      message: '保存公众号信息时出现服务器错误'
    };
  }
});