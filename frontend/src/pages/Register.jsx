import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleRegister = async () => {
    await API.post("/auth/register", form);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-lime-100 p-6">

      <div className="w-full max-w-sm bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-green-100">

        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          🥦 Create Account
        </h2>

        {/* Name */}
        <input
          className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
          placeholder="Full Name"
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />

        {/* Email */}
        <input
          className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
          placeholder="Email Address"
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        {/* Password */}
        <input
          className="w-full mb-6 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
          type="password"
          placeholder="Password"
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />

        {/* Button */}
        <button
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg font-semibold shadow-md hover:scale-[1.02] hover:shadow-lg transition duration-200"
          onClick={handleRegister}
        >
          Register
        </button>

        {/* Extra */}
        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            className="text-green-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}


