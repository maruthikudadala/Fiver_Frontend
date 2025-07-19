import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/apiPath";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await fetch(`${API_URL}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        navigate("/login");
      }
    } catch (err) {
      alert("Register failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[600px] bg-white border border-gray-300 rounded-lg shadow-lg p-10 flex flex-col items-center">
        <h2 className="text-[28px] font-medium text-gray-800 mb-6 text-center">
          Create new account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full">

          {/* Name Field */}
          <div className="mb-[10px] w-full max-w-[480px]">
            <label className="block text-[18px] font-bold mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              {...register("name")}
              placeholder="Enter your name"
              className="w-full h-[40px] px-4 border border-gray-300 rounded text-[16px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-[10px] w-full max-w-[480px]">
            <label className="block text-[18px] font-bold mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="example@gmail.com"
              className="w-full h-[40px] px-4 border border-gray-300 rounded text-[16px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-[10px] w-full max-w-[480px]">
            <label className="block text-[18px] font-bold mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Enter password"
              className="w-full h-[40px] px-4 border border-gray-300 rounded text-[16px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Role Dropdown */}
          <div className="mb-[20px] w-full max-w-[480px]">
            <label className="block text-[18px] font-bold mb-1" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              {...register("role")}
              className="w-full h-[40px] px-4 border border-gray-300 rounded text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select role</option>
              <option value="freelancer">Freelancer</option>
              <option value="client">Client</option>
            </select>
          </div>

          {/* Submit */}
          <div className="w-full flex flex-col items-center mt-4">
            <button
              type="submit"
              className="btn text-white bg-[#e5322d] hover:bg-red-600 text-[18px] leading-[26px] font-semibold rounded-[8px] py-[10px] px-[20px] w-full max-w-[480px]"
            >
              Register
            </button>

            <p className="mt-4 text-sm text-gray-700">
              Already a member?{" "}
              <a
                href="/login"
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Log in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
