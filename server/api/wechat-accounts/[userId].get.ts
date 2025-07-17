import { defineEventHandler } from 'h3';
import { WechatAccount } from '../../models/WechatAccount.model';

export default defineEventHandler(async (event) => {
  const userId = event.context.params?.userId;
  
  if (!userId) {
    return {
      status: 400,
      message: '缺少用户ID参数'
    };
  }

  try {
    const account = await WechatAccount.findOne({ userId });
    
    if (!account) {
      return {
        status: 404,
        message: '未找到公众号信息'
      };
    }

    return {
      status: 200,
      data: account
    };
  } catch (error) {
    console.error('获取公众号信息时出错:', error);
    return {
      status: 500,
      message: '获取公众号信息时出现服务器错误'
    };
  }
});