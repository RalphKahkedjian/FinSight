from fastapi import FastAPI

from models.chat_request import ChatRequest
from models.chat_response import ChatResponse
from services.gemini_service import ask_gemini

from models.forecast_request import ForecastRequest
from services.forecast_service import generate_forecast

from services.insight_parser import parse_financial_overview


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
@app.post("/forecast")
def forecast(request: ForecastRequest):

    try:
        result = generate_forecast(
            request.transactions,
            request.days
        )

        return {
            "forecast": result
        }

    except ValueError as error:

        return {
            "error": str(error)
        }