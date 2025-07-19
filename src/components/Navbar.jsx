import { useState } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1041] bg-[#f5f5fa] shadow-md h-[100px] w-full px-[20px] flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-800">Freelancer..</h1>
      </div>

      {/* Center: Search bar (only show on md and up) */}
      <div className=" md:flex flex-1 justify-center max-w-[400px] px-4">
        <input
          type="text"
          placeholder="Search services..."
          className="w-full border border-gray-300 rounded-full px-[10px] py-[10px] focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Desktop Navigation Links */}
      <div className="md:flex items-center gap-4 text-[18px]">
        <Link to="/" className="hover:underline text-gray-700 hover:text-blue-600">Home</Link>
        <Link
          to="/register"
          className="text-white bg-[#e5322d] hover:bg-red-600 font-semibold rounded px-4 py-2"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="text-white bg-[#28a745] hover:bg-green-600 font-semibold rounded px-4 py-2"
        >
          Login
        </Link>
      </div>

      {/* Hamburger Icon (mobile only) */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-800 focus:outline-none"
        >
          {/* Hamburger icon */}
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[100px] left-0 w-full bg-[#f5f5fa] shadow-md flex flex-col items-start px-4 py-4 md:hidden">
          <input
            type="text"
            placeholder="Search services..."
            className="w-full border border-gray-300 rounded-full px-[10px] py-[10px] mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="py-2 text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            to="/register"
            onClick={() => setIsMobileMenuOpen(false)}
            className="py-2 text-white bg-[#e5322d] hover:bg-red-600 font-semibold rounded px-4"
          >
            Register
          </Link>
          <Link
            to="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 py-2 text-white bg-[#28a745] hover:bg-green-600 font-semibold rounded px-4"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
