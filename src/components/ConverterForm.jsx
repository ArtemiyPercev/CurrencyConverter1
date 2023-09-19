import { useState, useEffect } from 'react'
import CurrencyChange from './CurrencyChange'
import Button from './Button'
import InputAmount from './InputAmount'
import DisplayAmount from './DisplayAmount'

const ConverterForm = () => {
  const [amount, setAmount] = useState('1.00')
  const [fromCurrency, setFromCurrency] = useState('EUR')
  const [toCurrency, setToCurrency] = useState('TRY')
  const [exchangeRate, setExchangeRate] = useState(null)

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          `https://my.transfergo.com/api/fx-rates?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
        )
        const data = await response.json()
        setExchangeRate(data.rate)
        console.log(data, exchangeRate)
      } catch (error) {
        console.error('Error fetching exchange rate:', error)
      }
    }

    fromCurrency !== toCurrency ? fetchExchangeRate() : setExchangeRate(1)
  }, [fromCurrency, toCurrency, amount])

  const handleAmountChange = (e) => {
    setAmount(e.target.value)
  }

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value)
  }

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const convertedAmount =
      fromCurrency == toCurrency
        ? amount * 1
        : setExchangeRate(amount * exchangeRate)

    return convertedAmount
    // Здесь будет логика для конвертации валюты
  }

  return (
    <form onSubmit={handleSubmit}>
      <CurrencyChange
        text="From"
        currency={fromCurrency}
        currencyChange={handleFromCurrencyChange}
      />
      <CurrencyChange
        text="To"
        currency={toCurrency}
        currencyChange={handleToCurrencyChange}
      />
      <InputAmount amount={amount} amountChange={handleAmountChange} />
      <DisplayAmount />
      <Button onClick={handleSubmit} />
    </form>
  )
}
export default ConverterForm

// problema v handleSubmit i
