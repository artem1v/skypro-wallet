import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import ExpenseTable from "../expense/ExpenseTable/ExpenseTable";
import NewExpense from "../expense/NewExpense/NewExpense";
import SignInPage from "../../pages/LoginPage";
import styles from "./Main.module.scss";

const Main = () => {
  const [expenses, setExpenses] = useState([
    {
      description: "Пятёрочка",
      category: "Еда",
      date: "03.07.2024",
      amount: 3500,
    },
    {
      description: "Яндекс Такси",
      category: "Транспорт",
      date: "03.07.2024",
      amount: 730,
    },
  ]);

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const handleDeleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  return (
    <main className={styles.main}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1 className={styles.title}>Мои расходы</h1>
              <div className={styles.content}>
                <ExpenseTable
                  expenses={expenses}
                  onDeleteExpense={handleDeleteExpense}
                />
                <NewExpense onAddExpense={handleAddExpense} />
              </div>
            </>
          }
        />
        <Route path="/login" element={<SignInPage isDarkTheme={false} />} />
      </Routes>
    </main>
  );
};

export default Main;
