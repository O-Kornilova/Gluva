import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ordersApi } from '../services/api'

const STATUS_LABELS = {
  new: { label: 'Нове', color: 'bg-blue-500' },
  processing: { label: 'В обробці', color: 'bg-yellow-500' },
  shipped: { label: 'Відправлено', color: 'bg-purple-500' },
  delivered: { label: 'Доставлено', color: 'bg-green-500' },
  cancelled: { label: 'Скасовано', color: 'bg-red-500' },
}

const AdminPage = () => {
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/')
      return
    }
    if (!isAdmin) {
      navigate('/')
      return
    }
    fetchOrders()
  }, [user, isAdmin])

  const fetchOrders = async () => {
    try {
      const data = await ordersApi.getAll()
      setOrders(data)
    } catch (err) {
      console.error('Помилка завантаження замовлень:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (orderId, newStatus) => {
    try {
      await ordersApi.updateStatus(orderId, newStatus)
      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)),
      )
    } catch (err) {
      console.error('Помилка оновлення статусу:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-xl">Завантаження...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">👨‍💼 Адмін панель</h1>
          <div className="bg-stone-800 rounded-lg px-4 py-2 text-stone-400 text-sm">
            Замовлень: <span className="text-white font-bold">{orders.length}</span>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-stone-400 text-xl">Замовлень поки немає</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-stone-900 rounded-2xl p-6 border border-stone-700">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                  <div>
                    <p className="text-stone-400 text-xs mb-1">
                      {new Date(order.createdAt).toLocaleString('uk-UA')}
                    </p>
                    <p className="font-bold text-lg">{order.name}</p>
                    <p className="text-stone-400 text-sm">{order.phone}</p>
                  </div>

                  <div className="text-sm text-stone-400">
                    {order.delivery?.type === 'nova' && (
                      <p>
                        🚚 {order.delivery.city}, {order.delivery.warehouse}
                      </p>
                    )}
                    {order.delivery?.type === 'ukr' && (
                      <p>
                        📮 {order.delivery.address}, {order.delivery.index}
                      </p>
                    )}
                    {order.delivery?.type === 'pickup' && <p>🏪 Самовивіз</p>}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`${
                        STATUS_LABELS[order.status]?.color || 'bg-gray-500'
                      } text-white text-xs px-3 py-1 rounded-full font-semibold`}
                    >
                      {STATUS_LABELS[order.status]?.label || order.status}
                    </span>
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="bg-stone-800 text-white text-sm rounded-lg px-3 py-1 border border-stone-600 focus:outline-none focus:border-amber-600"
                    >
                      {Object.entries(STATUS_LABELS).map(([value, { label }]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="border-t border-stone-700 pt-4">
                  <div className="flex flex-wrap gap-3">
                    {order.items?.map((item, index) => (
                      <div key={index} className="bg-stone-800 rounded-lg px-3 py-2 text-sm">
                        <span className="text-white">{item.productName}</span>
                        <span className="text-stone-400 ml-2">{item.quantity} кг</span>
                        <span className="text-amber-500 ml-2 font-semibold">
                          {(item.quantity * item.pricePerKg).toFixed(0)} ₴
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-right mt-3 font-bold text-amber-500 text-lg">
                    Всього: {order.totalPrice} ₴
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPage
