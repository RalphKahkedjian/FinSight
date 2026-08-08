from fastapi import FastAPI

from models.chat_request import ChatRequest
from models.chat_response import ChatResponse
from services.gemini_service import ask_gemini

app = FastAPI()

@app.get("/")
def home():
  return {
    "status": "online",
    "assistant" : "Benjy"
  }

@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
  answer = ask_gemini(request.message, request.transactions)
  return {
    "response" : answer
  }