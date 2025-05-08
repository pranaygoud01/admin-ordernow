import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MdOutlineDeleteOutline } from "react-icons/md";

const AddItem = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);

  // Preparation choice state
  const [newPrepChoice, setNewPrepChoice] = useState({ name: "", price: "" });
  const [preparationChoices, setPreparationChoices] = useState([]);

  const authToken = localStorage.getItem('authToken');
  const sBranch =localStorage.getItem('selectedBranch')
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_HOST}/api/categories`,{
       headers: {
          "Content-Type": "application/json",
          "branch":sBranch,
        },}
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

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
      preparationChoices, // Include preparation choices
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_HOST}/api/items/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
          "branch":sBranch,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Item Added Successfully");
        setProductName("");
        setCategory("");
        setPrice("");
        setImageFile(null);
        setDescription("");
        setPreparationChoices([]); // Reset preparation choices after successful submission
      } else {
        toast.error(data.message || "Failed to add item");
      }
    } catch (error) {
      toast.error("Failed to add item");
    }
  };

  const handleAddCategory = async () => {
    const trimmed = newCategory.trim();
    if (!trimmed) {
      toast.error("Category cannot be empty");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_HOST}/api/categories/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
          "branch":sBranch,
        },
        body: JSON.stringify({ name: trimmed }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Category added");
        setNewCategory("");
        fetchCategories(); // Refresh the categories from backend
      } else {
        toast.error(data.message || "Failed to add category");
      }
    } catch (error) {
      toast.error("Failed to add category");
    }
  };

  const handleDeleteCategory = async (catId, catName) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_HOST}/api/categories/${catId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Category deleted");
        setCategories(categories.filter(cat => cat._id !== catId));
        if (category === catName) {
          setCategory("");
        }
      } else {
        toast.error(data.message || "Failed to delete category");
      }
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  // Add Preparation Choice
  const handleAddPreparationChoice = () => {
    if (!newPrepChoice.name || !newPrepChoice.price) {
      toast.error("Preparation name and price are required");
      return;
    }

    setPreparationChoices([...preparationChoices, newPrepChoice]);
    setNewPrepChoice({ name: "", price: "" });
  };

  // Delete Preparation Choice
  const handleDeletePreparationChoice = (index) => {
    setPreparationChoices(preparationChoices.filter((_, i) => i !== index));
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
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Add Category */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Add New Category</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="New Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="px-6 py-3 font-semibold bg-blue-600 text-white rounded-md"
            >
              Add
            </button>
          </div>
        </div>

        {/* Preparation Choices */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Preparation Choices</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Preparation Name"
              value={newPrepChoice.name}
              onChange={(e) => setNewPrepChoice({ ...newPrepChoice, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              placeholder="Price"
              value={newPrepChoice.price}
              onChange={(e) => setNewPrepChoice({ ...newPrepChoice, price: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={handleAddPreparationChoice}
              className="px-6 py-3 font-semibold bg-green-600 text-white rounded-md"
            >
              Add
            </button>
          </div>

          {/* List of Preparation Choices */}
          <div>
            {preparationChoices.map((choice, index) => (
              <div key={index} className="flex items-center justify-between px-3 py-2 bg-white font-semibold border border-neutral-300 rounded mb-2">
                <span>{choice.name} - ${choice.price}</span>
                <button
                  type="button"
                  onClick={() => handleDeletePreparationChoice(index)}
                  className="text-red-600 text-xl cursor-pointer"
                >
                  <MdOutlineDeleteOutline />
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
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
