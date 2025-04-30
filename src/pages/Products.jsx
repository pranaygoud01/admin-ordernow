import React from "react";

const Products = () => {
  const products = [
    {
      name: "iPhone 14",
      description: "Latest model with amazing features.",
      price: "$999",
      photo: "https://example.com/iphone14.jpg",
      status: "active",
    },
    {
      name: "MacBook Air",
      description: "Thin, light, and powerful laptop.",
      price: "$1199",
      photo: "https://example.com/macbookair.jpg",
      status: "hold",
    },
    {
      name: "Galaxy S23",
      description: "Android flagship with the best screen.",
      price: "$899",
      photo: "https://example.com/galaxys23.jpg",
      status: "active",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Our Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className={`rounded-xl p-5 shadow-md border ${
              product.status === "hold" ? "bg-yellow-50 border-yellow-300" : "bg-white"
            }`}
          >
            <img
              src={product.photo}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-500 mt-2">{product.description}</p>
            <p className="text-lg font-bold text-gray-800 mt-2">{product.price}</p>
            <p
              className={`mt-1 text-sm font-medium ${
                product.status === "active" ? "text-green-600" : "text-yellow-600"
              }`}
            >
              Status: {product.status}
            </p>

            {/* Action buttons (no logic) */}
            <div className="mt-4 flex gap-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                Edit
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
