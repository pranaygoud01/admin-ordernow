import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";

const Promocode = () => {
  const [promocodes, setPromocodes] = useState([]);
  const authToken = localStorage.getItem('authToken');  // Replace with actual token or get it from context/localStorage
  const branch=localStorage.getItem('selectedBranch')
  useEffect(() => {
    const fetchPromocodes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_HOST}/api/promocodes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            "Branch":branch
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch promo codes");
        }

        const data = await response.json();
        setPromocodes(data);
      } catch (error) {
        console.error("Error fetching promo codes:", error);
      }
    };

    fetchPromocodes();
  }, []);
  const [promoCode, setPromoCode] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [discount, setDiscount] = useState("");
 // Replace with your real token

  const handleGenerate = async () => {
    if (!promoCode || !expiresAt || !usageLimit || !discount) {
      toast.error("Please fill all the fields.");
      return;
    }

    const promoData = {
      code: promoCode,
      discountPercentage: parseInt(discount),
      expiryDate: new Date(expiresAt).toISOString(), // Convert to ISO format
      usageLimit: parseInt(usageLimit),
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HOST}/api/promocodes/add`,
        promoData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
            "branch":branch
          },
        }
      );

      toast.success("PromoCode Added Successfully")
      window.location.reload();
      setPromoCode("");
      setExpiresAt("");
      setUsageLimit("");
      setDiscount("");
    } catch (error) {
      console.error("Error generating promo code:", error);
      alert("Failed to generate promo code.");
    }
  };

  return (
    <>
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Promo Code Generator
      </h1>

      <div className="bg-white p-8 rounded-xl shadow-lg mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
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
              Enter Customized PromoCode
            </label>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usage Limit
            </label>
            <input
              type="number"
              value={usageLimit}
              onChange={(e) => setUsageLimit(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount (%)
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. 15"
            />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="bg-[#111] text-white px-6 py-2 mt-4 rounded-lg font-semibold hover:bg-[#222] transition"
        >
          Generate
        </button>
      </div>
    </div>
    <div className="w-full h-fit flex justify-center">
      <div className="max-w-[1200px] w-full px-8 max-lg:grid-cols-1 grid grid-cols-3 gap-4">
        {promocodes.map((promo, index) => (
          <div
            key={index}
            className="w-full h-fit p-5 flex flex-col gap-2 bg-white shadow-xl border border-neutral-200 rounded-xl"
          >
            <h1 className="font-bold text-xl">{promo.code}</h1>
            <p className="font-semibold">Expire Date: {promo.expiryDate}</p>
            <p>Used: {promo.used ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Promocode;
