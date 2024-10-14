import { useEffect, useState } from "react";
import "./App.css";
import ExpenseForm from "./expenseForm";

function App() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const response = await fetch("http://127.0.0.1:5000/expenses");
    const data = await response.json();
    setExpenses(data.expenses);
    console.log(data.expenses);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const onUpdate = () => {
    fetchExpenses();
  };

  return (
    <div className="content-container">
      <h1>Expense Tracker</h1>
      <ExpenseForm updateCallback={onUpdate} />
    </div>
  );
}

export default App;
