import { useState } from 'react';

function AddExpense({ onAddExpense }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [payer, setPayer] = useState('');
  const [participants, setParticipants] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !amount || !payer || !participants) {
      alert('Please fill all fields');
      return;
    }

    // Convert participants string to array
    const participantArray = participants.split(',').map(p => p.trim()).filter(p => p);

    if (participantArray.length === 0) {
      alert('Please add at least one participant');
      return;
    }

    const expenseData = {
      description,
      amount: parseFloat(amount),
      payer,
      participants: participantArray
    };

    onAddExpense(expenseData);

    // Reset form
    setDescription('');
    setAmount('');
    setPayer('');
    setParticipants('');
  };

  return (
    <div className="card add-expense">
      <h2>➕ Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            type="text"
            placeholder="e.g., Dinner at restaurant"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount ($):</label>
          <input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="payer">Paid by:</label>
          <input
            id="payer"
            type="text"
            placeholder="e.g., Alice"
            value={payer}
            onChange={(e) => setPayer(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="participants">Participants (comma-separated):</label>
          <input
            id="participants"
            type="text"
            placeholder="e.g., Alice, Bob, Charlie"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            autoComplete="off"
          />
        </div>

        <button type="submit" className="btn-primary">Add Expense</button>
      </form>
    </div>
  );
}
export default AddExpense;