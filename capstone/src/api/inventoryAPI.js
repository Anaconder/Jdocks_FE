import axios from "axios";
import { API_BASE_URL } from "../config";

const API = `${API_BASE_URL}/inventory`;

export const getInventory = () => axios.get(API);
export const createInventory = (data) => axios.post(API, data);
export const updateInventory = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteInventory = (id) => axios.delete(`${API}/${id}`);
