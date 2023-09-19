const InputAmount = (props) => {
  const { amount, amountChange } = props
  return (
    <div>
      <label>Amount</label>
      <input type="number" value={amount} onChange={(e) => amountChange(e)} />
    </div>
  )
}

export default InputAmount
