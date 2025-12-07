function Settlements({ settlements }) {
  return (
    <div className="card settlements">
      <h2>💸 Who Owes Whom</h2>
      {settlements.length === 0 ? (
        <p className="empty-state">All settled up! 🎉</p>
      ) : (
        <div className="settlement-list">
          {settlements.map((settlement, index) => (
            <div key={index} className="settlement-item">
              <span className="from">{settlement.from}</span>
              <span className="arrow">→</span>
              <span className="to">{settlement.to}</span>
              <span className="amount">${settlement.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Settlements;