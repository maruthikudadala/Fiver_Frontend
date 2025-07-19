import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";


const FreelancerLayout = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div >
      {/* ✅ Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5f5fa] shadow-md w-full h-[100px] flex items-center justify-between px-6">

        <h1 className="text-xl font-bold text-blue-700">Freelancer..</h1>

        {/* ✅ Desktop Nav */}
        <div className="md:flex gap-4 items-center">
          <Link to="/freelancer/create-gig" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            ➕ Create New Gig
          </Link>
          <Link to="/freelancer/gigs" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            🔍 Explore Gigs
          </Link>
          <Link to="/freelancer/orders" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
            📦 Orders
          </Link>
          <Link to={`/freelancer/chat/${userId}`} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            💬 Messages
          </Link>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            🚪 Logout
          </button>
        </div>

        {/* ✅ Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </nav>

      {/* ✅ Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-[80px] px-6 py-4 bg-white shadow-md space-y-4 z-40">
          <Link to="/freelancer/create-gig" onClick={() => setMenuOpen(false)} className="block text-black">
            ➕ Create New Gig
          </Link>
          <Link to="/freelancer/gigs" onClick={() => setMenuOpen(false)} className="block text-black">
            🔍 Explore Gigs
          </Link>
          <Link to="/freelancer/orders" onClick={() => setMenuOpen(false)} className="block text-black">
            📦 Orders
          </Link>
          <Link to={`/freelancer/chat/${userId}`} onClick={() => setMenuOpen(false)} className="block text-black">
            💬 Messages
          </Link>
          <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="block text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600 w-full text-left">
            🚪 Logout
          </button>
        </div>
      )}

      {/* ✅ Content below navbar */}
      <div className="mt-[90px] px-4">
        <Outlet />
      </div>
    </div>
  );
};
export default FreelancerLayout;