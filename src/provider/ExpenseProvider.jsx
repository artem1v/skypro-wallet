import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { WALLET_API_URL } from '../services/Apiconfig'
import { getToken } from '../services/auth'
import { AuthContext } from './AuthProvider'

export const ExpenseContext = createContext({
	expenses: [],
	loading: false,
	error: '',
})

export const ExpenseProvider = ({ children }) => {
	const [expenses, setExpenses] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const { user } = useContext(AuthContext)
	const [editingExpense, setEditingExpense] = useState(null)
	const clearEditingExpense = () => setEditingExpense(null)

	useEffect(() => {
		if (!user?.token) return

		const loadExpenses = async () => {
			setLoading(true)
			try {
				const { data } = await axios.get(WALLET_API_URL, {
					headers: { Authorization: `Bearer ${getToken()}` },
				})
				setExpenses(data)
			} catch (error) {
				setError(error.response?.data?.error || error.message)
				console.error('Ошибка загрузки карточек:', error.message)
			} finally {
				setLoading(false)
			}
		}

		loadExpenses()
	}, [user?.token])

	const addExpense = async expense => {
		try {
			const { data } = await axios.post(WALLET_API_URL, expense, {
				headers: {
					Authorization: `Bearer ${getToken()}`,
					'Content-Type': '',
				},
			})
			setExpenses(prev => [...prev, data])
		} catch (error) {
			console.error('Ошибка добавления транзакции:', error.message)
		}
	}

	const editExpense = async (id, newData) => {
		try {
			const { data } = await axios.patch(`${WALLET_API_URL}/${id}`, newData, {
				headers: {
					Authorization: `Bearer ${getToken()}`,
					'Content-Type': 'application/json',
				},
			})
			setExpenses(data)
		} catch (error) {
			console.error('Ошибка при обновлении транзакции:', error.message)
		}
	}

	const deleteExpense = async id => {
		try {
			const { data } = await axios.delete(`${WALLET_API_URL}/${id}`, {
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			})
			setExpenses(data)
		} catch (error) {
			console.error('Ошибка при удалении транзакции:', error.message)
		}
	}

	return (
		<ExpenseContext.Provider
			value={{
				expenses,
				addExpense,
				editExpense,
				deleteExpense,
				editingExpense,
				setEditingExpense,
				clearEditingExpense,
				loading,
			}}
		>
			{children}
		</ExpenseContext.Provider>
	)
}
