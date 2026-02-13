from sqlalchemy import Column, String, Boolean
from database import Base

class DestinationModel(Base):
    __tablename__ = "destinations"

    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    country = Column(String)
    continent = Column(String)
    note = Column(String)
    tags = Column(String)
    visited = Column(Boolean, default=False)
    createdAt = Column(String)