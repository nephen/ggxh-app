import { User } from '../models/User.model';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const userId = Number(query.userId);
  
  if (!userId) {
    throw createError({
      status: 400,
      message: 'userId is required'
    });
  }

  // 获取推荐好友总数
  const totalFriends = await User.countDocuments({ recommendSource: userId.toString() });
  
  // 获取最近50个推荐好友
  const recentFriends = await User.find({ recommendSource: userId.toString() })
    .sort({ _id: -1 })
    .limit(50)
    .select('id nickname avatar')
    .lean();

  return {
    total: totalFriends,
    friends: recentFriends
  };
});