import { Link, useNavigate } from "react-router-dom";

const FreelancerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* ✅ Welcome Message */}
      <div className="flex flex-col items-center justify-center text-center pt-20 md:pt-32 px-4">

        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          🎉 Welcome to Freelancer Dashboard!
        </h1>
        <p className="text-gray-600 mb-10 max-w-xl">
          Here you can manage your gigs, explore client orders, and grow your profile.
        </p>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
