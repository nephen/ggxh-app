import { defineEventHandler, readBody } from 'h3';
import { WechatAccountTimeSlot } from '../../models/WechatAccountTimeSlot.model';
import { User } from '../../models/User.model';
import { WechatAccountTimeSlotPurchase } from '../../models/WechatAccountTimeSlotPurchase.model';
import { WechatAccount } from '../../models/WechatAccount.model';
import { handleTimeSlotPurchase } from './timeSlotService';

export default defineEventHandler(async (event) => {
  const params = await readBody(event);
  return handleTimeSlotPurchase(params, {
    model: WechatAccountTimeSlot,
    purchaseModel: WechatAccountTimeSlotPurchase,
    targetModel: WechatAccount,
    targetField: 'accountId',
    userModel: User
  });
});