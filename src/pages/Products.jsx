import React, { useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([
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
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    description: "",
    price: "",
    photo: "",
    status: "active",
  });

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedProduct({ ...products[index] });
  };

  const handleSave = () => {
    const updated = [...products];
    updated[editIndex] = editedProduct;
    setProducts(updated);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const toggleStatus = (index) => {
    const updated = [...products];
    updated[index].status = updated[index].status === "active" ? "hold" : "active";
    setProducts(updated);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProduct((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Manage Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className={`rounded-xl p-5 shadow-md border transition duration-300 hover:shadow-lg ${
              product.status === "hold" ? "bg-yellow-50 border-yellow-300" : "bg-white"
            }`}
          >
            {editIndex === index ? (
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  value={editedProduct.name}
                  onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                  className="px-4 py-2 border rounded-md"
                  placeholder="Product Name"
                />
                <input
                  type="text"
                  value={editedProduct.description}
                  onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
                  className="px-4 py-2 border rounded-md"
                  placeholder="Description"
                />
                <input
                  type="text"
                  value={editedProduct.price}
                  onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                  className="px-4 py-2 border rounded-md"
                  placeholder="Price"
                />
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    onChange={handlePhotoChange}
                    className="px-4 py-2 border rounded-md"
                    accept="image/*"
                  />
                  {editedProduct.photo && (
                    <img
                      src={editedProduct.photo}
                      alt="Product Preview"
                      className="w-full h-40 object-cover rounded-md mt-2"
                    />
                  )}
                </div>
                <div className="flex gap-2 justify-end mt-4">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditIndex(null)}
                    className="text-gray-500 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
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

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => toggleStatus(index)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    {product.status === "active" ? "Hold" : "Unhold"}
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No products available.</p>
      )}
    </div>
  );
};

export default Products;
