import React, { useState } from "react";
import toast from "react-hot-toast";

const Additem = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null); // Store the selected file
  const [uploading, setUploading] = useState(false); // Show loading indicator

  const authToken = localStorage.getItem('authToken');

  const handleImageUpload = async () => {
    if (!imageFile) {
      toast.error("Please select an image to upload");
      return null;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      setUploading(true);
      const response = await fetch(`${import.meta.env.VITE_HOST}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setUploading(false);

      if (response.ok) {
        return data.url;  // Assuming backend returns { url: "http://..." }
      } else {
        toast.error(data.message || "Image upload failed");
        return null;
      }
    } catch (error) {
      setUploading(false);
      toast.error("Image upload failed");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = await handleImageUpload();
    if (!imageUrl) {
      return; // Stop if image upload failed
    }

    const formData = {
      name: productName,
      description: description,
      price: price,
      category: category,
      image: imageUrl, // Use the uploaded image URL
    };

    fetch(`${import.meta.env.VITE_HOST}/api/items/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        toast.success("Item Added Successfully");
        setProductName("");
        setCategory("");
        setPrice("");
        setImageFile(null);
        setDescription("");
      })
      .catch((error) => {
        toast.error("Failed to add item");
      });
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 flex flex-col rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">

        {/* Product Name */}
        <div className="mb-4">
          <label htmlFor="product_name" className="block font-semibold mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="product_name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block font-semibold mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
            step="0.01"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block font-semibold mb-2">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="imageUpload" className="block font-semibold mb-2">
            Upload Image
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Uploading Indicator */}
        {uploading && (
          <div className="text-center text-blue-500 font-semibold mb-4">
            Uploading Image...
          </div>
        )}

        {/* Submit Button */}
        <div className="flex w-full mt-6 justify-center">
          <button
            type="submit"
            className="px-6 py-3 w-full rounded-md bg-rose-500 text-white font-semibold"
            disabled={uploading}
          >
            {uploading ? "Please wait..." : "Add Item"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default Additem;
