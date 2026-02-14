const PriceDisplay = ({ totalPrice, pricePerKg }) => {
  return (
    <>
      {/* Price per kg */}
      <div className='text-right'>
        <span className='text-sm opacity-75'>{pricePerKg} ₴/кг</span>
      </div>

      {/* Total price and order button */}
      <div className='flex items-center justify-between bg-black bg-opacity-50 rounded-lg p-3 backdrop-blur-sm'>
        <div>
          <div className='text-lg font-bold text-green-400'>{totalPrice} ₴</div>
          <div className='text-xs opacity-75'>до сплати</div>
        </div>
      </div>
    </>
  )
}

export default PriceDisplay
