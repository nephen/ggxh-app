import { verifyToken } from '../utils/auth'

export default defineEventHandler(async (event) => {
    // 跳过登录接口的验证
    if (event.node.req.url?.startsWith('/api/users') || event.node.req.url?.startsWith('/api/payment/wxnotify')) {
        return
    }

    // 只对/api开头的后端请求进行认证
    if (!event.node.req.url?.startsWith('/api')) {
        return
    }

    const authHeader = event.node.req.headers['authorization']
    if (!authHeader) {
        throw createError({
            status: 401,
            message: '未提供认证令牌'
        })
    }

    const token = authHeader.split(' ')[1]
    const decoded = verifyToken(token)
    if (!decoded) {
        throw createError({
            status: 401,
            message: '无效的认证令牌'
        })
    }

    event.context.user = decoded
})