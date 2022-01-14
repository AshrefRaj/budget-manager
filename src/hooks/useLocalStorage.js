import { useState, useEffect } from 'react'
export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue) return JSON.parse(jsonValue)
    if (typeof defaultValue === 'function') return defaultValue()
    else return defaultValue
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
export default useLocalStorage
