import axios from "axios";
import { API_BASE_URL } from "../config";

const API = `${API_BASE_URL}/user`;

export const getUsers = () => axios.get(API);
export const createUser = (data) => axios.post(API, data);
export const updateUser = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteUser = (id) => axios.delete(`${API}/${id}`);
