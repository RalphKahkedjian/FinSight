import pandas as pd
from prophet import Prophet


def generate_forecast(transactions, days):

    data = []

    for transaction in transactions:

        # We only want expenses for spending prediction
        if transaction.type.lower() != "expense":
            continue

        data.append({
            "ds": transaction.date,
            "y": transaction.amount
        })

    if len(data) < 2:
        raise ValueError("Not enough expense data for forecasting.")

    df = pd.DataFrame(data)

    df["ds"] = pd.to_datetime(
        df["ds"],
        utc=True
    ).dt.tz_localize(None)

    model = Prophet()

    model.fit(df)

    future = model.make_future_dataframe(
        periods=days
    )

    forecast = model.predict(future)

    forecast = forecast.tail(days)

    result = []

    for _, row in forecast.iterrows():

        result.append({
            "date": row["ds"].strftime("%Y-%m-%d"),
            "predicted": round(max(0, row["yhat"]), 2),
            "lower": round(max(0, row["yhat_lower"]), 2),
            "upper": round(max(0, row["yhat_upper"]), 2)
        })

    return result