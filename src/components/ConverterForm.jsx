import { useState } from 'react'
import CurrencyChange from './CurrencyChange'
import Button from './Button'
import InputAmount from './InputAmount'
import DisplayAmount from './DisplayAmount'
import { HiOutlineArrowsRightLeft } from 'react-icons/hi2'
import styles from './converterForm.module.css'

const ConverterForm = () => {
  const [amount, setAmount] = useState('1.00')
  const [fromCurrency, setFromCurrency] = useState('EUR')
  const [toCurrency, setToCurrency] = useState('TRY')
  const [exchangeRate, setExchangeRate] = useState(null)
  const [toAmount, setToAmount] = useState('')
  const [showInputAmount, setShowInputAmount] = useState(false)
  const [isButtonClicked, setIsButtonClicked] = useState(true)

  const fetchExchangeRate = async (reversed = false) => {
    const apiURL = new URL('https://my.transfergo.com/api/fx-rates')

    if (reversed) {
      apiURL.searchParams.set('from', toCurrency)
      apiURL.searchParams.set('to', fromCurrency)
      apiURL.searchParams.set('amount', toAmount)
    } else {
      apiURL.searchParams.set('from', fromCurrency)
      apiURL.searchParams.set('to', toCurrency)
      apiURL.searchParams.set('amount', amount)
    }

    try {
      const response = await fetch(apiURL)
      const data = await response.json()
      setExchangeRate(data.rate)

      if (reversed) {
        setAmount(data.toAmount)
      } else {
        setToAmount(data.toAmount)
      }

      console.log(data, exchangeRate)
    } catch (error) {
      console.error('Error fetching exchange rate:', error)
    }
  }

  const handleAmountChange = (e) => {
    setAmount(e.target.value)
    if (!exchangeRate) {
      return
    }

    fromCurrency !== toCurrency ? fetchExchangeRate() : setExchangeRate(1)
  }

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value)
  }

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value)
  }

  const handleToAmountChange = (e) => {
    setToAmount(e.target.value)

    if (!exchangeRate) {
      return
    }

    fromCurrency !== toCurrency ? fetchExchangeRate(true) : setExchangeRate(1)
  }

  const changeCurrency = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchExchangeRate()
    setIsButtonClicked(false)
    if (fromCurrency === toCurrency) {
      setShowInputAmount(true)
      return setToAmount(amount)
    }
    setShowInputAmount(true)
    return console.log(toAmount.convertedAmount)
    // Здесь будет логика для конвертации валюты
  }

  return (
    <form onSubmit={handleSubmit} className={styles.flexForm}>
      <div className={styles.currency}>
        <CurrencyChange
          text="From:"
          currency={fromCurrency}
          currencyChange={handleFromCurrencyChange}
        />
        <div className={styles.icon}>
          <HiOutlineArrowsRightLeft onClick={changeCurrency} />
        </div>
        <CurrencyChange
          text="To:"
          currency={toCurrency}
          currencyChange={handleToCurrencyChange}
        />
      </div>
      <div className={styles.inputs}>
        <InputAmount amount={amount} amountChange={handleAmountChange} />
        {showInputAmount && (
          <DisplayAmount
            convertedAmount={toAmount}
            setToAmount={handleToAmountChange}
          />
        )}
      </div>
      {isButtonClicked ? (
        <Button isButtonClicked={isButtonClicked} />
      ) : (
        <div>
          <h2>{`${amount} ${fromCurrency} = ${toAmount} ${toCurrency}`}</h2>
          <p>
            All figures are live mid-market rates, which are for informational
            puroposes only.
          </p>
          <p>
            To see the rates for money transfer, please select sending money
            option
          </p>
        </div>
      )}
    </form>
  )
}
export default ConverterForm
