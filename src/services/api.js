import axios from "axios";

// ✅ Bug 6 fixed — correct port 3001 to match json-server
const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = (data) => {
  return api.post("/login", data);
};

export const registerUser = (data) => {
  return api.post("/register", data);
};

export const getTasks = () => {
  return api.get("/tasks");
};

export const createTask = (data) => {
  return api.post("/tasks", data);
};

export const updateTask = (id, data) => {
  return api.put(`/tasks/${id}`, data);
};

export const deleteTask = (id) => {
  return api.delete(`/tasks/${id}`);
};

export default api;
