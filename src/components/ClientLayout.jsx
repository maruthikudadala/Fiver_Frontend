import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const ClientLayout = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-[80px] w-full px-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-purple-700">Freelancer..</h1>

        {/* ✅ Desktop Menu */}
        <div className="md:flex gap-6 items-center">
          <Link
            to="/client/gigs"
            className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            🌐 Explore Gigs
          </Link>
          <Link
            to="/client/orders"
            className="text-white bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded"
          >
            🛒 Purchased Gigs
          </Link>
          <Link
            to={`/client/chat/${loggedInUser?._id}`}
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

        {/* ✅ Hamburger Button for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none text-gray-700"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </nav>

      {/* ✅ Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 mt-[80px] space-y-4">
          <Link
            to="/client/gigs"
            className="block text-blue-600 font-medium"
            onClick={() => setMenuOpen(false)}
          >
            🌐 Explore Gigs
          </Link>
          <Link
            to="/client/orders"
            className="block text-gray-700 font-medium"
            onClick={() => setMenuOpen(false)}
          >
            🛒 Purchased Gigs
          </Link>
          <Link
            to={`/client/chat/${loggedInUser?._id}`}
            className="block text-purple-600 font-medium"
            onClick={() => setMenuOpen(false)}
          >
            💬 Chat
          </Link>
          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="block text-red-500 font-medium"
          >
            🚪 Logout
          </button>
        </div>
      )}

      {/* ✅ Page Content */}
      <div className="pt-[100px] px-6">
        <Outlet />
      </div>
    </div>
  );
};

export default ClientLayout;
