import styles from './inputAmount.module.css'

const InputAmount = (props) => {
  const { amount, amountChange } = props
  return (
    <div className={styles.inputAmounts}>
      <label>Amount:</label>
      <input type="number" value={amount} onChange={(e) => amountChange(e)} />
    </div>
  )
}

export default InputAmount
