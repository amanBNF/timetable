import React, { useEffect, useState } from "react";
import { getClassroomsCount, getTeachersCount, getTimetablesCount } from "../api";

const Dashboard = () => {
  const [classrooms, setClassrooms] = useState(0);
  const [teachers, setTeachers] = useState(0);
  const [timetables, setTimetables] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resClassrooms = await getClassroomsCount();
        const resTeachers = await getTeachersCount();
        const resTimetables = await getTimetablesCount();

        setClassrooms(resClassrooms.data.count);
        setTeachers(resTeachers.data.count);
        setTimetables(resTimetables.data.count);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="font-semibold">Total Classrooms</h2>
          <p className="text-blue-600 text-2xl font-bold">{classrooms}</p>
        </div>

        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="font-semibold">Total Teachers</h2>
          <p className="text-green-600 text-2xl font-bold">{teachers}</p>
        </div>

        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="font-semibold">Generated Timetables</h2>
          <p className="text-purple-600 text-2xl font-bold">{timetables}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
