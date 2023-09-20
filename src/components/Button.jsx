import styles from './button.module.css'

const Button = () => {
  return (
    <div>
      <button className={styles.btn} type="submit">
        Convert
      </button>
    </div>
  )
}

export default Button
