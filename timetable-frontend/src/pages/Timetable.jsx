import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Timetable() {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    const res = await axios.get("http://localhost:5000/api/schedule");
    setSchedules(res.data);
  };


  //handle delete
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/schedule/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data.message);

      // Remove deleted schedule from state
      setSchedules((prev) => prev.filter((s) => s.id !== Number(id)));
    } catch (err) {
      console.error("Failed to delete schedule:", err);
    }
  };


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Timetable</h1>

        {schedules.length === 0 ? (
          <p className="text-gray-500 text-lg">No schedules available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedules.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-shadow duration-300 border-l-8 border-blue-500"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-500 font-medium">{s.day}</span>
                  <span className="text-sm text-gray-400">{s.timeSlot}</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">{s.subject.name}</h2>
                <p className="text-gray-600 mb-1">
                  Faculty: <span className="font-medium text-green-600">{s.faculty.name}</span>
                </p>
                <p className="text-gray-600">
                  Classroom: <span className="font-medium text-purple-600">{s.classroom.name}</span>
                </p>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

  );
}

export default Timetable;
