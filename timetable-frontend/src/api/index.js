const API_URL = "http://localhost:5000/api";

export const fetchClassrooms = async () => {
  const res = await fetch(`${API_URL}/classrooms`);
  return res.json();
};

export const createClassroom = async (data) => {
  const res = await fetch(`${API_URL}/classrooms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Repeat similar for faculty, subjects, schedules
