import { defineEventHandler } from 'h3';
import { User } from '../../models/User.model';
import moment from 'moment';

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

    // 获取今日和一个月前的日期
    const today = moment().startOf('day');
    const oneMonthAgo = moment().subtract(1, 'month').startOf('day');

    // 统计阅我数据(当前用户被阅读的数据)
    const readMeTodayCount = currentUser.readByUsers.filter(record => 
      moment(record.readTime).isSameOrAfter(today)
    ).length;

    const readMeMonthCount = currentUser.readByUsers.filter(record => 
      moment(record.readTime).isSameOrAfter(oneMonthAgo)
    ).length;

    // 统计阅Ta数据(当前用户阅读他人的数据)
    const readTaTodayCount = currentUser.readWhom.filter(record => 
      moment(record.readTime).isSameOrAfter(today)
    ).length;

    const readTaMonthCount = currentUser.readWhom.filter(record => 
      moment(record.readTime).isSameOrAfter(oneMonthAgo)
    ).length;

    return {
      readMe: {
        today: readMeTodayCount,
        month: readMeMonthCount
      },
      readTa: {
        today: readTaTodayCount,
        month: readTaMonthCount
      }
    };
  } catch (error) {
    console.error('获取统计数据时出错:', error);
    return {
      status: 500,
      message: '获取统计数据时出现错误'
    };
  }
});