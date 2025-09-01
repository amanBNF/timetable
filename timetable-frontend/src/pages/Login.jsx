import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Try again!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
  <div className="bg-white p-10 rounded-3xl shadow-2xl w-96 animate-fadeIn">
    <h2 className="text-3xl font-bold text-center mb-6 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
      Login
    </h2>

    {error && (
      <p className="text-red-500 text-center mb-4 animate-pulse">{error}</p>
    )}

    <form onSubmit={handleLogin} className="space-y-5">
      {/* Email */}
      <div className="relative">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 transition-all duration-300 shadow-sm hover:shadow-md"
        />
      </div>

      {/* Password */}
      <div className="relative">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 transition-all duration-300 shadow-sm hover:shadow-md"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-2xl transform transition duration-300"
      >
        Login
      </button>
    </form>

    {/* Extra Links */}
    <p className="text-center text-gray-500 mt-4 text-sm">
      Don't have an account?{" "}
      <span className="text-purple-600 font-medium hover:underline cursor-pointer">
        Sign Up
      </span>
    </p>
  </div>
</div>

  );
}

export default Login;
