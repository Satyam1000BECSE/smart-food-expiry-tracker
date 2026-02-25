import API from "../services/api";

export default function ProductCard({ product, onRefresh }) {

  const markWaste = async () => {
    try {
      await API.put(`/products/${product.id}/waste`);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.log(err);
    }
  };

  const getStatusStyles = () => {
    if (product.status === "Expired")
      return "bg-red-100 border-red-300 text-red-700";
    if (product.status === "Expiring Soon")
      return "bg-yellow-100 border-yellow-300 text-yellow-700";
    return "bg-green-100 border-green-300 text-green-700";
  };

  const getBadgeColor = () => {
    if (product.status === "Expired") return "bg-red-500";
    if (product.status === "Expiring Soon") return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div
      className={`border rounded-2xl p-5 shadow-md hover:shadow-xl transition duration-300 ${getStatusStyles()}`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-lg font-semibold">{product.name}</h2>

        <span
          className={`text-white text-xs px-3 py-1 rounded-full ${getBadgeColor()}`}
        >
          {product.status}
        </span>
      </div>

      {/* Body */}
      <div className="space-y-1 text-sm">
        <p className="text-gray-700">
          <span className="font-medium">Category:</span> {product.category}
        </p>

        <p className="text-gray-700">
          <span className="font-medium">Quantity:</span>{" "}
          {product.quantity} {product.unit}
        </p>

        <p className="text-gray-700">
          <span className="font-medium">Expiry:</span> {product.expiry_date}
        </p>

        <p className="text-gray-700">
          <span className="font-medium">Days Left:</span>{" "}
          {product.days_left}
        </p>
      </div>

      {/* Waste Button */}
      {!product.is_wasted && (
        <button
          onClick={markWaste}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition duration-200"
        >
          Mark as Wasted
        </button>
      )}

      {product.is_wasted && (
        <div className="mt-4 text-center text-sm font-medium text-gray-500">
          Marked as Wasted
        </div>
      )}
    </div>
  );
}


