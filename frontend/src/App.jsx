import { useState, useEffect } from "react";
import Header from "./components/Header";
import DestinationForm from "./components/DestinationForm";
import DestinationCard from "./components/DestinationCard";
import {
  fetchDestinations,
  createDestination,
  deleteDestination,
  updateDestination,
} from "./utils/api";
import "./App.css";

function App() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    loadDestinations();
  }, []);

  async function loadDestinations() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchDestinations();
      setDestinations(data);
    } catch (err) {
      console.error("Failed to load:", err);
      setError("Could not load destinations. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddDestination(data) {
    try {
      const newDestination = await createDestination(data);
      if (newDestination && newDestination.id) {
        setDestinations((prev) => [newDestination, ...prev]);
        setCurrentPage(1);
      }
    } catch (err) {
      console.error("Failed to create:", err);
      setError("Could not add destination.");
    }
  }

  async function handleDeleteDestination(id) {
    try {
      await deleteDestination(id);
      setDestinations((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      console.error("Failed to delete:", err);
      setError("Could not delete destination.");
    }
  }

  async function handleToggleVisited(id) {
    const current = destinations.find((d) => d.id === id);
    if (!current) return;
    try {
      const updated = await updateDestination(id, { visited: !current.visited });
      setDestinations((prev) => prev.map((d) => (d.id === id ? updated : d)));
    } catch (err) {
      console.error("Failed to update:", err);
      setError("Could not update destination.");
    }
  }

const filteredDestinations = (destinations || []).filter((d) => {
  const cityName = d.name || ""; 
  const countryName = d.country || "";
  const search = (searchTerm || "").toLowerCase();
  
  return (
    cityName.toLowerCase().includes(search) || 
    countryName.toLowerCase().includes(search)
  );
});

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentDestinations = filteredDestinations.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);

  const visitedCount = destinations.filter((d) => d.visited).length;

  return (
    <div className="app">
      <Header total={destinations.length} visited={visitedCount} />

      <main className="app-main">
        <aside className="app-sidebar">
          <DestinationForm onAdd={handleAddDestination} />
        </aside>

        <section className="app-content">
          <div className="search-bar">
            <input
              type="search"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="clear-search">
                ✕
              </button>
            )}
          </div>

          {error && (
            <div className="error-banner">
              {error}
              <button onClick={() => setError(null)}>✕</button>
            </div>
          )}

          {loading ? (
            <div className="loading">
              <span>✈️</span>
              <p>Loading destinations...</p>
            </div>
          ) : filteredDestinations.length === 0 ? (
            <div className="empty-state">
              <span>🗺️</span>
              <p>{searchTerm ? "No destinations found." : "No destinations yet. Add your first one!"}</p>
            </div>
          ) : (
            <>
              <div className="destinations-grid">
                {currentDestinations.map((destination) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                    onDelete={handleDeleteDestination}
                    onToggleVisited={handleToggleVisited}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="pagination-btn"
                  >
                    ← Previous
                  </button>
                  <span className="pagination-info">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;