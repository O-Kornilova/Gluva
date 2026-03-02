import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'

// перевіряє JWT токен перед захищеними routes
// Якщо токен валідний — додає юзера в req.user і пропускає далі
// Якщо ні — повертає 401 Unauthorized
export const authenticate = async (req, res, next) => {
  try {
    // Токен передається в заголовку: Authorization: Bearer eyJhbG...
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Токен відсутній' })
    }

    const token = authHeader.split(' ')[1]

    // jwt.verify перевіряє підпис і термін дії токену
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Дістаємо юзера з БД щоб мати актуальні дані
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } })
    if (!user) return res.status(401).json({ error: 'Юзер не знайдений' })

    req.user = user
    next() // передаємо запит далі до controller
  } catch (error) {
    res.status(401).json({ error: 'Невалідний токен' })
  }
}

// Middleware для перевірки що юзер є адміном
// Використовується після authenticate
export const requireAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Доступ заборонено' })
  }
  next()
}
