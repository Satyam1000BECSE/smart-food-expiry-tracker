import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";



export default function AddProduct() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    expiry_date: "",
  });

  const convertDate = (dateStr) => {
    const parts = dateStr.split(/[\/\-\.]/);
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  useEffect(() => {
    if (location.state?.expiry) {
      setForm(prev => ({
        ...prev,
        expiry_date: convertDate(location.state.expiry)
      }));
    }
  }, [location.state]);

  const handleSubmit = async () => {
    try {
      await API.post("/products/", {
        ...form,
        quantity: parseInt(form.quantity),
      });

      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data);
      alert("Error adding product");
    }
  };





  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-lime-100 p-6">

      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-green-100">

        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          🥗 Add New Food Item
        </h2>

        {/* Name */}
        <input
          className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
          placeholder="Product Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Category */}
        <select
          className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Dairy">Dairy</option>
          <option value="Meat">Meat</option>
          <option value="Packaged">Packaged</option>
        </select>

        {/* Quantity */}
        <input
          className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          placeholder="Quantity"
          type="number"
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />

        {/* Unit */}
        <select
          className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          onChange={(e) => setForm({ ...form, unit: e.target.value })}
        >
          <option value="">Select Unit</option>
          <option value="kg">kg</option>
          <option value="liter">liter</option>
          <option value="pieces">pieces</option>
        </select>

        {/* Expiry Date */}
        <input
          className="w-full mb-6 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          type="date"
          value={form.expiry_date}
          onChange={(e) => setForm({ ...form, expiry_date: e.target.value })}
        />

        {/* Button */}
        <button
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg font-semibold shadow-md hover:scale-[1.02] hover:shadow-lg transition duration-200"
          onClick={handleSubmit}
        >
          Add Product
        </button>

      </div>
    </div>
  );
}


