from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict
from sqlalchemy import Column, String, Boolean, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from datetime import datetime
import uuid
import json

DATABASE_URL = "sqlite:///./sql_app.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class DestinationModel(Base):
    __tablename__ = "destinations"
    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    country = Column(String)
    continent = Column(String)
    note = Column(String)
    tags = Column(String, default="[]")
    visited = Column(Boolean, default=False)
    createdAt = Column(String)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Travel Bucket List API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DestinationCreate(BaseModel):
    name: str
    country: str
    continent: str = ""
    note: str = ""
    tags: list[str] = []

class DestinationUpdate(BaseModel):
    name: str | None = None
    country: str | None = None
    continent: str | None = None
    note: str | None = None
    visited: bool | None = None

class Destination(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    name: str
    country: str
    continent: str
    note: str
    tags: list[str]
    visited: bool
    createdAt: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def seed_db():
    db = SessionLocal()
    if db.query(DestinationModel).count() == 0:
        initial_cities = [
            {"name": "Kyoto", "country": "Japan", "continent": "Asia", "note": "Cherry blossoms", "tags": ["culture", "nature", "food"], "visited": False},
            {"name": "Lisbon", "country": "Portugal", "continent": "Europe", "note": "Ocean views", "tags": ["history", "ocean"], "visited": True},
            {"name": "Patagonia", "country": "Argentina", "continent": "South America", "note": "Trekking", "tags": ["hiking", "mountains"], "visited": False},
            {"name": "Marrakech", "country": "Morocco", "continent": "Africa", "note": "Spices", "tags": ["market", "desert"], "visited": False},
            {"name": "Rome", "country": "Italy", "continent": "Europe", "note": "History and pasta", "tags": ["food", "art"], "visited": False},
            {"name": "Reykjavik", "country": "Iceland", "continent": "Europe", "note": "Northern lights", "tags": ["snow", "adventure"], "visited": False},
            {"name": "Cape Town", "country": "South Africa", "continent": "Africa", "note": "Table Mountain", "tags": ["view", "nature"], "visited": False},
            {"name": "Sydney", "country": "Australia", "continent": "Oceania", "note": "Opera House", "tags": ["ocean", "city"], "visited": False},
            {"name": "New York", "country": "USA", "continent": "North America", "note": "Time Square", "tags": ["shopping", "lights"], "visited": True},
            {"name": "Istanbul", "country": "Turkey", "continent": "Europe/Asia", "note": "Bosphorus", "tags": ["bridge", "history"], "visited": False}
        ]
        for city in initial_cities:
            db.add(DestinationModel(
                id=str(uuid.uuid4()),
                createdAt=datetime.utcnow().isoformat() + "Z",
                tags=json.dumps(city.pop("tags")),
                **city
            ))
        db.commit()
    db.close()

seed_db()

@app.get("/destinations", response_model=list[Destination])
def get_destinations(db: Session = Depends(get_db)):
    items = db.query(DestinationModel).all()
    result = []
    for item in items:
        item_dict = {
            "id": item.id,
            "name": item.name,
            "country": item.country,
            "continent": item.continent,
            "note": item.note,
            "tags": json.loads(item.tags) if item.tags else [],
            "visited": item.visited,
            "createdAt": item.createdAt
        }
        result.append(item_dict)
    return result

@app.post("/destinations", response_model=Destination, status_code=201)
def create_destination(data: DestinationCreate, db: Session = Depends(get_db)):
    new_destination = DestinationModel(
        id=str(uuid.uuid4()),
        name=data.name,
        country=data.country,
        continent=data.continent,
        note=data.note,
        tags=json.dumps(data.tags),
        visited=False,
        createdAt=datetime.utcnow().isoformat() + "Z"
    )
    db.add(new_destination)
    db.commit()
    db.refresh(new_destination)
    
    return {
        "id": new_destination.id,
        "name": new_destination.name,
        "country": new_destination.country,
        "continent": new_destination.continent,
        "note": new_destination.note,
        "tags": json.loads(new_destination.tags),
        "visited": new_destination.visited,
        "createdAt": new_destination.createdAt
    }

@app.delete("/destinations/{destination_id}", status_code=204)
def delete_destination(destination_id: str, db: Session = Depends(get_db)):
    item = db.query(DestinationModel).filter(DestinationModel.id == destination_id).first()
    if not item:
        raise HTTPException(status_code=404)
    db.delete(item)
    db.commit()

@app.patch("/destinations/{destination_id}", response_model=Destination)
def update_destination(destination_id: str, data: DestinationUpdate, db: Session = Depends(get_db)):
    item = db.query(DestinationModel).filter(DestinationModel.id == destination_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Destination not found")
    
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    
    db.commit()
    db.refresh(item)
    
    return {
        "id": item.id,
        "name": item.name,
        "country": item.country,
        "continent": item.continent,
        "note": item.note,
        "tags": json.loads(item.tags) if item.tags else [],
        "visited": item.visited,
        "createdAt": item.createdAt
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}