import prisma from '../prismaClient.js'

// Отримати всі замовлення (тільки адмін)
export const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: { items: true }
    })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: 'Помилка сервера' })
  }
}

// Створити замовлення (доступно всім, навіть гостям)
export const createOrder = async (req, res) => {
  try {
    const { name, phone, delivery, items, totalPrice, userId } = req.body

    const order = await prisma.order.create({
      data: {
        name,
        phone,
        delivery,
        totalPrice,
        userId: userId || null,
        items: {
          create: items.map(item => ({
            productId: item.productId,
            productName: item.productName,
            pricePerKg: item.pricePerKg,
            quantity: item.quantity
          }))
        }
      },
      include: { items: true }
    })

    res.status(201).json(order)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Помилка сервера' })
  }
}

// Оновити статус замовлення (тільки адмін)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body
    const order = await prisma.order.update({
      where: { id: Number(req.params.id) },
      data: { status }
    })
    res.json(order)
  } catch (error) {
    res.status(500).json({ error: 'Помилка сервера' })
  }
}
