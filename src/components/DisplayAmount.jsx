const DisplayAmount = ({ convertedAmount, setToAmount }) => {
  return (
    <div>
      <label>Display amount</label>
      <input
        type="number"
        value={convertedAmount}
        onChange={(e) => setToAmount(e)}
      />
    </div>
  )
}

export default DisplayAmount
