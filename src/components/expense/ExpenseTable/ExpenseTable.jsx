import { Edit, Trash } from 'lucide-react'
import styles from './ExpenseTable.module.scss'

const ExpenseTable = ({ expenses, onDeleteExpense }) => {
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Таблица расходов</h2>

			<div className={styles.filters}>
				<div className={styles.filterGroup}>
					<span>Фильтровать по категории</span>
					<select className={styles.select}>
						<option value='all'>Все</option>
						<option value='food'>Еда</option>
						<option value='transport'>Транспорт</option>
						<option value='housing'>Жилье</option>
						<option value='entertainment'>Развлечения</option>
						<option value='education'>Образование</option>
						<option value='other'>Другое</option>
					</select>
				</div>
				<div className={styles.filterGroup}>
					<span>Сортировать по</span>
					<select className={styles.select}>
						<option value='date'>Дата</option>
						<option value='amount'>Сумма</option>
					</select>
				</div>
			</div>

			<div className={styles.tableContainer}>
				<table className={styles.table}>
					<thead>
						<tr>
							<th className={styles.th}>Описание</th>
							<th className={styles.th}>Категория</th>
							<th className={styles.th}>Дата</th>
							<th className={styles.th}>Сумма</th>
							<th className={styles.th}></th>
						</tr>
					</thead>
					<tbody>
						{expenses.map((expense, index) => (
							<tr key={index} className={styles.tr}>
								<td className={styles.td}>{expense.description}</td>
								<td className={styles.td}>{expense.category}</td>
								<td className={styles.td}>{expense.date}</td>
								<td className={styles.td}>{expense.amount} ₽</td>
								<td className={styles.td}>
									<div className={styles.actions}>
										<button
											onClick={() => onDeleteExpense(index)}
											className={styles.actionButton}
										>
											<Trash size={16} />
										</button>
										<button className={styles.actionButton}>
											<Edit size={16} />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default ExpenseTable
