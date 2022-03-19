import axios from "axios";

export const getAllPerson = async () => {
  return axios.get("http://localhost:8081/missing/all");
};
