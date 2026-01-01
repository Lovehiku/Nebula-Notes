import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

// Signup
export const signup = async (userData) => {
  const res = await axios.post(`${API_URL}/signup`, userData);
  localStorage.setItem("token", res.data.token);
  return res.data;
};

// Login
export const login = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  localStorage.setItem("token", res.data.token);
  return res.data;
};
