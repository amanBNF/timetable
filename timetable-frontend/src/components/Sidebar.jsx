import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="w-64 bg-blue-700 text-white h-screen flex flex-col p-5">
      <h2 className="text-2xl font-bold mb-8">Timetable App</h2>
      <nav className="flex-1 space-y-4">
        <Link to="/dashboard" className="block p-2 rounded hover:bg-blue-600">Dashboard</Link>
        <Link to="/classrooms" className="block p-2 rounded hover:bg-blue-600">Classrooms</Link>
        <Link to="/teachers" className="block p-2 rounded hover:bg-blue-600">Teachers</Link>
        <Link to="/timetable" className="block p-2 rounded hover:bg-blue-600">Timetable</Link>
      </nav>
      <button
        onClick={handleLogout}
        className="mt-auto bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
