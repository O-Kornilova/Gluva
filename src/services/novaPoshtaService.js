const API_KEY = import.meta.env.VITE_NOVA_POSHTA_API_KEY
const API_URL = 'https://api.novaposhta.ua/v2.0/json/'

const makeRequest = async (modelName, calledMethod, methodProperties = {}) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiKey: API_KEY,
      modelName,
      calledMethod,
      methodProperties
    })
  })
  const data = await response.json()
  return data.data
}

export const searchCities = async searchText => {
  if (!searchText || searchText.length < 2) return []
  return makeRequest('Address', 'searchSettlements', {
    CityName: searchText,
    Limit: 10
  })
}

export const getWarehouses = async cityRef => {
  if (!cityRef) return []
  return makeRequest('Address', 'getWarehouses', {
    CityRef: cityRef,
    Limit: 50
  })
}
