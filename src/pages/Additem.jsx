import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineDeleteOutline } from "react-icons/md";
const Additem = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([
    "SIDES", "CHIMICHANGA", "BURRITO/RICE", "BOWL", "SETMENU", "FAJITA",
    "STARTERS", "KIDS MEALS", "DONBURI", "TACOS", "NIGIRI", "TEMAKI",
    "BURGER AND CHIPS", "MAKI ROLLS", "SPECIALITY", "ROLLS", "URAMAKI", "SASHIMI"
  ]);

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
        return data.url;
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
    if (!imageUrl) return;

    const formData = {
      name: productName,
      description,
      price,
      category,
      image: imageUrl,
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
      .catch(() => {
        toast.error("Failed to add item");
      });
  };

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (!trimmed) {
      toast.error("Category cannot be empty");
      return;
    }
    if (categories.includes(trimmed)) {
      toast.error("Category already exists");
      return;
    }
    setCategories([...categories, trimmed]);
    setNewCategory("");
    toast.success("Category added");
  };

  const handleDeleteCategory = (catToDelete) => {
    setCategories(categories.filter(cat => cat !== catToDelete));
    if (category === catToDelete) {
      setCategory("");
    }
    toast.success("Category deleted");
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 flex flex-col rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">

        {/* Product Name */}
        <div className="mb-4">
          <label htmlFor="product_name" className="block font-semibold mb-2">Product Name</label>
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
          <label htmlFor="description" className="block font-semibold mb-2">Description</label>
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
          <label htmlFor="price" className="block font-semibold mb-2">Price</label>
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

        {/* Category Dropdown */}
        <div className="mb-4">
          <label htmlFor="category" className="block font-semibold mb-2">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Add/Delete Category Controls */}
        <div className="mb-4 flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="New category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="px-10 py-2 cursor-pointer font-semibold bg-green-600 text-white rounded-md"
            >
              Add
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-3 py-2 bg-gray-100 rounded"
              >
                <span className="text-sm truncate">{cat}</span>
                <button
                  type="button"
                  onClick={() => handleDeleteCategory(cat)}
                  className="text-red-600 text-xl cursor-pointer"
                >
                  <MdOutlineDeleteOutline/>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="imageUpload" className="block font-semibold mb-2">Upload Image</label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {uploading && (
          <div className="text-center text-blue-500 font-semibold mb-4">
            Uploading Image...
          </div>
        )}

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
