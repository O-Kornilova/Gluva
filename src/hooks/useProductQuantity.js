import { useState, useCallback, useMemo } from 'react'

export const useProductQuantity = (initialQuantity = 0.5, pricePerKg = 0) => {
  const [quantity, setQuantity] = useState(initialQuantity)

  const increase = useCallback(() => {
    setQuantity((prev) => prev + 0.5)
  }, [])

  const decrease = useCallback(() => {
    setQuantity((prev) => Math.max(prev - 0.5, 0.5))
  }, [])

  const totalPrice = useMemo(() => {
    return (quantity * pricePerKg).toFixed(0)
  }, [quantity, pricePerKg])

  return { quantity, increase, decrease, totalPrice }
}
