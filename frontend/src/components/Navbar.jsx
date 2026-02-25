import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="bg-gradient-to-r from-green-600 via-emerald-500 to-lime-400 text-white p-4 flex justify-between">
      <h1 className="font-bold text-lg">Smart Food Tracker</h1>
      <div className="space-x-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add">Add Product</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
