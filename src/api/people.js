import axios from "axios";

export async function fetchPeopleData() {
  try {
    const response = await axios.get("/api/people.json");
    return response.data;
  } catch (error) {
    throw error;
  }
}
