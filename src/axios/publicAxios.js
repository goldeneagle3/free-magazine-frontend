import axios from "axios";
import { BASE_URL } from "../config/urls";

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});
