import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/apiPath";

const MockPayButton = ({ gigId, price, sellerId }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async () => {
    try {
      const res = await fetch(`${API_URL}/api/payment/mock-pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ gigId }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`✅ Payment simulated!\nGig ID: ${data.gigId}\nPrice: ₹${data.price}`);
        setPaymentSuccess(true); // Set flag to show chat button
      } else {
        alert(`❌ Error: ${data.msg}`);
      }
    } catch (err) {
      console.error("Mock pay error", err);
      alert("Mock payment failed.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handlePayment}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Simulate Payment ₹{price}
      </button>

      {paymentSuccess && sellerId && (
        <Link
        to={`/client/chat/${sellerId}`}
        className="px-4 py-2 border border-blue-500 text-blue-600 rounded hover:bg-blue-50 hover:text-blue-700 transition text-center w-max"
      >
        💬 Chat with Seller
      </Link>
      )}
    </div>
  );
};

export default MockPayButton;
