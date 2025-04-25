# backend/app/main.py

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict

app = FastAPI()

# Allow requests from the frontend (usually running on localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock database
claims_db: List[Dict] = []


@app.get("/claims")
def get_claims():
    """
    Return a list of all insurance claims.
    """
    return claims_db


@app.post("/claims")
def create_claim(
    name: str = Form(...), description: str = Form(...), file: UploadFile = File(...)
):
    """
    Create a new insurance claim with basic metadata and a document.
    """
    claim = {
        "id": len(claims_db) + 1,
        "name": name,
        "description": description,
        "filename": file.filename,
    }
    claims_db.append(claim)
    return {"message": "Claim submitted successfully", "claim": claim}
