import prisma from '../prismaClient.js'

// Отримати всі товари
export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { inStock: true },
      orderBy: { createdAt: 'desc' }
    })
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Помилка сервера' })
  }
}

// Отримати один товар за id
export const getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id) }
    })
    if (!product) return res.status(404).json({ error: 'Товар не знайдено' })
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: 'Помилка сервера' })
  }
}

// Створити товар (тільки адмін)
export const createProduct = async (req, res) => {
  try {
    const { name, description, pricePerKg, imageUrl } = req.body
    const product = await prisma.product.create({
      data: { name, description, pricePerKg, imageUrl }
    })
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ error: 'Помилка сервера' })
  }
}

// Оновити товар (тільки адмін)
export const updateProduct = async (req, res) => {
  try {
    const product = await prisma.product.update({
      where: { id: Number(req.params.id) },
      data: req.body
    })
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: 'Помилка сервера' })
  }
}

// Видалити товар (тільки адмін)
export const deleteProduct = async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: Number(req.params.id) }
    })
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Помилка сервера' })
  }
}
