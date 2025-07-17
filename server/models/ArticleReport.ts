import { Schema, model } from 'mongoose';

// 定义文章报数模型的 Schema
const articleReportSchema = new Schema({
  articleId: {
    type: Schema.Types.ObjectId,
    ref: 'Article',
    required: true
  },
  reportedReadCount: {
    type: Number,
    required: true
  },
  // 新增用户字段
  userId: {
    type: Number,
    required: true 
  },
  readTime: {
    type: Date,
    required: true
  },
  action: {
    type: String,
    required: true
  }
});

// 创建并导出 ArticleReport 模型
export const ArticleReport = model('ArticleReport', articleReportSchema);