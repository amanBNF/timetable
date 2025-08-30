function Topbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <p className="text-gray-600">Welcome, {user?.email || "Admin"} 👋</p>
    </div>
  );
}

export default Topbar;
