import { Schema, model } from 'mongoose';

// 定义文章模型的 Schema
const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  requiredReads: {
    type: Number,
    required: true
  },
  publishTime: {
    type: String,
    required: true
  },
  readCount: {
    type: Number,
    default: 0
  },
  link: {
    type: String,
    required: true
  },
  requirement: {
    type: String,
    default: '仅阅读'
  },
  sources: {
    type: [String],
    default: ['朋友圈']
  },
  // 新增 topCount 字段，代表文章被顶的次数，默认值为 0
  topCount: {
    type: Number,
    default: 0
  },
  // 新增 isActive 字段，默认值为 true
  isActive: {
    type: Boolean,
    default: true
  },
  // 新增 superTopPeriods 字段，代表文章超级置顶的时间段，可能有多个
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
  // 新增 userId 字段，代表文章所属的用户 ID
  userId: {
    type: Number,
    required: true
  },
  // 新增 readByUsers 字段，记录阅读过该文章的用户ID数组
  readByUsers: {
    type: [Number],
    default: []
  }
});

// 创建并导出 Article 模型
export const Article = model('Article', articleSchema);