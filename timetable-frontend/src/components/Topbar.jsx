function Topbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md p-4 flex justify-between items-center">
      {/* Page Title */}
      <h1 className="text-2xl font-bold drop-shadow-md">Dashboard</h1>

      {/* Welcome Message */}
      <div className="flex items-center gap-3">
        <p className="text-white font-medium">
          Welcome, <span className="underline">{user?.email || "Admin"}</span> 👋
        </p>
      </div>
    </div>
  );
}

export default Topbar;
