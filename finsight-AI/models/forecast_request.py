from pydantic import BaseModel
from typing import List
from datetime import datetime

class TransactionData(BaseModel):
  date: datetime
  amount: float
  type: str

class ForecastRequest(BaseModel):
  transactions: List[TransactionData]
  days: int = 30