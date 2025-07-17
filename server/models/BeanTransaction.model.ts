import mongoose from 'mongoose';

const beanTransactionSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const BeanTransaction = mongoose.model('BeanTransaction', beanTransactionSchema);