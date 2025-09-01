const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const classroomRoutes = require("./routes/classroom.js");
const teacherRoutes = require("./routes/faculty.js");
const timetableRoutes = require("./routes/schedule.js");
const subjectRoutes = require("./routes/subject.js");
const timetable = require("./routes/timetable.js");
// const timeRoutes = require("../../timetable-frontend/src/pages/Timetable.jsx");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/classrooms", classroomRoutes);
app.use("/api/faculty", teacherRoutes);
app.use("/api/schedule", timetableRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/timetable", timetable);

// --- Dummy Admin Credentials (for MVP) ---
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Timetable Scheduler API is running 🚀" });
});

// Basic login (no JWT yet, just MVP check)
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({
      success: true,
      message: "Login successful",
      user: { role: "admin", email },
    });
  }

  return res.status(401).json({ success: false, message: "Invalid credentials" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
