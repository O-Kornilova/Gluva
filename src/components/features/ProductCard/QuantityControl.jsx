const QuantityControl = ({ quantity, onIncrease, onDecrease, minQuantity = 0.5 }) => {
  return (
    <div className='flex items-center justify-between bg-black bg-opacity-50 rounded-lg p-3 backdrop-blur-sm'>
      <button
        onClick={onDecrease}
        className='w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        disabled={quantity <= minQuantity}
        aria-label='Зменшити кількість'
      >
        −
      </button>

      <div className='text-center'>
        <div className='text-lg font-bold'>{quantity} кг</div>
        <div className='text-xs opacity-75'>{quantity * 1000} г</div>
      </div>

      <button
        onClick={onIncrease}
        className='w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white font-bold transition-colors'
        aria-label='Збільшити кількість'
      >
        +
      </button>
    </div>
  )
}

export default QuantityControl
