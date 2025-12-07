function ExpenseList({ expenses, onDeleteExpense }) {
  return (
    <div className="card expense-list">
      <h2>📋 All Expenses</h2>
      {expenses.length === 0 ? (
        <p className="empty-state">No expenses yet. Add one to get started!</p>
      ) : (
        <div className="expenses">
          {expenses.map((expense) => (
            <div key={expense.id} className="expense-item">
              <div className="expense-header">
                <h3>{expense.description}</h3>
                <button 
                  className="btn-delete"
                  onClick={() => onDeleteExpense(expense.id)}
                >
                  🗑️
                </button>
              </div>
              <div className="expense-details">
                <p><strong>${expense.amount.toFixed(2)}</strong></p>
                <p>Paid by: <span className="highlight">{expense.payer}</span></p>
                <p>Split between: {expense.participants.join(', ')}</p>
                <p className="per-person">
                  ${(expense.amount / expense.participants.length).toFixed(2)} per person
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExpenseList;