import { useState } from "react";

const ExpenseForm = ({ updateCallback }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("bill");
  const [amount, setAmount] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      type,
      amount,
    };

    const url = "http://127.0.0.1:5000/create_expense";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);
    if (response.status !== 201 && response.status !== 200) {
      const data = await response.json();
      alert(data.message);
    } else {
      updateCallback();
      setName("");
      setType("bill");
      setAmount(0);
    }
  };
  return (
    <div>
      <h2>Transaction</h2>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          id="name"
          placeholder="Rent, Pay, Electricity... "
        />
        <select defaultValue="bill">
          <option onChange={(e) => setType(e.target.value)} value="bill">
            Bill
          </option>
          <option onChange={(e) => setType(e.target.value)} value="income">
            Income
          </option>
          <option onChange={(e) => setType(e.target.value)} value="investment">
            Invesment
          </option>
          <option onChange={(e) => setType(e.target.value)} value="savings">
            Savings
          </option>
        </select>
        <input
          type="number"
          value={amount}
          id="amount"
          onChange={(e) => setAmount(e.target.value)}
        />

        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
