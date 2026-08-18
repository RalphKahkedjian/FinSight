import axios from "axios";

export const getForecast = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    "http://localhost:5233/api/forecast",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
}