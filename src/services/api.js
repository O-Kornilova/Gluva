const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('gluva_token')

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Помилка запиту')
  }

  return response.json()
}

// Products
export const productsApi = {
  getAll: () => request('/products'),
  getById: (id) => request(`/products/${id}`),
  create: (data) => request('/products', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/products/${id}`, { method: 'DELETE' }),
}

// Orders
export const ordersApi = {
  getAll: () => request('/orders'),
  create: (data) => request('/orders', { method: 'POST', body: JSON.stringify(data) }),
  updateStatus: (id, status) =>
    request(`/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
}

// Auth
export const authApi = {
  register: (data) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  me: () => request('/auth/me'),
}
