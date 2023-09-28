import styles from './button.module.css'

const Button = ({ isButtonClicked }) => {
  return (
    <div>
      {isButtonClicked && (
        <button className={styles.btn} type="submit">
          Convert
        </button>
      )}
    </div>
  )
}

export default Button
