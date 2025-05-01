import React from 'react';
import axios from 'axios';
import toast from "react-hot-toast"
const CustomerOrder = ({ order }) => {
  const { customerName, phoneNumber, email, address, items, price, transactionId, createdAt } = order;

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this order?');
      if (!confirmed) return;

      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        alert('No auth token found. Please login again.');
        return;
      }

      await axios.delete(`${import.meta.env.VITE_HOST}/api/orders/${order.orderId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

     toast.success('Order deleted successfully');
      window.location.reload();
      // Optionally, refresh the list or call a parent function to remove it from UI
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete the order');
    }
  };

  return (
    <div className='p-10 rounded-xl max-lg:p-8 h-fit flex flex-col border border-neutral-200 bg-white shadow-xl'>
      <div className='flex justify-between max-lg:gap-5 max-lg:flex-col w-full'>
        <div className='flex flex-col gap-3 max-lg:gap-2'>
          <h1 className='font-semibold max-lg:text-sm'>ID: {order.orderId}</h1>
          <h1 className='font-semibold text-3xl max-lg:text-xl'>{customerName}</h1>
          <p className='max-lg:text-xs'>{phoneNumber}</p>
          <p className='max-lg:text-xs'>{email}</p>
          <p className='max-lg:text-sm'>{address}</p>
          <p className='font-semibold'>Total number of Items Ordered: {items.length}</p>
          <div className='w-full'>
            <h1 className='font-semibold'>Ordered Items</h1>
            <ul className='text-sm mt-2 flex flex-col gap-2'>
  {items.map((item, index) => (
    <li key={index}>
      {item.itemId ? item.itemId.name : <span className="text-gray-400">Unknown Item</span>}
    </li>
  ))}
</ul>

          </div>
        </div>
        <div className='flex flex-col gap-2 items-end max-lg:items-start'>
          <h1 className='font-semibold text-3xl'>£{price}</h1>
          <h1 className='font-semibold text-xl text-green-400'>Paid</h1>
          <h1 className='font-semibold text-[#333]'>{new Date(createdAt).toLocaleDateString()}</h1>
          <p className='font-semibold'>{new Date(createdAt).toLocaleTimeString()}</p>
          <h1 className='font-semibold text-[#333]'>Transaction Id: {transactionId}</h1>
        </div>
      </div>

      {/* Delete Button */}
      <div className='flex justify-end mt-5'>
        <button
          onClick={handleDelete}
          className='px-5 py-2 bg-red-500  hover:bg-red-600 text-white rounded-md text-sm font-semibold'
        >
          Delete Order
        </button>
      </div>
    </div>
  );
};

export default CustomerOrder;
