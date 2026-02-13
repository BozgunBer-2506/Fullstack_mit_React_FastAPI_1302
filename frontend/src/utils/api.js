const RENDER_URL = "https://fullstack-mit-react-fastapi-1302.onrender.com";

const API_BASE = window.location.hostname.includes("amplifyapp.com") 
  ? RENDER_URL 
  : "http://localhost:8001";

export async function fetchDestinations() {
  const response = await fetch(`${API_BASE}/destinations`);
  if (!response.ok) throw new Error("Fetch failed");
  return response.json();
}

export async function createDestination(data) {
  const response = await fetch(`${API_BASE}/destinations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteDestination(id) {
  await fetch(`${API_BASE}/destinations/${id}`, { method: "DELETE" });
}

export async function updateDestination(id, data) {
  const response = await fetch(`${API_BASE}/destinations/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}