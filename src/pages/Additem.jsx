


import React, { useState } from "react";

const Additem = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission, like sending data to your server or API
    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("photo", photo);

    // Example: Sending the form data to a server (API endpoint)
    // fetch('/submit-item', { method: 'POST', body: formData })
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(error => console.error('Error:', error));

    console.log("Form submitted with:", formData);
  };

  return (
    <div className="max-w-lg mx-auto p-6  mt-10 flex flex-col rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">

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


        <div className="mb-4">
          <label htmlFor="photo" className="block font-semibold mb-2">
            Product Photo
          </label>
          <input
            type="file"
            id="photo"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>


        <div className="flex w-full mt-6 justify-center">
          <button
            type="submit"
            className="px-6 py-3  w-full rounded-md bg-rose-500 text-white font-semibold"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default Additem;
