import axios from "axios";
import { API_BASE_URL } from "../config";

const API = `${API_BASE_URL}/cart`;

export const getCart = (id) => axios.get(`${API}/${id}`);
export const createCart = (data) => axios.post(API, data);
export const updateCart = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteCart = (id) => axios.delete(`${API}/${id}`);
