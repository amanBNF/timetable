import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Classrooms from "./pages/Classrooms";
import Teachers from "./pages/Teachers";
import Timetable from "./pages/Timetable";

function App() {
  const isLoggedIn = localStorage.getItem("user");

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
      />
      <Route
        path="/classrooms"
        element={isLoggedIn ? <Classrooms /> : <Navigate to="/" />}
      />
      <Route
        path="/teachers"
        element={isLoggedIn ? <Teachers /> : <Navigate to="/" />}
      />
      <Route
        path="/timetable"
        element={isLoggedIn ? <Timetable /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
