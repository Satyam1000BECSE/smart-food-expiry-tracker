import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await API.post("/auth/login", { email, password });
    login(res.data.access_token);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-lime-100 p-6">

      <div className="w-full max-w-sm bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-green-100">

        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          🥗 Welcome Back
        </h2>

        {/* Email */}
        <input
          className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 
          focus:outline-none focus:ring-2 focus:ring-green-400 
          focus:border-transparent transition"
          placeholder="Email Address"
          onChange={(e)=>setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          className="w-full mb-6 px-4 py-2 rounded-lg border border-gray-300 
          focus:outline-none focus:ring-2 focus:ring-green-400 
          focus:border-transparent transition"
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 
          text-white py-2 rounded-lg font-semibold shadow-md 
          hover:scale-[1.02] hover:shadow-lg transition duration-200"
          onClick={handleLogin}
        >
          Login
        </button>

        {/* Extra */}
        <p className="text-sm text-center text-gray-500 mt-4">
          Don’t have an account?{" "}
          <span
            className="text-green-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}


