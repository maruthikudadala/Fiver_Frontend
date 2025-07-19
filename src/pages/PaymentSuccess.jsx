import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_URL } from "../utils/apiPath";

const PaymentSuccess = () => {
  const { search } = useLocation();
  const [message, setMessage] = useState("Completing your payment...");

  const gigId = new URLSearchParams(search).get("gigId");

  useEffect(() => {
    const markSuccess = async () => {
      try {
        const res = await fetch(`${API_URL}/api/payment/mark-success`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ gigId }),
        });

        const data = await res.json();

        if (res.ok) {
          setMessage(`✅ Payment for gig "${data.gigTitle}" is marked successful!`);
        } else {
          setMessage(`❌ ${data.msg}`);
        }
      } catch (err) {
        console.error("Error marking success:", err);
        setMessage("❌ Something went wrong while marking the payment.");
      }
    };

    if (gigId) markSuccess();
    else setMessage("❌ Invalid gig ID in URL.");
  }, [gigId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-6 rounded shadow-md text-center max-w-md">
        <h2 className="text-xl font-semibold mb-4">Payment Status</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
