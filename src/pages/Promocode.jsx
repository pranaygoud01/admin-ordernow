import React, { useState } from "react";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const Promocode = () => {
  const [promoCodes, setPromoCodes] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [numCodes, setNumCodes] = useState(1);

  const generatePromoCode = (length = 10) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const getStatus = (expiresAt) =>
    new Date() > new Date(expiresAt) ? "Expired" : "Active";

  const handleGenerateCodes = () => {
    if (!createdAt || !expiresAt || numCodes < 1) {
      alert("Fill all fields correctly.");
      return;
    }

    const newCodes = Array.from({ length: numCodes }, () => ({
      code: generatePromoCode(),
      createdAt: new Date(createdAt),
      expiresAt: new Date(expiresAt),
    }));

    setPromoCodes((prev) => [...newCodes, ...prev]);
    setCreatedAt("");
    setExpiresAt("");
    setNumCodes(1);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
         Promo Code Generator
      </h1>

      {/* Form Section */}
      <div className="bg-gradient-to-br from-blue-100 to-white p-8 rounded-xl shadow-lg mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Creation Date
            </label>
            <input
              type="date"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <input
              type="date"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Codes
            </label>
            <input
              type="number"
              min="1"
              value={numCodes}
              onChange={(e) => setNumCodes(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleGenerateCodes}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Generate
            </button>
          </div>
        </div>
      </div>

      {/* Promo Code Cards */}
      {promoCodes.length > 0 && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {promoCodes.map((promo, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-blue-600 mb-2">
                  {promo.code}
                </h3>
                <p className="text-sm text-gray-600">
                  Created: {formatDate(promo.createdAt)}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Expires: {formatDate(promo.expiresAt)}
                </p>
              </div>
              <span
                className={`inline-block w-fit mt-2 px-3 py-1 text-xs rounded-full font-medium ${
                  getStatus(promo.expiresAt) === "Expired"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {getStatus(promo.expiresAt)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Promocode;
