import React from 'react'

function CheckoutOrderSummary({ cartItems, totalAmount }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md sticky top-24">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

      <div className="max-h-96 overflow-y-auto mb-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 mb-4 pb-4 border-b border-gray-200 last:border-b-0"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-16 h-16 object-cover rounded-md shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {item.title}
              </p>
              <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-semibold text-gray-800 shrink-0">
              ${item.totalPrice.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm text-gray-700">
          <span>Subtotal:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700">
          <span>Shipping:</span>
          <span className="text-green-600 font-semibold">FREE</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700">
          <span>Tax (10%):</span>
          <span>${(totalAmount * 0.1).toFixed(2)}</span>
        </div>
        <div className="h-px bg-gray-200" />
        <div className="flex justify-between text-lg font-bold text-gray-800">
          <span>Total:</span>
          <span className="text-green-600">
            ${(totalAmount * 1.1).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CheckoutOrderSummary
