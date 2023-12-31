import styles from './inputAmount.module.css'

const InputAmount = (props) => {
  const { amount, amountChange, isButtonClicked, currency } = props
  return (
    <div
      className={isButtonClicked ? styles.inputAmounts : styles.lowerInputWidth}
    >
      <label>Amount:</label>
      <input type="number" value={amount} onChange={(e) => amountChange(e)} />
      <span className={styles.currencyName}>{currency}</span>
    </div>
  )
}

export default InputAmount
