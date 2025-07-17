import { Schema, model } from 'mongoose';

// 定义举报记录模型的 Schema
const reportRecordSchema = new Schema({
  // 被举报的时间
  reportedTime: {
    type: Date,
    default: Date.now, // 默认值为当前时间
    required: true
  },
  // 被举报原因
  reportedReason: {
    type: String,
    required: true
  },
  // 被举报行为的操作时间
  reportedActionTime: {
    type: Date,
    required: true
  },
  // 举报人（当前用户昵称）
  reporterNickname: {
    type: String,
    required: true
  },
  // 被举报人用户 id
  reportedUserId: {
    type: Number,
    required: true
  },
  // 新增字段：文章 ID，不是必须有的
  articleId: {
    type: String,
    required: false
  }
});

// 创建并导出 ReportRecord 模型
export const ReportRecord = model('ReportRecord', reportRecordSchema);