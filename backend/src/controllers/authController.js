import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'

const generateToken = userId => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body

    // Перевіряємо чи юзер вже існує
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return res.status(400).json({ error: 'Email вже використовується' })
    }

    // Хешуємо пароль.
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name }
    })

    const token = generateToken(user.id)

    // Повертаємо токен і дані юзера
    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin
      }
    })
  } catch (error) {
    console.error('REGISTER ERROR:', error)
    res.status(500).json({ error: 'Помилка сервера' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'Невірний email або пароль' })
    }

    // bcrypt.compare порівнює пароль з хешем
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return res.status(401).json({ error: 'Невірний email або пароль' })
    }

    const token = generateToken(user.id)

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Помилка сервера' })
  }
}

// Отримати поточного юзера (перевірка токену)
export const getMe = async (req, res) => {
  // req.user додає наш auth middleware
  res.json({
    user: {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      isAdmin: req.user.isAdmin
    }
  })
}
