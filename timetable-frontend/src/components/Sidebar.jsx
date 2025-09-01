import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaChalkboard, FaUserTie, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Classrooms", path: "/classrooms", icon: <FaChalkboard /> },
    { name: "Teachers", path: "/teachers", icon: <FaUserTie /> },
    { name: "Timetable", path: "/timetable", icon: <FaCalendarAlt /> },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-blue-700 to-blue-800 text-white h-screen flex flex-col p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-10 text-center">Timetable App</h2>

      <nav className="flex-1 space-y-2">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-300 ${
              location.pathname === link.path ? "bg-blue-600 shadow-md" : "hover:bg-blue-600"
            }`}
          >
            <span className="text-lg">{link.icon}</span>
            <span className="font-medium">{link.name}</span>
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center justify-center gap-2 bg-red-500 px-4 py-3 rounded-lg hover:bg-red-600 transition duration-300 shadow-md"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
