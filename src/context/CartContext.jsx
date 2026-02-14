import { createContext, useContext, useReducer, useMemo } from 'react'

const CartContext = createContext(null)

const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR_CART: 'CLEAR_CART'
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity } = action.payload
      const existing = state.items.find(item => item.productId === product.id)

      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item
          )
        }
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            productId: product.id,
            productName: product.name,
            pricePerKg: product.pricePerKg,
            quantity
          }
        ]
      }
    }
    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.productId !== action.payload)
      }
    case CART_ACTIONS.CLEAR_CART:
      return { items: [] }
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] })

  const totalPrice = useMemo(() => {
    return cart.items.reduce((sum, item) => sum + item.quantity * item.pricePerKg, 0)
  }, [cart.items])

  const addToCart = (product, quantity) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: { product, quantity } })
  }

  const removeFromCart = productId => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId })
  }

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART })
  }

  const value = useMemo(
    () => ({
      items: cart.items,
      totalPrice,
      addToCart,
      removeFromCart,
      clearCart
    }),
    [cart.items, totalPrice]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
