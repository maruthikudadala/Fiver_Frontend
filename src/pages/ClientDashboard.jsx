import { Link, useNavigate } from "react-router-dom";

const ClientDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Top Navbar */}
      {/* <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-[80px] w-full px-8 flex items-center justify-between">
        <h1 className="text-xl font-bold text-purple-700">Freelancer Marketplace</h1>

        <div className="flex gap-6 items-center">
          <Link
            to="/gigs"
            className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            🌐 Explore Gigs
          </Link>
          <Link
            to="/my-orders"
            className="text-white bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded"
          >
            🛒 Purchased Gigs
          </Link>
          <Link
            to="/chat"
            className="text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
          >
            💬 Chat
          </Link>
          <button
            onClick={handleLogout}
            className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            🚪 Logout
          </button>
        </div>
      </nav> */}

      {/* ✅ Welcome Message */}
      <div className="flex flex-col items-center justify-center text-center pt-[120px] px-4">
        <h1 className="text-3xl font-bold text-purple-600 mb-4">
          👋 Welcome to Client Dashboard!
        </h1>
        <p className="text-gray-600 max-w-xl">
          Browse available gigs, track your purchases, and chat with freelancers.
        </p>
      </div>
    </div>
  );
};

export default ClientDashboard;
