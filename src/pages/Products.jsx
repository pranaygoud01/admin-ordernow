import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // for edit modal
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const fetchProducts = () => {
    fetch(`${import.meta.env.VITE_HOST}/api/items`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.items);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    fetch(`${import.meta.env.VITE_HOST}/api/items/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete the product");
        }
        return res.json();
      })
      .then(() => {
        fetchProducts();
      })
      .catch((err) => {
        console.error("Error deleting product:", err);
      });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
    });
  };

  const handleUpdate = () => {
    fetch(`${import.meta.env.VITE_HOST}/api/items/update/${editingProduct._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update product");
        }
        return res.json();
      })
      .then(() => {
        setEditingProduct(null);
        fetchProducts();
      })
      .catch((err) => {
        console.error("Error updating product:", err);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Our Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="rounded-xl shadow-xl bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-60 object-cover rounded-t-md mb-4"
            />
            <div className="p-5 pt-0">
              <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-500 mt-2">{product.description}</p>
              <p className="text-lg font-bold text-gray-800 mt-2">£{product.price}</p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-blue-500 font-semibold text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 font-semibold text-white px-6 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 bg-opacity-50">
          <div className="bg-white rounded-lg p-8 w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">Edit Product</h2>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-neutral-400 rounded-md font-semibold text-neutral-600 p-2 mb-4"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border border-neutral-400 rounded-md font-semibold text-neutral-600 p-2 mb-4"
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full border border-neutral-400 rounded-md font-semibold text-neutral-600 p-2 mb-4"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setEditingProduct(null)}
                className="bg-gray-400 px-4 py-2 rounded font-semibold text-white hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-green-500 px-4 py-2 rounded font-semibold text-white hover:bg-green-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;