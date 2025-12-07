function Summary({ summary }) {
  return (
    <div className="card summary">
      <h2>📊 Summary</h2>
      <div className="summary-stats">
        <div className="stat">
          <div className="stat-value">${summary.totalExpenses.toFixed(2)}</div>
          <div className="stat-label">Total Expenses</div>
        </div>
        <div className="stat">
          <div className="stat-value">{summary.expenseCount}</div>
          <div className="stat-label">Expenses</div>
        </div>
        <div className="stat">
          <div className="stat-value">{summary.peopleCount}</div>
          <div className="stat-label">People</div>
        </div>
      </div>
    </div>
  );
}

export default Summary;