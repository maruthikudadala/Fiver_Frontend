import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../utils/apiPath";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_URL}/api/payment/my-orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        if (res.ok) setOrders(data);
        else alert(data.msg);
      } catch (err) {
        console.error("Error fetching orders:", err);
        alert("❌ Failed to load orders.");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center ">My Orders</h2>
  
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders yet.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded p-4 shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold mb-2">
                {order.gigId?.title || "Unknown Gig"}
              </h3>
              <p>₹{order.price}</p>
              <p>Status: {order.status}</p>
              <p>Ordered on: {new Date(order.createdAt).toLocaleString()}</p>
  
              {order.gigId?.images?.[0] && (
                <img
                  src={`data:image/jpeg;base64,${order.gigId.images[0]}`}
                  alt="Gig"
                  style={{ width: "100px", height: "auto" }}
                  className="mt-2"
                />
              )}
  
              <div className="flex gap-4 mt-4">
                <Link
                  to={`/chat/${order.gigId?.createdBy?._id}`}
                  className="px-4 py-2 border border-blue-500 text-blue-600 rounded hover:bg-blue-50 hover:text-blue-700 transition"
                >
                  💬 Chat with Seller
                </Link>
                <Link
                  to={`/gig/${order.gigId?._id}`}
                  className="px-4 py-2 border border-green-500 text-green-600 rounded hover:bg-green-50 hover:text-green-700 transition"
                >
                  ⭐ Leave Review
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default MyOrders;
