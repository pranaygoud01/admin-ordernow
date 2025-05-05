import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "", // store the image url
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

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
      image: product.image,
    });
    setImageFile(null); // reset image file
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      return null;
    }

    const form = new FormData();
    form.append("image", imageFile);

    try {
      setUploading(true);
      const response = await fetch(`${import.meta.env.VITE_HOST}/api/upload`, {
        method: "POST",
        body: form,
      });

      const data = await response.json();
      setUploading(false);

      if (response.ok) {
        return data.url;
      } else {
        console.error(data.message || "Image upload failed");
        return null;
      }
    } catch (error) {
      setUploading(false);
      console.error("Image upload failed");
      return null;
    }
  };

  const handleUpdate = async () => {
    let imageUrl = formData.image;

    // If new image selected, upload it first
    if (imageFile) {
      const uploadedUrl = await handleImageUpload();
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      } else {
        console.error("Failed to upload image");
        return;
      }
    }

    fetch(`${import.meta.env.VITE_HOST}/api/items/update/${editingProduct._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({ ...formData, image: imageUrl }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update product");
        }
        return res.json();
      })
      .then(() => {
        setEditingProduct(null);
        setImageFile(null);
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
                  className="bg-blue-500 font-semibold text-white px-6 py-2 rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 font-semibold text-white px-6 py-2 rounded-md hover:bg-red-600"
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
  <div className="fixed inset-0 flex items-center justify-center bg-black/30 px-3 backdrop-blur-sm z-50">
    <div className="bg-white rounded-2xl shadow-lg p-8 w-[400px] relative">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit Product</h2>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Name</label>
          <input
            type="text"
            placeholder="Enter product name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-neutral-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Description</label>
          <textarea
            placeholder="Enter product description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border border-neutral-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Price (£)</label>
          <input
            type="number"
            placeholder="Enter product price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full border border-neutral-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full"
          />
          {/* Show image preview */}
          {(imageFile || formData.image) && (
            <img
              src={imageFile ? URL.createObjectURL(imageFile) : formData.image}
              alt="Preview"
              className="mt-3 w-full h-40 border-neutral-300 object-cover rounded-md border"
            />
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setEditingProduct(null)}
          className="px-4 py-2 rounded-lg font-semibold bg-gray-300 hover:bg-gray-200 cursor-pointer text-gray-700 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          disabled={uploading}
          className={`px-4 py-2 rounded-lg font-semibold text-white cursor-pointer transition ${
            uploading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {uploading ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Products;
