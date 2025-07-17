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

    const users = await User.find();
    const readMeMap = new Map<string, any>();
    const readTaMap = new Map<string, any>();

    // 处理 readMeList
    // 遍历当前用户的readByUsers数组（记录谁阅读了该用户的文章）
    currentUser.readByUsers.forEach(readRecord => {
      // 获取阅读者的用户ID并转为字符串
      const relatedUserId = readRecord.userId;
      
      // 在所有用户中查找这个阅读者用户
      const relatedUser = users.find(u => u.id === relatedUserId);
      
      // 如果找到对应的用户
      if (relatedUser) {
        // 生成一个唯一键，格式为"当前用户ID-阅读者用户ID"
        const key = `${currentUser.id}-${relatedUserId}`;
        
        // 如果这个组合还未被处理过
        if (!readMeMap.has(key)) {
          // 统计该阅读者阅读当前用户文章的总次数
          const readCount = currentUser.readByUsers.filter(record => 
            record.userId === relatedUserId).length;
          
          // 创建阅读记录对象
          const readMeItem = {
            userId: relatedUser.id,  // 阅读者的用户ID
            avatar: relatedUser.avatar,  // 阅读者的头像
            name: relatedUser.nickname,  // 阅读者的昵称
            readCount: readCount        // 阅读者阅读当前用户文章的次数
          };
          
          // 将记录存入readMeMap中
          readMeMap.set(key, readMeItem);
        }
      }
    });

    // 处理 readTaList
    // 遍历当前用户的readWhom数组（记录该用户阅读过谁的文章）
    currentUser.readWhom.forEach(readRecord => {
      // 获取被阅读用户的ID并转为字符串
      const relatedUserId = readRecord.userId;
      
      // 在所有用户中查找这个被阅读的用户
      const relatedUser = users.find(u => u.id === relatedUserId);
      
      // 如果找到对应的用户
      if (relatedUser) {
        // 生成一个唯一键，格式为"当前用户ID-被阅读用户ID"
        const key = `${currentUser.id}-${relatedUserId}`;
        
        // 如果这个组合还未被处理过
        if (!readTaMap.has(key)) {
          // 统计当前用户阅读该用户的文章次数（readByUsers中匹配的记录数）
          const readMeCount = currentUser.readByUsers.filter(record => 
            record.userId === relatedUserId).length;
          
          // 统计当前用户阅读该用户文章的次数（readWhom中匹配的记录数）  
          const readTaCount = currentUser.readWhom.filter(record => 
            record.userId === relatedUserId).length;
          
          // 创建阅读记录对象
          const readTaItem = {
            userId: relatedUser.id,  // 被阅读用户的用户ID
            avatar: relatedUser.avatar,  // 被阅读用户的头像
            name: relatedUser.nickname,  // 被阅读用户的昵称
            readMeCount: readMeCount,   // 当前用户阅读该用户文章的次数
            readTaCount: readTaCount    // 该用户阅读当前用户文章的次数
          };
          
          // 将记录存入readTaMap中
          readTaMap.set(key, readTaItem);
        }
      }
    });

    const readMeList = Array.from(readMeMap.values());
    const readTaList = Array.from(readTaMap.values());

    return {
      readMeList,
      readTaList
    };
  } catch (error) {
    console.error('获取阅读列表数据时出错:', error);
    return {
      status: 500,
      message: '获取阅读列表数据时出现错误'
    };
  }
});