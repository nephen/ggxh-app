import { MAX_REMAINING } from '../../constants/timeSlots';
import { BeanTransaction } from '~/server/models/BeanTransaction.model'

export interface TimeSlotPurchaseParams {
  userId: string;
  slots: Array<{
    _id: string;
    time: string;
    day: string;
    price: number;
    remaining: number;
  }>;
  totalCost: number;
  targetId: string;
}

export async function handleTimeSlotPurchase(
  params: TimeSlotPurchaseParams,
  options: {
    model: any;
    purchaseModel: any;
    targetModel: any;
    targetField: string;
    userModel: any;  // 新增 userModel 类型定义
  }
) {
  const { userId, slots, totalCost, targetId } = params;
  const { model, purchaseModel, targetModel, targetField, userModel } = options;  // 解构出 userModel

  console.log(userId,slots,totalCost,targetId)

  if (!userId || !slots?.length || !totalCost || !targetId) {
    return {
      status: 400,
      message: '缺少必要参数'
    };
  }

  try {
    // 1. 检查用户余额是否足够
    const user = await userModel.findOne({ id: userId });
    if (!user) {
      return {
        status: 404,
        message: '用户不存在'
      };
    }

    if (user.beanCount < totalCost) {
      return {
        status: 400,
        message: '阅豆余额不足'
      };
    }

    // 2. 检查时间段是否还有剩余位置
    for (const slot of slots) {
      const dbSlot = await model.findById(slot._id);
      if (!dbSlot || dbSlot.remaining < 1) {
        return {
          status: 400,
          message: `时间段 ${slot.time} 已无剩余位置`
        };
      }
    }

    // 3. 执行扣减和更新操作
    user.beanCount -= totalCost;
    await user.save();

    // 添加交易记录逻辑
    const transaction = new BeanTransaction({
      userId: user.id,
      type: 'expense',
      amount: -totalCost,
      description: `购买时间段消耗阅豆`
    });
    await transaction.save();

    // 更新时间段剩余位置
    for (const slot of slots) {
      await model.findByIdAndUpdate(
        slot._id,
        { $inc: { remaining: -1 } }
      );

      // 记录购买信息
      await purchaseModel.create({
        userId,
        [targetField]: targetId,
        purchaseDate: new Date(),
        timeSlot: {
          day: calculateSlotDate(slot.day),
          time: slot.time,
          price: slot.price
        },
        position: MAX_REMAINING - slot.remaining,
        cost: slot.price
      });
    }

    // 更新目标的 superTopPeriods
    const timeRanges = slots.map(slot => {
      const [startTimeStr, endTimeStr] = slot.time.split(' - ');
      const purchaseDate = calculateSlotDate(slot.day);
      
      const startTime = new Date(purchaseDate);
      const [startHour, startMinute] = startTimeStr.split(':').map(Number);
      startTime.setHours(startHour, startMinute, 0, 0);
      
      const endTime = new Date(purchaseDate);
      const [endHour, endMinute] = endTimeStr.split(':').map(Number);
      endTime.setHours(endHour, endMinute, 0, 0);
      
      return { startTime, endTime };
    });

    await targetModel.findByIdAndUpdate(targetId, {
      $push: { 
        superTopPeriods: { $each: timeRanges }
      }
    });

    return {
      status: 200,
      message: '购买成功'
    };
  } catch (error) {
    console.error('购买时间段时出错:', error);
    return {
      status: 500,
      message: '购买时间段时出现服务器错误'
    };
  }
}

function calculateSlotDate(dayType: string): Date {
  const date = new Date();
  if (dayType === 'tomorrow') {
    date.setDate(date.getDate() + 1);
  }
  return date;
}