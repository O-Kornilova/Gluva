import { Router } from 'express'
import { authenticate, requireAdmin } from '../middleware/authMiddleware.js'

import {
  getOrders,
  createOrder,
  updateOrderStatus
} from '../controllers/orderController.js'

const router = Router()

router.get('/', authenticate, requireAdmin, getOrders)
router.post('/', createOrder)
router.patch('/:id/status', authenticate, requireAdmin, updateOrderStatus)

export default router
