import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'ggxh2025'
const JWT_EXPIRES_IN = '1d'

// 生成JWT token
export function generateToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

// 验证JWT token
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}