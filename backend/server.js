const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let expenses = [];
let expenseId = 1;

// Helper function to calculate settlements
function calculateSettlements(expenses) {
  const balances = {};

  // Calculate net balance for each person
  expenses.forEach(expense => {
    const { payer, amount, participants } = expense;
    const splitAmount = amount / participants.length;

    // Payer gets credited
    balances[payer] = (balances[payer] || 0) + amount;

    // Each participant gets debited
    participants.forEach(person => {
      balances[person] = (balances[person] || 0) - splitAmount;
    });
  });

  // Separate creditors (owed money) and debtors (owe money)
  const creditors = [];
  const debtors = [];

  Object.entries(balances).forEach(([person, balance]) => {
    if (balance > 0.01) {
      creditors.push({ person, amount: balance });
    } else if (balance < -0.01) {
      debtors.push({ person, amount: -balance });
    }
  });

  // Minimize transactions
  const settlements = [];
  let i = 0, j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    const settleAmount = Math.min(debtor.amount, creditor.amount);

    settlements.push({
      from: debtor.person,
      to: creditor.person,
      amount: parseFloat(settleAmount.toFixed(2))
    });

    debtor.amount -= settleAmount;
    creditor.amount -= settleAmount;

    if (debtor.amount < 0.01) i++;
    if (creditor.amount < 0.01) j++;
  }

  return settlements;
}

// Routes

// Get all expenses
app.get('/api/expenses', (req, res) => {
  res.json(expenses);
});

// Add new expense
app.post('/api/expenses', (req, res) => {
  const { description, amount, payer, participants } = req.body;

  if (!description || !amount || !payer || !participants || participants.length === 0) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const expense = {
    id: expenseId++,
    description,
    amount: parseFloat(amount),
    payer,
    participants,
    createdAt: new Date().toISOString()
  };

  expenses.push(expense);
  res.status(201).json(expense);
});

// Get settlements (who owes whom)
app.get('/api/settlements', (req, res) => {
  const settlements = calculateSettlements(expenses);
  res.json(settlements);
});

// Delete expense
app.delete('/api/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = expenses.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  expenses.splice(index, 1);
  res.json({ message: 'Expense deleted successfully' });
});

// Get summary stats
app.get('/api/summary', (req, res) => {
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const uniquePeople = new Set();
  
  expenses.forEach(e => {
    uniquePeople.add(e.payer);
    e.participants.forEach(p => uniquePeople.add(p));
  });

  res.json({
    totalExpenses: parseFloat(totalExpenses.toFixed(2)),
    expenseCount: expenses.length,
    peopleCount: uniquePeople.size
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});