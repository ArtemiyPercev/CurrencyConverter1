import styles from './displayAmount.module.css'

const DisplayAmount = ({ convertedAmount, setToAmount }) => {
  return (
    <div className={styles.displayAmount}>
      <label>Display amount:</label>
      <input
        type="number"
        value={convertedAmount}
        onChange={(e) => setToAmount(e)}
      />
    </div>
  )
}

export default DisplayAmount
