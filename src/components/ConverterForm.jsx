import { useEffect, useState } from 'react'
import CurrencyChange from './CurrencyChange'
import Button from './Button'
import InputAmount from './InputAmount'
import DisplayAmount from './DisplayAmount'
import { HiOutlineArrowsRightLeft } from 'react-icons/hi2'
import styles from './converterForm.module.css'
import { CgShapeCircle } from 'react-icons/cg'

const ConverterForm = () => {
  const [amount, setAmount] = useState('1.00')
  const [fromCurrency, setFromCurrency] = useState('EUR')
  const [toCurrency, setToCurrency] = useState('TRY')
  const [exchangeRate, setExchangeRate] = useState(null)
  const [toAmount, setToAmount] = useState('')
  const [showInputAmount, setShowInputAmount] = useState(false)
  const [isButtonClicked, setIsButtonClicked] = useState(true)

  const fetchExchangeRate = async (options = {}) => {
    const {
      reversed = false,
      value,
      fromCurrencyValue = fromCurrency,
      toCurrencyValue = toCurrency,
    } = options
    const formattedValue = value ? value : reversed ? toAmount : amount
    const apiURL = new URL('https://my.transfergo.com/api/fx-rates')

    if (reversed) {
      apiURL.searchParams.set('from', toCurrencyValue)
      apiURL.searchParams.set('to', fromCurrencyValue)
      apiURL.searchParams.set('amount', formattedValue)
    } else {
      apiURL.searchParams.set('from', fromCurrencyValue)
      apiURL.searchParams.set('to', toCurrencyValue)
      apiURL.searchParams.set('amount', formattedValue)
    }

    try {
      const response = await fetch(apiURL)
      const data = await response.json()

      if (data.error) {
        throw data.error
      }

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

    fromCurrency !== toCurrency
      ? fetchExchangeRate({ value: e.target.value })
      : setExchangeRate(1)
  }

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value)

    if (!exchangeRate) {
      return
    }

    fromCurrency !== toCurrency
      ? fetchExchangeRate({ fromCurrencyValue: e.target.value })
      : setExchangeRate(1)
  }

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value)

    if (!exchangeRate) {
      return
    }

    fromCurrency !== toCurrency
      ? fetchExchangeRate({ toCurrencyValue: e.target.value })
      : setExchangeRate(1)
  }

  const handleToAmountChange = (e) => {
    setToAmount(e.target.value)

    if (!exchangeRate) {
      return
    }

    fromCurrency !== toCurrency
      ? fetchExchangeRate({ reversed: true, value: e.target.value })
      : setExchangeRate(1)
  }

  const changeCurrency = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    fetchExchangeRate()
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
    // // Здесь будет логика для конвертации валюты
  }

  return (
    <form onSubmit={handleSubmit} className={styles.flexForm}>
      <div className={styles.currency}>
        <div className={styles.fromCurrencyInput}>
          <CurrencyChange
            text="From:"
            currency={fromCurrency}
            currencyChange={handleFromCurrencyChange}
          />
        </div>
        <span className={styles.hiOutlineArrowsRightLeftIcon}>
          <HiOutlineArrowsRightLeft onClick={changeCurrency} />
        </span>
        <div className={styles.toCurrencyInput}>
          <CurrencyChange
            text="To:"
            currency={toCurrency}
            currencyChange={handleToCurrencyChange}
          />
        </div>
      </div>
      <div className={styles.inputs}>
        <InputAmount
          amount={amount}
          amountChange={handleAmountChange}
          isButtonClicked={isButtonClicked}
          currency={fromCurrency}
        />
        {showInputAmount && (
          <DisplayAmount
            convertedAmount={toAmount}
            setToAmount={handleToAmountChange}
            currency={toCurrency}
          />
        )}
      </div>
      {isButtonClicked ? (
        <Button isButtonClicked={isButtonClicked} />
      ) : (
        <div className={styles.info}>
          <h2>
            <span className={styles.cgShapeCircleIcon}>
              <CgShapeCircle />
            </span>
            <span>{`1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`}</span>
          </h2>
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
