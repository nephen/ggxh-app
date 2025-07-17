import { MAX_REMAINING } from '../constants/timeSlots';

export interface TimeSlotConfig {
  time: string;
  remaining: number;
  price: number;
}

export const createTimeSlotService = <T extends { new(): any }>(model: T) => {
  return {
    // 初始化时间段数据
    initTimeSlots: async (configs: TimeSlotConfig[]) => {
      try {
        const existing = await model.findOne({});
        if (!existing) {
          await model.deleteMany({});
          const timeSlotsData = [
            ...configs.map(config => ({ ...config, day: 'today' })),
            ...configs.map(config => ({ ...config, day: 'tomorrow' }))
          ];
          await model.insertMany(timeSlotsData);
          console.log(`${model.modelName} initialized successfully.`);
        }
      } catch (error) {
        console.error(`Error initializing ${model.modelName}:`, error);
      }
    },

    // 检查并更新日期
    updateDayStatus: async (configs: TimeSlotConfig[]) => {
      try {
        const todaySlot = await model.findOne({ day: 'today' });
        if (!todaySlot) return;

        const todayDate = new Date().toDateString();
        const lastUpdated = todaySlot.updatedAt?.toDateString();
        
        if (lastUpdated && todayDate !== lastUpdated) {
          // 先删除今天的数据
          await model.deleteMany({ day: 'today' });
          // 获取明天的数据
          const oldTomorrowSlots = await model.find({ day: 'tomorrow' });
          // 更新今天的数据 - 将明天的数据复制到今天
          const todaySlots = oldTomorrowSlots.map(slot => ({
            ...slot.toObject(),
            day: 'today',
            _id: undefined
          }));
          await model.insertMany(todaySlots);
          
          // 重置明天的数据
          const tomorrowSlots = [
            ...configs.map(config => ({ ...config, day: 'tomorrow', remaining: MAX_REMAINING }))
          ];
          await model.deleteMany({ day: 'tomorrow' });
          await model.insertMany(tomorrowSlots);
        }
      } catch (error) {
        console.error(`Error updating ${model.modelName} day status:`, error);
      }
    },

    // 获取时间段数据
    getTimeSlots: async () => {
      try {
        return await model.find({});
      } catch (error) {
        console.error(`Error fetching ${model.modelName}:`, error);
        throw error;
      }
    }
  };
};