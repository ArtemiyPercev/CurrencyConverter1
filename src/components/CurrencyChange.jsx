import { BiChevronDown } from 'react-icons/bi'
import styles from './currencyChange.module.css'

const CurrencyChange = ({ text, currency, currencyChange }) => {
  const currencyArray = ['EUR', 'TRY', 'GBP']

  // const testObject = [
  //   {
  //     text: 'EUR',
  //     countryCode: 'EU',
  //   },
  //   {
  //     text: 'TRY',
  //     countryCode: 'TR',
  //   },
  //   {
  //     text: 'GBP',
  //     countryCode: 'GB',
  //   },
  // ]

  // const getFlags = async () => {
  //   try {
  //     const flagsAPI = new URL(
  //       `https://www.transfergo.com/static/images/flags/svg/${countryCode}.svg`
  //     )
  //     const response = await fetch(flagsAPI)
  //     const data = await response.json()
  //     console.log(data)
  //   } catch (error) {
  //     console.error('Error fetching exchange rate:', error)
  //   }
  // }

  return (
    <div className={styles.currency}>
      <label>{text}</label>
      <select
        name="currency"
        value={currency}
        // id="currencyChoose"
        onChange={(e) => currencyChange(e)}
      >
        {currencyArray.map((curr, index) => {
          return (
            <option value={curr} key={index}>
              {curr}
            </option>
          )
        })}
        {/* IZ-ZA ICONI OSHIBKA V CONSOLE */}
        <span>
          <BiChevronDown />
        </span>
      </select>
    </div>
  )
}

export default CurrencyChange
