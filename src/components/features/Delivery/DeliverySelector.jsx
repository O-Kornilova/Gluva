import { useState, useEffect, useRef } from 'react'
import { searchCities, getWarehouses } from '../../../services/novaPoshtaService'
import { UKRPOSHTA_DELIVERY_INFO } from '../../../services/ukrPoshtaService'

const DeliverySelector = ({ onDeliveryChange }) => {
  const [deliveryType, setDeliveryType] = useState('nova')
  const [citySearch, setCitySearch] = useState('')
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState(null)
  const [warehouses, setWarehouses] = useState([])
  const [selectedWarehouse, setSelectedWarehouse] = useState(null)
  const [ukrAddress, setUkrAddress] = useState('')
  const [ukrIndex, setUkrIndex] = useState('')
  const [loadingCities, setLoadingCities] = useState(false)
  const [loadingWarehouses, setLoadingWarehouses] = useState(false)
  const [showCityDropdown, setShowCityDropdown] = useState(false)
  const searchTimeout = useRef(null)
  const dropdownRef = useRef(null)

  // Закриваємо dropdown при кліку поза ним
  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowCityDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Search cities with debounce
  useEffect(() => {
    if (citySearch.length < 2) {
      setCities([])
      setShowCityDropdown(false)
      return
    }

    clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(async () => {
      setLoadingCities(true)
      try {
        const result = await searchCities(citySearch)
        const addresses = result?.[0]?.Addresses || []
        setCities(addresses)
        setShowCityDropdown(addresses.length > 0)
      } catch (err) {
        console.error('Помилка пошуку міст:', err)
      } finally {
        setLoadingCities(false)
      }
    }, 500)
  }, [citySearch])

  // Load warehouses when city selected
  useEffect(() => {
    if (!selectedCity) return

    const loadWarehouses = async () => {
      setLoadingWarehouses(true)
      try {
        const result = await getWarehouses(selectedCity.DeliveryCity)
        setWarehouses(result || [])
      } catch (err) {
        console.error('Помилка завантаження відділень:', err)
      } finally {
        setLoadingWarehouses(false)
      }
    }

    loadWarehouses()
  }, [selectedCity])

  // Notify parent about delivery changes
  useEffect(() => {
    if (deliveryType === 'nova' && selectedCity && selectedWarehouse) {
      onDeliveryChange({
        type: 'nova',
        city: selectedCity.Present,
        warehouse: selectedWarehouse.Description,
        warehouseRef: selectedWarehouse.Ref
      })
    } else if (deliveryType === 'ukr' && ukrAddress && ukrIndex) {
      onDeliveryChange({
        type: 'ukr',
        address: ukrAddress,
        index: ukrIndex
      })
    } else if (deliveryType === 'pickup') {
      onDeliveryChange({
        type: 'pickup',
        address: 'м. Київ, вул. Прикладна 1'
      })
    }
  }, [deliveryType, selectedCity, selectedWarehouse, ukrAddress, ukrIndex])

  const handleCitySelect = city => {
    setSelectedCity(city)
    setCitySearch(city.Present)
    setShowCityDropdown(false)
    setSelectedWarehouse(null)
    setWarehouses([])
  }

  return (
    <div className='space-y-4'>
      {/* Delivery type selector */}
      <div className='flex gap-3'>
        <button
          type='button'
          onClick={() => setDeliveryType('nova')}
          className={`flex-1 py-3 rounded-lg font-semibold transition border text-sm ${
            deliveryType === 'nova'
              ? 'bg-amber-700 border-amber-600 text-white'
              : 'bg-stone-900 border-stone-700 text-stone-400 hover:border-stone-500'
          }`}
        >
          🚚 Нова Пошта
        </button>
        <button
          type='button'
          onClick={() => setDeliveryType('ukr')}
          className={`flex-1 py-3 rounded-lg font-semibold transition border text-sm ${
            deliveryType === 'ukr'
              ? 'bg-amber-700 border-amber-600 text-white'
              : 'bg-stone-900 border-stone-700 text-stone-400 hover:border-stone-500'
          }`}
        >
          📮 Укрпошта
        </button>
        <button
          type='button'
          onClick={() => setDeliveryType('pickup')}
          className={`flex-1 py-3 rounded-lg font-semibold transition border text-sm ${
            deliveryType === 'pickup'
              ? 'bg-amber-700 border-amber-600 text-white'
              : 'bg-stone-900 border-stone-700 text-stone-400 hover:border-stone-500'
          }`}
        >
          🏪 Самовивіз
        </button>
      </div>

      {/* Nova Poshta */}
      {deliveryType === 'nova' && (
        <div className='space-y-3'>
          {/* City search */}
          <div className='relative' ref={dropdownRef}>
            <input
              type='text'
              placeholder='Пошук міста...'
              value={citySearch}
              onChange={e => {
                setCitySearch(e.target.value)
                setSelectedCity(null)
              }}
              onFocus={() => cities.length > 0 && setShowCityDropdown(true)}
              className='w-full bg-stone-900 text-white rounded-lg px-4 py-3 border border-stone-700 focus:border-amber-600 focus:outline-none placeholder-stone-500'
            />
            {loadingCities && (
              <div className='absolute right-3 top-3 text-stone-400 text-sm'>Пошук...</div>
            )}

            {showCityDropdown && cities.length > 0 && (
              <div className='absolute z-20 w-full bg-stone-800 border border-stone-600 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-xl'>
                {cities.map((city, index) => (
                  <button
                    key={index}
                    type='button'
                    onClick={() => handleCitySelect(city)}
                    className='w-full text-left px-4 py-2 text-white hover:bg-stone-700 transition text-sm'
                  >
                    {city.Present}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Warehouses */}
          {selectedCity && (
            <div>
              {loadingWarehouses ? (
                <p className='text-stone-400 text-sm'>Завантаження відділень...</p>
              ) : (
                <select
                  onChange={e => {
                    const warehouse = warehouses.find(w => w.Ref === e.target.value)
                    setSelectedWarehouse(warehouse)
                  }}
                  className='w-full bg-stone-900 text-white rounded-lg px-4 py-3 border border-stone-700 focus:border-amber-600 focus:outline-none'
                  defaultValue=''
                >
                  <option value='' disabled>
                    Оберіть відділення
                  </option>
                  {warehouses.map((warehouse, index) => (
                    <option key={`${warehouse.Ref}-${index}`} value={warehouse.Ref}>
                      {warehouse.Description}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}
        </div>
      )}

      {/* Ukrposhta */}
      {deliveryType === 'ukr' && (
        <div className='space-y-3'>
          <div className='bg-stone-800 rounded-lg p-3 text-stone-400 text-sm border border-stone-700'>
            📦 {UKRPOSHTA_DELIVERY_INFO.description} • {UKRPOSHTA_DELIVERY_INFO.avgDays} •{' '}
            {UKRPOSHTA_DELIVERY_INFO.price}
          </div>
          <input
            type='text'
            placeholder='Поштовий індекс'
            value={ukrIndex}
            onChange={e => setUkrIndex(e.target.value)}
            className='w-full bg-stone-900 text-white rounded-lg px-4 py-3 border border-stone-700 focus:border-amber-600 focus:outline-none placeholder-stone-500'
          />
          <textarea
            placeholder='Адреса (місто, вулиця, будинок)'
            value={ukrAddress}
            onChange={e => setUkrAddress(e.target.value)}
            rows={2}
            className='w-full bg-stone-900 text-white rounded-lg px-4 py-3 border border-stone-700 focus:border-amber-600 focus:outline-none placeholder-stone-500 resize-none'
          />
        </div>
      )}

      {/* Pickup */}
      {deliveryType === 'pickup' && (
        <div className='bg-stone-800 rounded-lg p-4 border border-stone-700'>
          <p className='text-white font-semibold mb-2'>🏪 Самовивіз з ферми</p>
          <p className='text-stone-400 text-sm'>Київська обл, с. Дернівка</p>
          <p className='text-stone-400 text-sm'>Пн-Сб: 10:00 - 20:00</p>
          <p className='text-amber-500 text-sm font-semibold mt-2'>Безкоштовно</p>
        </div>
      )}
    </div>
  )
}

export default DeliverySelector
