import React, { useEffect, useState } from 'react';
import CustomerOrder from "../components/CustomerOrder"

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const authToken = localStorage.getItem('authToken')// Replace with your actual token

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
        setOrders(data); // Store fetched orders
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className='w-full h-[100vh] flex justify-center'>
      <div className='max-w-[1400px] p-5 w-full mt-4'>
        <h1 className='font-bold text-2xl'>
          Orders
        </h1>
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
