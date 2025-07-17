import { defineEventHandler } from 'h3';
import { User } from '../../models/User.model';

export default defineEventHandler(async (event) => {
  try {
    // 获取请求参数中的userId
    const { userId } = getQuery(event);
    if (!userId) {
      return {
        status: 400,
        message: '缺少用户ID参数'
      };
    }

    // 只查询当前用户
    const currentUser = await User.findOne({ id: userId });
    if (!currentUser) {
      return {
        status: 404,
        message: '用户不存在'
      };
    }

    // 获取官住我的人数量
    const followersCount = currentUser.followers.length;
    
    // 获取我官住的人数量
    const followingCount = currentUser.following.length;

    // 获取互相官住的数量
    const mutualCount = currentUser.followers.filter(follower => 
      currentUser.following.some(following => following.userId === follower.userId)
    ).length;

    return {
      followersCount,
      followingCount,
      mutualCount
    };
  } catch (error) {
    console.error('获取官住统计数据时出错:', error);
    return {
      status: 500,
      message: '获取官住统计数据时出现错误'
    };
  }
});