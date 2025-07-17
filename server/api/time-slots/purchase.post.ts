import { defineEventHandler, readBody } from 'h3';
import { TimeSlot } from '../../models/TimeSlot.model';
import { User } from '../../models/User.model';
import { TimeSlotPurchase } from '../../models/TimeSlotPurchase.model';
import { Article } from '../../models/Article';
import { handleTimeSlotPurchase } from './timeSlotService';

export default defineEventHandler(async (event) => {
  const params = await readBody(event);
  return handleTimeSlotPurchase(params, {
    model: TimeSlot,
    purchaseModel: TimeSlotPurchase,
    targetModel: Article,
    targetField: 'articleId',
    userModel: User
  });
});