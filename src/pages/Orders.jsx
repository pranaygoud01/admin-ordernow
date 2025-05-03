import React, { useEffect, useState } from 'react';
import CustomerOrder from "../components/CustomerOrder";
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const ordersPerPage = 4;

  const authToken = localStorage.getItem('authToken');

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
        const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    fetchOrders(); // Fetch once immediately
  
    const interval = setInterval(fetchOrders, 10000); // Then every 10 seconds
  
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [authToken]); 
  

  const downloadOrdersByDateRange = () => {
    if (!fromDate || !toDate) {
      toast.error("Please select both From Date and To Date.");
      return;
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);
    

    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= from && orderDate <= to;
    });

    if (filteredOrders.length === 0) {
      toast.error("No orders found in the selected date range.");
      return;
    }

    const excelData = filteredOrders.map((order, index) => ({
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
    XLSX.utils.book_append_sheet(workbook, worksheet, "OrdersByDateRange");
    XLSX.writeFile(workbook, `Orders_${fromDate}_to_${toDate}.xlsx`);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className='w-full h-fit min-h-[100vh] flex justify-center'>
      <div className='max-w-[1400px] p-5 w-full mt-4'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          <h1 className='font-bold text-2xl'>Orders</h1>
          <div className="flex items-end flex-wrap gap-4">
  {/* From Date */}
  <div className="flex flex-col">
    <label className="text-xs font-medium text-gray-600 mb-1">From Date</label>
    <input
      type="date"
      value={fromDate}
      onChange={(e) => setFromDate(e.target.value)}
      className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
    />
  </div>

  {/* To Date */}
  <div className="flex flex-col">
    <label className="text-xs font-medium text-gray-600 mb-1">To Date</label>
    <input
      type="date"
      value={toDate}
      onChange={(e) => setToDate(e.target.value)}
      className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
    />
  </div>

  {/* Download Button */}
  <button
    onClick={downloadOrdersByDateRange}
    className="bg-rose-500 hover:bg-rose-600 transition-colors text-white font-semibold px-5 py-2 rounded-md text-sm mt-5 max-lg:mt-0"
  >
    Download Orders
  </button>
</div>

        </div>

        <div className='w-full mt-5 flex flex-col gap-5'>
          {currentOrders.length === 0 ? (
            <p className='text-center mt-6 font-semibold text-xl text-neutral-400'>No orders found</p>
          ) : (
            currentOrders.map(order => (
              <CustomerOrder key={order._id} order={order} />
            ))
          )}
        </div>

        {/* Pagination */}
        <div className='flex justify-between items-center mt-10'>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className='bg-gray-300 hover:bg-gray-400 font-semibold px-4 py-2 rounded disabled:opacity-50'
          >
            Previous
          </button>
          <p className='font-semibold'>Page {currentPage} of {totalPages}</p>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className='bg-gray-300 hover:bg-gray-400 font-semibold px-4 py-2 rounded disabled:opacity-50'
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
