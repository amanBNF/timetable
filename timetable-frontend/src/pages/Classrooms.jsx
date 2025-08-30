import { useEffect, useState } from "react";
import axios from "axios";

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Classrooms</h1>

      {/* Add Classroom Form */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Capacity"
          className="border p-2 rounded"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
        <button
          onClick={addClassroom}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* List */}
      <ul className="space-y-2">
        {classrooms.map((c) => (
          <li key={c.id} className="border p-2 rounded">
            {c.name} — {c.capacity} seats
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Classrooms;
