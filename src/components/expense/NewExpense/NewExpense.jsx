import {
	Car,
	Film,
	GraduationCap,
	Home,
	PlusCircle,
	Utensils,
} from 'lucide-react'
import { useState } from 'react'
import Button from '../../ui/Button/Button'
import styles from './NewExpense.module.scss'

const NewExpense = ({ onAddExpense }) => {
	const [description, setDescription] = useState('')
	const [category, setCategory] = useState('Еда')
	const [date, setDate] = useState('')
	const [amount, setAmount] = useState('')

	const handleAddExpense = () => {
		if (description && category && date && amount) {
			const newExpense = {
				description,
				category,
				date,
				amount: parseFloat(amount),
			}
			onAddExpense(newExpense)
			setDescription('')
			setCategory('Еда')
			setDate('')
			setAmount('')
		}
	}

	const getCategoryIcon = cat => {
		switch (cat) {
			case 'Еда':
				return <Utensils size={16} />
			case 'Транспорт':
				return <Car size={16} />
			case 'Жилье':
				return <Home size={16} />
			case 'Развлечения':
				return <Film size={16} />
			case 'Образование':
				return <GraduationCap size={16} />
			case 'Другое':
				return <PlusCircle size={16} />
			default:
				return null
		}
	}

	const categories = [
		'Еда',
		'Транспорт',
		'Жилье',
		'Развлечения',
		'Образование',
		'Другое',
	]

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Новый расход</h2>

			<div className={styles.formGroup}>
				<label htmlFor='description' className={styles.label}>
					Описание
				</label>
				<input
					type='text'
					id='description'
					value={description}
					onChange={e => setDescription(e.target.value)}
					placeholder='Введите описание'
					className={styles.input}
				/>
			</div>

			<div className={styles.formGroup}>
				<label className={styles.label}>Категория</label>
				<div className={styles.categoryButtons}>
					{categories.map(cat => (
						<button
							key={cat}
							onClick={() => setCategory(cat)}
							className={`${styles.categoryButton} ${category === cat ? styles.active : ''}`}
						>
							{getCategoryIcon(cat)} {cat}
						</button>
					))}
				</div>
			</div>

			<div className={styles.formGroup}>
				<label htmlFor='date' className={styles.label}>
					Дата
				</label>
				<input
					type='date'
					id='date'
					value={date}
					onChange={e => setDate(e.target.value)}
					className={styles.input}
				/>
			</div>

			<div className={styles.formGroup}>
				<label htmlFor='amount' className={styles.label}>
					Сумма
				</label>
				<input
					type='number'
					id='amount'
					value={amount}
					onChange={e => setAmount(e.target.value)}
					placeholder='Введите сумму'
					className={styles.input}
				/>
			</div>

			<Button onClick={handleAddExpense}>Добавить новый расход</Button>
		</div>
	)
}

export default NewExpense
