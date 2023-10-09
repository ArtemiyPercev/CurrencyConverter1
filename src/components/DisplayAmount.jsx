import styles from './displayAmount.module.css'

const DisplayAmount = ({ convertedAmount, setToAmount, currency }) => {
  return (
    <div className={styles.displayAmount}>
      <label>Display amount:</label>
      <input
        type="number"
        value={convertedAmount}
        onChange={(e) => setToAmount(e)}
      />
      <span className={styles.currencyName}>{currency}</span>
    </div>
  )
}

export default DisplayAmount
