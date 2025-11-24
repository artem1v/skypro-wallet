import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../provider/AuthProvider'
import { signIn, signUp } from '../../services/auth'
import Button from '../ui/Button/Button'
import styles from './AuthForm.module.scss'

const AuthForm = ({ isSignUp }) => {
	const navigate = useNavigate()
	const { updateUserInfo } = useContext(AuthContext)

	const [loading, setLoading] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)

	const [formData, setFormData] = useState({
		name: '',
		login: '',
		password: '',
	})

	const [errors, setErrors] = useState({
		name: false,
		login: false,
		password: false,
	})

	const [error, setError] = useState('')

	const validateForm = (data = formData) => {
		const newErrors = { name: false, login: false, password: false }
		let isValid = true

		if (isSignUp && !data.name.trim()) {
			newErrors.name = true
			isValid = false
		}
		if (!data.login.trim()) {
			newErrors.login = true
			isValid = false
		}
		if (!data.password.trim()) {
			newErrors.password = true
			isValid = false
		}

		setErrors(newErrors)
		if (!isValid) setError('Заполните все поля')
		else setError('')
		return isValid
	}

	const handleChange = e => {
		const { name, value } = e.target
		const newFormData = { ...formData, [name]: value }
		setFormData(newFormData)
		if (isSubmitted) {
			validateForm(newFormData)
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setIsSubmitted(true)
		if (!validateForm()) return

		setLoading(true)
		try {
			const data = !isSignUp
				? await signIn({ login: formData.login, password: formData.password })
				: await signUp(formData)

			if (data) {
				updateUserInfo(data)
				navigate('/')
			}
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const isFormValid =
		(isSignUp ? formData.name.trim() : true) &&
		formData.login.trim() &&
		formData.password.trim()

	return (
		<div className={styles.auth}>
			<div className={styles.auth__modal}>
				<div className={styles.auth__wrapper}>
					<h2 className={styles.auth__title}>
						{isSignUp ? 'Регистрация' : 'Вход'}
					</h2>
					<form
						className={`${styles.auth__form} ${styles.form}`}
						onSubmit={handleSubmit}
					>
						<div className={styles.form__wrapper}>
							{isSignUp && (
								<input
									className={styles.form__input}
									type='text'
									name='name'
									placeholder='Имя'
									value={formData.name}
									onChange={handleChange}
									// $error={errors.name}
								/>
							)}
							<input
								className={styles.form__input}
								type='text'
								name='login'
								placeholder='Эл. почта'
								value={formData.login}
								onChange={handleChange}
								// $error={errors.login}
							/>
							<input
								className={styles.form__input}
								type='password'
								name='password'
								placeholder='Пароль'
								value={formData.password}
								onChange={handleChange}
								// $error={errors.password}
							/>
						</div>
						<p style={{ color: 'red', minHeight: '18px' }}>{error}</p>
						<Button
							variant='primary'
							className={styles.form__button}
							type='submit'
							// loading={loading}
							disabled={!isFormValid || loading}
						>
							{isSignUp ? 'Зарегистрироваться' : 'Войти'}
						</Button>

						{!isSignUp && (
							<div className={styles.form__group}>
								<p className={styles.form__text}>
									Нужно зарегистрироваться?{' '}
									<Link className={styles.form__link} to='/sign-up'>
										Регистрируйтесь здесь
									</Link>
								</p>
							</div>
						)}
						{isSignUp && (
							<div>
								<p className={styles.form__text}>
									Есть аккаунт?{' '}
									<Link className={styles.form__link} to='/sign-in'>
										Войдите здесь
									</Link>
								</p>
							</div>
						)}
					</form>
				</div>
			</div>
		</div>
	)
}

export default AuthForm
