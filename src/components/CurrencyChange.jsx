import styles from './currencyChange.module.css'

const CurrencyChange = ({ text, currency, currencyChange }) => {
  const currencyArray = ['EUR', 'TRY', 'GBP']

  // const currencies = [
  //   {
  //     code: 'EUR',
  //     name: 'EUR',
  //     flag: 'https://www.transfergo.com/static/images/flags/svg/EU.svg',
  //   },
  //   {
  //     code: 'EUR',
  //     name: 'GBP',
  //     flag: 'https://www.transfergo.com/static/images/flags/svg/GB.svg',
  //   },
  //   {
  //     code: 'EUR',
  //     name: 'TRY',
  //     flag: 'https://www.transfergo.com/static/images/flags/svg/TR.svg',
  //   },
  // ]

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

// import { useState, useEffect } from 'react';

// const CurrencyChange = ({ text, currency, currencyChange }) => {
//   const [currencies, setCurrencies] = useState([]);

//     const currencies = [
//     {
//       code: 'EUR',
//       name: 'EUR',
//       flag: 'https://www.transfergo.com/static/images/flags/svg/EU.svg',
//     },
//     {
//       code: 'EUR',
//       name: 'GBP',
//       flag: 'https://www.transfergo.com/static/images/flags/svg/GB.svg',
//     },
//     {
//       code: 'EUR',
//       name: 'TRY',
//       flag: 'https://www.transfergo.com/static/images/flags/svg/TR.svg',
//     },
//   ]

//   useEffect( async () => {
//     const APIflags = `https://www.transfergo.com/static/images/flags/svg/${countryCode}.svg`
//     const response = await fetch(APIflags)
//     const data = await response.json()
//     setCurrencies(data.rate)
//       });
//   }, []);

//   return (
//     <div className={styles.currency}>
//       <label>{text}</label>
//       <select
//         name="currency"
//         value={currency}
//         onChange={(e) => currencyChange(e)}
//       >
//         {currencies.map((curr) => (
//           <option key={curr.code} value={curr.code}>
//             {curr.name} <img src={curr.flag} alt={curr.name} />
//           </option>
//         ))}
//       </select>
//     </div>
//   )
// }

// export default CurrencyChange;
