import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def ask_gemini(message: str, transactions: str) -> str:

    prompt = f"""
            You are Benjy, the AI financial assistant inside FinSight.

            You are analyzing the user's REAL financial transaction data.

            IMPORTANT RULES:
            - ONLY use transactions provided in the TRANSACTIONS DATA below.
            - NEVER invent transactions.
            - NEVER invent merchants.
            - NEVER invent amounts.
            - NEVER invent dates.
            - NEVER invent categories.
            - NEVER invent totals.
            - NEVER assume transactions that are not provided.
            - If there are no transactions, clearly say the user has no transactions available.
            - If there is only one transaction, only discuss that transaction.
            - When calculating totals, calculate them ONLY from the provided transactions.
            - If the user's question cannot be answered from the provided data, say that the available data is insufficient.
            - Do not present fictional examples as if they were the user's real transactions.

            The user's question:
            {message}

            TRANSACTIONS DATA:
            {transactions}

            Answer the user's question using ONLY the data above.
            """

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt
    )

    return response.text