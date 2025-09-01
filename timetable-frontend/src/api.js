import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if backend is on another port
});

// API Calls
export const getClassroomsCount = () => API.get("/classrooms/count");
export const getTeachersCount = () => API.get("/faculty/count");
export const getTimetablesCount = () => API.get("/schedule/count");
export const deletedFaculty = (id) => API.delete(`/faculty/${id}`);
