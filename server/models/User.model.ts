import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  nickname: String,
  avatar: String,
  recommendSource: String,  // 新增字段：推荐来源
  referralCount: { type: Number, default: 0 },  // 新增字段：推荐人数
  beanCount: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false }, // 新增管理员字段
  readByUsers: [
    {
      userId: { type: Number, required: true },
      readTime: { type: Date, default: Date.now }
    }
  ],
  // 新增字段，记录阅读过谁的文章以及阅读时间
  readWhom: [
    {
      userId: { type: Number, required: true },
      readTime: { type: Date, default: Date.now }
    }
  ],
  // 新增字段：记录官住过的用户
  following: [
    {
      userId: { type: Number, required: true },
      followTime: { type: Date, default: Date.now }
    }
  ],
  // 新增字段：记录被哪些用户官住过
  followers: [
    {
      userId: { type: Number, required: true },
      followTime: { type: Date, default: Date.now }
    }
  ],
  paymentQRCode: { type: String, default: '' } // 新增收款码字段
});

// 定义一个方法来清理一个月前的阅读记录
userSchema.methods.cleanOldReadRecords = function() {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  this.readByUsers = this.readByUsers.filter(record => record.readTime >= oneMonthAgo);
  // 清理新增字段一个月前的记录
  this.readWhom = this.readWhom.filter(record => record.readTime >= oneMonthAgo);
};

// 在保存文档之前清理旧的阅读记录
userSchema.pre('save', function(next) {
  this.cleanOldReadRecords();
  next();
});

export const User = mongoose.model('User', userSchema);