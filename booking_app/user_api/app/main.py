from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from pydantic import BaseModel
from prometheus_client import Counter, generate_latest, CONTENT_TYPE_LATEST
from starlette.responses import Response
from bson import ObjectId

app = FastAPI()

# MongoDB setup
client = MongoClient("mongodb://mongodb:27017/")
db = client["booking_db"]
users_collection = db["users"]

# Prometheus metrics
user_create_counter = Counter('user_create_total', 'Number of users created')

# Pydantic model for input validation
class User(BaseModel):
    username: str
    email: str

@app.get("/")
def root():
    return {"message": "User API is running"}

@app.post("/users/")
def create_user(user: User):
    result = users_collection.insert_one(user.dict())
    user_create_counter.inc()  # Increment Prometheus counter
    return {"id": str(result.inserted_id)}

@app.get("/users/{user_id}")
def read_user(user_id: str):
    try:
        obj_id = ObjectId(user_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid user ID")

    user = users_collection.find_one({"_id": obj_id})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    user["_id"] = str(user["_id"])  # Convert ObjectId to string for JSON serialization
    return user

# Endpoint for Prometheus to scrape metrics
@app.get("/metrics")
def metrics():
    data = generate_latest()
    return Response(content=data, media_type=CONTENT_TYPE_LATEST)

