import { Router } from 'express'
import { authenticate, requireAdmin } from '../middleware/authMiddleware.js'

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js'

const router = Router()

// Публічні маршрути — доступні всім
router.get('/', getProducts)
router.get('/:id', getProductById)

// Захищені маршрути
router.post('/', authenticate, requireAdmin, createProduct)
router.put('/:id', authenticate, requireAdmin, updateProduct)
router.delete('/:id', authenticate, requireAdmin, deleteProduct)

export default router
