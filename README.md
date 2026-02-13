# Fullstack Travel Bucket List App 🌍✈️

A modern full-stack web application to manage your travel bucket list. Track destinations you want to visit, mark them as visited, and organize them with tags and notes.

## 🚀 Live Demo

**🌐 [Launch App](https://main.d1k3826jnkl94r.amplifyapp.com/)**

> *For developers: [API Documentation](https://fullstack-mit-react-fastapi-1302.onrender.com/docs)*

## ✨ Features

* **Add Destinations:** Create travel goals with city, country, continent, notes, and tags
* **Mark as Visited:** Toggle visited status with a single click
* **Delete Destinations:** Remove destinations you no longer want to visit
* **Tags System:** Organize destinations with custom tags (food, culture, nature, etc.)
* **Persistent Storage:** All data stored in SQLite database via FastAPI backend
* **Real-time Updates:** Frontend communicates with live REST API
* **Responsive Design:** Works on desktop and mobile devices
* **Pre-seeded Data:** Comes with 10 iconic travel destinations

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **CSS3** with custom design (blue/white theme)
- **Fetch API** for backend communication
- **Deployed on:** AWS Amplify

### Backend
- **FastAPI** (Python web framework)
- **SQLAlchemy** (ORM)
- **SQLite** (Database)
- **Uvicorn** (ASGI server)
- **Pydantic** (Data validation)
- **Deployed on:** Render.com

---

## 🏗️ Project Structure
```
fullstack-mini-hub/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── DestinationForm.jsx
│   │   │   └── DestinationCard.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── .env.production
│   └── package.json
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── sql_app.db
│   └── venv/
│
└── README.md
```

---

## 🚀 Local Development

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.12+
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/BozgunBer-2506/Fullstack_mit_React_FastAPI_1302.git
cd Fullstack_mit_React_FastAPI_1302/fullstack-mini-hub
```

### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# Linux/Mac:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn main:app --reload --host 0.0.0.0 --port 8001
```

Backend will run at: **http://localhost:8001**  
API Docs available at: **http://localhost:8001/docs**

### 3. Frontend Setup

Open a new terminal:
```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend will run at: **http://localhost:5173**

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/destinations` | Get all destinations |
| `POST` | `/destinations` | Create new destination |
| `DELETE` | `/destinations/{id}` | Delete destination by ID |
| `PATCH` | `/destinations/{id}` | Update destination (e.g., toggle visited) |
| `GET` | `/health` | Health check endpoint |

### Example Request (POST)
```json
{
  "name": "Tokyo",
  "country": "Japan",
  "continent": "Asia",
  "note": "Sushi and technology",
  "tags": ["food", "tech", "city"]
}
```

---

## 📦 Deployment

### Frontend (AWS Amplify)
1. Connected to GitHub repository
2. Build settings: `npm run build` in `/frontend`
3. Environment variable: `VITE_API_BASE` → Render backend URL
4. Auto-deploys on every push to `main`

### Backend (Render.com)
1. Web Service connected to GitHub
2. Build command: `pip install -r requirements.txt`
3. Start command: `uvicorn main:app --host 0.0.0.0 --port 8000`
4. Auto-deploys on every push to `main`

---

## 🎓 Learning Objectives

This project demonstrates:
- ✅ Building RESTful APIs with FastAPI
- ✅ Database integration with SQLAlchemy
- ✅ React state management with hooks
- ✅ Async API calls with fetch
- ✅ CORS configuration for cross-origin requests
- ✅ Full deployment pipeline (frontend + backend)
- ✅ Environment-based configuration

---

## 📝 License

MIT License

---

**Developed by The_Bozgun** | February 2026