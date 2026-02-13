function Header({ total, visited }) {
  const remaining = total - visited;

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <span className="header-icon">🌍</span>
          <h1>Travel Bucket List</h1>
        </div>
        <div className="header-stats">
          <div className="stat">
            <span className="stat-number">{total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat visited">
            <span className="stat-number">{visited}</span>
            <span className="stat-label">Visited</span>
          </div>
          <div className="stat remaining">
            <span className="stat-number">{remaining}</span>
            <span className="stat-label">Remaining</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;