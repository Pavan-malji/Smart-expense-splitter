import { useState, useEffect } from 'react';
import axios from 'axios';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import Settlements from './components/Settlements';
import Summary from './components/Summary';
import './App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [settlements, setSettlements] = useState([]);
  const [summary, setSummary] = useState({ totalExpenses: 0, expenseCount: 0, peopleCount: 0 });

  // Fetch all data
  const fetchData = async () => {
    try {
      const [expensesRes, settlementsRes, summaryRes] = await Promise.all([
        axios.get(`${API_URL}/expenses`),
        axios.get(`${API_URL}/settlements`),
        axios.get(`${API_URL}/summary`)
      ]);
      
      setExpenses(expensesRes.data);
      setSettlements(settlementsRes.data);
      setSummary(summaryRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Add new expense
  const addExpense = async (expenseData) => {
    try {
      await axios.post(`${API_URL}/expenses`, expenseData);
      fetchData(); // Refresh all data
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense');
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${API_URL}/expenses/${id}`);
      fetchData(); // Refresh all data
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense');
    }
  };

  return (
    <div className="App">
      <header>
        <h1>💰 Smart Expense Splitter</h1>
        <p>Split bills and settle up easily!</p>
      </header>

      <div className="container">
        <div className="left-section">
          <AddExpense onAddExpense={addExpense} />
          <Summary summary={summary} />
        </div>

        <div className="right-section">
          <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
          <Settlements settlements={settlements} />
        </div>
      </div>
    </div>
  );
}

export default App;