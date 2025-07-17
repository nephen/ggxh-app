import { defineEventHandler, readBody } from 'h3'
import { User } from '~/server/models/User.model'

export default defineEventHandler(async (event) => {
    try {
        // 读取请求体
        const body = await readBody(event)
        const { userId, paymentQRCode } = body

        // 验证参数
        if (!userId || !paymentQRCode) {
            return createError({
                status: 400,
                message: '缺少必要参数'
            })
        }

        // 更新用户收款码
        const updatedUser = await User.findOneAndUpdate(
            { id: userId },
            { paymentQRCode },
            { new: true }
        )

        if (!updatedUser) {
            return createError({
                status: 404,
                message: '用户不存在'
            })
        }

        return {
            status: 200,
            message: '收款码更新成功',
            data: updatedUser
        }
    } catch (error) {
        console.error('Error updating payment QR code:', error)
        return createError({
            status: 500,
            message: '服务器内部错误'
        })
    }
})