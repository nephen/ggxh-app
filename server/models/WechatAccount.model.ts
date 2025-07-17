import mongoose from 'mongoose';

const wechatAccountSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  articleLink: {
    type: String,
    required: true
  },
  autoReply: {
    type: String,
    default: ''
  },
  topCount: {
    type: Number,
    default: 0
  },
  requiredFollows: {
    type: Number,
    required: true
  },
  followCount: {
    type: Number,
    default: 0
  },
  publishTime: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  matchErrorCount: {
    type: Number,
    default: 0
  },
  superTopPeriods: {
    type: [
      {
        startTime: {
          type: Date,
          required: true
        },
        endTime: {
          type: Date,
          required: true
        }
      }
    ],
    default: []
  },
  followedByUsers: {
    type: [Number],
    default: []
  }
});

export const WechatAccount = mongoose.model('WechatAccount', wechatAccountSchema);
