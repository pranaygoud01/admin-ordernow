import React from 'react';


const CustomerOrder = ({ order }) => {
  const { customerName, phoneNumber, email, address, items, price, transactionId, createdAt,paymentMethod } = order;

  return (
    <div className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between flex-wrap gap-4 items-center">
        {/* Left Info */}
        <div className="flex flex-col gap-1 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-500">Order ID:</span>
            <span className="font-semibold">{order.orderId}</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-gray-500">Customer:</span>
            <span className="font-semibold">{customerName}</span>
            <span>• {phoneNumber}</span>
            <span>• {email}</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-gray-500">Address:</span>
            <span>{address}</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-gray-500">Items:</span>
            <span className="font-semibold">{items.length}</span>
          </div>
        </div>

        {/* Right Info */}
        <div className="flex flex-col items-end gap-1 text-right text-sm text-gray-700 max-lg:items-start max-lg:text-left">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-green-600">£{price}</span>
            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-md text-xs font-medium">{paymentMethod}</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-gray-500">Date:</span>
            <span>{new Date(createdAt).toLocaleDateString()}</span>
            <span>{new Date(createdAt).toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-gray-500">Txn ID:</span>
            <span className="font-mono text-xs break-all">{transactionId}</span>
          </div>
        </div>
      </div>

      {/* Ordered Items */}
      <div className="mt-4">
        <h2 className="text-sm font-semibold text-gray-800">Ordered Items:</h2>
        <ul className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
        {items.map((item, index) => (
  <li key={index} className="px-2 py-1 bg-gray-100 rounded-md">
    {item.itemId ? (
      <>
        {item.itemId.name} 
        {item.preparationChoice ? ` (${item.preparationChoice})` : ''}
      </>
    ) : (
      <span className="text-gray-400">Unknown</span>
    )}
  </li>
))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerOrder;
