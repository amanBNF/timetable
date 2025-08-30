import { useState, useEffect } from "react";

const FacultyPage = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [facultyList, setFacultyList] = useState([]);

  // Fetch faculty
  const fetchFaculty = async () => {
    const res = await fetch("http://localhost:5000/api/faculty");
    const data = await res.json();
    setFacultyList(data.faculties);
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/faculty", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, subject }),
    });

    if (res.ok) {
      setName("");
      setSubject("");
      fetchFaculty(); // refresh list
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Faculty</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Faculty Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Faculty
        </button>
      </form>

      {/* Faculty List */}
      <ul className="space-y-2">
        {facultyList.map((f) => (
          <li key={f.id} className="p-2 border rounded">
            <span className="font-medium">{f.name}</span> – {f.subject}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FacultyPage;
