import { defineEventHandler } from 'h3';
import { WechatAccountTimeSlot } from '../models/WechatAccountTimeSlot.model';
import { MAX_REMAINING } from '../constants/timeSlots';
import { createTimeSlotService } from '../utils/timeSlotUtils';

// 公众号时间段配置
const wechatTimeSlotConfigs = [
  { time: '00:00 - 07:00', remaining: MAX_REMAINING, price: 50 },
  { time: '07:00 - 08:00', remaining: MAX_REMAINING, price: 20 },
  { time: '08:00 - 09:00', remaining: MAX_REMAINING, price: 20 },
  { time: '09:00 - 10:00', remaining: MAX_REMAINING, price: 20 },
  { time: '10:00 - 11:00', remaining: MAX_REMAINING, price: 20 },
  { time: '11:00 - 12:00', remaining: MAX_REMAINING, price: 30 },
  { time: '12:00 - 13:00', remaining: MAX_REMAINING, price: 30 },
  { time: '13:00 - 14:00', remaining: MAX_REMAINING, price: 30 },
  { time: '14:00 - 15:00', remaining: MAX_REMAINING, price: 20 },
  { time: '15:00 - 16:00', remaining: MAX_REMAINING, price: 20 },
  { time: '16:00 - 17:00', remaining: MAX_REMAINING, price: 20 },
  { time: '17:00 - 18:00', remaining: MAX_REMAINING, price: 30 },
  { time: '18:00 - 19:00', remaining: MAX_REMAINING, price: 30 },
  { time: '19:00 - 20:00', remaining: MAX_REMAINING, price: 30 },
  { time: '20:00 - 21:00', remaining: MAX_REMAINING, price: 30 },
  { time: '21:00 - 22:00', remaining: MAX_REMAINING, price: 30 },
  { time: '22:00 - 23:00', remaining: MAX_REMAINING, price: 20 },
  { time: '23:00 - 24:00', remaining: MAX_REMAINING, price: 20 },
];

const wechatTimeSlotService = createTimeSlotService(WechatAccountTimeSlot);

export default defineEventHandler(async (event) => {
  try {
    await wechatTimeSlotService.initTimeSlots(wechatTimeSlotConfigs);
    await wechatTimeSlotService.updateDayStatus(wechatTimeSlotConfigs);
    return await wechatTimeSlotService.getTimeSlots();
  } catch (error) {
    console.error('Error fetching wechat account time slots:', error);
    return { error: 'Failed to fetch wechat account time slots' };
  }
});