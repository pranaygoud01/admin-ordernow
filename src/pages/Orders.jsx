import React, { useEffect, useState } from 'react';
import CustomerOrder from "../components/CustomerOrder";
import * as XLSX from 'xlsx';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const authToken = localStorage.getItem('authToken'); // Replace with your actual token

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_HOST}/api/orders`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        const data = await response.json();
        
        // Assuming orders should be sorted with newest first (you can adjust if needed)
        const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setOrders(sortedOrders); // Store fetched and sorted orders
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const downloadLast10Orders = () => {
    const last10Orders = orders.slice(0, 10);

    // Transform orders for Excel (pick necessary fields)
    const excelData = last10Orders.map((order, index) => ({
      "S.No": index + 1,
      "Order ID": order._id,
      "Customer Name": order.customerName || "N/A",
      "Date": new Date(order.createdAt).toLocaleString(),
      "Address": order.address || "N/A",
      "Items": order.items.map(item => {
  if (item.itemId) {
    return `${item.quantity} x ${item.itemId.name} ($${item.itemId.price})`;
  } else {
    return `${item.quantity} x [Item Deleted]`;
  }
}).join(", "),
      "Total Price": order.price || "N/A",
      "Transaction ID": order.transactionId || "N/A",
      "Phone Number": order.phoneNumber || "N/A",
      "Email": order.email || "N/A"
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Last10Orders");

    // Save the Excel file
    XLSX.writeFile(workbook, "Last_10_Orders.xlsx");
  };

  return (
    <div className='w-full h-[100vh] flex justify-center'>
      <div className='max-w-[1400px] p-5 w-full mt-4'>
        <div className='flex justify-between'>
          <h1 className='font-bold text-2xl'>Orders</h1>
          <button
            onClick={downloadLast10Orders}
            className='font-semibold text-white bg-rose-500 px-5 py-2 text-sm rounded-md'
          >
            Download Last 10 Orders
          </button>
        </div>

        <div className='w-full mt-5 flex flex-col gap-5'>
          {orders.length === 0 ? (
            <p className='text-center mt-6 font-semibold text-xl text-neutral-400'>No orders found</p>
          ) : (
            orders.map(order => (
              <CustomerOrder key={order._id} order={order} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
