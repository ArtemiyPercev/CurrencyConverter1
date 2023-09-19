const CurrencyChange = ({ text, currency, currencyChange }) => {
  const currencyArray = ['EUR', 'TRY', 'GBP']
  return (
    <>
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
      </select>
    </>
  )
}

export default CurrencyChange
