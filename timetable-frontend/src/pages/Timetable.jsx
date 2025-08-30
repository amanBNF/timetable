import { useEffect, useState } from "react";
import axios from "axios";

function Timetable() {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    const res = await axios.get("http://localhost:5000/api/schedules");
    setSchedules(res.data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Timetable</h1>

      <ul className="space-y-2">
        {schedules.map((s) => (
          <li key={s.id} className="border p-2 rounded">
            {s.day} — {s.timeSlot} — {s.subject.name} with {s.faculty.name} in{" "}
            {s.classroom.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Timetable;
