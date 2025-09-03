import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Teachers() {
  const [facultyList, setFacultyList] = useState([]);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    fetchFaculty();
  }, []);

  // Fetch faculty from backend
  const fetchFaculty = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/faculty");
      setFacultyList(res.data.faculties); // backend should return { faculties: [...] }
    } catch (err) {
      console.error("Failed to fetch faculty:", err);
    }
  };

  // Add new faculty
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/faculty", {
        name,
        subject,
      });
      setName("");
      setSubject("");
      fetchFaculty(); // refresh list
    } catch (err) {
      console.error("Failed to add faculty:", err);
    }
  };

  // Delete faculty
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/faculty/${id}`);
      setFacultyList((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error("Failed to delete faculty:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Faculty</h1>

        {/* Add Faculty Form */}
        <form onSubmit={handleSubmit} className="space-y-3 mb-6">
          <input
            type="text"
            placeholder="Faculty Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Faculty
          </button>
        </form>

        {/* Faculty List */}
        {facultyList.length === 0 ? (
          <p className="text-gray-500 text-lg">No faculty available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facultyList.map((f) => (
              <div
                key={f.id}
                className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-shadow duration-300 border-l-8 border-blue-500"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {f.name}
                </h2>
                <p className="text-gray-600 mb-1">
                  Subject:{" "}
                  <span className="font-medium text-green-600">{f.subject}</span>
                </p>
                <button
                  onClick={() => handleDelete(f.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded mt-3 hover:bg-red-600"
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

export default Teachers;
