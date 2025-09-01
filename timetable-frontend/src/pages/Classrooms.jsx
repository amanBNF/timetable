import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Classrooms() {
  const [classrooms, setClassrooms] = useState([]);
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");

  // Fetch classrooms on mount
  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    const res = await axios.get("http://localhost:5000/api/classrooms");
    setClassrooms(res.data);
  };

  const addClassroom = async () => {
    await axios.post("http://localhost:5000/api/classrooms", {
      name,
      capacity,
    });
    setName("");
    setCapacity("");
    fetchClassrooms();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
  {/* Sidebar */}
  <Sidebar />

  <div className="flex-1 p-6">
    <h1 className="text-3xl font-bold mb-6 text-gray-800">Classrooms</h1>

    {/* Add Classroom Form */}
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
      <input
        type="text"
        placeholder="Name"
        className="border border-gray-300 p-3 rounded-lg flex-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Capacity"
        className="border border-gray-300 p-3 rounded-lg flex-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
      />
      <button
        onClick={addClassroom}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-300"
      >
        Add Classroom
      </button>
    </div>

    {/* List of Classrooms */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {classrooms.map((c) => (
        <div
          key={c.id}
          className="bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transition-shadow duration-300"
        >
          <h2 className="font-semibold text-gray-700 text-lg">{c.name}</h2>
          <p className="text-gray-500">{c.capacity} seats</p>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}

export default Classrooms;
