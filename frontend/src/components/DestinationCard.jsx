const CONTINENT_EMOJI = {
  Africa: "🌍",
  Asia: "🌏",
  Europe: "🌍",
  "North America": "🌎",
  "South America": "🌎",
  Oceania: "🌏",
  Antarctica: "🧊",
};

function DestinationCard({ destination, onDelete, onToggleVisited }) {
  const { id, name, country, continent, note, tags, visited, createdAt } = destination;

  const emoji = CONTINENT_EMOJI[continent] || "🌐";
  const date = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className={`destination-card ${visited ? "visited" : ""}`}>
      <div className="card-header">
        <div className="card-title">
          <span className="continent-emoji">{emoji}</span>
          <div>
            <h3>{name}</h3>
            <span className="country">{country}</span>
            {continent && <span className="continent-badge">{continent}</span>}
          </div>
        </div>
        <div className="card-actions">
          <button
            className={`btn-visited ${visited ? "active" : ""}`}
            onClick={() => onToggleVisited(id)}
            title={visited ? "Mark as not visited" : "Mark as visited"}
          >
            {visited ? "✅" : "☐"}
          </button>
          <button
            className="btn-delete"
            onClick={() => onDelete(id)}
            title="Delete destination"
          >
            🗑️
          </button>
        </div>
      </div>

      {note && <p className="card-note">{note}</p>}

      <div className="card-footer">
        <div className="tags">
          {tags && (Array.isArray(tags) ? tags : tags.split(',')).map((tag, index) => (
            <span key={index} className="tag">
              {tag.trim()}
            </span>
          ))}
        </div>
        <span className="card-date">{date}</span>
      </div>
    </div>
  );
}

export default DestinationCard;