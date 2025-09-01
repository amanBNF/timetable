import React, { useEffect, useState } from "react";
import { getClassroomsCount, getTeachersCount, getTimetablesCount } from "../api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";


const Dashboard = () => {
  const [classrooms, setClassrooms] = useState(0);
  const [teachers, setTeachers] = useState(0);
  const [timetables, setTimetables] = useState(0);

  // Fetch faculty
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch classrooms
        const classroomsRes = await fetch("http://localhost:5000/api/classrooms/count");
        const classroomsData = await classroomsRes.json();
        setClassrooms(classroomsData.count);

        // Fetch teachers/faculty
        const facultyRes = await fetch("http://localhost:5000/api/faculty/count");
        const facultyData = await facultyRes.json();
        setTeachers(facultyData.count);

        // Fetch timetables
        const timetablesRes = await fetch("http://localhost:5000/api/schedule/count");
        const timetablesData = await timetablesRes.json();
        setTimetables(timetablesData.count);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);




  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Main Content */}
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Classrooms */}
            <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="font-semibold text-gray-500 uppercase tracking-wide mb-2">Total Classrooms</h2>
              <p className="text-blue-600 text-3xl font-bold">{classrooms}</p>
            </div>

            {/* Total Teachers */}
            <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="font-semibold text-gray-500 uppercase tracking-wide mb-2">Total Teachers</h2>
              <p className="text-green-600 text-3xl font-bold">{teachers}</p>
            </div>

            {/* Generated Timetables */}
            <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="font-semibold text-gray-500 uppercase tracking-wide mb-2">Generated Timetables</h2>
              <p className="text-purple-600 text-3xl font-bold">{timetables}</p>
            </div>
          </div>
        </main>
      </div>
    </div>

  );
};

export default Dashboard;
