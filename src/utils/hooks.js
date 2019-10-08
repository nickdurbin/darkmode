import { useState, useEffect } from 'react';
import axios from 'axios';

export function useInput(initialValue) {
  const [value, setValue] = useState(initialValue)

  const customSetter = (newValue) => {
    console.log('New Value:', newValue)
    setValue(newValue)
  }

  return [value, customSetter]
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useInput(() => {
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