import axios from "axios";
// import http from "../http-common";

const apidata = axios.create({
  baseURL: "https://backend-code-taupe.vercel.app", // Correct your API URL here
  // baseURL: "http://localhost:5000", // Correct your API URL here
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token
  },
});

const api = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://backend-code-taupe.vercel.app",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const userLogin = (data) => {
  return api.post("/users/login", data);
};

export const registration = (data) => {
  return api.post("/users/register", data);
};

export const createProfile = (data) => {
  return apidata.post("/users/createProfile", data);
};

export const filterUsers = (data) => {
  return apidata.post("/users/filterUsers", data);
};

export const searchProfile = (name) => {
  return apidata.post("/users/search", name);
};
