import { defineEventHandler } from 'h3';
import { User } from '../../models/User.model';
import { WechatAccount } from '../../models/WechatAccount.model';

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

    const users = await User.find();
    const followingMap = new Map<string, any>();
    const followersMap = new Map<string, any>();
    const mutualMap = new Map<string, any>();

    // 获取所有微信公众号账号
    const wechatAccounts = await WechatAccount.find();
    
    // 处理当前用户官住的人(following列表)
    currentUser.following.forEach(followRecord => {
        // 获取被官住用户的ID
        const relatedUserId = followRecord.userId;
        
        // 在所有用户中查找这个被官住用户
        const relatedUser = users.find(u => u.id === relatedUserId);
        
        // 如果找到对应的用户
        if (relatedUser) {
            // 生成唯一键，格式为"当前用户ID-被官住用户ID"
            const key = `${currentUser.id}-${relatedUserId}`;
            
            // 如果这个关系还未被处理过
            if (!followingMap.has(key)) {
            // 查找对应的微信公众号账号
            const wechatAccount = wechatAccounts.find(acc => acc.userId === relatedUserId);
            const publicName = wechatAccount?.name || relatedUser.nickname;
            
            const followingItem = {
                currentUserId: currentUser.id,
                userId: relatedUserId,
                avatar: relatedUser.avatar,
                name: relatedUser.nickname,
                publicName, // 新增字段
                followTime: followRecord.followTime
            };
            // 存入followingMap
            followingMap.set(key, followingItem);
            }
        }
    });

    // 处理官住当前用户的人(followers列表)
    currentUser.followers.forEach(followRecord => {
        // 获取官住者的用户ID
        const relatedUserId = followRecord.userId;
        
        // 在所有用户中查找这个官住者用户
        const relatedUser = users.find(u => u.id === relatedUserId);
        
        // 如果找到对应的用户
        if (relatedUser) {
            // 生成唯一键，格式为"当前用户ID-官住者用户ID"
            const key = `${currentUser.id}-${relatedUserId}`;
            
            // 如果这个关系还未被处理过
            if (!followersMap.has(key)) {
            // 查找对应的微信公众号账号
            const wechatAccount = wechatAccounts.find(acc => acc.userId === relatedUserId);
            const publicName = wechatAccount?.name || relatedUser.nickname;
            
            const followersItem = {
                currentUserId: currentUser.id,
                userId: relatedUserId,
                avatar: relatedUser.avatar,
                name: relatedUser.nickname,
                publicName, // 新增字段
                followTime: followRecord.followTime
            };
            // 存入followersMap
            followersMap.set(key, followersItem);
            }
        }
    });

    // 计算互相官住关系
    // 遍历所有官住关系(followingMap)
    followingMap.forEach((value, key) => {      
      // 检查反向官住关系是否存在
      if (followersMap.has(key)) {
        // 标记为互相官住
        value.isMutual = true;
        // 将互相官住关系存入mutualMap
        mutualMap.set(key, {
          ...value,  // 保留原有属性
          // 计算互相官住时间(取两个官住时间中较晚的一个)
          mutualTime: new Date(Math.max(
            new Date(value.followTime).getTime(),
            new Date(followersMap.get(key).followTime).getTime()
          ))
        });
      }
    });

    // 转换Map为数组并添加互关状态
    const followingList = Array.from(followingMap.values()).map(item => ({
      ...item,
      isMutual: mutualMap.has(`${item.userId}-${item.currentUserId}`)
    }));

    const followersList = Array.from(followersMap.values()).map(item => ({
      ...item,
      isMutual: mutualMap.has(`${item.currentUserId}-${item.userId}`)
    }));

    const mutualList = Array.from(mutualMap.values());

    return {
      followingList,
      followersList,
      mutualList
    };
  } catch (error) {
    console.error('获取官住列表数据时出错:', error);
    return {
      status: 500,
      message: '获取官住列表数据时出现错误'
    };
  }
});