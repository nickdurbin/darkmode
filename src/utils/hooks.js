import { useState, useEffect } from 'react';
import axios from 'axios';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return window.localStorage.getItem(key) || initialValue;
  })

  const customSetter = (newValue) => {
    setValue(newValue)
    window.localStorage.setItem(key, newValue)
  }

  return [value, customSetter]
}

export function useCoinData() {
  const [coinData, setCoinData] = useState([])

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
      )
      .then(res => setCoinData(res.data))
      .catch(err => console.log(err));
  }, []);

  return [coinData, setCoinData]
}

export function useDarkMode() {
  const [darkMode, setDarkMode] = useLocalStorage('dark')

  useEffect(() => {
    darkMode
      ? document.body.classList.add('dark-mode')
      : document.body.classList.remove('dark-mode')
  }, [darkMode])


  return [darkMode, setDarkMode]
}