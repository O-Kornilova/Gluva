import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ordersApi, productsApi } from '../services/api'

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
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('orders')
  const [savedMessage, setSavedMessage] = useState('')

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
    fetchProducts()
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

  const fetchProducts = async () => {
    try {
      const data = await productsApi.getAll()
      setProducts(data)
    } catch (err) {
      console.error('Помилка завантаження товарів:', err)
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

  const updateProduct = async (productId, data) => {
    try {
      await productsApi.update(productId, data)
      setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, ...data } : p)))
      setSavedMessage('Збережено ✓')
      setTimeout(() => setSavedMessage(''), 2000)
    } catch (err) {
      console.error('Помилка оновлення товару:', err)
      setSavedMessage('Помилка ✗')
      setTimeout(() => setSavedMessage(''), 2000)
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
        <h1 className="text-4xl font-bold mb-8">👨‍💼 Адмін панель</h1>
        {savedMessage && (
          <div className="fixed top-6 right-6 bg-amber-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg z-50 transition">
            {savedMessage}
          </div>
        )}

        {/* Таби */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === 'orders'
                ? 'bg-amber-700 text-white'
                : 'bg-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            Замовлення ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === 'products'
                ? 'bg-amber-700 text-white'
                : 'bg-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            Товари ({products.length})
          </button>
        </div>

        {/* Замовлення */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <p className="text-stone-400 text-xl text-center py-16">Замовлень поки немає</p>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-stone-900 rounded-2xl p-6 border border-stone-700"
                >
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
              ))
            )}
          </div>
        )}

        {/* Товари */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-stone-900 rounded-2xl p-6 border border-stone-700"
              >
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <div className="flex items-center gap-6">
                    {/* Ціна */}
                    <div className="flex items-center gap-2">
                      <label className="text-stone-400 text-sm">Ціна ₴/кг:</label>
                      <input
                        type="number"
                        defaultValue={product.pricePerKg}
                        onBlur={(e) =>
                          updateProduct(product.id, { pricePerKg: Number(e.target.value) })
                        }
                        className="w-24 bg-stone-800 text-white rounded-lg px-3 py-2 border border-stone-600 focus:border-amber-600 focus:outline-none"
                      />
                    </div>
                    {/* В наявності */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <span className="text-stone-400 text-sm">В наявності:</span>
                      <input
                        type="checkbox"
                        checked={product.inStock}
                        onChange={(e) => updateProduct(product.id, { inStock: e.target.checked })}
                        className="w-5 h-5 accent-amber-600 cursor-pointer"
                      />
                    </label>
                  </div>
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
