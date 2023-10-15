import styles from './currencyChange.module.css'

const CurrencyChange = ({ text, currency, currencyChange }) => {
  const currencyArray = ['EUR', 'TRY', 'GBP']

  return (
    <div className={styles.currency}>
      <label>{text}</label>
      <select
        name="currency"
        value={currency}
        onChange={(e) => currencyChange(e)}
      >
        {currencyArray.map((currency) => {
          return (
            <option value={currency} key={currency}>
              {currency}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default CurrencyChange
