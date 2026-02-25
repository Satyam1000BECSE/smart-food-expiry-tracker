import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [stats, setStats] = useState(null);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    // const fetchProducts = () => {
    //   API.get("/products", {
    //     params: {
    //       name: search,
    //       category: category,
    //     },
    //   }).then(res => setProducts(res.data));
    // };


    // useEffect(() => {
    //     fetchDashboard();
    //     fetchProducts();
    // }, []);

    useEffect(() => {
        fetchDashboard();
        fetchProducts();
    }, [search, category]);

    // useEffect(() => {
    //   const timeout = setTimeout(() => {
    //     fetchProducts();
    //   }, 500);

    //   return () => clearTimeout(timeout);
    // }, [search, category]);



    const fetchDashboard = () => {
        API.get("/analytics/dashboard")
            .then(res => setStats(res.data))
            .catch(err => console.log(err));
    };

    const fetchProducts = () => {
        API.get("/products", {
            params: {
                name: search,
                category: category,
            },
        })
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    };


    // ✅ Calculate Expiry Status
    const today = new Date();

    let fresh = 0;
    let expiring = 0;
    let expired = 0;

    products.forEach((product) => {
        const expiry = new Date(product.expiry_date);
        const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

        if (diff < 0) {
            expired++;
        } else if (diff <= 3) {
            expiring++;
        } else {
            fresh++;
        }
    });

    // ✅ Define Pie Data
    const data = [
        { name: "Fresh", value: fresh },
        { name: "Expiring Soon", value: expiring },
        { name: "Expired", value: expired },
    ];

    const COLORS = ["#22c55e", "#facc15", "#ef4444"];

    if (!stats) return <p className="p-6">Loading...</p>;

    // 🔥 Backend Analytics Pie Data
    const pieData = [
        { name: "Expired", value: stats.expired_items },
        { name: "Active", value: stats.active_items },
    ];

    // 🔥 Category Breakdown
    const categoryData = stats.category_breakdown;


    return (
        <div className="p-6 space-y-10">

            {/* ========== TOP STATS CARDS ========== */}
            {/* <div>
                <h2 className="text-2xl font-bold mb-4">Analytics Overview</h2>

                <div className="flex gap-3 mb-6">
                    <input
                        placeholder="Search by name"
                        className="border p-2"
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        className="border p-2"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Meat">Meat</option>
                    </select>

                    <button
                        onClick={fetchProducts}
                        className="bg-green-600 text-white px-4 rounded"
                    >
                        Filter
                    </button>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-100 p-4 rounded shadow">
                        Total Items: {stats.total_items}
                    </div>
                    <div className="bg-red-100 p-4 rounded shadow">
                        Expired: {stats.expired_items}
                    </div>
                    <div className="bg-yellow-100 p-4 rounded shadow">
                        Active: {stats.active_items}
                    </div>
                </div>
            </div> */}

            <div className="space-y-8">

                {/* ===== Header ===== */}
                <div>
                    <h2 className="text-3xl font-bold text-green-700 tracking-tight">
                        📊 Analytics Overview
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Track your food freshness and reduce waste efficiently
                    </p>
                </div>

                {/* ===== Filter Section ===== */}
                <div className="bg-white p-5 rounded-2xl shadow-md border border-green-100 flex flex-col md:flex-row gap-4 md:items-center">

                    <input
                        placeholder="🔍 Search by product name..."
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 
      focus:outline-none focus:ring-2 focus:ring-green-400 
      focus:border-transparent transition"
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        className="px-4 py-2 rounded-lg border border-gray-300 
      focus:outline-none focus:ring-2 focus:ring-green-400 
      focus:border-transparent transition"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="Fruits">🍎 Fruits</option>
                        <option value="Vegetables">🥦 Vegetables</option>
                        <option value="Dairy">🥛 Dairy</option>
                        <option value="Meat">🍗 Meat</option>
                        <option value="Packaged">📦 Packaged</option>
                    </select>

                    <button
                        onClick={fetchProducts}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 
      text-white px-6 py-2 rounded-lg font-semibold 
      shadow hover:scale-105 hover:shadow-lg 
      transition duration-200"
                    >
                        Apply Filter
                    </button>
                </div>

                {/* ===== Stats Cards ===== */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Total */}
                    <div className="bg-gradient-to-br from-green-100 to-green-50 
    p-6 rounded-2xl shadow-md border border-green-200 
    hover:shadow-lg transition">
                        <p className="text-sm text-gray-500">Total Items</p>
                        <h3 className="text-3xl font-bold text-green-700 mt-2">
                            {stats.total_items}
                        </h3>
                    </div>

                    {/* Expired */}
                    <div className="bg-gradient-to-br from-red-100 to-red-50 
    p-6 rounded-2xl shadow-md border border-red-200 
    hover:shadow-lg transition">
                        <p className="text-sm text-gray-500">Expired Items</p>
                        <h3 className="text-3xl font-bold text-red-600 mt-2">
                            {stats.expired_items}
                        </h3>
                    </div>

                    {/* Active */}
                    <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 
    p-6 rounded-2xl shadow-md border border-yellow-200 
    hover:shadow-lg transition">
                        <p className="text-sm text-gray-500">Active Items</p>
                        <h3 className="text-3xl font-bold text-yellow-600 mt-2">
                            {stats.active_items}
                        </h3>
                    </div>

                </div>

            </div>


            {/* ========== PIE CHART ========== */}
            <div className="bg-white p-6 rounded shadow ">
                <h3 className="text-lg font-semibold mb-4">Expiry Status</h3>
                <div className="bg-white p-6 rounded shadow flex" >

                    <ResponsiveContainer width="50%" height={300}>
                        <PieChart>
                            <Pie data={pieData} dataKey="value" outerRadius={100} label>
                                <Cell fill="#ef4444" />
                                <Cell fill="#22c55e" />
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>

                    <ResponsiveContainer width="50%" height={300}>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                outerRadius={100}
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* ========== CATEGORY BAR CHART ========== */}
            <div className="bg-white p-6 rounded shadow">
                <h3 className="text-lg font-semibold mb-4">Category Breakdown</h3>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#16a34a" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* ========== PRODUCTS GRID ========== */}
            <div>
                <h3 className="text-xl font-bold mb-4">Your Products</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {products.map((p) => (
                        <ProductCard key={p.id} product={p} onRefresh={fetchProducts} />
                    ))}
                </div>
            </div>

        </div>
    );
}

