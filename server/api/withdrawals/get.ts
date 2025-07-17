import { defineEventHandler } from 'h3'
import Withdrawal from '~/server/models/Withdrawal.model'

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        const userId = Number(query.userId)
        const limit = Number(query.limit) || 50

        if (!userId) {
            return createError({
                status: 400,
                message: '缺少必要参数'
            })
        }

        const withdrawals = await Withdrawal.find({ userId })
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean()

        return {
            status: 200,
            data: withdrawals
        }
    } catch (error) {
        console.error('获取提现记录失败:', error)
        return createError({
            status: 500,
            message: '获取提现记录失败'
        })
    }
})