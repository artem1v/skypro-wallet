import { Expense } from "../components/expense/Expense";
import { Header } from "../components/layout/Header/Header";
import { Layout } from "../components/layout/Layout/Layout";

export const ExpensesPage = () => {
  return (
    <>
      <Header />
      <Layout>
        <Expense />
      </Layout>
    </>
  );
};
