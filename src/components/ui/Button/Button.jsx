import styles from './Button.module.scss'

const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
	return (
		<button
			onClick={onClick}
			className={`${styles.button} ${styles[variant]} ${className}`}
		>
			{children}
		</button>
	)
}

export default Button
