import axios from "axios";

const API_BASE_URL = "https://trackapi.nutritionix.com/v2";
const app_id = "8e7e620f"; //process.env.REACT_APP_FATSECRET_API_KEY;
const app_key = "7a3306848ebca1cc6db09d54c942cdad";

export const searchFood = async (query) => {
  let headers = {
    "Content-Type": "application/json",
    "x-app-id": app_id,
    "x-app-key": app_key,
  };

  let body = {
    query: query,
  };

  try {
    const response = await axios.post(
      `${API_BASE_URL}/natural/nutrients`,
      body,
      { headers: headers }
    );

    return response.data.foods || [];
  } catch (error) {
    console.error(
      "Error fetching food data:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};
